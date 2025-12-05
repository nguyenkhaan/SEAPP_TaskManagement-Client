import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import StarterKit from "@tiptap/starter-kit";
import ImageUpload from "./TextEditorComponents/ImageUpload";
import WorkingLayout from "../layouts/WorkingLayout";
import TeamServices from "../services/teamServices";
import MessageLog from "../components/MessageLog";
import Modal from "../components/modal";
import LoadingModal from "./LoadingModal";
import ParamServices from "../services/urlParams";
import TeamServies from "../services/teamServices";
import UrlError from "./URLError";
function UpdateTeam() {
    const teamID = ParamServices.getID() 
    if (!teamID || isNaN(teamID)) return <UrlError />; 
    const {
        data: teamQueryData,
        isPending: teamQueryPending,
        error: teamQueryError,
    } = useQuery({
        //Lay du lieu cua team dua tren id
        queryKey: [`update-team-${ParamServices.getID()}`],
        queryFn: async () => {
            const id = ParamServices.getID();
            const responseData = await TeamServies.getTeamInfoFromId(id);
            return responseData; //icon, name, banner, description
            //leader -> data.data.leader (id , email , name)
            //viceLeader Mang danh sach cac memebers -> data.data.viceLeader (id , email , name)
            //members -> data.data.members (Mang , moi phan tu gom co id , email , name , avatar_url)
        },
        refetchOnWindowFocus: false 
    });

    const [image, setImage] = useState(null);
    const [reRender, setReRender] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);
    const [showLog, setShowLog] = useState(0);
    const queryClient = useQueryClient();
    const [teamName, setTeamName] = useState("");
    const [teamDesc, setTeamDesc] = useState("");
    const editor = useEditor({
        extensions: [StarterKit],
        content: teamQueryData
            ? `<p>${teamQueryData.data.teamData.description}<p>`
            : "<p>Describe your team...</p>",
        editorProps: {
            attributes: {
                class: "text-sm md:text-[18px] h-42 md:h-47 overflow-y-scroll w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-3 md:px-5",
            },
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            teamName: teamQueryData ? teamQueryData.data.teamData.name : "",
        },
    });
    //Dung de thuc hien ham update team
    const updateTeamMutation = useMutation({
        mutationFn: async ({ name, icon, description }) => {
            const teamID = ParamServices.getID();
            const responseData = await TeamServices.updateTeam(
                teamID,
                name,
                icon,
                description
            );
            return responseData;
        },
        onSuccess: async (responseData) => {
            console.log(responseData);
            await queryClient.invalidateQueries(["teams"]);
            setShowLog(1);
        },
        onError: () => {
            setShowLog(-1);
        },
    });

    const onSubmit = (data) => {
        updateTeamMutation.mutate({
            name: data.teamName,
            icon: image,
            description: editor.getText(),
        });
    };
    useEffect(() => {
        if (teamQueryData) {
            if (teamQueryData.data.teamData.icon)
                setPreviewImage(teamQueryData.data.teamData.icon);
            setReRender(!reRender);

            setValue("teamName", teamQueryData.data.teamData.name);
            editor.commands.setContent(
                teamQueryData.data.teamData.description ||
                    "<p>Describe your team...</p>"
            );
        }
    }, [teamQueryData]);
    if (teamQueryPending || !teamQueryData) return <LoadingModal />;
    return (
        <WorkingLayout>
            <div className="w-full h-auto md:px-2 px-3 lg:px-0 pb-20">
                <div className="w-full flex items-center justify-between mb-10">
                    <div>
                        <h2 className="font-md text-2xl md:text-4xl leading-[34px]">
                            Update Team
                        </h2>
                        <span className="font-md text-base md:text-xl block mt-1 md:mt-3">
                            Update your team information below
                        </span>
                    </div>
                    <Link to={`/app/teams`}>
                        <motion.button
                            className="md:rounded-2xl rounded-md font-semibold cursor-pointer text-white py-2 bg-(--color-primary) md:px-4 px-2 text-base md:text-[18px]"
                            initial={{ opacity: 1 }}
                            whileHover={{ opacity: 0.8 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}>
                            Back to Teams
                        </motion.button>
                    </Link>
                </div>

                <div className="border shadow-xl border-gray-400 overflow-hidden rounded-2xl mt-6 w-full min-h-120">
                    <form
                        id="update-team-form"
                        className="w-full min-h-150 text-black py-7 px-5 flex flex-col justify-start gap-6"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <ImageUpload
                                hooks={{
                                    previewImage,
                                    image,
                                    setImage,
                                    setPreviewImage,
                                }}
                            />
                        </div>

                        <div>
                            <h3 className="font-md text-lg md:text-xl mb-2">
                                Team name
                            </h3>
                            <input
                                className="text-sm md:text-[18px] h-10 md:h-12 w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-3 md:px-5"
                                placeholder="Enter team name"
                                {...register("teamName", {
                                    required: "Team name is required",
                                })}
                            />
                            {errors.teamName && (
                                <p className="text-red-600 md:text-lg italic font-medium text-base">
                                    {errors.teamName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <h3 className="font-md text-lg md:text-xl mb-2">
                                Description
                            </h3>
                            <EditorContent editor={editor} />
                        </div>
                    </form>

                    <div className="flex bg-white px-5 pt-5 pb-5 border-t border-t-gray-600 items-center justify-end gap-5 w-full h-20">
                        <Link to={`/app/teams?id=${ParamServices.getID()}`}>
                            <motion.button
                                className="font-md text-black cursor-pointer text-lg md:text-2xl bg-gray-200 rounded-md md:rounded-2xl px-4 md:px-8 md:py-3 py-2"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                type="button">
                                Go Back
                            </motion.button>
                        </Link>

                        <motion.button
                            className="font-md text-white cursor-pointer text-lg md:text-2xl bg-(--color-primary) rounded-md md:rounded-2xl px-4 md:px-10 py-2 md:py-3"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            type="submit"
                            form="update-team-form">
                            Update Team
                        </motion.button>
                    </div>
                </div>

                <MessageLog
                    showLog={showLog}
                    setShowLog={setShowLog}
                    message={
                        showLog == 1
                            ? "Updated Team successfully"
                            : "Updated Team failed"
                    }
                />
            </div>
        </WorkingLayout>
    );
}

export default UpdateTeam;

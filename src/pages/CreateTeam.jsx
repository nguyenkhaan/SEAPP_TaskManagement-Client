import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import { useState } from "react";
import WorkingLayout from "../layouts/WorkingLayout";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import StarterKit from "@tiptap/starter-kit";
import MultiEmail from "./CreateTeamComponents/MultiEmail";
import { ErrorMessage } from "@hookform/error-message";
import MessageLog from "../components/MessageLog";
import sendEmail from "../services/sendEmail";
import ImageUpload from "./TextEditorComponents/ImageUpload";
import TeamServies from "../services/teamServices";
import Modal from "../components/modal";
import { useNavigate } from "react-router";
function CreateTeam() {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState([]);
    const [focused, setFocused] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [code, setCode] = useState(null);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showLog, setShowLog] = useState(0); //Truyen nguyen cai nay vao ben trong showLog
    const queryClient = useQueryClient();
    const createTeamMutation = useMutation({
        mutationFn: async ({
            name = "Cloudian Team",
            icon = null,
            banner = null,
            description = "",
        }) => {
            // Bật loading khi bắt đầu mutation
            setLoading(true);
            const responseData = await TeamServies.createTeam(
                name,
                icon,
                banner,
                description
            );
            //Tien hanh gui mail cho tung nguoi 
            emails.forEach((email) => {
                // console.log("Dang tien hanh gui mail");
                sendEmail(
                    email,
                    responseData.data.data?.teamName,
                    responseData.data.code
                );
            });
            return responseData;
        },
        onSuccess: async (responseData) => {
            // Tắt loading khi thành công
            setLoading(false);
            queryClient.invalidateQueries(["teams"]); //Fetch du lieu lai cho thang teams, them await de load xong thi moi cho hien thi UI
            setShowLog(1);
            setCode(responseData.data.code);
            setShowCodeModal(true);
            

        },
        onError: () => {
            // Tắt loading khi lỗi và hiện log lỗi
            setLoading(false);
            setShowLog(-1);
        },
    });

    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content: "<p>Hello World!</p>", // initial content
        editorProps: {
            attributes: {
                class: "text-sm md:text-[18px] h-42 md:h-47 overflow-y-scroll w-full border border-(--color-border) bg-(--color-block-item-2) text-(--color-text) font-md rounded-[10px] py-3 px-3 md:px-5",
            },
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        reValidateMode: "onSubmit",
        mode: "onSubmit",
    });
    const onSubmit = async (data) => {
        createTeamMutation.mutate({
            name: data.teamName,
            icon: image,
            banner: null,
            // an toàn hơn nếu editor chưa sẵn sàng
            description: editor?.getText() ?? "",
        });
    };
    useEffect(() => {
        if (showCodeModal == false && code) {
            navigate('/app/teams')
        }
    } , [showCodeModal])
    return (
        <WorkingLayout>
            <div className="w-full h-250 md:px-2 px-3 lg:px-0 pb-20">
                <div className="w-full flex items-center justify-between mb-10">
                    <div>
                        <h2 className="font-md text-2xl text-(--color-text) md:text-4xl leading-[34px]">
                            Create A New Team
                        </h2>
                        <span className="font-md text-base md:text-xl text-(--color-text) block mt-1 md:mt-3">
                            Fill in the details below to set up your new team
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <Link to="/app/teams">
                            <motion.button
                                className="md:rounded-2xl rounded-md font-semibold cursor-pointer text-white py-2 bg-(--color-primary) md:px-4 px-2 text-base md:text-[18px]"
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 0.8 }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                }}>
                                Back to Teams
                            </motion.button>
                        </Link>
                        <motion.div
                            className="w-10 h-10 rounded-xl cursor-pointer text-white bg-(--color-primary) font-bold flex items-center justify-center text-base md:text-[18px]"
                            title="Show code"
                            initial={{ opacity: 1 }}
                            whileHover={{ opacity: 0.8 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}
                            onClick={() => {
                                if (code) setShowCodeModal(true);
                            }}>
                            <i class="fa-solid fa-cloud"></i>
                        </motion.div>
                    </div>
                </div>

                <div className="border shadow-xl border-gray-400 overflow-hidden rounded-2xl mt-6 w-full min-h-120">
                    <form
                        id="create-team-form"
                        className="w-full min-h-150 text-black py-7 px-5 flex flex-col justify-start gap-6"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div>
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
                            <h3 className="font-md text-lg md:text-xl mb-2 text-(--color-text)">
                                Team name
                            </h3>
                            <input
                                className="test-sm md:text-[18px] h-10 md:h-12 w-full border border-(--color-border) bg-(--color-block-item-2) font-md rounded-[10px] py-3 px-3 md:px-5 text-(--color-text)"
                                placeholder="e.g. Phoenix"
                                {...register("teamName", {
                                    required:
                                        "Vui lòng nhập thông tin cho trường này",
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="teamName"
                                render={({ messages }) => {
                                    if (!messages) return null;
                                    const msgs = Array.isArray(messages)
                                        ? messages
                                        : Object.values(messages);
                                    return msgs.map((msg, index) => (
                                        <p className="text-red-600 md:text-lg italic font-medium text-base">
                                            {msg}
                                        </p>
                                    ));
                                }}
                            />
                        </div>

                        <div>
                            <h3 className="font-md text-lg md:text-xl mb-2 text-(--color-text)">
                                Description
                            </h3>
                            <EditorContent editor={editor} />
                        </div>
                        <div>
                            <h3 className="font-md text-lg md:text-xl mb-2 text-(--color-text)">
                                Invite team members
                            </h3>

                            <MultiEmail
                                emails={emails}
                                setEmails={setEmails}
                                focused={focused}
                                setFocused={setFocused}
                            />
                            <span className="text-(--color-text-desc) font-md text-sm md:text-[18px] mt-1 md:mt-2 block">
                                You can add more members after the team is
                                created
                            </span>
                        </div>
                    </form>
                    <div className="flex bg-(--color-background-2) px-5 pt-5 pb-5 border-t border-t-gray-600 items-center justify-end gap-5 w-full h-20">
                        <motion.button
                            className="font-md text-black cursor-pointer text-lg md:text-2xl bg-gray-200 rounded-md md:rounded-2xl px-4 md:px-8 md:py-3 py-2"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                transition: "all",
                            }}
                            onClick={() => {
                                createTeamMutation.reset();
                                setLoading(false);
                                setShowLog(0);
                                setCode(null);
                                setShowCodeModal(false);
                                alert('Canceled creating...')
                            }}
                            >
                            Cancel
                        </motion.button>
                        <motion.button
                            className="font-md text-white cursor-pointer text-lg md:text-2xl bg-(--color-primary) rounded-md md:rounded-2xl px-4 md:px-10 py-2 md:py-3"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                transition: "all",
                            }}
                            type="submit"
                            style={{
                                pointerEvents: (loading ? 'none' : 'auto'),
                                opacity: (loading ? 0.7 : 1)
                            }}
                            form="create-team-form">
                            {!loading ? "Create Team" : "Creating..."}
                        </motion.button>
                    </div>
                </div>
                <MessageLog
                    showLog={showLog}
                    setShowLog={setShowLog}
                    message="Tạo nhóm thành công"
                />
                {showCodeModal && (
                    <Modal showModal={setShowCodeModal} code={code} />
                )}
            </div>
        </WorkingLayout>
    );
}
export default CreateTeam;

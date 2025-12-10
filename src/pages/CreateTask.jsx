import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import WorkingLayout from "../layouts/WorkingLayout";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { useQuery } from "@tanstack/react-query";
import RichTextEditor from "./TextEditorComponents/index";
import MenuBar from "./TextEditorComponents/Menubar";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import ImageUpload from "./TextEditorComponents/ImageUpload";
import DefaultImageUpload from "../components/DefaultImageUpload";
import Image from "@tiptap/extension-image";
import { useForm } from "react-hook-form";
import TitleInput from "./TextEditorComponents/TitleInput";
import PriorityChoice from "./TextEditorComponents/PriorityChoice";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { getCurrentDate } from "../services/getDate";
import TaskServices from "../services/TaskServices";
import DateInput from "./CreateTaskComponents/DateInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ParamServices from "../services/urlParams";
import MessageLog from "../components/MessageLog";
import AssignServies from "../services/assignServices";

function AssignedBox({ data, pending, error, formHandle }) {
    // Combobox state
    const { register } = formHandle;
    const [showUsersDropdown, setShowUsersDropdown] = useState(false);
    if (pending || !data)
        return (
            <button className="w-full bg-(--color-background-2) cursor-pointer border border-gray-400 rounded-lg px-3 py-2 text-left text-(--color-text)">
                Loading User to Assign...
            </button>
        );
    if (error) {
        <button className="w-full bg-(--color-background-2) cursor-pointer border border-gray-400 rounded-lg px-3 py-2 text-left text-(--color-text)">
            Error while loading Users
        </button>;
    }
    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-(--color-text)">
                Assign members
            </h3>

            <div className="relative inline-block w-64">
                <button
                    type="button"
                    onClick={() => setShowUsersDropdown((v) => !v)}
                    className="w-full bg-(--color-background-2) cursor-pointer border border-gray-400 rounded-lg px-3 py-2 text-left text-(--color-text)">
                    Select members
                </button>

                {showUsersDropdown && (
                    <div className="absolute mt-1 w-full bg-(--color-background-2) border border-gray-400 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                        {data.data.data.map((user) => (
                            <label
                                key={user.id}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-(--color-block-item-2) dark:hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={user.userID}
                                    {...register("assignedUsers")}
                                    className="w-4 h-4"
                                />
                                <span className="text-(--color-text)">
                                    {user.name}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function CreateTask() {
    const teamID = ParamServices.getID();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const { day, month, year, weekDay } = getCurrentDate();
    const [data, setData] = useState({});
    const [dueTime, setDueTime] = useState(new Date());
    const [priority, setPriority] = useState("low");
    const [title, setTitle] = useState("Default Title");
    const [showLog, setShowLog] = useState(0);
    const navigate = useNavigate();

    const {
        data: userAssignData,
        isPending: userAssignPending,
        error: userAssignError,
    } = useQuery({
        queryKey: [`teams-user-assign-${teamID}`],
        queryFn: async () => {
            const responseData = await AssignServies.getAllUserToAssign(teamID);
            // console.log(responseData.data.data);
            return responseData;
        },
    });

    const formHandle = useForm({
        mode: "all",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = formHandle;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { HTMLAttributes: { class: "list-disc ml-4" } },
                orderedList: { HTMLAttributes: { class: "list-decimal ml-4" } },
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Highlight,
            Image.configure({ allowBase64: true }),
        ],
        content: "<p>Hello world</p>",
        editorProps: {
            attributes: {
                class: "w-full h-[500px] border-2 overflow-y-auto rounded-md px-3 py-2 text-base border-slate-200 bg-(--color-block-item-2) text-(--color-text) outline-0",
            },
        },
    });

    const createTaskMutation = useMutation({
        mutationFn: async ({
            title,
            description,
            dueTime,
            important,
            urgent,
            assignIds
        }) => {
            return await TaskServices.createTask(
                teamID,
                title,
                description,
                dueTime,
                important,
                urgent, 
                assignIds
            );
        },
        onMutate: () => {
            setLoading(true);
            setShowLog(0);
        },
        onSuccess: (data) => {
            // console.log('Du lieu sau khi tao task: ' , data) 
            
            queryClient.invalidateQueries([`team-tasks-${teamID}`]);
            queryClient.invalidateQueries([`tasks-me`]);
            setLoading(false);
            setShowLog(1);

            formHandle.reset({
                important: false,
                urgent: false,
                assignedUsers: [],
            });
            setTitle("Default Title");
            setPriority("low");
            setDueTime(new Date());
            editor?.commands.setContent("<p></p>");
        },
        onError: () => {
            setShowLog(-1);
            setLoading(false);
        },
    });

    const onSubmit = (data) => {
        createTaskMutation.mutate({
            title,
            description: editor.getHTML(),
            dueTime,
            important: data.important,
            urgent: data.urgent,
            assignIds: data.assignedUsers 
        });
    };

    return (
        <WorkingLayout>
            <div className="w-full min-h-[890px] md:h-[990px] border p-6 2xl:pt-6 rounded-xl border-gray-500 mb-10">
                {/* Go Back */}
                <div className="w-full inline-flex items-center justify-end mb-3">
                    <Link
                        onClick={() => {
                            if (window.history.length > 1) navigate(-1);
                            else navigate("/app/dashboard");
                        }}>
                        <span className="cursor-pointer text-lg text-(--color-primary) underline font-semibold">
                            Go back
                        </span>
                    </Link>
                </div>

                <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                    {/* HEADER */}
                    <div className="flex max-md:flex-col items-start justify-start gap-6">
                        <DefaultImageUpload />
                        <div className="flex-1">
                            <TitleInput
                                formHandle={formHandle}
                                onTitleChange={setTitle}
                            />
                            <PriorityChoice
                                formHandle={formHandle}
                                onPriorityChange={setPriority}
                            />

                            <p className="mt-4 text-(--color-text)">
                                Status:{" "}
                                <span className="text-(--color-not-started)">
                                    Not started
                                </span>
                            </p>

                            <div className="w-full mb-4 mt-2 flex max-md:flex-col items-start xl:items-center justify-between">
                                <DateInput
                                    value={dueTime}
                                    onChange={setDueTime}
                                />
                                <p className="text-sm text-(--color-text-desc) mt-4">
                                    Created On{" "}
                                    <span>
                                        {day}/{month}/{year}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <AssignedBox
                        data={userAssignData}
                        pending={userAssignPending}
                        error={userAssignError}
                        formHandle={formHandle}
                    />

                    {/* MAIN EDITOR */}
                    <div className="text-lg min-h-[540px] md:mt-8 mt-6">
                        <MenuBar editor={editor} />
                        <RichTextEditor editor={editor} />
                    </div>

                    {/* SUBMIT BTN */}
                    <button
                        type="submit"
                        className="px-4 top-35 md:top-43 right-0 absolute py-3 text-white bg-(--color-primary) mt-4 
                        font-semibold cursor-pointer shadow-lg rounded-md"
                        style={{
                            pointerEvents: loading ? "none" : "auto",
                            opacity: loading ? 0.7 : 1,
                        }}>
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </form>

                <MessageLog
                    setShowLog={setShowLog}
                    showLog={showLog}
                    message={
                        showLog == 1
                            ? "Thêm nhiệm vụ thành công"
                            : "Thêm nhiệm vụ thất bại"
                    }
                />
            </div>
        </WorkingLayout>
    );
}

export default CreateTask;

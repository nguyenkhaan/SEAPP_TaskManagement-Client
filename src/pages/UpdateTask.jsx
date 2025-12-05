import React, { useEffect } from "react";
import { useState } from "react";
import WorkingLayout from "../layouts/WorkingLayout";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import RichTextEditor from "./TextEditorComponents/index";
import MenuBar from "./TextEditorComponents/Menubar";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
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
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ParamServices from "../services/urlParams";
import MessageLog from "../components/MessageLog";
import LoadingModal from "./LoadingModal";
import ListBox from "../components/ListBox";
import UrlError from "./URLError";
const optionMap = {
    completed: { value: "completed", label: "Completed" },
    "in progress": { value: "in progress", label: "In Progress" },
    "to do": { value: "to do", label: "Not Started" },
};

function UpdateTask() {
    const currentTaskID = ParamServices.getID();
    if (!currentTaskID || isNaN(currentTaskID)) return <UrlError /> 
    // Query lấy data task
    const { data: task, isPending } = useQuery({
        queryKey: [`tasks-${currentTaskID}`],
        queryFn: async () => {
            const res = await TaskServices.getTaskDetail(currentTaskID);
            return res;
        },
        refetchOnWindowFocus: false,
    });

    const [selectedOptions, setSelectedOptions] = useState(null);
    const [dueTime, setDueTime] = useState(new Date());
    const [priority, setPriority] = useState("low");
    const [title, setTitle] = useState("Default Title");
    const [showLog, setShowLog] = useState(0);

    const navigate = useNavigate();

    // React Hook Form
    const formHandle = useForm({
        mode: "all",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = formHandle;

    // TIPTAP EDITOR
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            Image.configure({
                allowBase64: true,
                resize: { enabled: true },
            }),
        ],
        content: task ? task.data.data.description : "<p>Hello world</p>",
        editorProps: {
            attributes: {
                class:
                    "w-full h-[500px] border-2 overflow-y-auto rounded-md px-3 bg-slate-50 py-2 text-base border-slate-200  bg-white text-black outline-0",
            },
        },
    });

    // Mutation update Task
    const queryClient = useQueryClient() 
    const updateMutation = useMutation({
        mutationFn: async (payload) => {
            const { title, description, dueTime, important, urgent, status } =
                payload;

            return await TaskServices.updateTask(
                currentTaskID,
                title,
                description,
                new Date(dueTime).toISOString(),
                important,
                urgent,
                status
            );
        },

        onSuccess: () => {
            queryClient.invalidateQueries([`tasks-${currentTaskID}`])
            //Lat nua tien hanh update them du lieu cac task cua nguoi dung //user-tasks-info 
            setShowLog(1)
        }, 
        onError: () => setShowLog(-1),
    });

    //  Submit form update
    const onSubmit = (formData) => {
        const payload = {
            title,
            description: editor.getHTML(),
            dueTime,
            important: formData.important,
            urgent: formData.urgent,
            status: selectedOptions?.value || task.data.data.status,
        };

        updateMutation.mutate(payload);
    };

    //  Khi load xong task -> set state
    useEffect(() => {
        if (task) {
            const t = task.data.data;
            setTitle(t.title);
            setDueTime(new Date(t.dueTime));
            setSelectedOptions(optionMap[t.status]);
        }
    }, [task]);

    if (isPending || !task) return <LoadingModal />;

    return (
        <WorkingLayout>
            <div className="w-full min-h-[890px] border p-6 rounded-xl border-gray-500 mb-10">
                <div className="w-full inline-flex items-center justify-end mb-3">
                    <Link
                        to={`/app/view-task?id=${currentTaskID}`}
                    >
                        <span className="cursor-pointer text-lg text-(--color-primary) underline font-semibold">
                            Go back
                        </span>
                    </Link>
                </div>

                <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                    {/* Header */}
                    <div className="flex max-md:flex-col items-start justify-start gap-6">
                        <DefaultImageUpload />

                        <div className="flex-1">
                            <TitleInput
                                formHandle={formHandle}
                                onTitleChange={setTitle}
                                defaultValue={task.data.data.title}
                            />

                            <PriorityChoice
                                formHandle={formHandle}
                                onPriorityChange={setPriority}
                                important={task.data.data.important}
                                urgent={task.data.data.urgent}
                            />

                            <p className="mt-4 mb-1 text-black">Status:</p>

                            <ListBox
                                selectedOption={selectedOptions}
                                setSelectedOption={setSelectedOptions}
                            />

                            <div className="w-full mb-4 mt-3 flex max-md:flex-col">
                                <DateInput value={dueTime} onChange={setDueTime} />
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="text-lg min-h-[540px] mt-6">
                        <MenuBar editor={editor} />
                        <RichTextEditor editor={editor} />
                    </div>

                    <button
                        type="submit"
                        title="Update Task"
                        className="px-4 top-35 md:top-43 right-0 absolute py-3 text-white bg-(--color-primary) mt-4 font-semibold cursor-pointer shadow-lg rounded-md"
                    >


                        Update Task
                    </button>
                </form>

                <MessageLog
                    setShowLog={setShowLog}
                    showLog={showLog}
                    message={
                        showLog === 1
                            ? "Cập nhật nhiệm vụ thành công"
                            : "Cập nhật nhiệm vụ thất bại"
                    }
                />
            </div>
        </WorkingLayout>
    );
}

export default UpdateTask;

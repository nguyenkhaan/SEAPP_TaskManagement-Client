import React, { useEffect, useState } from "react";
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
import { useNavigate, useSearchParams, Link } from "react-router";
import TaskServices from "../services/TaskServices";
import DateInput from "./CreateTaskComponents/DateInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MessageLog from "../components/MessageLog";
import LoadingModal from "./LoadingModal";
import ListBox from "../components/ListBox";
import UrlError from "./URLError";

const optionMap = {
    completed: { value: "completed", label: "Completed" },
    "in progress": { value: "in progress", label: "In Progress" },
    "to do": { value: "to do", label: "Not Started" },
};


function UserMultiSelect({ users, selectedUserIds, setSelectedUserIds }) {
    const [open, setOpen] = useState(false);

    const toggleUser = (id) => {
        if (selectedUserIds.includes(id)) {
            setSelectedUserIds(selectedUserIds.filter((u) => u !== id));
        } else {
            setSelectedUserIds([...selectedUserIds, id]);
        }
    };

    return (
        <div className="relative w-full max-w-xs mt-4">
            <p className="mb-2 text-(--color-text)">Assign to:</p>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full h-11 px-4 bg-(--color-background-2) border border-gray-500 rounded-lg text-(--color-text) flex items-center justify-between"
            >
                <span className="truncate">
                    {selectedUserIds.length === 0
                        ? "Select users..."
                        : `${selectedUserIds.length} selected`}
                </span>
                <span className="text-sm">▼</span>
            </button>

            {open && (
                <div className="absolute mt-1 w-full cursor-pointer bg-(--color-background-2) border border-gray-500 z-9999999 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {users.map((user) => (
                        <label
                            key={user.id}
                            className="flex items-center px-3 py-2 cursor-pointer hover:bg-(--color-block-item-2)"
                        >
                            <input
                                type="checkbox"
                                checked={selectedUserIds.includes(user.id)}
                                onChange={() => toggleUser(user.id)}
                                className="mr-2"
                            />
                            <span className="text-(--color-text)">{user.name}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}


function UpdateTask() {
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const currentTaskID = Number(searchParams.get("id"));

    if (!currentTaskID || isNaN(currentTaskID)) return <UrlError />;

    // Query task data
    const { data: task, isPending, isFetching } = useQuery({
        queryKey: [`tasks-${currentTaskID}`, currentTaskID],
        queryFn: async () => {
            return await TaskServices.getTaskDetail(currentTaskID);
        },
        refetchOnWindowFocus: false,
    });

    const navigate = useNavigate();
    const formHandle = useForm({ mode: "all" });
    const { register, handleSubmit } = formHandle;

    const [selectedOptions, setSelectedOptions] = useState(null);
    const [dueTime, setDueTime] = useState(new Date());
    const [priority, setPriority] = useState("low");
    const [title, setTitle] = useState("Default Title");
    const [showLog, setShowLog] = useState(0);

    const sampleUsers = [
        { id: 1, name: "Kha Nguyen" },
        { id: 2, name: "Minh Tran" },
        { id: 3, name: "Lan Pham" },
        { id: 4, name: "Ngoc Le" },
        { id: 4, name: "Ngoc Le" },
        { id: 4, name: "Ngoc Le" },
        { id: 4, name: "Ngoc Le" },

    ];
    const [assignedUsers, setAssignedUsers] = useState([]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Highlight,
            Image.configure({ allowBase64: true, resize: { enabled: true } }),
        ],
        content: task ? task.data.data.description : "<p>Loading...</p>",
        editorProps: {
            attributes: {
                class: "w-full h-[500px] border-2 bg-(--color-background-2) overflow-y-auto rounded-md px-3 py-2 text-base border-slate-200 text-(--color-text)",
            },
        },
    });

    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: async (payload) => {
            return await TaskServices.updateTask(
                currentTaskID,
                payload.title,
                payload.description,
                new Date(payload.dueTime).toISOString(),
                payload.important,
                payload.urgent,
                payload.status
            );
        },
        onMutate: () => {
            setLoading(true);
            setShowLog(0);
        },
        onSuccess: (data) => {
            setLoading(false);
            queryClient.invalidateQueries([`team-tasks-${data.data.teamId}`]);
            setShowLog(1);
        },
        onError: () => {
            setLoading(false);
            setShowLog(-1);
        },
    });

    const onSubmit = (formData) => {
        updateMutation.mutate({
            title,
            description: editor.getHTML(),
            dueTime,
            important: formData.important,
            urgent: formData.urgent,
            status: selectedOptions?.value || task.data.data.status,

            // Bạn có thể gửi assignedUsers vào API của bạn
            assignedUsers, //Bien dung de chua cac users 
        });
    };

    useEffect(() => {
        if (task) {
            const t = task.data.data;
            setTitle(t.title);
            setDueTime(new Date(t.dueTime));
            setSelectedOptions(optionMap[t.status]);
        }
    }, [task]);

    if (isPending || isFetching || task === undefined) return <LoadingModal />;

    return (
        <WorkingLayout>
            <div className="w-full min-h-[890px] border p-6 rounded-xl border-gray-500 mb-10">
                <div className="w-full inline-flex items-center justify-end mb-3">
                    <Link to={`/app/view-task?id=${currentTaskID}`}>
                        <span className="cursor-pointer text-lg text-(--color-primary) underline font-semibold">
                            Go back
                        </span>
                    </Link>
                </div>

                <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex max-md:flex-col items-start gap-6">
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

                            {/* STATUS */}
                            <p className="mt-4 mb-1 text-(--color-text)">Status:</p>
                            <ListBox
                                selectedOption={selectedOptions}
                                setSelectedOption={setSelectedOptions}
                            />

                            {/* MULTI SELECT USERS */}
                            <UserMultiSelect
                                users={sampleUsers}
                                selectedUserIds={assignedUsers}
                                setSelectedUserIds={setAssignedUsers}
                            />

                            {/* DATE */}
                            <div className="w-full mb-4 mt-4 flex max-md:flex-col">
                                <DateInput value={dueTime} onChange={setDueTime} />
                            </div>
                        </div>
                    </div>

                    <div className="text-lg min-h-[540px] mt-6">
                        <MenuBar editor={editor} />
                        <RichTextEditor editor={editor} />
                    </div>

                    <button
                        type="submit"
                        style={{
                            pointerEvents: loading ? "none" : "auto",
                            opacity: loading ? 0.7 : 1,
                        }}
                        className="px-4 top-35 md:top-43 right-0 absolute py-3 text-white bg-(--color-primary) mt-4 font-semibold shadow-lg rounded-md"
                    >
                        {loading ? "Updating..." : "Update"}
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

import React, { useEffect, useState, useRef } from "react";
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
import AssignServies from "../services/assignServices";

const optionMap = {
    completed: { value: "completed", label: "Completed" },
    "in progress": { value: "in progress", label: "In Progress" },
    "to do": { value: "to do", label: "Not Started" },
};

// ================= UserMultiSelect =================
function UserMultiSelect({
    users,
    selectedUserIds,
    setSelectedUserIds,
    loading,
    error,
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const toggleUser = (id) => {
        setSelectedUserIds((prev) =>
            prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
        );
    };
    if (loading || !users)
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
    // Close dropdown when click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-full max-w-xs mt-4">
            <p className="mb-2 text-(--color-text)">Assign members:</p>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full h-11 px-4 bg-(--color-background-2) border border-gray-500 rounded-lg text-(--color-text) flex items-center justify-between">
                <span className="truncate">
                    {selectedUserIds.length === 0
                        ? "Select users..."
                        : `${selectedUserIds.length} selected`}
                </span>
                <span className="text-sm">▼</span>
            </button>

            {open && (
                <div className="absolute mt-1 w-full bg-(--color-background-2) z-999999 cursor-pointer border border-gray-500 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {users.map((user) => (
                        <label
                            key={user.id}
                            htmlFor={`user-${user.userID}`}
                            className="flex items-center px-3 py-2 cursor-pointer hover:bg-(--color-block-item-2)">
                            <input
                                type="checkbox"
                                id={`user-${user.userID}`}
                                checked={selectedUserIds.includes(user.userID)}
                                onChange={() => toggleUser(user.userID)}
                                className="mr-2"
                            />
                            <span className="text-(--color-text)">
                                {user.name}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

// ================= UpdateTask Component =================
function UpdateTask() {
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const currentTaskID = Number(searchParams.get("id"));
    if (!currentTaskID || isNaN(currentTaskID)) return <UrlError />;
    const [loadMemberErro , setLoadMemberError] = useState(false) 

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const formHandle = useForm({ mode: "all" });
    const { handleSubmit } = formHandle;

    const [selectedOptions, setSelectedOptions] = useState(null);
    const [dueTime, setDueTime] = useState(new Date());
    const [priority, setPriority] = useState("low");
    const [title, setTitle] = useState("Default Title");
    const [showLog, setShowLog] = useState(0);

    // State quản lý assign members
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [canAssign , setCanAssign] = useState(false) 
    const {
        data: task,
        isPending,
        isFetching,
    } = useQuery({
        queryKey: [`tasks-${currentTaskID}`, currentTaskID],
        queryFn: async () => {
            const responseData = await TaskServices.getTaskDetail(
                currentTaskID
            );
            console.log('Noi dung chi tiet cua task la: ' , responseData) 
            setCanAssign(responseData.data.canAssign)
            setAssignedUsers(responseData.data.assignIds)
            return responseData;
        },
        refetchOnWindowFocus: false 
    });

    // Lấy danh sách user của team và gán assignedUsers
    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const res = await AssignServies.getAllUserToAssignByTaskID(
                    currentTaskID 
                );
                const users = res.data.data || [];
                setAllUsers(users);
                const assigned = users
                    .filter((u) => u.assigned)
                    .map((u) => u.id);
                setAssignedUsers(assigned);

            } catch (error) {
                setLoadMemberError(true) 
                alert("Failed to fetch assign users. Please try again");
            }
        };
        fetchUsers();
    }, [currentTaskID]); // Chỉ chạy 1 lần khi taskID thay đổi

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Highlight,
            Image.configure({ allowBase64: true, resize: { enabled: true } }),
        ],
        content: "<p>Loading...</p>",
        editorProps: {
            attributes: {
                class: "w-full h-[500px] border-2 bg-(--color-background-2) overflow-y-auto rounded-md px-3 py-2 text-base border-slate-200 text-(--color-text)",
            },
        },
    });

    // Set content editor khi task load xong
    useEffect(() => {
        if (task && editor) {
            const t = task.data.data;
            setTitle(t.title);
            setDueTime(new Date(t.dueTime));
            setSelectedOptions(optionMap[t.status]);
            editor.commands.setContent(t.description);
        }
    }, [task, editor]);

    const updateMutation = useMutation({
        mutationFn: async (payload) =>
            TaskServices.updateTask(
                currentTaskID,
                payload.title,
                payload.description,
                new Date(payload.dueTime).toISOString(),
                payload.important,
                payload.urgent,
                payload.status,
                payload.assignIds
            ),
        onMutate: () => {
            setLoading(true);
            setShowLog(0);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries([`team-tasks-${data.data.teamId}`]);
            setShowLog(1);
            setLoading(false); 
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
            assignIds : assignedUsers,
        });
    };

    if (isPending || isFetching || !task) return <LoadingModal />;

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

                            <p className="mt-4 mb-1 text-(--color-text)">
                                Status:
                            </p>
                            <ListBox
                                selectedOption={selectedOptions}
                                setSelectedOption={setSelectedOptions}
                            />

                            {canAssign ? <UserMultiSelect
                                users={allUsers}
                                selectedUserIds={assignedUsers}
                                setSelectedUserIds={setAssignedUsers}
                                loading={isPending}
                                error={loadMemberErro}
                            /> : <></>}

                            <div className="w-full mb-4 mt-4 flex max-md:flex-col">
                                <DateInput
                                    value={dueTime}
                                    onChange={setDueTime}
                                />
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
                        className="px-4 top-35 md:top-43 right-0 cursor-pointer absolute py-3 text-white bg-(--color-primary) mt-4 font-semibold shadow-lg rounded-md">
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

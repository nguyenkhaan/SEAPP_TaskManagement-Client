import React, { useState } from "react";
import WorkingLayout from "../layouts/WorkingLayout";
import { Link, useNavigate } from "react-router";
import purify from "../services/purify";
import TaskServices from "../services/TaskServices";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import LoadingModal from "./LoadingModal";
import ParamServices from "../services/urlParams";
import { getStatusString } from "../services/getStatusColor";
import UrlError from "./URLError";
import MessageLog from "../components/MessageLog";
import { confirmAlert } from "react-confirm-alert";
import AssignServies from "../services/assignServices";

// ListBox cho assigned users
function AssignedUsersListBox({ assignData, isLoading }) {
    const [open, setOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="mt-4">
                <p className="text-(--color-text)">Assigned Users:</p>
                <div className="w-full h-11 flex items-center px-4 bg-(--color-background-2) border border-gray-500 rounded-lg text-(--color-text)">
                    IsLoading...
                </div>
            </div>
        );
    }

    if (!assignData || !assignData.data || assignData.data.length === 0) {
        return (
            <div className="mt-4">
                <p className="text-(--color-text)">Assigned Users:</p>
                <div className="w-full h-11 flex items-center px-4 bg-(--color-background-2) border border-gray-500 rounded-lg text-(--color-text)">
                    No users assigned
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 relative w-full max-w-xs">
            <p className="mb-2 text-(--color-text)">Assigned Users:</p>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full h-11 px-4 bg-(--color-background-2) border border-gray-500 rounded-lg text-(--color-text) flex items-center justify-between"
            >
                <span className="truncate">{assignData.data.data.length} users assigned</span>
                <span className="text-sm">▼</span>
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-(--color-background-2) border border-gray-500 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {assignData.data.data.map((user) => (
                        <div
                            key={user.id}
                            className="px-3 py-2 cursor-pointer hover:bg-(--color-background-3) text-(--color-text)"
                        >
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ViewTask() {
    const [loading, setLoading] = useState(false);
    const currentTaskID = Number(ParamServices.getID());
    if (!currentTaskID || Number.isNaN(currentTaskID)) return <UrlError />;

    const [showLog, setShowLog] = useState(0);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Lấy thông tin task
    const { data, isPending } = useQuery({
        queryKey: [`tasks-${currentTaskID}`],
        queryFn: async () => {
            const response = await TaskServices.getTaskDetail(currentTaskID);
            return response.data;
        },
        staleTime: 1000 * 60 * 8,
        gcTime: 1000 * 60 * 8,
    });

    // Lấy danh sách user assigned
    const {
        data: assignData,
        isPending: assignPending,
        error: assignError,
    } = useQuery({
        queryKey: [`tasks-assign-${currentTaskID}`],
        queryFn: async () => {
            const response = await AssignServies.getUserDoTask(currentTaskID);
            return response;
        },
        staleTime: 1000 * 60 * 8,
        gcTime: 1000 * 60 * 8,
    });

    // Mutation xóa task
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await TaskServices.deleteTask(currentTaskID);
            return res.data;
        },
        onMutate: () => {
            setLoading(true);
            setShowLog(0);
        },
        onSuccess: (resData) => {
            queryClient.invalidateQueries([`team-tasks-${1}`]);
            setShowLog(1);
            setLoading(false);
            setTimeout(() => {
                navigate(`/app/view-team?id=${data.teamId}`);
            }, 800);
        },
        onError: () => {
            setShowLog(-1);
            setLoading(false);
        },
    });

    const handleDelete = () => {
        confirmAlert({
            title: "Delete The Task",
            message: "Do you really want to delete this task?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        deleteMutation.mutate();
                    },
                },
                { label: "No", onClick: () => {} },
            ],
            overlayClassName: "bg-black",
        });
    };

    if (isPending || !data) return <LoadingModal />;

    return (
        <WorkingLayout>
            <div className="w-full h-[920px] md:border p-6 pt-14 rounded-xl border-gray-500 mb-12">
                <Link to={`/app/view-team?id=${data.teamId}`}>
                    <span
                        className="absolute cursor-pointer top-12 md:top-5 right-10 text-lg text-(--color-primary) underline font-semibold"
                        title="Go back"
                    >
                        Go back
                    </span>
                </Link>

                <div className="flex max-md:flex-col items-start gap-6">
                    <div
                        className="bg-slate-100 font-medium text-lg flex items-center justify-center rounded-xl md:w-[210px] md:h-[210px] w-40 h-40 mr-2 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url(https://img.lovepik.com/bg/20231226/Captivating-Blue-Sky-Background-with-Beautiful-Clouds_2490674_wh1200.png)",
                        }}
                    ></div>

                    <div className="flex-1">
                        <h2 className="font-semibold text-xl md:text-2xl text-(--color-text)">
                            {data.data.title}
                        </h2>

                        <p className="text-(--color-text) text-base mt-3">
                            Priority: <span>Moderate</span>
                        </p>

                        <p className="mt-3 text-(--color-text)">
                            Status:
                            <span className="text-(--color-not-started) ml-3">
                                {getStatusString(data.data.status)}
                            </span>
                        </p>

                        <p className="text-sm text-(--color-text-desc) mt-3">
                            Due to: <span>19/01/2006</span>
                        </p>

                        {/* Assigned users */}
                        <AssignedUsersListBox
                            assignData={assignData}
                            isLoading={assignPending}
                        />
                    </div>
                </div>

                <div
                    className="w-full mt-6 h-[540px] border-2 overflow-y-auto rounded-md bg-(--color-background-2) p-4 text-(--color-text)"
                    dangerouslySetInnerHTML={{ __html: purify(data.data.description) }}
                ></div>

                <div className="w-full mt-5 items-center h-6 flex justify-end gap-4 font-semibold text-white">
                    <Link
                        to={`/app/update-task?id=${currentTaskID}`}
                        style={{
                            pointerEvents: loading ? "none" : "auto",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        <div
                            className="w-9 h-9 cursor-pointer bg-(--color-primary) rounded-lg flex items-center justify-center"
                            title="Edit"
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </div>
                    </Link>

                    <div
                        className="w-9 h-9 cursor-pointer bg-(--color-primary) rounded-lg flex items-center justify-center"
                        title="Xóa task"
                        onClick={handleDelete}
                        style={{
                            pointerEvents: loading ? "none" : "auto",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>

                <MessageLog
                    setShowLog={setShowLog}
                    showLog={showLog}
                    message={
                        showLog === 1
                            ? "Xóa nhiệm vụ thành công"
                            : "Xóa nhiệm vụ thất bại"
                    }
                />
            </div>
        </WorkingLayout>
    );
}

export default ViewTask;

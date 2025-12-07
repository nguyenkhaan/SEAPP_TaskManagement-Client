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

function ViewTask() {
    const currentTaskID = Number(ParamServices.getID());
    let currentTeamId = null;
    if (!currentTaskID || Number.isNaN(currentTaskID)) return <UrlError />;

    const [showLog, setShowLog] = useState(0);

    const { data, isPending } = useQuery({
        queryKey: [`tasks-${currentTaskID}`],
        queryFn: async () => {
            const response = await TaskServices.getTaskDetail(currentTaskID);
            return response.data;
        },
        staleTime: 1000 * 60 * 8,
        gcTime: 1000 * 60 * 8,
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await TaskServices.deleteTask(currentTaskID);
            // console.log(res.data);
            return res.data; // đảm bảo có teamId
        },
        onSuccess: (resData) => {
            queryClient.invalidateQueries([`team-tasks-${1}`]);
            setShowLog(1);

            setTimeout(() => {
                navigate(`/app/view-team?id=${data.teamId}`);
            }, 1800);
        },
        onError: () => {
            setShowLog(-1);
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
                {
                    label: "No",
                    onClick: () => {}, //Khong lam gi ca
                },
            ],
            overlayClassName: "bg-black",
        });
        
    };

    // BỌC LoadingModal trong WorkingLayout để tránh React mismatch
    if (isPending || !data) {
        return <LoadingModal />;
    }

    return (
        <WorkingLayout>
            <div className="w-full h-[920px] md:border p-6 pt-14 rounded-xl border-gray-500 mb-10">
                <Link to={`/app/view-team?id=${data.teamId}`}>
                    <span
                        className="absolute cursor-pointer top-12 md:top-5 right-10 text-lg text-(--color-primary) underline font-semibold"
                        title="Quay lại">
                        Go back
                    </span>
                </Link>

                <div className="flex max-md:flex-col items-start gap-6">
                    <div
                        className="bg-slate-100 font-medium text-lg flex items-center justify-center rounded-xl md:w-[210px] md:h-[210px] w-40 h-40 mr-2 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url(https://img.lovepik.com/bg/20231226/Captivating-Blue-Sky-Background-with-Beautiful-Clouds_2490674_wh1200.png)",
                        }}></div>

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
                    </div>
                </div>

                <div
                    className="w-full mt-6 h-[540px] border-2 overflow-y-auto rounded-md bg-(--color-background-2) p-4 text-(--color-text)"
                    dangerouslySetInnerHTML={{
                        __html: purify(data.data.description),
                    }}></div>

                <div className="w-full mt-5 flex justify-end gap-4 font-semibold text-white">
                    <Link to={`/app/update-task?id=${currentTaskID}`}>
                        <div
                            className="w-9 h-9 cursor-pointer bg-(--color-primary) rounded-lg flex items-center justify-center"
                            title="Edit">
                            <i className="fa-regular fa-pen-to-square"></i>
                        </div>
                    </Link>

                    <div
                        className="w-9 h-9 cursor-pointer bg-(--color-primary) rounded-lg flex items-center justify-center"
                        title="Xóa task"
                        onClick={handleDelete}>
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

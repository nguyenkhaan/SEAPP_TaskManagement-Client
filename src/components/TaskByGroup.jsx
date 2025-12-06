import React from "react";
import ReactDOM from "react-dom";
import TaskByGroupHeader from "./TaskByGroupHeader";
import TaskOverview from "./TaskOverview";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Spinner from "./Spinner";
import TaskServices from "../services/TaskServices";
function TaskByGroup({
    width = 984,
    height = 680,
    groupTitle = "Xác suất thống kê",
    description = "",
    leaderName = "",
    viceLeaderName = "",
    teamID = "",
}) {
    const { data, isPending, error } = useQuery({
        queryKey: [`team-tasks-${teamID}`],
        queryFn: async () => {
            const responseData = await TaskServices.getTeamTask(teamID);
            console.log(responseData.data.data.tasks);
            return responseData;
        },
    });
    //lat nua tao them mot color picker o day
    if (!data || isPending) return <Spinner /> 
    return (
        <article
            className={`rounded-md md:rounded-2xl w-full flex task__group flex-col items-start justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black`}>
            <TaskByGroupHeader
                groupTitle={groupTitle}
                description={description}
                leaderName={leaderName}
                teamID={teamID}
            />
            <ul className="w-full flex-1 py-5 px-6 md:px-8 overflow-y-scroll overflow-x-hidden wrapper h-full flex flex-col items-center pb-4 md:pb-6">
                {
                    data.data.data.tasks.length == 0? 
                    <p className="italic text-lg">Chưa có nhiệm vụ nào, thêm nhiệm vụ để bắt đầu nhé.</p>
                    : 
                    (data.data.data.tasks.map((task) => {
                        return (
                            <TaskOverview
                                width={850}
                                taskTitle={task.title}
                                description={task.description}
                                important={task.important}
                                urgent={task.urgent}
                                status={task.status}
                                taskID={task.taskId}
                                dueTime={task.dueTime}
                            />
                        );
                    })) 
                }
                
                
                <li className="md:h-10 h-4"></li>
            </ul>
        </article>
    );
}
export default TaskByGroup;

////////xl:w-[970px] xl:h-[680px]

import React from "react";
import ReactDOM from "react-dom";
import { useQuery } from "@tanstack/react-query";
import TaskOverview from "../../components/TaskOverview";
import TaskServices from "../../services/TaskServices";
function TaskByGroupViewTeam({ width = "100%", height = "100%", teamID }) {
    const { data, isPending, error } = useQuery({
        queryKey: [`team-tasks-${teamID}`],
        queryFn: async () => {
            const responseData = await TaskServices.getTeamTask(teamID);
            console.log(responseData.data.data.tasks);
            return responseData;
        },
    });
    if (!data || isPending) return <> </>;
    //team-tasks-id    , team-tasks-statistic-id...
    return (
        <article
            className={`rounded-2xl flex flex-col items-start px-2 md:px-4 task__group justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black`}
            style={{ width, height }}>
            <div className="md:h-26 h-20 relative text-black flex md:flex-col max-md:px-4 md:items-start items-center justify-start md:justify-center py-2 gap-1 border-b mb-3 border-b-gray-400 w-full">
                <h2 className="md:text-[32px] text-[24px] font-medium">
                    {data.data.data.tasks.length} Tasks 
                </h2>
                <div className=" rounded-md md:rounded-lg md:h-11 md:w-11 w-9 h-9 bg-(--color-primary) flex items-center justify-center absolute text-white text-base font-medium right-4 top-5 md:top-7 md:text-xl shadow-lg cursor-pointer">
                    <i class="fa-solid fa-filter"></i>
                </div>
            </div>
            <ul className="w-full flex-1 2xl:px-3 md:px-0 overflow-y-scroll overflow-x-hidden wrapper h-full flex flex-col items-center pb-6">
                {data.data.data.tasks.map((task) => {
                    return (
                        <TaskOverview
                            urgent={task.urgent}
                            important={task.important}
                            taskTitle={task.title}
                            dueTime={task.dueTime}
                            status={task.status}                        />
                    );
                })}

                <li className="h-10"></li>
            </ul>
        </article>
    );
}
export default TaskByGroupViewTeam;

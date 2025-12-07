import React from "react";
import ReactDOM from "react-dom";
import WorkingLayout from "../layouts/WorkingLayout";
import TaskByGroup from "../components/TaskByGroup";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "./LoadingModal";
import TeamServies from "../services/teamServices";
import TaskServices from "../services/TaskServices";
function MyTask() {
    const colorHeaders = [
        "",
        "",
        "",
        "",
        "", //Khi bam vao va thay doi, se lam thay doi cai colorHeasers trong day =>
        //Cap nhat lai local Storage
    ];
    const { data, isPending, error } = useQuery({
        queryKey: ["tasks-me"],
        queryFn: async () => {
            const responseData = await TeamServies.getAllTeamInfo();
            const myData = await TaskServices.getTaskGroupByTeam() 
            console.log('Log ra tu My Tasks: ' , myData.data.data.teams) 
            return myData.data
        },
        gcTime: 8 * 1000 * 60, 
        staleTime: 8 * 1000 * 60 
    });

    if (!data || isPending) return <LoadingModal />;
    return (
        <WorkingLayout>
            <div className="w-full min-h-200 pb-20">
                {/* Header */}
                <div className="w-full flex max-md:px-6 items-center justify-between">
                    <h2 className="font-md text-[28px] md:text-[40px] text-(--color-text)">
                        My Tasks
                    </h2>
                    <div className="md:w-11 md:h-11 w-10 h-10 bg-(--color-primary) rounded-md md:rounded-lg flex items-center justify-center">
                        <i class="fa-solid fa-filter font-semibold text-white text-xl md:text-2xl"></i>
                    </div>
                </div>
                <span className="block font-md text-base max-md:px-6 md:text-xl text-(--color-text)">
                    Manage and monitor your tasks
                </span>
                <div className="flex w-full min-h-30 flex-col md:items-start items-center justify-start mt-6 gap-6 md:gap-7">
                    {data.data.teams.map((taskByGroup, index) => {
                        return (<TaskByGroup
                            width={"100%"}
                            groupTitle={taskByGroup.teamName}
                            description={taskByGroup.teamDescription}
                            leaderName={taskByGroup.leader.name}
                            teamID={taskByGroup.teamId}
                            tasks = {taskByGroup.tasks}
                        /> ) 
                    })}
                </div>
            </div>
        </WorkingLayout>
    );
}
export default MyTask;

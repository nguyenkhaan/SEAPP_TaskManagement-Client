import React, { useState } from "react";
import WorkingLayout from "../layouts/WorkingLayout";
import TaskOverview from "../components/TaskOverview";
import { Link } from "react-router";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "./LoadingModal";
import TaskServices from "../services/TaskServices";
// Demo data (chưa gọi API)
const mockTasks = [
    {
        id: 1,
        title: "Fix login API",
        important: true,
        urgent: false,
        status: "In Progress",
        dueTime: new Date("2025-01-10")
    },
    {
        id: 2,
        title: "Design Dashboard UI",
        important: false,
        urgent: true,
        status: "Not Started",
        dueTime: new Date("2025-01-15")
    },
    {
        id: 3,
        title: "Implement Search Feature",
        important: true,
        urgent: true,
        status: "Completed",
        dueTime: new Date("2025-01-05")
    }
];

function SearchTask() {
    const location = useLocation(); 
    const query = (new URLSearchParams(window.location.search).get("search-result") || '')
    const {data , isPending , error} = useQuery({
        queryKey: ['search-tasks' , query], 
        enabled: query != null, 
        queryFn: async () => {
            const responseData = await TaskServices.searchTask(query)
            // console.log(responseData.data)
            return responseData.data 
        }
    })
    useEffect(() => {
        
        console.log('Chuoi query la: ' , query) 
    } , [query])
    if (isPending || !data) return <LoadingModal /> 
    return (
        <WorkingLayout>
            <div className="w-full rounded-xl overflow-y-scroll pt-10 border min-h-screen mb-20 px-4 md:px-8">
                {/* Results Title */}
                <h3 className="md:text-3xl text-xl font-semibold mb-3">Search Results</h3>

                {/* Task list (demo) */}
                <ul className="w-full flex flex-col">
                    {data.tasks.map((task) => (
                        <TaskOverview
                            key={task.id}
                            taskID={task.id}
                            taskTitle={task.title}
                            important={task.important}
                            urgent={task.urgent}
                            status={task.status}
                            dueTime={task.dueTime}
                        />
                    ))}
                </ul>

            </div>
        </WorkingLayout>
    );
}

export default SearchTask;

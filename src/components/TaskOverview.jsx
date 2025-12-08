import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import getStatusColor, { getPriorityString } from "../services/getStatusColor";
import { getStatusString } from "../services/getStatusColor";
import { QueryClient, useMutation , useQuery, useQueryClient } from "@tanstack/react-query";
import TaskServices from "../services/TaskServices";
function TaskOverview({
    taskID = "",
    taskTitle = "Landing Page Designmm",
    important = false,
    urgent = false,
    status = "Completed",
    dueTime = new Date("18/10/2006"),
    width = 550,
    style = {},
    saved = 0, //Chuc nang danh dau co the luu
    teamID = 0 
}) {
    console.log("Log ra tu overview", status);
    const [saveHandle , setSaveHandle] = useState(false) 
    const color = getStatusColor(status);
    const queryClient = useQueryClient() 
    const saveMutation = useMutation({
        mutationFn: async () => {
            const responseData = await TaskServices.saveTask(teamID , taskID) 
            console.log(responseData)
            return responseData
        }, 
        onSuccess: () => {
            setSaveHandle(true) 
            queryClient.invalidateQueries(['tasks-me'])
        }, 
        onError: () => {

        }
    })

    const UnsaveMutation = useMutation({
        mutationFn: async () => {
            const responseData = await TaskServices.unSaveTask(taskID) 
            console.log(responseData)
            return responseData
        }, 
        onSuccess: () => {
            setSaveHandle(true) 
            queryClient.invalidateQueries(['tasks-me'])
        }, 
        onError: () => {

        }
    })
    

    const onSave = () => {
        // setSaveHandle(true) 
        saveMutation.mutate() 
    }
    const onUnsave = () => {
        UnsaveMutation.mutate() 
    }
    useEffect(() => {
        if (saveHandle) {
            const timeoutID = setTimeout(() => {
                setSaveHandle(false) 
            } , 1200)
            return () => clearTimeout(timeoutID)
        }
    } , [saveHandle])
    return (
        <article
            className="w-full"
            
            style={{ ...style }}>
            <li
                className={`w-full! rounded-2xl my-1 md:my-3 task__overview h-22 py-1 border-2 border-gray-300 flex px-2 gap-4 items-center justify-between bg-(--color-box-item)`}
                style={{
                    width: `calc(100% - 5px)`,
                }}>
                <div className="h-full flex items-center justify-center">
                    <div
                        className="rounded-full md:w-4 md:h-4 ml-2 w-3 h-3 bg-green-700"
                        style={{ backgroundColor: `var(${color})` }}></div>
                </div>
                <div className="flex-6 xl:flex-8 h-full flex justify-center flex-col">
                    <div className="w-full flex justify-between items-center">
                        <Link to={`/app/view-task?id=${taskID}`}>
                            <h3 className=" text-(--color-text) hover:underline font-medium xl:text-2xl md:text-xl text-[18px] line-clamp-1">
                                {taskTitle}
                            </h3>
                        </Link>
                        <div className="text-lg cursor-pointer text-(--color-text)">
                            {
                                saveHandle? <i class="fa-solid fa-check" title="Saved"></i> : 
                                (saved == 1 ? (
                                    <i class="fa-solid fa-floppy-disk" title="Save" onClick={onSave}></i>
                                ) : saved == -1 ? (
                                    <i class="fa-solid fa-delete-left" title="Unsave" onClick={onUnsave}></i>
                                ) : (
                                    <></>
                                ))
                            }
                        </div>
                          
                    </div>
                    <div className="flex items-center w-full text-sm md:text-sm mt-0.5 justify-between text-gray-400 gap-1">
                        <span className="text-(--color-text-desc)">
                            Priority: {getPriorityString(important, urgent)}
                        </span>
                        <span style={{ color: `var(${color})` }}>
                            Status: {getStatusString(status)}
                        </span>
                        <span className="text-(--color-desc)">
                            Due: {dueTime.toString()}
                        </span>
                    </div>
                </div>
            </li>
        </article>
    );
}
export default TaskOverview;
//xl:w-[609px] lg:w-[560px] md:w-[600px] w-[560px]

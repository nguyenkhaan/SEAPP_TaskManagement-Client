import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import getStatusColor, { getPriorityString } from "../services/getStatusColor";
import { getStatusString } from "../services/getStatusColor";
function TaskOverview({
    taskID = '', 
    taskTitle = "Landing Page Designmm",
    important = false, 
    urgent = false, 
    status = "Completed",
    dueTime = new Date('18/10/2006'), 
    width = 550, 
    style = {} 
}) {
    const color = getStatusColor(status);
    console.log('Log ra tu overview' , status) 
    return (
        <Link className="w-full" to={`/app/view-task?id=${taskID}`} style={{...style}}>
            <li
                className={`w-full! rounded-2xl my-1 md:my-3 task__overview h-22 py-1 border-2 border-gray-300 flex px-2 gap-4 items-center justify-between bg-(--color-box-item)`}
                style={{
                    width: `calc(100% - 5px)`
                }}>
                <div className="h-full flex items-center justify-center">
                    <div
                        className="rounded-full md:w-4 md:h-4 ml-2 w-3 h-3 bg-green-700"
                        style={{ backgroundColor: `var(${color})` }}></div>
                </div>
                <div className="flex-6 xl:flex-8 h-full flex justify-center flex-col">
                    <h3 className=" text-(--color-text) font-medium xl:text-2xl md:text-xl text-[18px] line-clamp-1">
                        {taskTitle}
                    </h3>
                    <div className="flex items-center w-full text-sm md:text-sm mt-0.5 justify-between text-gray-400 gap-1">
                        <span className="text-(--color-text-desc)">Priority: {getPriorityString(important , urgent)}</span>
                        <span style={{ color: `var(${color})` }}>
                            Status: {getStatusString(status)}
                        </span>
                        <span className="text-(--color-desc)">Due: {dueTime.toString()}</span>
                    </div>
                </div>
            </li>
        
        </Link>
    )
}
export default TaskOverview;
//xl:w-[609px] lg:w-[560px] md:w-[600px] w-[560px]

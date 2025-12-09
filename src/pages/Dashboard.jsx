import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import WorkingLayout from "../layouts/WorkingLayout";
import TodoTask from "./DashboardComponents/ToDoTask";
import CompletedTask from "./DashboardComponents/CompletedTask";
import TaskStatus from "./DashboardComponents/TaskStatus";
import GroupStatus from "./DashboardComponents/GroupStatus";
import LoadingModal from "./LoadingModal";
import TaskServices from "../services/TaskServices";
import Audio from "./DashboardComponents/Audio";
const lofis = [
    {
      id: 'bg-1',
      title: "Lavender Hills",
      url: "https://media.istockphoto.com/id/498425333/photo/lavender-farm-at-nabowla-tasmania-australia.jpg?s=612x612&w=0&k=20&c=_a6QP4dLxXc9Fl9bO1AKL0001p93-cFYm3iZZAlPH00="
    },
    {
      id: 'bg-2',
      title: "Rain",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsryAw11SRwU9lmsjcWueYwSuVpyKBOsh8rA&s"
    },
    {
      id: 'bg-3',
      title: "Campfire",
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Campfire_Pinecone.png"
    },
    {
      id: 'bg-4',
      title: "Beautiful World",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMkQz2Ai-xiukqtPIlLTrDk78hXQTZLOYHQ&s"
    }
  ];
  
function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const prevPage = document.referrer; //Fix bug gay ra loi lap vo ha
        if (prevPage.includes("/login") || prevPage.includes("/register"))
            setIsLoading(true);
        if (isLoading) {
            const id = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(id);
        }
    }, []);
    const [isPlaying, setIsPlaying] = useState(false);
    const musicClick = () => {
        const audio = document.getElementById("bg-audio");
        if (audio) {
            if (!isPlaying) audio.play();
            else audio.pause();
            setIsPlaying(!isPlaying);
        }
    };
    const musicDoubleClick = () => {
        const audio = document.getElementById("bg-audio");
        if (audio) {
            setIsPlaying(false);
            audio.pause();
            audio.currentTime = 0;
        }
    };
    const { data, isPending, error } = useQuery({
        queryKey: ["task-overview"],
        queryFn: async () => {
            const responseData = await TaskServices.getUserTask();
            // console.log('Log ra tu dashboard' , responseData.data)
            return responseData.data;
        },
    });
    if (!data || isPending) return <LoadingModal />;
    const currentPage = //currentPage la trang hien tai
        (
            <WorkingLayout>
                <div className="md:w-full md:h-full bg-(--color-background-1) w-screen md:mb-20 mb-8 overflow-x-hidden flex flex-col items-center justify-between">
                    <div className="w-full flex max-md:flex-col md:items-center items-start gap-3 md:gap-4 justify-between px-4 md:px-0">
                        <h2 className="font-medium text-3xl md:text-4xl text-(--color-text)">
                            Welcome back
                        </h2>
                        <div className="items-center md:justify-evenly max-md:w-full max-md:justify-between max-md:pr-2 flex gap-6">
                            <ul className="flex items-center justify-start gap-1">
                                {
                                    lofis.map((lofi) => {
                                        return <Audio id={lofi.id} title={lofi.title} url={lofi.url}  /> 
                                    })
                                }
                            </ul>
                            <button
                                className="w-[98px] h-9 bg-white text-(--color-primary) border-2 border-(--color-primary) rounded-lg cursor-pointer font-medium text-[14px]"
                                onClick={musicClick}
                                onDoubleClick={musicDoubleClick}>
                                <i class="fa-solid fa-headphones mr-2"></i>
                                Music
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 container-- border overflow-x-hidden wrapper flex max-md:flex-col items-center md:items-start xl:gap-3 md:gap-2 border-(--color-border) bg-(--color-background-1) xl:min-h-[780px] max-xl:h-[950px] h-[800px] w-full shadow-2xl md:px-1 xl:py-6  md:pb-6 max-sm:py-5">
                        <div className="flex-1 md:w-1/2 h-[720px] flex flex-col md:items-start  items-center justify-between gap-3">
                            <TodoTask todoTasks={data.data.dueToday} />
                            <CompletedTask
                                inProgressTasks={data.data.inProgress}
                            />
                        </div>
                        <div className="flex-1 max-sm:mt-3 md:w-1/2 h-[720px]  flex flex-col max-sm:w-[392px] items-start justify-between gap-3 ">
                            <TaskStatus />
                            <GroupStatus
                                recentCompletedTasks={data.data.recentCompleted}
                            />
                        </div>
                    </div>
                </div>
            </WorkingLayout>
        );

    return currentPage;
}

export default Dashboard;

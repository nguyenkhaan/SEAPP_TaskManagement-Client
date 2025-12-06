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
                <div className="md:w-full md:h-full w-screen md:mb-20 mb-8 overflow-x-hidden flex flex-col items-center justify-between">
                    <div className="w-full flex max-md:flex-col md:items-center items-start gap-3 md:gap-4 justify-between px-4 md:px-0">
                        <h2 className="font-medium text-3xl md:text-4xl text-black">
                            Welcome back
                        </h2>
                        <div className="items-center md:justify-evenly max-md:w-full max-md:justify-between max-md:pr-2 flex gap-6">
                            <ul className="flex items-center justify-start gap-1">
                                <li
                                    title="Kamen Rider Build"
                                    className="rounded-lg bg-black w-9 h-9 bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(https://i.redd.it/flv2i4x4nuce1.jpeg)`,
                                    }}></li>
                                <li
                                    title="Kamen Rider Gavv"
                                    className="rounded-lg bg-black w-9 h-9 bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(https://pm1.aminoapps.com/9472/17d9cb84a1e07834a78cc6175b3f2a77fd1aa772r1-712-596_hq.jpg)`,
                                    }}></li>
                                <li
                                    title="Kimetsu no Yaiba"
                                    className="rounded-lg bg-black w-9 h-9 bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(https://i.pinimg.com/736x/51/ed/74/51ed74680dfb6a17e0c12eaffef7f6c1.jpg)`,
                                    }}></li>
                                <li
                                    title="One Piece"
                                    className="rounded-lg bg-black w-9 h-9 bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(https://cdn-media.sforum.vn/storage/app/media/ctv_seo8/nh%C3%A2n%20v%E1%BA%ADt%20ch%C3%ADnh%20c%E1%BB%A7a%20one%20piece/nhan-vat-chinh-cua-one-piece-1.jpg)`,
                                    }}></li>
                            </ul>
                            <button className="w-[98px] h-9 bg-white text-(--color-primary) border-2 border-(--color-primary) rounded-lg cursor-pointer font-medium text-[14px]">
                                <i class="fa-solid fa-headphones mr-2"></i>
                                Music
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 container-- border overflow-x-hidden wrapper flex max-md:flex-col items-center md:items-start xl:gap-3 md:gap-2 border-gray-600 bg-[#F5F8FF] xl:min-h-[780px] max-xl:h-[950px] h-[800px] w-full shadow-2xl md:px-1 xl:py-6  md:pb-6 max-sm:py-5">
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

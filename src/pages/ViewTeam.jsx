import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import WorkingLayout from "../layouts/WorkingLayout";
import ViewTeamHeader from "./ViewTeamComponents/ViewTeamHeader";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import getStatusColor from "../services/getStatusColor";
import TaskByGroupViewTeam from "./ViewTeamComponents/TaskByGroupViewTeam";
import TeamMember from "./ViewTeamComponents/TeamMember";
import ChartViewTeam from "./ViewTeamComponents/ChartViewTeam";
import { motion } from "framer-motion";
import { Link } from "react-router";
import LoadingModal from "./LoadingModal";
import ParamServices from "../services/urlParams";
import TeamServies from "../services/teamServices";
import MessageLog from "../components/MessageLog";
import TaskServices from "../services/TaskServices";
import UrlError from "./URLError";
function ViewTeam({
    groupTitle = "Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê",
    groupDesc = "Xin chao cac ban",
    groupTasks = [], //Danh sach group Tasks
}) {
    const currentTeamID = ParamServices.getID();
    if (!currentTeamID || isNaN(currentTeamID)) return <UrlError />;
    const [showLog, setShowLog] = useState(0);
    const [isRefreshCode , setIsRefreshCode] = useState(false) 
    const [showDesc, setShowDesc] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [view, setView] = useState("group"); //Neu vut sang phai thi hien team, vuot tay sang trai thi hien lai group
    const handleDescription = () => {
        setShowDesc(!showDesc); //Toggle len lai
    };
    const handleChart = () => {
        setShowChart(!showChart);
    };

    const {
        data: teamQueryData,
        isPending: teamQueryPending,
        error: teamQueryError,
    } = useQuery({
        //Lay du lieu cua team dua tren id
        queryKey: [`team-${currentTeamID}`],
        queryFn: async () => {
            // const id = ParamServices.getID();
            const responseData = await TeamServies.getTeamInfoFromId(
                currentTeamID
            );
            // console.log(responseData)
            // console.log(responseData.data);
            return responseData; //icon, name, banner, description
            //leader -> data.data.leader (id , email , name)
            //viceLeader Mang danh sach cac memebers -> data.data.viceLeader (id , email , name)
            //members -> data.data.members (Mang , moi phan tu gom co id , email , name , avatar_url)
        },
        staleTime: 1000 * 8 * 60,
        gcTime: 1000 * 8 * 60,
    });

    const {
        data: teamTaskStatisticData,
        isPending: teamTaskStatisticPending,
        error: teamTaskStatisticError,
    } = useQuery({
        queryKey: [`team-task-stastic-${currentTeamID}`],
        queryFn: async () => {
            const responseData = await TaskServices.getTaskStatisticByTeam(
                currentTeamID
            );
            return responseData;
        },
        staleTime: 1000 * 8 * 60,
        gcTime: 1000 * 8 * 60,
    });

    //Trong day co phan GroupTaskTeam co TaskOverView, nhan vao 1 so tham so:
    //     width = 609,
    // taskTitle = 'Landing Page Design',
    // priority = 'Moderate',
    // status = 'Completed',
    // due = '18/10/2006'

    //Bat dau khai bao cac mutation cho react query
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    //Mutation cho nguoi dung roi group
    const leaveGroupMutation = useMutation({
        mutationFn: async (teamID) => {
            const responseData = await TeamServies.leaveGroup(teamID);
            return responseData;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["teams"]);
            setShowLog(1);
            setTimeout(() => {
                navigate("/app/teams");
            }, 200);
        },
    });
    const deleteTeamMutation = useMutation({
        mutationFn: async (teamID) => {
            const responseData = await TeamServies.deleteTeam(teamID);
            return responseData;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["teams"]);
            setShowLog(2);
            setTimeout(() => {
                navigate("/app/teams");
            }, 200);
        },
    });

    const touchStart = useRef(0);
    const touchEnd = useRef(0);
    const handleTouchStart = (e) => {
        touchStart.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
        touchEnd.current = e.changedTouches[0].clientX;
    };
    const handleTouch = (e) => {
        if (window.innerWidth <= 768) {
            const distance = touchStart.current - touchEnd.current;
            if (distance >= 40) setView("team-members"); //Vuot sang phai
            else if (distance <= -40) setView("group"); //Vuot sang trai
        }
    };

    //Xu li Leave Team va Edit Team
    const handleLeaveTeam = () => {
        confirmAlert({
            title: "Leave The Team",
            message: "Do you really want to leave this team?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const teamID = currentTeamID;
                        leaveGroupMutation.mutate(teamID);
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
    const handleDeleteTeam = () => {
        confirmAlert({
            title: "Delete the team",
            message: "Do you really want to delete this team?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const teamID = currentTeamID;
                        deleteTeamMutation.mutate(teamID);
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    const updateCodeMutation = useMutation({
        mutationFn: async () => {
            const responseData = await TeamServies.refreshCode(currentTeamID)
            return responseData
        }, 
        onMutate: () => {
            setIsRefreshCode(true)
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries([`team-${currentTeamID}`])
            setIsRefreshCode(false) 
        }, 
        onError: () => {} 
    })
    const handleCode = () => {
        setShowCode(!showCode)
        setIsRefreshCode(false) 
    }

    if (
        teamQueryPending ||
        !teamQueryData ||
        !teamTaskStatisticData ||
        teamTaskStatisticPending
    )
        return <LoadingModal />;

    return (
        <WorkingLayout>
            <div className="w-full h-full mb-20 ">
                {/* Header */}
                <ViewTeamHeader
                    groupTitle={teamQueryData.data.teamData.name}
                    leaderName={teamQueryData.data.leader.name}
                    iconUrl={teamQueryData.data.teamData.icon}
                    teamID={ParamServices.getID()}
                    viceLeaderName = {teamQueryData.data.viceLeader ? teamQueryData.data.viceLeader.name : null}
                />
                {/* Description */}
                <div className="flex cursor-pointer items-center mt-6 md:mt-8 text-lg md:text-xl font-md text-(--color-text-desc) justify-start gap-3">
                    {showDesc ? (
                        <i
                            class="fa-solid fa-caret-down"
                            onClick={handleDescription}></i>
                    ) : (
                        <i
                            class="fa-solid fa-caret-right"
                            onClick={handleDescription}></i>
                    )}
                    <span onClick={handleDescription}>Description</span>
                </div>
                {showDesc ? (
                    <p className="w-full text-base pl-2 md:pl-0 text-justify mt-2 text-(--color-text-desc) line-clamp-6">
                        {teamQueryData.data.teamData.description}
                    </p>
                ) : (
                    <></>
                )}

                {/* Thong ke */}
                <div className="flex cursor-pointer text-lg items-center mt-2 md:mt-4 md:text-xl font-md text-(--color-text-desc) justify-start gap-3">
                    {showChart ? (
                        <i
                            class="fa-solid fa-caret-down"
                            onClick={handleChart}></i>
                    ) : (
                        <i
                            class="fa-solid fa-caret-right"
                            onClick={handleChart}></i>
                    )}
                    <span onClick={handleChart}>Thống kê</span>
                </div>

                {showChart ? (
                    <ChartViewTeam
                        completed={
                            teamTaskStatisticData.data.data.completedPercentage
                        }
                        inProgress={
                            teamTaskStatisticData.data.data.inProgressPercentage
                        }
                        notStarted={
                            teamTaskStatisticData.data.data.toDoPercentage
                        }
                    />
                ) : (
                    <></>
                )}

                <div className="flex cursor-pointer text-lg items-center mt-2 md:mt-4 md:text-xl font-md text-(--color-text-desc) justify-start gap-3">
                    {showCode ? (
                        <i
                            class="fa-solid fa-caret-down"
                            onClick={handleCode}></i>
                    ) : (
                        <i
                            class="fa-solid fa-caret-right"
                            onClick={handleCode}></i>
                    )}
                    <span onClick={handleCode}>Team Code</span>
                </div>
                {showCode ? (
                    <div className="flex items-center jusitfy-between gap-24">
                        <span className="text-base pl-2 md:pl-0 text-justify mt-2 text-(--color-text-desc) line-clamp-6">
                            Team Code:
                            <span
                                title="Copy code"
                                className="font-bold text-lg max-sm:text-base ml-2 cursor-pointer"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        teamQueryData.data.teamData.code
                                    )
                                }>
                                {teamQueryData.data.teamData.code}
                            </span>
                        </span>
                        <button 
                            className="mt-2 rounded-md py-3 px-6 font-semibold bg-(--color-primary) text-white cursor-pointer shadow-md"
                            onClick={() => {
                                updateCodeMutation.mutate() //Tien hanh update code 
                            }}
                            style={{
                                pointerEvents: isRefreshCode ? "none" : "auto",
                                opacity: isRefreshCode ? 0.7 : 1,
                            }}
                        >
                            {isRefreshCode? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>
                ) : (
                    <></>
                )}

                {/* Hien thi so va nut tao task  */}
                <div className="w-full mt-5 rounded-md shadow-lg bg-(--color-box-item) p-6 gap-4 flex md:flex-row flex-col md:items-center items-end md:justify-between justify-center md:h-15 h-30">
                    <ul className="flex flex-2 max-md:w-full items-center justify-start gap-5 xl:gap-13 font-md md:text-lg text-base">
                        <li
                            style={{
                                color: `var(${getStatusColor("Completed")})`,
                            }}>
                            Completed:
                            {" " + (teamTaskStatisticData.data.data.compltedTasks ? teamTaskStatisticData.data.data.compltedTasks : 0)}
                        </li>
                        <li
                            style={{
                                color: `var(${getStatusColor("in progress")})`,
                            }}>
                            Progress:
                            {" " + (teamTaskStatisticData.data.data.inProgressTasks ? teamTaskStatisticData.data.data.inProgressTasks : 0)}
                        </li>
                        <li
                            style={{
                                color: `var(${getStatusColor("not started")})`,
                            }}>
                            To Do:
                            {" " + (teamTaskStatisticData.data.data.toDoTasks? teamTaskStatisticData.data.data.toDoTasks : 0)}
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <Link
                            to={`/app/create-task?id=${ParamServices.getID()}`}>
                            <button className="font-md text-white text-sm xl:text-xl rounded-md bg-(--color-primary) px-3 md:px-6 cursor-pointer shadow-lg py-3">
                                + Create Task
                            </button>
                        </Link>
                        <div className="flex items-center justify-end gap-3">
                            <Link
                                to={`/app/update-team?id=${ParamServices.getID()}`}>
                                <button
                                    title="Edit"
                                    className="md:w-11 md:h-11 h-10 w-10 shadow-md rounded-md cursor-pointer font-bold bg-white text-(--color-primary)">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </Link>
                            <button
                                className="md:w-11 md:h-11 h-10 w-10 shadow-md rounded-md cursor-pointer font-bold bg-white text-(--color-primary)"
                                onClick={handleDeleteTeam}
                                title="Delete Group">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                            <button
                                className="md:w-11 md:h-11 h-10 w-10 shadow-md rounded-md cursor-pointer font-bold bg-white text-(--color-primary)"
                                onClick={handleLeaveTeam}
                                title="Leave group">
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Phan Task Group va Team Member */}
                <div
                    className="w-full h-[730px] mt-8 overflow-hidden relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouch}
                    onTouchEnd={handleTouchEnd}>
                    <div
                        className={`flex max-md:w-[200%] h-full md:gap-10 duration-300 ease-in-out py-6 md:px-2 px-1`}
                        style={{
                            transform:
                                view === "group"
                                    ? "translateX(0)"
                                    : "translateX(-50%)",
                        }}>
                        {/* View 1: Team View */}
                        <motion.div
                            className="max-md:w-1/2 w-[614px] h-full flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}>
                            <TaskByGroupViewTeam
                                width="100%"
                                teamID={currentTeamID}
                            />
                        </motion.div>

                        {/* View 2: Team Member */}
                        <div className="max-md:w-1/2 w-[340px] h-full flex items-center justify-center">
                            <TeamMember
                                currentRole={teamQueryData.data.role}
                                leader={teamQueryData.data.leader}
                                viceLeader={teamQueryData.data.viceLeader}
                                members={teamQueryData.data.members}
                            />
                        </div>
                    </div>
                </div>
                <MessageLog
                    showLog={showLog}
                    setShowLog={setShowLog}
                    message={
                        showLog == 1
                            ? "Rời nhóm thành công"
                            : "Rời nhóm thất bại"
                    }
                />
            </div>
        </WorkingLayout>
    );
}
export default ViewTeam;

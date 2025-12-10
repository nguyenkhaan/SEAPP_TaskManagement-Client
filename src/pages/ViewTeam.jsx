import React, { useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import WorkingLayout from "../layouts/WorkingLayout";
import ViewTeamHeader from "./ViewTeamComponents/ViewTeamHeader";
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

function ViewTeam() {
    const [loading, setLoading] = useState(false);
    const currentTeamID = ParamServices.getID();
    if (!currentTeamID || isNaN(currentTeamID)) return <UrlError />;

    const [showLog, setShowLog] = useState(0);
    const [isRefreshCode, setIsRefreshCode] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [view, setView] = useState("group");

    const handleDescription = () => setShowDesc(!showDesc);
    const handleChart = () => setShowChart(!showChart);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: teamQueryData, isPending: teamQueryPending } = useQuery({
        queryKey: [`team-${currentTeamID}`],
        queryFn: async () => {
            return await TeamServies.getTeamInfoFromId(currentTeamID);
        },
        staleTime: 1000 * 8 * 60,
        gcTime: 1000 * 8 * 60,
    });

    const { data: teamTaskStatisticData, isPending: teamTaskStatisticPending } =
        useQuery({
            queryKey: [`team-task-stastic-${currentTeamID}`],
            queryFn: async () => {
                return await TaskServices.getTaskStatisticByTeam(currentTeamID);
            },
            staleTime: 1000 * 8 * 60,
            gcTime: 1000 * 8 * 60,
        });

    // ────────────────────────────────────────────────
    // MUTATION: LEAVE TEAM
    // ────────────────────────────────────────────────
    const leaveGroupMutation = useMutation({
        mutationFn: async (teamID) => await TeamServies.leaveGroup(teamID),
        onMutate: () => {
            setLoading(true);
            setShowLog(0);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["teams"]);
            setShowLog(1);
            setLoading(false);
            setTimeout(() => navigate("/app/teams"), 200);
        },
    });

    const deleteTeamMutation = useMutation({
        mutationFn: async (teamID) => await TeamServies.deleteTeam(teamID),
        onMutate: () => {
            setLoading(true);
            setShowLog(0);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["teams"]);
            setShowLog(2);
            setLoading(false);
            setTimeout(() => navigate("/app/teams"), 200);
        },
    });

    const updateCodeMutation = useMutation({
        mutationFn: async () => {
            return await TeamServies.refreshCode(currentTeamID);
        },
        onMutate: () => setIsRefreshCode(true),
        onSuccess: () => {
            queryClient.invalidateQueries([`team-${currentTeamID}`]);
            setIsRefreshCode(false);
        },
    });

    const handleLeaveTeam = () => {
        confirmAlert({
            title: "Leave The Team",
            message: "Do you really want to leave this team?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => leaveGroupMutation.mutate(currentTeamID),
                },
                { label: "No" },
            ],
        });
    };

    const handleDeleteTeam = () => {
        confirmAlert({
            title: "Delete the team",
            message: "Do you really want to delete this team?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteTeamMutation.mutate(currentTeamID),
                },
                { label: "No" },
            ],
        });
    };

    const handleCode = () => {
        setShowCode(!showCode);
        setIsRefreshCode(false);
    };

    // ────────────────────────────────────────────────
    // ⭐ MOBILE SWIPE — SIÊU MƯỢT
    // ────────────────────────────────────────────────
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const touchStartX = useRef(0);

    const handleTouchStart = (e) => {
        if (window.innerWidth > 768) return;
        touchStartX.current = e.touches[0].clientX;
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || window.innerWidth > 768) return;
        const currentX = e.touches[0].clientX;
        const delta = currentX - touchStartX.current;
        setDragX(delta);
    };

    const handleTouchEnd = () => {
        if (window.innerWidth > 768) return;

        if (dragX < -80) setView("team-members"); // Swipe left
        else if (dragX > 80) setView("group"); // Swipe right

        setIsDragging(false);
        setDragX(0);
    };

    // ────────────────────────────────────────────────

    if (
        teamQueryPending ||
        !teamQueryData ||
        !teamTaskStatisticData ||
        teamTaskStatisticPending
    )
        return <LoadingModal />;

    return (
        <WorkingLayout>
            <div className="w-full h-full mb-20">
                {/* HEADER */}
                <ViewTeamHeader
                    groupTitle={teamQueryData.data.teamData.name}
                    leaderName={teamQueryData.data.leader.name}
                    iconUrl={teamQueryData.data.teamData.icon}
                    teamID={currentTeamID}
                    viceLeaderName={
                        teamQueryData.data.viceLeader
                            ? teamQueryData.data.viceLeader.name
                            : null
                    }
                />

                {/* DESCRIPTION */}
                <div className="flex cursor-pointer items-center mt-6 md:mt-8 text-lg md:text-xl font-md text-(--color-text-desc) gap-3">
                    {showDesc ? (
                        <i
                            className="fa-solid fa-caret-down"
                            onClick={handleDescription}></i>
                    ) : (
                        <i
                            className="fa-solid fa-caret-right"
                            onClick={handleDescription}></i>
                    )}
                    <span onClick={handleDescription}>Description</span>
                </div>

                {showDesc && (
                    <p className="w-full text-base pl-2 md:pl-0 text-justify mt-2 text-(--color-text-desc)">
                        {teamQueryData.data.teamData.description}
                    </p>
                )}

                {/* CHART */}
                <div className="flex cursor-pointer text-lg items-center mt-4 md:text-xl font-md text-(--color-text-desc) gap-3">
                    {showChart ? (
                        <i
                            className="fa-solid fa-caret-down"
                            onClick={handleChart}></i>
                    ) : (
                        <i
                            className="fa-solid fa-caret-right"
                            onClick={handleChart}></i>
                    )}
                    <span onClick={handleChart}>Thống kê</span>
                </div>

                {showChart && (
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
                )}

                {/* CODE */}
                <div className="flex cursor-pointer text-lg items-center mt-4 md:text-xl font-md text-(--color-text-desc) gap-3">
                    {showCode ? (
                        <i
                            className="fa-solid fa-caret-down"
                            onClick={handleCode}></i>
                    ) : (
                        <i
                            className="fa-solid fa-caret-right"
                            onClick={handleCode}></i>
                    )}
                    <span onClick={handleCode}>Team Code</span>
                </div>

                {showCode && (
                    <div className="flex items-center gap-24">
                        <span className="text-base text-(--color-text-desc)">
                            Team Code:
                            <span
                                title="Copy code"
                                className="font-bold text-lg ml-2 cursor-pointer"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        teamQueryData.data.teamData.code
                                    )
                                }>
                                {teamQueryData.data.teamData.code}
                            </span>
                        </span>

                        <button
                            className="mt-2 rounded-md py-3 px-6 font-semibold bg-(--color-primary) text-white shadow-md"
                            onClick={() => updateCodeMutation.mutate()}
                            style={{
                                pointerEvents: isRefreshCode ? "none" : "auto",
                                opacity: isRefreshCode ? 0.7 : 1,
                            }}>
                            {isRefreshCode ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                )}

                {/* STATS */}
                <div className="w-full mt-5 rounded-md shadow-lg bg-(--color-box-item) p-6 flex justify-between md:flex-row flex-col md:items-center gap-4">
                    <ul className="flex items-center gap-5 font-md text-base md:text-lg">
                        <li
                            style={{
                                color: `var(${getStatusColor("Completed")})`,
                            }}>
                            Completed:{" "}
                            {teamTaskStatisticData.data.data.compltedTasks || 0}
                        </li>
                        <li
                            style={{
                                color: `var(${getStatusColor("in progress")})`,
                            }}>
                            Progress:{" "}
                            {teamTaskStatisticData.data.data.inProgressTasks ||
                                0}
                        </li>
                        <li
                            style={{
                                color: `var(${getStatusColor("not started")})`,
                            }}>
                            To Do:{" "}
                            {teamTaskStatisticData.data.data.toDoTasks || 0}
                        </li>
                    </ul>

                    <div className="flex items-center gap-4">
                        <Link to={`/app/create-task?id=${currentTeamID}`}>
                            <motion.button className="font-md text-white cursor-pointer text-sm xl:text-xl rounded-md bg-(--color-primary) px-6 py-3 shadow-lg"
                                initial={{scale: 1}} 
                                whileHover={{scale: 1.1}} 
                                transition={{duration: 0.3 , ease: 'easeInOut'}}
                            
                            >
                                + Create Task
                            </motion.button>
                        </Link>

                        <div className="flex items-center gap-3">
                            {teamQueryData.data.role == "leader" ||
                            teamQueryData.data.role == "vice-leader" ? (
                                <Link
                                    to={`/app/update-team?id=${currentTeamID}`}>
                                    <button
                                        title="Edit"
                                        className="md:w-11 md:h-11 w-10 h-10 shadow-md rounded-md cursor-pointer hover:opacity-70 bg-white text-(--color-primary)">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </Link>
                            ) : (
                                <></>
                            )}

                            {teamQueryData.data.role == "leader" ? (
                                <button
                                    className="md:w-11 md:h-11 w-10 h-10 shadow-md rounded-md hover:opacity-70 cursor-pointer bg-white text-(--color-primary)"
                                    onClick={handleDeleteTeam}
                                    style={{
                                        pointerEvents: loading
                                            ? "none"
                                            : "auto",
                                        opacity: loading ? 0.7 : 1,
                                    }}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            ) : (
                                <></>
                            )}

                            {teamQueryData.data.role != "leader" ? (
                                <button
                                    className="md:w-11 md:h-11 w-10 h-10 shadow-md rounded-md hover:opacity-70 cursor-pointer bg-white text-(--color-primary)"
                                    onClick={handleLeaveTeam}
                                    style={{
                                        pointerEvents: loading
                                            ? "none"
                                            : "auto",
                                        opacity: loading ? 0.7 : 1,
                                    }}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>

                {/* SWIPE VIEW */}
                <div
                    className="w-full h-[730px] mt-8 overflow-hidden relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>
                    <div
                        className="flex max-md:w-[200%] h-full md:gap-10 duration-300 ease-in-out py-6 md:px-2 px-1"
                        style={{
                            transform:
                                window.innerWidth <= 768
                                    ? `translateX(calc(${
                                          view === "group" ? "0%" : "-50%"
                                      } + ${dragX}px))`
                                    : view === "group"
                                    ? "translateX(0)"
                                    : "translateX(-50%)",
                            transition: isDragging
                                ? "none"
                                : "transform 0.25s ease-out",
                        }}>
                        <motion.div
                            className="max-md:w-1/2 w-[614px] h-full flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1 }}>
                            <TaskByGroupViewTeam
                                width="100%"
                                teamID={currentTeamID}
                            />
                        </motion.div>

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

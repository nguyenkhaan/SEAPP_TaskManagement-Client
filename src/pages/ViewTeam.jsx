import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import WorkingLayout from "../layouts/WorkingLayout";
import ViewTeamHeader from "./ViewTeamComponents/ViewTeamHeader";
import { useState } from "react"; 
import { useNavigate } from "react-router";
import { useQuery , useQueryClient , useMutation } from "@tanstack/react-query";
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
function ViewTeam({
    groupTitle = "Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê",
    groupDesc = "Xin chao cac ban",
    groupTasks = [], //Danh sach group Tasks
}) {
    const [showLog , setShowLog] = useState(0) 
    const [showDesc, setShowDesc] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [view, setView] = useState("group"); //Neu vut sang phai thi hien team, vuot tay sang trai thi hien lai group
    const handleDescription = () => {
        setShowDesc(!showDesc); //Toggle len lai
    };
    const handleChart = () => {
        setShowChart(!showChart);
    };

    const { data : teamQueryData , isPending : teamQueryPending, error : teamQueryError } = useQuery({   //Lay du lieu cua team dua tren id 
        queryKey: [`team-${ParamServices.getID()}`],
        queryFn: async () => {
            const id = ParamServices.getID();
            const responseData = await TeamServies.getTeamInfoFromId(id);
            console.log(responseData.data);
            return responseData; //icon, name, banner, description
            //leader -> data.data.leader (id , email , name) 
            //viceLeader Mang danh sach cac memebers -> data.data.viceLeader (id , email , name)
            //members -> data.data.members (Mang , moi phan tu gom co id , email , name , avatar_url) 
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
    const queryClient = useQueryClient() 
    const navigate = useNavigate() 
    //Mutation cho nguoi dung roi group 
    const leaveGroupMutation = useMutation({
        mutationFn: async (teamID) => {
            const responseData = await TeamServies.leaveGroup(teamID) 
            console.log('Log ra tu nguoi dung roi team') 
            return responseData
        }, 
        onSuccess: async (data) => {
            queryClient.invalidateQueries(['teams'])
            setShowLog(1) 
            setTimeout(() => {
                navigate('/app/teams')
            } , 200)
        }
    })


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
    if (teamQueryPending || !teamQueryData) return <LoadingModal />;

    //Xu li Leave Team va Edit Team 
    const handleLeaveTeam = () => {
        confirmAlert({
            title: 'Leave The Team', 
            message: 'Do you really want to leave this team?', 
            buttons: [
                {
                    label: 'Yes', 
                    onClick: async () => {
                        const teamID = ParamServices.getID()
                        leaveGroupMutation.mutate(teamID)  
                    }
                }, 
                {
                    label: 'No', 
                    onClick: () => {} //Khong lam gi ca 
                }
            ],
            overlayClassName: 'bg-black'
        })
    }

    
    return (
        <WorkingLayout>
            <div className="w-full h-full mb-20 ">
                {/* Header */}
                <ViewTeamHeader
                    groupTitle={teamQueryData.data.teamData.name}
                    leaderName={teamQueryData.data.leader.name}
                    iconUrl={teamQueryData.data.teamData.icon}
                    teamID={ParamServices.getID()}
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
                {showChart ? <ChartViewTeam /> : <></>}

                {/* Hien thi so va nut tao task  */}
                <div className="w-full mt-5 rounded-md shadow-lg bg-slate-100 p-6 gap-4 flex md:flex-row flex-col md:items-center items-end md:justify-between justify-center md:h-14 h-30">
                    <ul className="flex flex-2 max-md:w-full items-center justify-center md:justify-start gap-5 md:gap-16 font-md md:text-lg text-base">
                        <li
                            style={{
                                color: `var(${getStatusColor("Completed")})`,
                            }}>
                            Completed: 7
                        </li>
                        <li
                            style={{
                                color: `var(${getStatusColor("in progress")})`,
                            }}>
                            In Progress: 7
                        </li>
                        <li
                            style={{
                                color: `var(${getStatusColor("not started")})`,
                            }}>
                            Not Started: 7
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <Link to={"/app/create-task"}>
                            <button className="font-md text-white text-sm md:text-xl rounded-md bg-(--color-primary) px-3 md:px-6 cursor-pointer shadow-lg py-3">
                                + Create Task
                            </button>
                        </Link>
                        <div className="flex items-center justify-end gap-3">
                            <button className="md:w-11 md:h-11 h-10 w-10 shadow-md rounded-md cursor-pointer font-bold bg-white text-(--color-primary)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button 
                                className="md:w-11 md:h-11 h-10 w-10 shadow-md rounded-md cursor-pointer font-bold bg-white text-(--color-primary)"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                            <button 
                                className="md:w-11 md:h-11 h-10 w-10 shadow-md rounded-md cursor-pointer font-bold bg-white text-(--color-primary)"
                                onClick={handleLeaveTeam}
                            >
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
                            <TaskByGroupViewTeam width="100%" />
                        </motion.div>

                        {/* View 2: Team Member */}
                        <div className="max-md:w-1/2 w-[340px] h-full flex items-center justify-center">
                            <TeamMember currentRole = {teamQueryData.data.role} leader = {teamQueryData.data.leader} viceLeader = {teamQueryData.data.viceLeader} members = {teamQueryData.data.members} />
                        </div>
                    </div>
                </div>
                <MessageLog showLog={showLog} setShowLog={setShowLog} message={showLog == 1? 'Rời nhóm thành công' : 'Rời nhóm thất bại'} />
            </div>
        </WorkingLayout>
    );
}
export default ViewTeam;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, useNavigate } from "react-router";
import Avatar from "./Avatar";
import SidebarItem from "./SidebarItem";
import { useQuery } from "@tanstack/react-query";
import Loading from "../pages/Loading";
function WorkingSidebar() {
    // const {isPending , error , data} = useQuery({
    //     queryKey: ['user'], //Truyen key tuong ung voi cac route ben trong BE,
    //     queryFn: getUserInfo
    // })
    // if (isPending) return <Loading />    //Neu nhu con tai thi tra ve cai nay
    // useEffect(() => {
    //     getUserInfo().then(data => console.log(data))

    // } , [])

    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        {
            path: "/app/dashboard",
            title: "Dashboard",
            icon: <i class="fa-regular fa-house"></i>
        },
        {
            path: "/app/teams",
            title: "Teams",
            icon: <i class="fa-solid fa-people-group"></i>
        },
        {
            path: "/app/my-tasks",
            title: "My Tasks",
            icon: <i class="fa-solid fa-list-check"></i>
        },
        {
            path:"/app/settings",
            title: "Settings",
            icon: <i class="fa-solid fa-gear"></i>
        }
    ]

    const handleClick = (route) => {navigate(route)}

    const [showSidebar , setShowSidebar] = useState(false) 

    return (
        <aside className="w-[365px] hidden 2xl:block md:h-[868px] rounded-2xl bg-(--color-primary) fixed left-0 top-42 pt-30 shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
            <div className="top-0 -translate-y-1/4 translate-x-1/2 absolute">
                <Avatar
                    style={{ color: "white", pointerEvents: "none" }}
                />
            </div>
            <ul className="w-full flex items-center justify-between flex-col gap-2">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link to={item.path} key={index} className='w-full'>
                            <SidebarItem 
                                icon={item.icon}
                                title={item.title}
                                isActive={isActive}
                                onClick={() => handleClick(item.path)}
                            />
                        </Link>
                    );
                })}
            </ul>
        </aside>
    );
}
export default WorkingSidebar;

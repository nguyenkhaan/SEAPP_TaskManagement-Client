import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import Avatar from "./Avatar";
import SidebarItem from "./SidebarItem";
import { useQuery } from "@tanstack/react-query";
import Loading from "../pages/Loading";
import { getUserInfo } from "../services/userServices";
function WorkingSidebar() {
    // const {isPending , error , data} = useQuery({
    //     queryKey: ['user'], //Truyen key tuong ung voi cac route ben trong BE,
    //     queryFn: getUserInfo
    // })
    // if (isPending) return <Loading />    //Neu nhu con tai thi tra ve cai nay
    // useEffect(() => {
    //     getUserInfo().then(data => console.log(data))

    // } , [])

    const {isPending , data , error} = useQuery({
        queryKey: ['user'], 
        queryFn: async () => {
            const responseData = await getUserInfo() 
            console.log('Du lieu nhan duoc la: ' , responseData) 
            return responseData 
        }, 
        // staleTime: 2000, //Thoi gian lam tuoi du lieu 
        // gcTime: 2000, //Thoi gian de du lieu khonh su dung bi xoa khoi cached 
        staleTime: 1000 * 12 * 60, 
        gcTime: 1000 * 8 * 60 
        
    })
    const [showSidebar , setShowSidebar] = useState(false) 
    console.log(data) 
    if (isPending) return <Loading isLoading={true} children={<></>} /> 




    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    return (
        <div className="w-[365px] hidden 2xl:block md:h-[868px] rounded-2xl bg-(--color-primary) fixed left-0 top-42 pt-30 shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
            <div className="top-0 -translate-y-1/4 translate-x-1/2 absolute">
                <Avatar
                    style={{ color: "white", pointerEvents: "none" }}
                    name={data.name}
                    email={data.email}
                    url={data.avatar_url}
                    avatar={avatar} setAvatar={setAvatar} 
                    setPreview={setPreview} preview={preview}
                />
            </div>
            <ul className="w-full flex items-center justify-between flex-col gap-2">
                <Link to={"/app/dashboard"}>
                    <SidebarItem
                        icon={<i class="fa-regular fa-house"></i>}
                        title="Dashboard"
                    />
                </Link>
                <Link to={"/app/teams"}>
                    <SidebarItem
                        icon={<i class="fa-solid fa-people-group"></i>}
                        title="Teams"
                    />
                </Link>
                <Link to={"/app/my-tasks"}>
                    <SidebarItem
                        icon={<i class="fa-solid fa-list-check"></i>}
                        title="My Tasks"
                    />
                </Link>
                <Link to={"/app/settings"}>
                    <SidebarItem
                        icon={<i class="fa-solid fa-gear"></i>}
                        title="Settings"
                    />
                </Link>
            </ul>
        </div>
    );
}
export default WorkingSidebar;

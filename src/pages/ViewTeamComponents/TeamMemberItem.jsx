import React, { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import TeamServies from "../../services/teamServices";
import ParamServices from "../../services/urlParams";
import MessageLog from "../../components/MessageLog";
function TeamMemberItem({
    id = "",
    name = "",
    role = "Member", //Cai de hien thi len the cho nguoi dung
    avatar_url = "",
    currentRole = "member",
}) {
    console.log("Log ra tu member: ", currentRole);
    const [showMenu, setShowMenu] = useState(false);
    const [showLog, setShowLog] = useState(0);
    const menuRef = useRef();
    // Ẩn menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    //Bat dau thuc hien query Client
    const queryClient = useQueryClient();
    const leaderMutation = useMutation({
        mutationFn: async (leaderID) => {
            const teamID = ParamServices.getID();
            const responseData = await TeamServies.updateLeader(
                teamID,
                leaderID
            );
            // console.log("Thong tin cao nhat cho la: ", responseData);
            return responseData;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries([`team-${ParamServices.getID()}`]);
            setShowLog(1);
        },
        onError: () => {
            setShowLog(-1);
        },
    });

    const viceLeaderMutation = useMutation({
        mutationFn: async (viceLeaderID) => {
            const teamID = ParamServices.getID();
            const responseData = await TeamServies.updateViceLeader(
                teamID,
                viceLeaderID
            );
            // console.log("Thong tin cao nhat cho la: ", responseData);
            return responseData;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries([`team-${ParamServices.getID()}`]);

            setShowLog(1);
        },
        onError: () => {
            setShowLog(-1);
        },
    });

    const leaderClick = () => {
        leaderMutation.mutate(id);
    };
    const viceLeaderClick = () => {
        viceLeaderMutation.mutate(id);
    };
    const addLeaderPermission = () => {
        if (role != "Leader")
            return (
                <>
                    <li
                        className="px-3 py-2 hover:bg-(--color-block-item-2) cursor-pointer"
                        onClick={leaderClick}>
                        Chỉ định làm Leader
                    </li>
                </>
            );
        return <></>;
    };
    const addViceLeaderPermission = () => {
        if (role != "Vice Leader" && role != "Leader")
            return (
                <>
                    <li
                        className="px-3 py-2 hover:bg-(--color-block-item-2) cursor-pointer"
                        onClick={viceLeaderClick}>
                        Chỉ định làm Vice Leader
                    </li>
                </>
            );
        return <></>;
    };
    const permissions = () => {
        switch (currentRole) {
            case "leader": //jwt token hien tai la leader -> currentRole -> role ben trong the nay
                return (
                    <>
                        {addLeaderPermission()}
                        {addViceLeaderPermission()}
                    </>
                );
            case "vice_leader":
                return <>{addViceLeaderPermission()}</>;
            case "member":
                return (
                    <>
                        <li className="px-3 py-2 hover:bg-(--color-block-item-2) cursor-pointer">
                            Dell co quyen
                        </li>
                    </>
                );
        }
    };

    return (
        <li className="w-full shrink-0 px-3 py-4 h-[82px] bg-(--color-block-item-2) border border-(--color-border) rounded-2xl flex items-center justify-between gap-4 relative">
            {/* Avatar */}
            <div
                className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full font-md text-white bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundColor: "var(--color-primary)", // thay vì bg-(--color-primary)
                    backgroundImage: `url(${
                        avatar_url ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69Z3V7elu8UwGZHfS7lP_ii2zpEjB8DvLKm_Rq76k_XDuoSg_VC7y27g1iUYc4wl1Whc&usqp=CAU"
                    })`,
                }}
            />
            {/* Name + Role */}
            <div className="flex-1 flex flex-col items-start justify-between ml-2">
                <span className="line-clamp-1 text-(--color-text) font-md text-xl">
                    {name}
                </span>
                <span className="font-md text-base text-(--color-text)">
                    {role}
                </span>
            </div>

            {/* Dấu bar ⋮ */}
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="px-2 py-1 text-xl font-bold cursor-pointer text-(--color-text)">
                    ⋮
                </button>

                {/* Dropdown menu */}
                {showMenu && (
                    <ul
                        ref={menuRef}
                        className="absolute right-0 z-99999 top-full mt-1 w-44 bg-(--color-background-2) text-(--color-text) border shadow-lg rounded-md ">
                        {permissions()}
                    </ul>
                )}
            </div>
            <MessageLog
                showLog={showLog}
                setShowLog={setShowLog}
                message={
                    showLog == 1
                        ? "Cập nhật vai trò thành công"
                        : "Cập nhật vai trò thất bại"
                }
            />
        </li>
    );
}

export default TeamMemberItem;

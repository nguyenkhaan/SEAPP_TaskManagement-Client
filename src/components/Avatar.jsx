import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useQuery , useQueryClient , useMutation } from "@tanstack/react-query";
import UserService from "../services/userServices";
function Avatar({
    width = 86,
    height = 86,
    name = "Alexxxxxxxxxxxxxxxxxxxxxxxxxxx",
    email = "nguyenalex@gmail.comxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx sdfxxxxxxxxxxxx",
    style = {},
}) {
    const inp = useRef();
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const { data, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            //Dung de lay avatar nguoi dung
            const responseData = await UserService.getUserInfo() //Tiep tuc fix o day 
            return responseData
        },
        staleTime: 1000 * 5 * 60, 
        gcTime: 1000 * 8 * 60 ,
        refetchOnWindowFocus: false,
        retry: 5
    });

    const queryClient = useQueryClient() 

    const avatarUpdateMutation = useMutation({  //Ham dung de update avatar 
        mutationFn: async (avatarFile) => {
            UserService.updateUserAvatar(avatarFile) 
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
        },
        retry: 3,
        networkMode: "offlineFirst"
    })

    const handleAvatarClick = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setAvatar(null);
            return;
        }
        setAvatar(e.target.files[0]);   //Update lai avatar 
    };

    useEffect(() => {
        if (data) {
            setPreview(data.avatar_url) //Dat cai nay lai tro thanh user avatar hien tai 
        }
    } , [data])

    useEffect(() => {
        if (avatar) {
            const objectURL = URL.createObjectURL(avatar);
            avatarUpdateMutation.mutate(avatar) //Tien hanh update lai avatar 
            setPreview(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        }
    }, [avatar]);

    const handleClick = () => {
        inp.current.click();
    };

    // ===== NEW =====
    const stop = (e) => e.stopPropagation();
    if (isLoading) return <></>
    return (
        <div className="inline-flex flex-col justify-start items-center">
            <figure
                className={`relative bg-center bg-cover bg-no-repeat border-0 rounded-full cursor-pointer`}
                style={{
                    backgroundImage: `url(${
                        (preview? preview : 
                        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg") 
                    })`,
                    width,
                    height,
                    ...style,
                }}
                onClick={handleClick}>
                <input
                    className="w-full block h-full invisible my-avatar"
                    onChange={handleAvatarClick}
                    type="file"
                    ref={inp}
                />
            </figure>
            <div
                className="top-full cursor-text w-[173px] text-base font-semibold avatar-info"
                onClick={stop}
                style={{ ...style }}>
                <span className="text-center w-[173px] line-clamp-2 wrap-break-word overflow-hidden font-[Montserrat]">
                    {data.name}
                </span>
                <span className="text-center font-normal wrap-break-word text-[14px] line-clamp-2">
                    {data.email}
                </span>
            </div>
        </div>
    );
}

export default Avatar;

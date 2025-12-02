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
            console.log(responseData)
            return responseData
        },
        staleTime: 1000 * 5 * 60, 
        gcTime: 1000 * 8 * 60 
    });

    const queryClient = useQueryClient() 

    const avatarUpdateMutation = useMutation({  //Ham dung de update avatar 
        mutationFn: async (avatarFile) => {
            console.log('Da update avatar thanh cong') 
            UserService.updateUserAvatar(avatarFile) 
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
        }
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
            <div
                className={`relative bg-center bg-cover bg-no-repeat border-0 rounded-full cursor-pointer`}
                style={{
                    backgroundImage: `url(${
                        preview ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1ne2JlvN6c7xf6oks6n-HDHPoV7LWKkm-L3386oQQFrbMtc6sfviRkvMQgv6B3EvXAQ&usqp=CAU"
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
            </div>
            <div
                className="top-full cursor-text w-[173px] text-base font-semibold"
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

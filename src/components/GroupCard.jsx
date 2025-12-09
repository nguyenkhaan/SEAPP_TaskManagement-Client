import React from "react";

function GroupCard({
    groupTitle = "Default title Default title Default title Default title Default title",
    groupDesc = "Hoc xac suat thong ke diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii dadf",
    icon = <i className="fa-solid fa-bicycle"></i>,
}) {
    return (
        <article
            className="
            border border-[#A8A8A8] bg-(--color-secondary)
            rounded-2xl overflow-hidden w-full
            hover:shadow-lg cursor-pointer
            flex flex-col
            md:h-[223px] h-[200px]
        "
        >
            <div
                className="
                relative
                md:h-[70px] h-[60px]
                flex items-center pl-4
            "
            >
                <div className="
                    absolute top-0 left-0 w-full 
                    h-1/2 
                    bg-(--color-secondary)
                    z-0
                "></div>
                <div className="
                    absolute bottom-0 left-0 w-full 
                    h-1/2 
                    bg-(--color-block-item-2)
                    z-0
                "></div>
                <div
                    className="
                    md:size-[48px] size-[34px]
                    md:text-xl text-base
                    text-red-500 bg-white shadow-md
                    flex items-center justify-center
                    md:rounded-xl rounded-md
                    z-10
                "
                >
                    {icon}
                </div>
                <div
                    className="
                    absolute left-0 w-full
                    top-1/2 -translate-y-1/2
                    h-[2px] bg-gray-300
                    z-0
                "
                ></div>
            </div>
            <div
                className="
                bg-(--color-block-item-2)
                text-black
                flex flex-col justify-between
                md:px-4 px-2 py-0
                flex-1
            "
            >
                <div>
                    <h2
                        className="
                        text-(--color-text) font-medium line-clamp-2
                        md:text-[18px] text-[14px] font-[Montserrat]
                    "
                    >
                        {groupTitle}
                    </h2>

                    <p
                        className="
                        md:line-clamp-2 line-clamp-3
                        md:text-[12px] text-[10px] leading-tight my-1
                        text-(--color-text-desc)
                    "
                    >
                        {groupDesc}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default GroupCard;

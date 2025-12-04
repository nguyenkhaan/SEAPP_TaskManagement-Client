import React from "react";
import ReactDOM from "react-dom";
function ViewTeamHeader({
    groupTitle = "Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê",
    leaderName = "",
    iconUrl = '', 
    teamID = '' //Truyen vai ben trong va bat buoc phai
}) {
    return (
        <div className="w-full h-[180px] md:h-[220px] flex py-6 px-5 md:px-8 font-md items-center justify-between bg-(--color-primary) rounded-3xl shadow-xl gap-12">
            <div className="flex flex-2 flex-col h-full gap-3 md:gap-5 justify-between items-start text-white">
                <h2 className="md:text-[38px] text-[30px] line-clamp-2">
                    {groupTitle}
                </h2>
                <div className="flex md:w-[320px] 2-60 max-md:text-sm items-center justify-between">
                    <div>
                        <i class="fa-solid fa-user"></i>
                        <span>{leaderName}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-user"></i>
                        <span>Alice Aladin</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 md:flex items-center justify-end hidden">
                <div 
                    className="flex items-center bg-cover bg-no-repeat text-(--color-primary) text-6xl rounded-3xl bg-white justify-center h-[118px] w-[118px] shadow-xl"
                    style={{
                        backgroundImage: `url(${iconUrl})`
                    }}
                >
                    {iconUrl? <></> : <i class="fa-regular fa-cloud  "></i>} 
                </div>
            </div>
        </div>
    );
}
export default ViewTeamHeader;

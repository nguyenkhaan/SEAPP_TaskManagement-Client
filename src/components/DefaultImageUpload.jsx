import React from "react";
import ReactDOM from "react-dom";
function DefaultImageUpload() {
    return (
        <div
            className={`bg-slate-100  font-medium text-lg cursor-pointer border-dashed flex items-center justify-center  rounded-xl w-[210px] h-[210px] mr-2 bg-cover bg-center bg-no-repeat`}
            style={{
                backgroundImage: `url(https://images.stockcake.com/public/3/5/0/35000166-188c-4bbd-ac7d-0941be325558_large/sunny-cloud-filled-sky-stockcake.jpg)`,
            }}></div>
    );
}
export default DefaultImageUpload
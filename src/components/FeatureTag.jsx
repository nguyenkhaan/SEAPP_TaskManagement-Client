import React from "react";
import ReactDOM from 'react-dom';

export default function FeatureTag({
    title = 'Track all your tasks',
    desc = 'Never miss a deadline again',
    fontawesome = 'fa-solid fa-chart-area'
})
{
    return (
        <div className="flex items-center gap-5 mt-8">
            <div className="bg-(--color-block-item) size-14 rounded-xl flex items-center justify-center p-3">
                <i className={`${fontawesome} text-[30px] text-white`}></i>
            </div>
            <div className="flex flex-col">
                <h2 className="font-[Montserrat] font-medium text-[24px]">{title}</h2>
                <p className="text-[14px] -mt-1">{desc}</p>
            </div>
        </div>
    );
};
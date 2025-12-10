import React from "react";
import ReactDOM from "react-dom";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import getStatusColor from "../services/getStatusColor";
import { Link } from "react-router";
import { getStatusString, getPriorityString } from "../services/getStatusColor";
import purify from "../services/purify";
import htmlToText from "../services/htmlToText";
function GroupStatus({
    title = "Default Title",
    description = "",
    important = false,
    status = "",
    urgent = false,
    dueTime,
    taskID = "",
}) {
    const color = getStatusColor(status);
    return (
        <article className="md:w-[340px] xl:w-[402px] sm:w-[320px] relative h-[153px] md:px-8 px-6 py-2 flex overflow-hidden rounded-2xl border bg-transparent border-[#A1A3AB]">
            <div className="flex-3 flex-col flex items-start justify-between ">
                <div className="pt-3">
                    <Link to={`/app/view-task?id=${taskID}`}>
                        <h3 className="text-base line-clam-1 hover:underline text-left text-black font-[Montserrat] font-medium">
                            {title}
                        </h3>
                    </Link>
                    <p className="text-(--color-text-desc) mt-1 md:text-[14px] text-[12px] md:line-clamp-2 line-clamp-3 text-wrap w-full leading-tight">
                        {htmlToText(purify(description))}
                    </p>
                </div>
                <div>
                    <p className="md:text-[12px] text-[10px] text-(--color-text-desc)">
                        Status:
                        <span style={{ color: `var(${color})` }}>
                            {" "}
                            {getStatusString(status)}
                        </span>
                    </p>
                    <ul className="mt-2 text-[12px] text-(--color-text-desc) flex  gap-4">
                        <li>
                            <i class="fa-regular fa-calendar mr-1 font-medium"></i>
                            Created At {dueTime.toString()}
                        </li>
                        <li>
                            <i class="fa-solid fa-clipboard-check mr-1 font-medium"></i>
                            {getPriorityString(important, urgent)}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-2 flex items-center justify-end">
                <Gauge
                    width={112}
                    height={112}
                    value={100}
                    startAngle={360}
                    endAngle={0}
                    fontSize={20}
                    text={`${100}%`}
                    fontWeight={500}
                    color="black"
                    sx={(theme) => ({
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: `var(${color})`,
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: theme.palette.text.disabled,
                        },
                    })}
                />
            </div>
            <i
                class="fa-regular fa-circle top-2 left-3 font-black absolute text-[12px]"
                style={{ color: `var(${color})` }}></i>
            <i class="fa-solid fa-ellipsis text-2xl right-3 top-1 absolute text-gray-600 "></i>
        </article>
    );
}
export { GroupStatus };

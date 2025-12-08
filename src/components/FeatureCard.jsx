import React from "react";
import ReactDOM from "react-dom";
export default function FeatureCard({
  title = "Task Management",
  featureContent = "Create, organize, and track tasks with ease. Set Priorities, deadlines, and custom categories",
}) {
  return (
    <article className="rounded-[20px] bg-(--color-box-item) flex w-[404px] h-[330px] items-start justify-center gap-4 flex-col px-7 py-5 hover:shadow-lg">
      <div className="w-13 h-13 bg-(--color-primary) text-white text-base rounded-2xl flex items-center justify-center">
        <i class="fa-solid fa-cloud-showers-water"></i>
      </div>
      <h3 className="text-(--color-text) font-medium text-base md:text-xl xl:text-2xl font-[Montserrat]">
        {title}
      </h3>
      <p className="text-base md:text-[20px] text-wrap w-full text-(--color-text-desc) text-left ">
        {featureContent}
      </p>
    </article>
  );
}
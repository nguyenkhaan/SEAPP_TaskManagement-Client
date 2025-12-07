import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import WorkingNavbar from "../components/WorkingNavbar";
import WorkingSidebar from "../components/WorkingSidebar";
import ProtectedRoute from "../components/ProtectedRoute";
function WorkingLayout({ children = true }) {
    const [showSidebar , setShowSidebar] = useState(false) 
    return (
        <ProtectedRoute>
            <div className="w-screen relative pb-10">
                <WorkingNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <div className="min-w-screen">
                    <WorkingSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}  />
                    <div className="absolute w-screen xl:min-h-screen xl:w-[984px] scrollbar-none md:px-3 2xl:left-110 max-2xl:flex max-2xl:items-start max-2xl:justify-center -mt-5 xl:top-0 xl:left-42">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
export default WorkingLayout;

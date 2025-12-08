//Modal co the nhan them children o ben trong, su dung de hien thi thong tin 
import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
function WorkingModal({
    children, 
    showModal = false 
}) {
    if (!showModal) return <></>
    const handleClick = (e) => {
        e.stopPropagation()
    }
    return (
        <article
            className="top-0 bg-[rgba(0,0,0,0.7)] fixed z-999 left-0 overflow-x-hidden overflow-y-auto bottom-0 right-0 flex items-center justify-center"
            onClick={(e) => handleClick(e)}
        >
            {children}
        </article>
    );
}
export default WorkingModal;

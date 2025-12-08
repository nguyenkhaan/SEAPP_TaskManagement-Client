import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
function MessageLog({
    showLog = false, 
    message = 'Đã sao chép mã tham gia của nhóm', 
    setShowLog //Dung de dat lai showLog = false 
}) {
    if (!showLog) return <></>
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setShowLog(false) 
        } , 3000)
        return () => clearTimeout(timeoutID) 
    } , [])
    return (
        <motion.div
            className='text-white bg-[#202124] w-80 lg:w-110 flex items-center z-99999 justify-start px-4 shadow-2xl rounded-md h-12 lg:h-14 font-md fixed left-6 bottom-6 text-sm lg:text-lg'
            onClick={(e) => { e.stopPropagation() }}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ transition: 'all', ease: 'easeInOut', duration: '0.3' }}
        >{message}

        </motion.div>
    )
}
export default MessageLog
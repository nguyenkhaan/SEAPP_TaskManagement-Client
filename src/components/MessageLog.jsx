import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
function MessageLog({
    showLog = false, 
    content = 'Đã sao chép mã tham gia của nhóm' 
}) {
    if (!showLog) return <></>
    return (
        <motion.div
            className='text-white bg-[#202124] w-110 flex items-center z-99999 justify-start px-4 shadow-2xl rounded-md h-14 font-md fixed left-6 bottom-6 text-lg'
            onClick={(e) => { e.stopPropagation() }}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ transition: 'all', ease: 'easeInOut', duration: '0.3' }}
        >{content}

        </motion.div>
    )
}
export default MessageLog
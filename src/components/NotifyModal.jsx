import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.9 }
};

export default function NotifyModal({
    content = "Joined team successfully",
    isSuccess = true,
    onClose 
}) {
    // Icon và màu sắc dựa trên trạng thái
    const iconClass = isSuccess ? "fa-circle-check" : "fa-circle-exclamation";
    const iconColor = isSuccess ? "#63E6BE" : "#e63333";

    return (
        // Overlay 
        <motion.article 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm'
        >
            {/* Modal Content */}
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80 max-w-sm flex flex-col items-center gap-4"
            >
                {/* Icon */}
                <i 
                    className={`fa-solid ${iconClass} text-4xl`} 
                    style={{ color: iconColor }}
                ></i>

                {/* Text Content */}
                <p className="text-gray-700 dark:text-gray-200 text-center font-medium">
                    {content}
                </p>

                {/* Button */}
                <div className='flex items-center'>
                    <motion.button 
                        onClick={onClose} 
                        className={` flex-1 px-6 py-2 rounded-md text-white font-semibold shadow-md transition-colors cursor-pointer
                            ${isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSuccess ? "OK" : "Close"}
                    </motion.button>
                </div>
            </motion.div>
        </motion.article>
    );
}
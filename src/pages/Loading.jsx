import React from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingModal from './LoadingModal'
function Loading({
    isLoading,
    children
}) {
    return (
        <AnimatePresence mode='wait'>
            {
                isLoading ? <LoadingModal />
                    :
                    <motion.div
                        key="page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
            }
        </AnimatePresence>
    )

}
export default Loading
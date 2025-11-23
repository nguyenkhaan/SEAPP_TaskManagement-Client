import React from 'react'
import ReactDOM from 'react-dom'
import Spinner from '../components/Spinner'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
function LoadingModal() {
    return (
        <motion.div
            className='top-0 left-0 bottom-0 right-0 fixed bg-[rgba(0,0,0,0.8)] flex items-center justify-center'
            initial={{ y: '-100%', opacity: 0}}
            animate={{ y: 0,  opacity: 1 }}
            transition={{  ease: 'easeInOut', duration: '0.5' }}
            exit={{ y: '100%',  opacity: 0 }}
        >
            <Spinner position={{top: '50%', left: '50%'}} isLoading={true} />
        </motion.div>

    )
}
export default LoadingModal
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import MessageLog from './MessageLog'
import Spinner from './Spinner'  //Then loading vao ben trong 
function Modal({
  showModal,
  code
}) {
  const [copyStatus, setCopyStatus] = useState('read-text') //Trang thai read = chua copy gi 
  const [copiedText, setCopiedText] = useState(undefined)
  const handleClick = (e) => {
    e.stopPropagation()
    showModal(false)
  }
  const handleCopy = async () => {
    const text = await navigator.clipboard.writeText(code)
    setCopyStatus('write-text')

  }
  useEffect(() => {
    if (copyStatus && copyStatus === 'write-text') {
      const timeoutID = setTimeout(() => {
        setCopyStatus('read-text')
      }, 4000)
      return () => clearTimeout(timeoutID)  //Xoa timeout de tranh leak memory 
    }
  }, [copyStatus])

  return (
    <article
      className="top-0 bg-[rgba(0,0,0,0.7)] fixed z-999 left-0 overflow-x-hidden overflow-y-auto bottom-0 right-0 flex items-center justify-center"
      onClick={(e) => handleClick(e)}
    >
      <motion.div
        className="bg-slate-200 z-99999 relative rounded-3xl w-110 h-62 border border-slate-200 p-6"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ transition: "all", ease: "easeInOut", duration: 0.3 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-2xl pr-6">
          Sau đây là thông tin về cách thức tham gia
        </h2>
        <p className="text-gray-700 my-2">
          Hãy gửi mã tham gia này cho những người mà bạn muốn làm việc cùng. Bạn
          nhớ lưu lại mã code để sử dụng sau
        </p>
        <p
          className="px-3 flex items-center justify-between py-2 text-lg text-black font-md mt-4 cursor-pointer rounded-md w-full bg-gray-300"
          onClick={() => handleCopy()}
        >
          {code}
          {copyStatus === "read-text" ? (
            <i class="fa-solid fa-cloud text-lg text-gray-600"></i>
          ) : (
            <i class="fa-solid fa-check text-lg text-gray-600 font-bold"></i>
          )}
        </p>
        <i
          class="fa-solid fa-x absolute right-4 cursor-pointer hover:bg-gray-300 p-1 rounded-full text-lg top-4 text-black"
          onClick={handleClick}
        ></i>
      </motion.div>
      <MessageLog showLog={copyStatus === "write-text"} />
    </article>
  );
}
export default Modal;

import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { useState } from 'react'
import WorkingLayout from '../layouts/WorkingLayout'
import RichTextEditor from './TextEditorComponents'
import { useEditor, EditorContent } from '@tiptap/react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import StarterKit from '@tiptap/starter-kit'
import MultiEmail from './CreateTeamComponents/MultiEmail'
import { ErrorMessage } from '@hookform/error-message'
import MessageLog from '../components/MessageLog'
function CreateTeam() {
    const [emails, setEmails] = useState([])
    const [focused, setFocused] = useState(false)
    const [showLog , setShowLog] = useState(false) //Truyen nguyen cai nay vao ben trong showLog 
    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content: '<p>Hello World!</p>', // initial content
        editorProps: {
            attributes: {
                class: "text-[18px] h-47 overflow-y-scroll w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-5"
            }
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        criteriaMode: 'all',
        reValidateMode: 'onSubmit',
        mode: 'onSubmit'
    })
    const onSubmit = (data) => {
        console.log('Tu trang create team, du lieu nhan duoc la: ', data)
        console.log('Email nhan duoc la: ', emails)
        setShowLog(true) 
    }
    return (
        <WorkingLayout>
            <div className='w-full h-200'>
                <div className='w-full flex items-center justify-between'>
                    <div>
                        <h2 className='font-md text-4xl leading-[34px]'>
                            Create A New Team
                        </h2>
                        <span className='font-md text-xl block mt-3'>
                            Fill in the details below to set up your new team
                        </span>
                    </div>
                    <Link to='/teams'>
                        <motion.button
                            className='rounded-2xl font-semibold cursor-pointer text-white py-2 bg-(--color-primary) px-4 text-[18px]'
                            initial={{ opacity: 1 }}
                            whileHover={{ opacity: 0.8 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                            Back to Teams
                        </motion.button>
                    </Link>
                </div>

                <div className='border shadow-xl border-gray-400 overflow-hidden rounded-2xl mt-6 w-full min-h-120'>
                    <form id='create-team-form' className='w-full min-h-100 text-black py-7 px-5 flex flex-col justify-start gap-6' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <h3 className='font-md text-xl mb-2'>Team name</h3>
                            <input

                                className='text-[18px] h-12 w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-5' placeholder='e.g. Phoenix'

                                {...register('teamName', {
                                    required: "Vui lòng nhập thông tin cho trường này"
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name='teamName'
                                render={({ messages }) => {
                                    if (!messages) return null
                                    const msgs = ((Array.isArray(messages)) ? messages : Object.values(messages))
                                    return msgs.map((msg, index) => <p className='text-red-600 md:text-lg italic font-medium text-base'>{msg}</p>)
                                }}

                            />

                        </div>

                        <div>
                            <h3 className='font-md text-xl mb-3'>Team name</h3>
                            <EditorContent editor={editor} />
                        </div>
                        <div>
                            <h3 className='font-md text-xl mb-2'>Invite team members</h3>

                            <MultiEmail emails={emails} setEmails={setEmails} focused={focused} setFocused={setFocused} />
                            <span className='text-(--color-text-desc) font-md text-[18px] mt-2 block'>You can add more members after the team is created</span>
                        </div>
                    </form>
                    <div className='flex bg-white px-5 pt-5 pb-5 border-t border-t-gray-600 items-center justify-end gap-5 w-full h-20'>
                        <motion.button
                            className='font-md text-black cursor-pointer text-2xl bg-gray-200 rounded-2xl px-8 py-3'
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', transition: 'all' }}

                        >Cancel</motion.button>
                        <motion.button
                            className='font-md text-white cursor-pointer text-2xl bg-(--color-primary) rounded-2xl px-10 py-3'
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', transition: 'all' }}
                            type='submit'
                            form='create-team-form'
                        >Create Team</motion.button>
                    </div>
                </div>
                <MessageLog showLog={showLog} setShowLog={setShowLog} /> 
            </div>
        </WorkingLayout>
    )
}
export default CreateTeam
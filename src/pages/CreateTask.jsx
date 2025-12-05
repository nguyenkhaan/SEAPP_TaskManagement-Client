import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import WorkingLayout from '../layouts/WorkingLayout'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import RichTextEditor from './TextEditorComponents/index'
import MenuBar from './TextEditorComponents/Menubar'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import ImageUpload from './TextEditorComponents/ImageUpload'
import DefaultImageUpload from '../components/DefaultImageUpload'
import Image from '@tiptap/extension-image'
import { useForm } from 'react-hook-form'
import TitleInput from './TextEditorComponents/TitleInput'
import PriorityChoice from './TextEditorComponents/PriorityChoice'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { getCurrentDate } from '../services/getDate'
import TaskServices from '../services/TaskServices'
import DateInput from './CreateTaskComponents/DateInput'
import { useMutation , useQueryClient } from '@tanstack/react-query'
import ParamServices from '../services/urlParams'
import MessageLog from '../components/MessageLog'
function CreateTask() {

    const { day, month, year, weekDay } = getCurrentDate()
    const [data, setData] = useState({})
    const [dueTime , setDueTime] = useState(new Date()) 
    const [priority, setPriority] = useState('low')  //Dung de lua chon priority 
    const [title, setTitle] = useState('Default Title')
    const [showLog , setShowLog] = useState(0) 
    const navigate = useNavigate()
    //useForm to validation the formData 
    const formHandle = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        criteriaMode: 'all',
    })
    const { register, handleSubmit, formState: { errors } } = formHandle

    //Tiptap Editor
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-4'
                    }
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-4'
                    }
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,  //Khai bao cac extensions, co the search trong tip tap de tim cac extensions va thiet dat vao ben trong 
            Image.configure({
                allowBase64: true,
                resize: {
                    enabled: true,
                    alwaysPreserveAspectRatio: true
                }
            })
        ],
        content: '<p>Hello world</p>',
        editorProps: {
            attributes: {
                class: 'w-full h-[500px] border-2 overflow-y-auto rounded-md px-3 bg-slate-50 py-2 text-base border-slate-200  bg-white text-black outline-0'
            }
        }
    })
    
    //Tien hanh nop form 
    const teamID = ParamServices.getID() 
    const queryClient = useQueryClient() 
    const createTaskMutation = useMutation({
        mutationFn : async ({title , description , dueTime , important , urgent}) => {
            const responseData = await TaskServices.createTask(teamID , title , description , dueTime , important , urgent)
            console.log('Log ra tu create task' , responseData)
            return responseData
        }, 
        onSuccess: (data) => {
            setShowLog(1) 
            // Lat nua coi nen update lai cai cached query nao 
            queryClient.reValidateMode([`team-tasks-${teamID}`])
        },  
        onError: (data) => {
            setShowLog(-1) 
        }
    })
    const onSubmit = (data) => {
        // const formData = new FormData(); 
        // formData.append(title , )
        createTaskMutation.mutate({
            title, description: editor.getHTML() , dueTime, important: data.important , urgent: data.urgent 
        })
        
    }
    return (
        <WorkingLayout>
            <div className='w-full min-h-[890px] md:h-[890px] border p-6 2xl:pt-6 rounded-xl border-gray-500 mb-10'>
                <div className='w-full inline-flex items-center justify-end mb-3'>
                    <Link onClick={() => {
                        if (window.history.length > 1) navigate(-1)
                        else navigate('/app/dashboard')
                    }}>
                        <span
                            className="cursor-pointer text-lg text-(--color-primary) underline font-semibold"
                            onClick={() => {
                                if (window.history.length > 1) navigate(-1)
                                else navigate('/app/dashboard')
                            }}
                        >
                            Go back
                        </span>
                    </Link>
                </div>
                <form className='relative' onSubmit={handleSubmit(onSubmit)}>
                    {/* Header */}
                    <div className='flex max-md:flex-col items-start justify-start gap-6'>
                        <DefaultImageUpload /> 
                        <div className='flex-1'>
                            <TitleInput formHandle={formHandle} onTitleChange={(value) => setTitle(value)} />
                            <PriorityChoice formHandle={formHandle} onPriorityChange={value => setPriority(value)} />
                            <p className='mt-4 text-black'>Status: <span className='text-(--color-not-started)'>Not started</span></p>
                            <div className='w-full mb-4 mt-2 flex max-md:flex-col items-start xl:items-center justify-between'>
                                <DateInput value={dueTime} onChange={setDueTime} /> 
                                <p className='text-sm text-(--color-text-desc) mt-4'>Created On <span>{day}/{month}/{year}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* MainEditorLayout */}
                    <div className='text-lg min-h-[540px] md:mt-8 mt-6'>
                        {/* MenuBar */}
                        <MenuBar editor={editor} />
                        {/* RichTextEditor */}
                        <RichTextEditor editor={editor} />
                    </div>
                    <button type='submit'
                        className='px-4 top-35 md:top-43 right-0 absolute py-3 text-white bg-(--color-primary) mt-4 
                            font-semibold cursor-pointer shadow-lg rounded-md'>
                        Create Task
                    </button>
                </form>
                <MessageLog setShowLog={setShowLog} showLog={showLog} message={showLog == 1 ? 'Thêm nhiệm vụ thành công' : 'Thêm nhiệm vụ thất bại'}   /> 
            </div>
        </WorkingLayout>
    )
}
export default CreateTask
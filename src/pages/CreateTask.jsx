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
import Image from '@tiptap/extension-image'
import { useForm } from 'react-hook-form'
import TitleInput from './TextEditorComponents/TitleInput'
import PriorityChoice from './TextEditorComponents/PriorityChoice'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { getCurrentDate } from '../services/getDate'
function CreateTask() {

    const {day , month , year , weekDay} = getCurrentDate() 
    const [data, setData] = useState({})
    const [taskImage, setTaskImage] = useState(null)
    const [previewTaskImage, setPreviewTaskImage] = useState(null)
    const [priority, setPriority] = useState('low')  //Dung de lua chon priority 
    const [title, setTitle] = useState('Default Title')
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
    const onSubmit = (data) => {
        // const formData = new FormData(); 
        // formData.append(title , )
        const formData = new FormData();
        formData.append('taskTitle', title)
        formData.append('priority', priority)
        formData.append('content', editor.getHTML())
        formData.append('image', taskImage)
        formData.append('date' , {day , month , year}) //Ngay thang tao task, cai nay server tu ghi nhan cung duoc 
        console.log(formData) //Du lieu thu duoc 
    }

    return (
        <WorkingLayout>
            <div className='w-full h-[880px]  border p-6 pt-14 rounded-xl border-gray-500 mb-10'>
                <Link onClick={() => {
                    if (window.history.length > 1) navigate(-1)
                    else navigate('/')
                }}>
                <span
                    className="absolute cursor-pointer top-5 right-10 text-lg text-(--color-primary) underline font-semibold"
                    onClick={() => {
                        if (window.history.length > 1) navigate(-1)
                        else navigate('/')
                    }}
                >
                    Go back
                </span>
            </Link>
            <form className='relative' onSubmit={handleSubmit(onSubmit)}>
                {/* Header */}
                <div className='flex items-start justify-start gap-6'>
                    <ImageUpload hooks={{ taskImage, setTaskImage, previewTaskImage, setPreviewTaskImage }} />
                    <div className='flex-1'>
                        <TitleInput formHandle={formHandle} onTitleChange={(value) => setTitle(value)} />
                        <PriorityChoice formHandle={formHandle} onPriorityChange={value => setPriority(value)} />
                        <p className='mt-4 text-black'>Status: <span className='text-(--color-not-started)'>Not started</span></p>
                        <p className='text-sm text-(--color-text-desc) mt-4'>Created On <span>{day}/{month}/{year}</span></p>
                    </div>
                </div>

                {/* MainEditorLayout */}
                <div className='text-lg min-h-[540px] mt-8'>
                    {/* MenuBar */}
                    <MenuBar editor={editor} />
                    {/* RichTextEditor */}
                    <RichTextEditor editor={editor} />
                </div>
                <button type='submit'
                    className='px-4 top-40 right-0 absolute py-3 text-white bg-(--color-primary) mt-4 
                            font-semibold cursor-pointer shadow-lg rounded-md'>
                    Create Task
                </button>
            </form>
        </div>
        </WorkingLayout>
    )
}
export default CreateTask
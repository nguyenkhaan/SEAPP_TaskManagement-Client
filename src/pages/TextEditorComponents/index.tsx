import React from 'react'
import ReactDOM from 'react-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import { Editor } from '@tiptap/react'


interface TextEditor {
    editor: Editor | null 
}

function RichTextEditor({ editor } : TextEditor)
{
    return (
        <EditorContent editor={editor} /> 
    )
}
export default RichTextEditor
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify, 
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  
} from "lucide-react";
import { Toggle } from "../../components/ui/toggle";
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/react'

interface TextEditor {
    editor: Editor | null 
}

function MenuBar({ editor } : TextEditor) 
{
    if (!editor) return null 

 const Options = [
    {
      icon: <Heading1 className="size-6" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-6" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-6" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-6" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-6" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
        icon: <Underline className="size-6" />, 
        onClick: () => editor.chain().focus().toggleUnderline().run(), 
        preesed: editor.isActive("underline"), 
    }, 
    {
      icon: <Strikethrough className="size-6" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-6" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-6" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-6" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
        icon: <AlignJustify className="size-6" />, 
        onClick: () => editor.chain().focus().setTextAlign("align").run(), 
        pressed: editor.isActive({textAlign: "justify"}), 
    }, 
    {
      icon: <List className="size-6" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-6" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-6" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];

    return (
        <div className="w-full border-2 border-slate-200 rounded-md space-x-3 p-1 mb-1 z-50">
            {
                Options.map((option , index) => {
                    return <Toggle key={index} onPressedChange={option.onClick} pressed={true}>{option.icon}</Toggle>
                })
            }
        </div>
    )
}
export default MenuBar
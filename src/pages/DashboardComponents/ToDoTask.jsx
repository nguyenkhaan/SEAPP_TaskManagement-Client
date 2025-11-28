import React from 'react'
import ReactDOM from 'react-dom'
import ToDoItem from './ToDoItem'
import TaskLayout from './TaskLayout'
function TodoTask() {
    return (
        <TaskLayout showDay={true} >
            <div className='w-full flex flex-col overflow-x-hidden items-center justify-start gap-3 overflow-y-hidden'>
                <ToDoItem caption='Not started'/>
                <ToDoItem caption='Completed'/>
            </div>        
        </TaskLayout>
    )
}
export default TodoTask
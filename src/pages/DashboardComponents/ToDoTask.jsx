import React from 'react'
import ReactDOM from 'react-dom'
import ToDoItem from './ToDoItem'
import TaskLayout from './TaskLayout'
function TodoTask() {
    return (
        <TaskLayout showDay={true} styles={{width: 'full' , height: '450px'}}>
            <div className='w-full flex flex-col items-center justify-start gap-3 overflow-y-hidden'>
                <ToDoItem caption='Not started'/>
                <ToDoItem caption='Completed'/>
            </div>        
        </TaskLayout>
    )
}
export default TodoTask
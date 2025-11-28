import React from 'react'
import ReactDOM from 'react-dom'
import TaskLayout from './TaskLayout'
import ToDoItem from './ToDoItem'
function CompletedTask() {
    return (
        <TaskLayout title='Compledted Task' styles={{ width: 'full', flex: 1 }}>
            <div className='w-full flex flex-col items-center flex-1 justify-start gap-3 overflow-y-hidden'>
                <ToDoItem caption='Completed' />
            </div>
        </TaskLayout>
    )
}
export default CompletedTask
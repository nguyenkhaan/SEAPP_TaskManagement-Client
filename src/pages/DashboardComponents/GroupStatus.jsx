import React from 'react'
import ReactDOM from 'react-dom'
import TaskLayout from './TaskLayout'
import { GroupStatus as Item } from '../../components/GroupStatus'
function GroupStatus()
{
    return (
        <TaskLayout styles={{ flex: 1 , width: '100%'}} title='Group Status'>
             <div className='w-full items-center flex flex-col gap-3 justify-start overflow-y-hidden'>
                <Item title='Tỏ tình' caption='Completed' statusValue={100} /> 
                <Item title='Đi chơi' caption='In progress' statusValue={30}/> 
             </div>
        </TaskLayout>
    )
}
export default GroupStatus
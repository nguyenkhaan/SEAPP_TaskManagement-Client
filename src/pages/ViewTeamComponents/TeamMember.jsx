import React from 'react'
import ReactDOM from 'react-dom'
import TeamMemberItem from './TeamMemberItem'
function TeamMember({
    width = '100%',
    height = '100%'
}) {
    return (
        <article className={`rounded-2xl flex gap-2 flex-col pb-6 items-start px-3 justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black bg-white`} style={{ width, height }}>

            <div className='h-26 relative text-black flex items-center justify-between py-2 gap-1 border-b mb-3 border-b-gray-400 w-full px-2'>
                <h2 className='text-[24px] font-medium'>Team Members</h2>
                <span className=''><i class="fa-regular fa-user"></i> 12</span>
            </div>
            <ul className='w-full h-[520px] px-2 gap-3 py-3 overflow-y-scroll overflow-x-hidden wrapper flex flex-col pb-6'>
                <TeamMemberItem />
                <TeamMemberItem />
                <TeamMemberItem />
                <TeamMemberItem />
                <TeamMemberItem />
            </ul>
            <div className='px-2 w-full'>
                <button className='w-full h-[62px] rounded-md border-2 font-md text-(--color-primary) border-dashed font-semibold text-2xl border-(--color-primary) cursor-pointer'>
                    + Add Member
                </button>

            </div>
        </article>

    )
}
export default TeamMember
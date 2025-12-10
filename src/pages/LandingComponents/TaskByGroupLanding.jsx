import React from 'react'
import TaskByGroupLandingHeader from './TaskByGroupLandingHeader'
import TaskOverview from '../../components/TaskOverview'

function TaskByGroupLanding() {
    return (
        <article
            className="
                w-full 
                max-w-[400px]
                xl:max-w-[670px] xl:h-[520px]
                lg:max-w-[620px] lg:h-[480px]
                md:max-w-[670px] md:h-[500px]
                h-[500px]
                mx-auto
                lg:mt-0 md:mt-5 mt-3
                rounded-2xl 
                flex flex-col items-start
                xl:px-7 lg:px-6 md:px-7 px-3
                justify-between 
                shadow-[0_0_15px_rgba(0,0,0,0.3)]
                text-(--color-text) 
                bg-(--color-background-2)
            "
        >
            <TaskByGroupLandingHeader />

            <ul
                className="
                    w-full flex-1 
                    lg:py-3 py-2 
                    overflow-y-scroll overflow-x-hidden
                    flex flex-col items-center 
                    pb-6
                "
            >
                {/* LIST ITEMS — RESPONSIVE WIDTH FIX */}
                {Array.from({ length: 10 }).map((_, index) => (
                    <TaskOverview
                        key={index}
                        width="100%"
                        maxWidth={609}
                        style={{
                            pointerEvents: 'none',
                            cursor: 'pointer'
                        }}
                        dueTime={'2/12/2025'}
                    />
                ))}

                <li className='h-10'></li>
            </ul>
        </article>
    )
}

export default TaskByGroupLanding

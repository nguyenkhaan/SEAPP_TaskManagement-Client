import React from "react";
import ReactDOM from "react-dom";
import TaskLayout from "./TaskLayout";
import { GroupStatus as Item } from "../../components/GroupStatus";
import { Link } from "react-router";
import { motion } from "framer-motion";
import DefaultImageUpload from "../../components/DefaultImageUpload";
//Viet cho recent completed
function GroupStatus({ recentCompletedTasks = [] }) {
    return (
        <TaskLayout
            styles={{ flex: 1, width: "100%" }}
            title="Recent Completed">
            <div className="w-full items-center flex flex-col overflow-x-hidden gap-3 justify-start overflow-y-hidden">
                {recentCompletedTasks.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-between gap-6">
                        <p className="italic w-full text-center top-1/2 text-base">
                            🎉 You don't have anything today 🎉
                        </p>

                        {/* IMAGE WITH HOVER EFFECT */}
                        <motion.div
                            whileHover={{
                                rotate: [0, 3, -3, 1, -1, 0],
                                transition: { duration: 0.4 },
                            }}>
                            <DefaultImageUpload url="https://img.wattpad.com/58a741e9b25769362fa5bca942ab30b5108731d4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f636d4d73456c43594361557859413d3d2d313332373531383934392e313737336564313834333162633366323333303136343137323838352e676966" />
                        </motion.div>

                        <Link to={"/app/my-tasks"}>
                            <motion.button
                                className="px-6 py-3 rounded-md text-white md:text-base max-sm:text-sm font-bold bg-(--color-primary) cursor-pointer"
                                whileHover={{
                                    scale: 1.06,
                                    boxShadow:
                                        "0px 8px 20px rgba(0, 0, 0, 0.25)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 12,
                                }}>
                                Your Tasks
                            </motion.button>
                        </Link>
                    </div>
                ) : (
                    recentCompletedTasks.map((task) => {
                        return (
                            <Item
                                important={task.important}
                                urgent={task.urgent}
                                dueTime={task.dueTime.toString()}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                taskID={task.taskId}
                            />
                        );
                    })
                )}
            </div>
        </TaskLayout>
    );
}
export default GroupStatus;
{
    /* <Item title='Tỏ tình' caption='Completed' statusValue={100} /> 
<Item title='Đi chơi' caption='In progress' statusValue={30}/>  */
}

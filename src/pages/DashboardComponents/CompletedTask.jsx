import React from "react";
import ReactDOM from "react-dom";
import TaskLayout from "./TaskLayout";
import ToDoItem from "./ToDoItem";
import { Link } from "react-router";
import { motion } from "framer-motion";
function CompletedTask({ inProgressTasks = [] }) {
    return (
        <TaskLayout title="In Progress Tasks" styles={{ width: "full", flex: 1 }}>
            <div className="w-full flex flex-col items-center flex-1 justify-start gap-3 overflow-y-hidden">
                {inProgressTasks.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-between gap-6">
                        <p className="italic w-full text-center top-1/2 text-base text-(--color-text)">
                        𐔌՞. .՞𐦯 You don't have any tasks in progress  𐔌՞. .՞𐦯
                        </p>
                        <Link to={"/app/teams"}>
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
                                Your Teams
                            </motion.button>
                        </Link>
                    </div>
                ) : (
                    inProgressTasks.map((task) => {
                        return (
                            <ToDoItem
                                important={task.important}
                                urgent={task.urgent}
                                dueTime={task.dueTime.toString()}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                            />
                        );
                    })
                )}
            </div>
        </TaskLayout>
    );
}
export default CompletedTask;

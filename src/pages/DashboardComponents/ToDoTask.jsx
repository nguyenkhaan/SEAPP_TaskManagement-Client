import React from "react";
import ToDoItem from "./ToDoItem";
import TaskLayout from "./TaskLayout";
import DefaultImageUpload from "../../components/DefaultImageUpload";
import { motion } from "framer-motion";
import { Link } from "react-router";
function TodoTask({ todoTasks = [] }) {
    return (
        <TaskLayout showDay={true}>
            <div className="w-full flex flex-col min-h-98 overflow-x-hidden shrink-0 items-center justify-start gap-3 overflow-y-hidden">
                {todoTasks.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-between gap-6">
                        <p className="italic w-full text-center top-1/2 text-base text-(--color-text)">
                            🎉 You don't have anything today 🎉
                        </p>

                        {/* IMAGE WITH HOVER EFFECT */}
                        <motion.div
                            whileHover={{ scale: 1.07, rotate: 1 }}
                            transition={{
                                type: "spring",
                                damping: 10,
                                stiffness: 150,
                            }}>
                            <DefaultImageUpload url="https://i.pinimg.com/originals/97/ae/28/97ae288bc10481a0152460e9a3c5faeb.gif" />
                        </motion.div>

                        <p className="italic w-full text-center top-1/2 text-base text-(--color-text)">
                            Join A Team To Started
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
                    todoTasks.map((todo) => {
                        return (
                            <ToDoItem
                                important={todo.important}
                                urgent={todo.urgent}
                                dueTime={todo.dueTime.toString()}
                                title={todo.title}
                                description={todo.description}
                                status={todo.status}
                                taskID = {todo.taskId}
                            />
                        );
                    })
                )}
            </div>
        </TaskLayout>
    );
}

export default TodoTask;

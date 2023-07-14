/* eslint-disable react-hooks/exhaustive-deps */
import TaskCard from "../Components/TaskCard";
import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
export default function TaskPage () {
  const { tasks, loadTasks } = useTasks()

  useEffect(() => {
    loadTasks()
  }, [])

  function renderMain () {
    if (tasks.length === 0) return <h1>No tasks yet</h1>

    return tasks.map(task => <TaskCard key={task.id} task={task} />)
  }

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center">Tasks</h1>
      <div className="grid  grid-cols-3 gap-2 mt-8">
        {renderMain()}
      </div>
    </div>
  )
}
import { useTasks } from "../context/TaskContext"
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
export default function TaskCard ({ task }) {
  const { deleteTask, toogleTaskDone } = useTasks()
  const navigate = useNavigate()

  const handleDone = async () => {
    await toogleTaskDone(task.id)
  }

  return (
    <div className="bg-slate-300 border rounded p-4">
      <header className="flex justify-between">
      <h2 className="text-sm font-bold">{task.title}</h2>
      <span>{task.done == 1 ? '✅' : '❌'}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span>{task.createAt}</span>
      <div className="flex gap-x-1" >
      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteTask(task.id)}>Delete</button>
      <button  className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
      <button   className="bg-black text-white px-2 py-1 rounded" onClick={handleDone}>{task.done == 1 ? 'Unfinished' : 'Done'}</button>
      </div>
    </div>
  )
}

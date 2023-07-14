/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  toogleTaskDoneRequest,
  updateTaskRequest
} from '../api/tasks.api'

export const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context)
    throw new Error('useTasks must be used within a TaskContextProvider')
  return context
}

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const result = await getTasksRequest()
    setTasks(result.data)
  }

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const createTask = async task => {
    try {
      const response = await createTaskRequest(task)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const getTask = async id => {
    try {
      const response = await getTaskRequest(id)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async id => {
    try {
      await deleteTaskRequest(id)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const toogleTaskDone = async id => {
    try {
      const taskFound = tasks.find(task => task.id === id)
      await toogleTaskDoneRequest(id, taskFound.done === false ? true : false)
      setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toogleTaskDone
      }}>
      {children}
    </TaskContext.Provider>
  )
}

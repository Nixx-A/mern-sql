/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik, } from 'formik'
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function TaskForm () {
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const { id } = useParams()

  const [task, setTask] = useState({
    title: "",
    description: ""
  })



  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const task = await getTask(id)
        setTask({
          title: task.title,
          description: task.description
        })
      }
    }
    loadTask()
  }, [])

  return (
    <div className=''>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log(values);

          if (id) {
            await updateTask(id, values)
          } else {
            await createTask(values)
          }
          navigate('/')
          setTask({ title: '', description: '' })
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className='bg-slate-300 max-w-sm rounded-sm p-4 mx-auto mt-10'>
            <h1 className=' text-xl font-bold uppercase text-center'>{id ? 'Edit Task' : 'Add Task'}</h1>
            <label className='block'>title</label>
            <input
              className='px-2 py-1 rounded-sm w-full'
              type='text'
              onChange={handleChange}
              name='title'
              placeholder='Write a title'
              value={values.title}
            />

            <label className='block'>description</label>
            <textarea
              className='px-2 py-1 rounded-sm w-full'
              name='description'
              onChange={handleChange}
              rows='3'
              placeholder='Write a description'
              value={values.description}
            />

            <button className='bg-indigo-500 px-2 py-2 text-white w-full rounded-md block' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik >
    </div>
  )
}

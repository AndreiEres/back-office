import React from 'react'
import { AKUMA_TASKS_URL, AKUMA_TASK_SUGGESTION_URL } from './constants'
import { Task } from './types'

const getFromApi = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error()

  return await res.json()
}

const getAllTasks = async (): Promise<Task[]> =>
  await getFromApi(AKUMA_TASKS_URL)

const getSuggestion = async (): Promise<Task> =>
  await getFromApi(AKUMA_TASK_SUGGESTION_URL)

const onError = (error: Error) => console.error(error.message)

const TaskItem: React.FC<{ task: Task }> = ({ task }) => (
  <div className='d-flex align-items-center rounded border mb-1 py-1 px-2'>
    <span className='badge rounded-pill bg-secondary mr-2'>{task.status}</span>
    {task.title}
  </div>
)

const App: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [suggestion, setSuggestion] = React.useState<Task>()

  const suggestTask = () => {
    getSuggestion().then(setSuggestion).catch(onError)
  }

  React.useEffect(() => {
    getAllTasks().then(setTasks).catch(onError)
  }, [])

  return (
    <div className='mt-2 mx-auto' style={{ maxWidth: 500 }}>
      <h1>Back Office</h1>

      <section className='mt-4 py-2 border-top'>
        <h2>Tasks</h2>
        {tasks.map((task, idx) => (
          <TaskItem key={idx} task={task} />
        ))}
      </section>

      <section className='mt-4 py-2 border-top'>
        <h2 className='d-flex align-items-center justify-content-between'>
          Task suggestion
          <button
            type='button'
            className='btn btn-primary btn-sm'
            onClick={suggestTask}
          >
            Get
          </button>
        </h2>
        <div className='mt-3'>
          {suggestion && <TaskItem task={suggestion} />}
        </div>
      </section>
    </div>
  )
}

export default App

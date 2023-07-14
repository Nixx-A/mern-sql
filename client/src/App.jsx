import { Route, Routes } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./Components/Navbar";
import { TaskContextProvider } from "./context/TaskContext";

export default function App () {
  return (
    <main className="bg-zinc-900 h-screen">
        <Navbar />
      <div className="container mx-auto py-4 px-20">
      <TaskContextProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<TaskPage />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </TaskContextProvider>
      </div>
    </main>
  )
}

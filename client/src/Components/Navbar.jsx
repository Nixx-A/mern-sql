import { Link } from "react-router-dom";

export default function Navbar () {
  return (
    <div className="bg-zinc-700 flex justify-between px-20 py-4">

      <Link to={'/'}>
        <h1 className="text-white font-bold hover:text-gray-400 duration-150">React MySQL</h1>
      </Link>

      <ul className="flex gap-x-3">
        <li>
          <Link className="text-white hover:text-gray-400 duration-150" to={'/'}>Home</Link>
        </li>
        <li>
          <Link className="text-white hover:text-gray-400 duration-150" to={'/new'}>Create Task</Link>
        </li>
      </ul>
    </div>

  )
}

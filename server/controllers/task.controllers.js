import { pool } from '../db.js'

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM tasks ORDER BY createAt ASC'
    )
    res.json(result)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?', [
      req.params.id
    ])

    if (result.length === 0) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(result[0])
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body
    console.log(title, description)
    const [result] = await pool.query(
      'INSERT INTO tasks(title, description) VALUES (?, ?)',
      [title, description]
    )
    console.log(result)

    res.json({
      id: result.insertId,
      title,
      description
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE tasks SET ? WHERE id = ?', [
      req.body,
      req.params.id
    ])
    res.send(result)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE ID = ?', [
      req.params.id
    ])

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Task not found' })

    res.sendStatus(204)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

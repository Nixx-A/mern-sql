import express from 'express'
import { PORT } from './config.js';
import { dirname, join } from 'path'
import { fileURLToPath } from "url";
import indexRoutes from './routes/index.routes.js'
import tasksRoutes from "./routes/task.routes.js";
import cors from "cors";

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname);

app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use(tasksRoutes)

app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT)
console.log(`listening on port ${PORT}`);
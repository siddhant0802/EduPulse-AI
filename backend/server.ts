import { app } from './app'
import { connectDB, env } from './config'

async function startServer() {
  await connectDB()

  app.listen(Number(env.port), () => {
    console.log(`API running on http://localhost:${env.port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start API', error)
  process.exit(1)
})

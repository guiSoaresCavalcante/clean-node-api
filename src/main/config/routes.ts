import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesPath = path.join(__dirname, '..', 'routes')

  readdirSync(routesPath).forEach(async file => {
    if (!file.includes('.test.') && !file.includes('.map')) {
      const filePath = path.join(routesPath, file)
      const module = await import(filePath)
      module.default(router)
    }
  })
}

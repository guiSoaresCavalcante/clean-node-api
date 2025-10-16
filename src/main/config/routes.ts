import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  // poderiamos repassar o app para criarmos as rotas, mas iremos fazer isso de
  // forma mais pratica usando a lib fast-glob. Ela ira olhar todos os arquivos
  // com o padrão informado e fara os imports
  fg.sync('**/src/main/routes/**routes.ts').map(async file => (await import(`../../../${file}`)).default(router))
}

import { Request, Response, NextFunction } from 'express'

// por default o express so funciona para requisicoes no mesmo servidor que esta
// nossa api. Para fazer requisicoes pro outro servidor e necessario configurar o cors

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  next()
}

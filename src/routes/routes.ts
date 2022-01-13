import { Express, Request, Response } from 'express';

import userRoutes from './user.routes'
import sessionRoutes from './session.routes'
import productRoutes from './product.routes'

function routes(app: Express) {
  app.get("/", (req:Request, res:Response) => {
    res.send( "Hello mfuckerssss..")
  })

  app.use('/api/v1/users',userRoutes)
  app.use('/api/v1/sessions',sessionRoutes)
  app.use('/api/v1/products',productRoutes)

}

export default routes;

/*
higher order function to wrap our handlers and make its own handler
checking the cookie and mandating that you sent it and decoding jwt to get the user id and access that id in the database
if all works out we call the original handler
*/

import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.MP_ACCESS_TOKEN

    if (token) {
      let user

      try {
        const { id } = jwt.verify(token, 'hello')
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('No User Found')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorized' })
        return
      }
      return handler(req, res, user)
    }
    res.status(401)
    res.json({ error: 'Not Authorized' })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello')
  return user
}

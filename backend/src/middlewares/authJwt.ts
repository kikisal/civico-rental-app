import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import * as movininTypes from ':movinin-types'
import * as env from '../config/env.config'
import * as helper from '../utils/helper'
import * as authHelper from '../utils/authHelper'
import * as logger from '../utils/logger'
import User from '../models/User'

/**
 * Verify authentication token middleware.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token: string
  const isAdmin = authHelper.isAdmin(req)
  const isFrontend = authHelper.isFrontend(req)

  
  const adminCookieName = env.FRONTEND_AUTH_COOKIE_NAME; // env.ADMIN_AUTH_COOKIE_NAME

  if (isAdmin) {
    token = req.signedCookies[adminCookieName] as string // admin
  } else if (isFrontend) {
    token = req.signedCookies[env.FRONTEND_AUTH_COOKIE_NAME] as string // frontend
  } else {
    token = req.headers[env.X_ACCESS_TOKEN] as string // mobile app and unit tests
  }

  if (token) {
    // Check token
    try {
      const sessionData = await authHelper.decryptJWT(token)
      const $match: mongoose.FilterQuery<movininTypes.User> = {
        $and: [
          { _id: sessionData?.id },
          // { blacklisted: false },
        ],
      }

      if (isAdmin) {
        // $match.$and?.push({ type: { $in: [movininTypes.UserType.Admin, movininTypes.UserType.Agency] } })
      } else if (isFrontend) {
        // $match.$and?.push({ type: movininTypes.UserType.User })
      }

      if (
        !sessionData
        || !helper.isValidObjectId(sessionData.id)
        || !(await User.exists($match))
      ) {
        // Token not valid!
        logger.info('Token not valid: User not found')
        res.status(401).send({ message: 'Unauthorized!' })
      } else {
        // Token valid!
        next()
      }
    } catch (err) {
      // Token not valid!
      logger.info('Token not valid', err)
      res.status(401).send({ message: 'Unauthorized!' })
    }
  } else {
    // Token not found!
    res.status(403).send({ message: 'No token provided!' })
  }
}

export default { verifyToken }

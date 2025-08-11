import path from 'node:path'
import asyncFs from 'node:fs/promises'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import escapeStringRegexp from 'escape-string-regexp'
import mongoose from 'mongoose'
import { CookieOptions, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import axios from 'axios'
import * as movininTypes from ':movinin-types'
import i18n from '../lang/i18n'
import * as env from '../config/env.config'
import User from '../models/User'
import Booking from '../models/Booking'
import Token from '../models/Token'
import PushToken from '../models/PushToken'
import * as helper from '../utils/helper'
import * as authHelper from '../utils/authHelper'
import * as mailHelper from '../utils/mailHelper'
import NotificationCounter from '../models/NotificationCounter'
import Notification from '../models/Notification'
import Property from '../models/Property'
import * as logger from '../utils/logger'

/**
 * Get status message as HTML.
 *
 * @param {string} lang
 * @param {string} msg
 * @returns {string}
 */
const getStatusMessage = (lang: string, msg: string): string => `<!DOCTYPE html><html lang="' ${lang}'"><head></head><body><p>${msg}</p></body></html>`

/**
 * Sign Up.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {movininTypes.UserType} userType
 * @returns {unknown}
 */
const _signup = async (req: Request, res: Response, userType: movininTypes.UserType) => {
  const { body }: { body: movininTypes.SignUpPayload } = req

  //
  // Create user
  //
  let user: env.User
  try {
    body.email = helper.trim(body.email, ' ')
    body.active = true
    body.verified = false
    body.blacklisted = false
    body.type = userType

    const { password } = body
    const passwordHash = await authHelper.hashPassword(password)
    body.password = passwordHash

    user = new User(body)
    await user.save()

    if (body.avatar) {
      const avatar = path.join(env.CDN_TEMP_USERS, body.avatar)
      if (await helper.pathExists(avatar)) {
        const filename = `${user._id}_${Date.now()}${path.extname(body.avatar)}`
        const newPath = path.join(env.CDN_USERS, filename)

        await asyncFs.rename(avatar, newPath)
        user.avatar = filename
        await user.save()
      }
    }
  } catch (err) {
    logger.error(`[user.signup] ${i18n.t('DB_ERROR')} ${JSON.stringify(body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
    return
  }

  //
  // Send confirmation email
  //
  
  try {
    // generate token and save
    const token = new Token({ user: user._id, token: helper.generateToken() })

    await token.save()

    // Send email
    i18n.locale = user.language

    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to: user.email,
      subject: i18n.t('ACCOUNT_ACTIVATION_SUBJECT'),
      html:
        `<p>
    ${i18n.t('HELLO')}${user.fullName},<br><br>
    ${i18n.t('ACCOUNT_ACTIVATION_LINK')}<br><br>
    http${env.HTTPS ? 's' : ''}://${req.headers.host}/api/confirm-email/${user.email}/${token.token}<br><br>
    ${i18n.t('REGARDS')}<br>
    </p>`,
    }
    await mailHelper.sendMail(mailOptions)
    res.sendStatus(200)
  } catch (err) {
    try {
      //
      // Delete user in case of smtp failure
      //
      await Token.deleteMany({ user: user.id })
      await user.deleteOne()
    } catch (deleteErr) {
      logger.error(`[user.signup] ${i18n.t('DB_ERROR')} ${JSON.stringify(body)}`, deleteErr)
    }
    logger.error(`[user.signup] ${i18n.t('SMTP_ERROR')}`, err)
    res.status(400).send(i18n.t('SMTP_ERROR') + err)
  }
}

/**
 * Frontend Sign Up.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const signup = async (req: Request, res: Response) => {
  await _signup(req, res, movininTypes.UserType.User)
}

/**
 * Admin Sign Up.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const adminSignup = async (req: Request, res: Response) => {
  await _signup(req, res, movininTypes.UserType.Admin)
}

/**
 * Create a User.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.CreateUserPayload } = req

  try {
    body.verified = false
    body.blacklisted = false

    if (body.password) {
      const { password } = body
      const passwordHash = await authHelper.hashPassword(password)
      body.password = passwordHash
    }

    const user = new User(body)
    await user.save()

    // avatar
    if (body.avatar) {
      const avatar = path.join(env.CDN_TEMP_USERS, body.avatar)
      if (await helper.pathExists(avatar)) {
        const filename = `${user._id}_${Date.now()}${path.extname(body.avatar)}`
        const newPath = path.join(env.CDN_USERS, filename)

        await asyncFs.rename(avatar, newPath)
        user.avatar = filename
        await user.save()
      }
    }

    if (body.password) {
      res.sendStatus(200)
      return
    }

    // generate token and save
    const token = new Token({ user: user._id, token: helper.generateToken() })
    await token.save()

    // Send email
    i18n.locale = user.language

    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to: user.email,
      subject: i18n.t('ACCOUNT_ACTIVATION_SUBJECT'),
      html:
        `<p>${i18n.t('HELLO')}${user.fullName},<br><br>
        ${i18n.t('ACCOUNT_ACTIVATION_LINK')}<br><br>
        ${helper.joinURL(
          user.type === movininTypes.UserType.User ? env.FRONTEND_HOST : env.ADMIN_HOST,
          'activate',
        )}/?u=${encodeURIComponent(user.id)}&e=${encodeURIComponent(user.email)}&t=${encodeURIComponent(token.token)}<br><br>
        ${i18n.t('REGARDS')}<br></p>`,
    }

    await mailHelper.sendMail(mailOptions)
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.create] ${i18n.t('DB_ERROR')} ${JSON.stringify(body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Check a Validation Token.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkToken = async (req: Request, res: Response) => {
  const { userId, email } = req.params

  try {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
      email,
    })

    if (user) {
      const type = req.params.type.toUpperCase() as movininTypes.AppType

      if (
        ![movininTypes.AppType.Frontend, movininTypes.AppType.Admin].includes(type)
        || (type === movininTypes.AppType.Admin && user.type === movininTypes.UserType.User)
        || (type === movininTypes.AppType.Frontend && user.type !== movininTypes.UserType.User)
        || user.active
      ) {
        res.sendStatus(204)
        return
      }

      const token = await Token.findOne({
        user: new mongoose.Types.ObjectId(userId),
        token: req.params.token,
      })

      if (token) {
        res.sendStatus(200)
        return
      }

      res.sendStatus(204)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.checkToken] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.params)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete Validation Tokens.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteTokens = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const result = await Token.deleteMany({
      user: new mongoose.Types.ObjectId(userId),
    })

    if (result.deletedCount > 0) {
      res.sendStatus(200)
      return
    }

    res.sendStatus(400)
  } catch (err) {
    logger.error(`[user.deleteTokens] ${i18n.t('DB_ERROR')} ${userId}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Resend Validation email.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const resend = async (req: Request, res: Response) => {
  const { email } = req.params

  try {
    if (!helper.isValidEmail(email)) {
      throw new Error('email is not valid')
    }

    const user = await User.findOne({ email })

    if (user) {
      const type = req.params.type.toUpperCase() as movininTypes.AppType

      if (
        ![movininTypes.AppType.Frontend.toString(), movininTypes.AppType.Admin.toString()].includes(type)
        || (type === movininTypes.AppType.Admin && user.type === movininTypes.UserType.User)
        || (type === movininTypes.AppType.Frontend && user.type !== movininTypes.UserType.User)
      ) {
        res.sendStatus(403)
        return
      }

      user.active = false
      await user.save()

      // generate token and save
      const token = new Token({ user: user._id, token: helper.generateToken() })
      await token.save()

      // Send email
      i18n.locale = user.language

      const reset = req.params.reset === 'true'

      const mailOptions: nodemailer.SendMailOptions = {
        from: env.SMTP_FROM,
        to: user.email,
        subject: reset ? i18n.t('PASSWORD_RESET_SUBJECT') : i18n.t('ACCOUNT_ACTIVATION_SUBJECT'),
        html:
          `<p>${i18n.t('HELLO')}${user.fullName},<br><br>
            ${reset ? i18n.t('PASSWORD_RESET_LINK') : i18n.t('ACCOUNT_ACTIVATION_LINK')}<br><br>
            ${helper.joinURL(
            user.type === movininTypes.UserType.User ? env.FRONTEND_HOST : env.ADMIN_HOST,
            reset ? 'reset-password' : 'activate',
          )}/?u=${encodeURIComponent(user.id)}&e=${encodeURIComponent(user.email)}&t=${encodeURIComponent(token.token)}<br><br>
            ${i18n.t('REGARDS')}<br></p>`,
      }

      await mailHelper.sendMail(mailOptions)
      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.resend] ${i18n.t('DB_ERROR')} ${email}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Activate a User and set his Password.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const activate = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.ActivatePayload } = req
  const { userId } = body

  try {
    if (!helper.isValidObjectId(userId)) {
      throw new Error('body.userId is not valid')
    }

    const user = await User.findById(userId)

    if (user) {
      const token = await Token.findOne({ user: userId, token: body.token })

      if (token) {
        const { password } = body
        const passwordHash = await authHelper.hashPassword(password)
        user.password = passwordHash

        user.active = true
        user.verified = true
        user.expireAt = undefined
        await user.save()

        res.sendStatus(200)
        return
      }
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.activate] ${i18n.t('DB_ERROR')} ${userId}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Sign In.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const signin = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.SignInPayload } = req
  const { email: emailFromBody, password, stayConnected, mobile } = body

  try {
    if (!emailFromBody) {
      throw new Error('body.email not found')
    }

    const email = helper.trim(emailFromBody, ' ')

    if (!helper.isValidEmail(email)) {
      throw new Error('body.email is not valid')
    }

    const user = await User.findOne({ email })
    const type = req.params.type.toUpperCase() as movininTypes.AppType

    if (
      !password
      || !user
      || !user.password
      || ![movininTypes.AppType.Frontend, movininTypes.AppType.Admin].includes(type)
      || (type === movininTypes.AppType.Admin && user.type === movininTypes.UserType.User)
      // || (type === movininTypes.AppType.Frontend && user.type !== movininTypes.UserType.User)
    ) {
      res.sendStatus(204)
      return
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {
      //
      // On production, authentication cookies are httpOnly, signed, secure and strict sameSite.
      // These options prevent XSS, CSRF and MITM attacks.
      // Authentication cookies are protected against XST attacks as well via allowedMethods middleware.
      //
      const cookieOptions: CookieOptions = helper.clone(env.COOKIE_OPTIONS)

      if (stayConnected) {
        //
        // Cookies can no longer set an expiration date more than 400 days in the future.
        // The limit MUST NOT be greater than 400 days in duration.
        // The RECOMMENDED limit is 400 days in duration, but the user agent MAY adjust the
        // limit to be less.
        //
        cookieOptions.maxAge = 400 * 24 * 60 * 60 * 1000
      } else {
        //
        // Cookie maxAge option is set in milliseconds.
        //
        cookieOptions.maxAge = env.JWT_EXPIRE_AT * 1000
      }

      const payload: authHelper.SessionData = { id: user.id }
      const token = await authHelper.encryptJWT(payload, stayConnected)

      const loggedUser: movininTypes.User = {
        _id: user.id,
        email: user.email,
        fullName: user.fullName,
        language: user.language,
        enableEmailNotifications: user.enableEmailNotifications,
        blacklisted: user.blacklisted,
        avatar: user.avatar,
        type: user.type
      };

      //
      // On mobile, we return the token in the response body.
      //
      if (mobile) {
        loggedUser.accessToken = token

        res
          .status(200)
          .send(loggedUser)
        return
      }

      //
      // On web, we return the token in a httpOnly, signed, secure and strict sameSite cookie.
      //
      const cookieName = authHelper.getAuthCookieName(req)

      res
        .clearCookie(cookieName)
        .cookie(cookieName, token, cookieOptions)
        .status(200)
        .send(loggedUser)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.signin] ${i18n.t('DB_ERROR')} ${emailFromBody}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Sign In.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const socialSignin = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.SignInPayload } = req
  const { socialSignInType, accessToken, email: emailFromBody, fullName, avatar, stayConnected, mobile } = body

  try {
    if (!socialSignInType) {
      throw new Error('body.socialSignInType not found')
    }

    if (!emailFromBody) {
      throw new Error('body.email not found')
    }

    const email = helper.trim(emailFromBody, ' ')

    if (!helper.isValidEmail(email)) {
      throw new Error('body.email is not valid')
    }

    if (!mobile) {
      if (!accessToken) {
        throw new Error('body.accessToken not found')
      }

      if (!(await authHelper.validateAccessToken(socialSignInType, accessToken, email))) {
        throw new Error('body.accessToken is not valid')
      }
    }

    let user = await User.findOne({ email })

    if (!user) {
      user = new User({
        email,
        fullName,
        active: true,
        verified: true,
        language: 'en',
        enableEmailNotifications: true,
        type: movininTypes.UserType.User,
        blacklisted: false,
        avatar,
      })
      await user.save()
    }

    //
    // On production, authentication cookies are httpOnly, signed, secure and strict sameSite.
    // These options prevent XSS, CSRF and MITM attacks.
    // Authentication cookies are protected against XST attacks as well via allowedMethods middleware.
    //
    const cookieOptions: CookieOptions = helper.clone(env.COOKIE_OPTIONS)

    if (stayConnected) {
      //
      // Cookies can no longer set an expiration date more than 400 days in the future.
      // The limit MUST NOT be greater than 400 days in duration.
      // The RECOMMENDED limit is 400 days in duration, but the user agent MAY adjust the
      // limit to be less.
      //
      cookieOptions.maxAge = 400 * 24 * 60 * 60 * 1000
    } else {
      //
      // Cookie maxAge option is set in milliseconds.
      //
      cookieOptions.maxAge = env.JWT_EXPIRE_AT * 1000
    }

    const payload: authHelper.SessionData = { id: user.id }
    const token = await authHelper.encryptJWT(payload, stayConnected)

    const loggedUser: movininTypes.User = {
      _id: user.id,
      email: user.email,
      fullName: user.fullName,
      language: user.language,
      enableEmailNotifications: user.enableEmailNotifications,
      blacklisted: user.blacklisted,
      avatar: user.avatar,
    }

    //
    // On mobile, we return the token in the response body.
    //
    if (mobile) {
      loggedUser.accessToken = token

      res
        .status(200)
        .send(loggedUser)
      return
    }

    //
    // On web, we return the token in a httpOnly, signed, secure and strict sameSite cookie.
    //
    const cookieName = authHelper.getAuthCookieName(req)

    res
      .clearCookie(cookieName)
      .cookie(cookieName, token, cookieOptions)
      .status(200)
      .send(loggedUser)
  } catch (err) {
    logger.error(`[user.socialSignin] ${i18n.t('DB_ERROR')} ${emailFromBody}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Sign out.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const signout = async (req: Request, res: Response) => {
  const cookieName = authHelper.getAuthCookieName(req)

  res
    .clearCookie(cookieName)
    .sendStatus(200)
}

/**
 * Get Push Notification Token.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getPushToken = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    if (!helper.isValidObjectId(userId)) {
      throw new Error('userId is not valid')
    }

    const pushToken = await PushToken.findOne({ user: userId })
    if (pushToken) {
      res.json(pushToken.token)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.pushToken] ${i18n.t('DB_ERROR')} ${userId}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Create Push Notification Token.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const createPushToken = async (req: Request, res: Response) => {
  const { userId, token } = req.params

  try {
    if (!helper.isValidObjectId(userId)) {
      throw new Error('userId is not valid')
    }

    const exist = await PushToken.exists({ user: userId })

    if (!exist) {
      const pushToken = new PushToken({
        user: userId,
        token,
      })
      await pushToken.save()
      res.sendStatus(200)
      return
    }

    res.status(400).send('Push Token already exists.')
  } catch (err) {
    logger.error(`[user.createPushToken] ${i18n.t('DB_ERROR')} ${userId}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete Push Notification Token.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deletePushToken = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    if (!helper.isValidObjectId(userId)) {
      throw new Error('userId is not valid')
    }

    await PushToken.deleteMany({ user: userId })
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.deletePushToken] ${i18n.t('DB_ERROR')} ${userId}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Validate email.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const validateEmail = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.ValidateEmailPayload } = req
  const { email } = body

  try {
    if (!helper.isValidEmail(email)) {
      throw new Error('body.email is not valid')
    }

    const exists = await User.exists({ email, verified: true });

    if (exists) {
      res.sendStatus(204)
      return
    }

    // email does not exist in db (can be added)
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.validateEmail] ${i18n.t('DB_ERROR')} ${email}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Validate JWT token.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {*}
 */
export const validateAccessToken = async (req: Request, res: Response) => {
  res.sendStatus(200)
}

/**
 * Get Validation result as HTML.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { token: _token, email: _email } = req.params

    if (!helper.isValidEmail(_email)) {
      throw new Error('email is not valid')
    }

    const user = await User.findOne({ email: _email })

    if (!user) {
      logger.error('[user.confirmEmail] User not found', req.params)
      res.status(204).send(i18n.t('ACCOUNT_ACTIVATION_LINK_ERROR'))
      return
    }

    i18n.locale = user.language
    const token = await Token.findOne({ user: user._id, token: _token })

    // token is not found into database i.e. token may have expired
    if (!token) {
      logger.error(i18n.t('ACCOUNT_ACTIVATION_LINK_EXPIRED'), req.params)
      res.status(400).send(getStatusMessage(user.language, i18n.t('ACCOUNT_ACTIVATION_LINK_EXPIRED')))
      return
    }

    // if token is found then check valid user
    // not valid user
    if (user.verified) {
      // user is already verified
      res.status(200).send(getStatusMessage(user.language, i18n.t('ACCOUNT_ACTIVATION_ACCOUNT_VERIFIED')))
      return
    }

    // verify user
    // change verified to true
    user.verified = true
    user.verifiedAt = new Date()
    await user.save()
    res.status(200).send(getStatusMessage(user.language, i18n.t('ACCOUNT_ACTIVATION_SUCCESS')))
  } catch (err) {
    logger.error(`[user.confirmEmail] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.params)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Resend Validation email.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const resendLink = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.ResendLinkPayload } = req
  const { email } = body

  try {
    if (!email || !helper.isValidEmail(email)) {
      throw new Error('email is not valid')
    }

    const user = await User.findOne({ email })

    // user is not found into database
    if (!user) {
      logger.error('[user.resendLink] User not found:', body)
      res.status(400).send(getStatusMessage(env.DEFAULT_LANGUAGE, i18n.t('ACCOUNT_ACTIVATION_RESEND_ERROR')))
      return
    }

    if (user.verified) {
      // user has been already verified
      res.status(200).send(getStatusMessage(user.language, i18n.t('ACCOUNT_ACTIVATION_ACCOUNT_VERIFIED')))
      return
    }

    // send verification link
    // generate token and save
    const token = new Token({ user: user._id, token: helper.generateToken() })
    await token.save()

    // Send email
    i18n.locale = user.language
    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to: user.email,
      subject: i18n.t('ACCOUNT_ACTIVATION_SUBJECT'),
      html:
        `<p>${i18n.t('HELLO')}${user.fullName},<br><br>
          ${i18n.t('ACCOUNT_ACTIVATION_LINK')}<br><br>
          http${env.HTTPS ? 's' : ''}://${req.headers.host}/api/confirm-email/${user.email}/${token.token}<br><br>
          ${i18n.t('REGARDS')}<br></p>`,
    }

    await mailHelper.sendMail(mailOptions)
    res
      .status(200)
      .send(getStatusMessage(user.language, i18n.t('ACCOUNT_ACTIVATION_EMAIL_SENT_PART_1') + user.email + i18n.t('ACCOUNT_ACTIVATION_EMAIL_SENT_PART_2')))
  } catch (err) {
    logger.error(`[user.resendLink] ${i18n.t('DB_ERROR')} ${email}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update User.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.UpdateUserPayload } = req
    const { _id } = body

    if (!helper.isValidObjectId(_id)) {
      throw new Error('User id is not valid')
    }

    const user = await User.findById(_id)

    if (!user) {
      logger.error('[user.update] User not found:', body.email)
      res.sendStatus(204)
      return
    }

    const {
      fullName,
      phone,
      bio,
      location,
      type,
      birthDate,
      enableEmailNotifications,
      payLater,
      blacklisted,
    } = body

    if (fullName) {
      user.fullName = fullName
    }
    user.phone = phone
    user.location = location
    user.bio = bio
    user.birthDate = birthDate ? new Date(birthDate) : undefined
    user.blacklisted = !!blacklisted
    if (type) {
      user.type = type as movininTypes.UserType
    }
    if (typeof enableEmailNotifications !== 'undefined') {
      user.enableEmailNotifications = enableEmailNotifications
    }
    if (typeof payLater !== 'undefined') {
      user.payLater = payLater
    }

    await user.save()
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.update] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update email notifications setting.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateEmailNotifications = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.UpdateEmailNotificationsPayload } = req

  try {
    const { _id } = body

    if (!helper.isValidObjectId(_id)) {
      throw new Error('User id is not valid')
    }

    const user = await User.findById(_id)

    if (!user) {
      logger.error('[user.updateEmailNotifications] User not found:', body)
      res.sendStatus(204)
      return
    }

    const { enableEmailNotifications } = body
    user.enableEmailNotifications = enableEmailNotifications
    await user.save()

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.updateEmailNotifications] ${i18n.t('DB_ERROR')} ${JSON.stringify(body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update language.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateLanguage = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.UpdateLanguage } = req
    const { id, language } = body

    if (!helper.isValidObjectId(id)) {
      throw new Error('User id is not valid')
    }

    const user = await User.findById(id)

    if (!user) {
      logger.error('[user.updateLanguage] User not found:', id)
      res.sendStatus(204)
      return
    }

    user.language = language
    await user.save()
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.updateLanguage] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get User by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    if (!helper.isValidObjectId(id)) {
      throw new Error('User id is not valid')
    }

    const user = await User.findById(id, {
      company: 1,
      email: 1,
      phone: 1,
      fullName: 1,
      verified: 1,
      language: 1,
      enableEmailNotifications: 1,
      avatar: 1,
      bio: 1,
      location: 1,
      type: 1,
      blacklisted: 1,
      birthDate: 1,
      payLater: 1,
      customerId: 1,
    }).lean()

    if (!user) {
      logger.error('[user.getUser] User not found:', req.params)
      res.sendStatus(204)
      return
    }

    res.json(user)
  } catch (err) {
    logger.error(`[user.getUser] ${i18n.t('DB_ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Upload avatar to temp folder.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const createAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('[user.createAvatar] req.file not found')
    }

    const filename = `${helper.getFilenameWithoutExtension(req.file.originalname)}_${nanoid()}_${Date.now()}${path.extname(req.file.originalname)}`
    const filepath = path.join(env.CDN_TEMP_USERS, filename)

    await asyncFs.writeFile(filepath, req.file.buffer)
    res.json(filename)
  } catch (err) {
    logger.error(`[user.createAvatar] ${i18n.t('DB_ERROR')}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Update avatar.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    if (!req.file) {
      const msg = 'req.file not found'
      logger.error(`[user.createAvatar] ${msg}`)
      res.status(400).send(msg)
      return
    }

    const user = await User.findById(userId)

    if (user) {
      if (user.avatar && !user.avatar.startsWith('http')) {
        const avatar = path.join(env.CDN_USERS, user.avatar)

        if (await helper.pathExists(avatar)) {
          await asyncFs.unlink(avatar)
        }
      }

      const filename = `${user._id}_${Date.now()}${path.extname(req.file.originalname)}`
      const filepath = path.join(env.CDN_USERS, filename)

      await asyncFs.writeFile(filepath, req.file.buffer)
      user.avatar = filename
      await user.save()
      res.json(filename)
      return
    }

    logger.error('[user.updateAvatar] User not found:', userId)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.updateAvatar] ${i18n.t('DB_ERROR')} ${userId}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete avatar.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (user) {
      if (user.avatar && !user.avatar.startsWith('http')) {
        const avatar = path.join(env.CDN_USERS, user.avatar)
        if (await helper.pathExists(avatar)) {
          await asyncFs.unlink(avatar)
        }
      }
      user.avatar = undefined

      await user.save()
      res.sendStatus(200)
      return
    }

    logger.error('[user.deleteAvatar] User not found:', userId)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.deleteAvatar] ${i18n.t('DB_ERROR')} ${userId}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete temp avatar.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteTempAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.params

  try {
    const avatarFile = path.join(env.CDN_TEMP_USERS, avatar)
    if (!(await helper.pathExists(avatarFile))) {
      throw new Error(`[user.deleteTempAvatar] temp avatar ${avatarFile} not found`)
    }

    await asyncFs.unlink(avatarFile)

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.deleteTempAvatar] ${i18n.t('DB_ERROR')} ${avatar}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Change password.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const changePassword = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.changePasswordPayload } = req
  const {
    _id,
    password: currentPassword,
    newPassword,
    strict,
  } = body

  try {
    if (!helper.isValidObjectId(_id)) {
      throw new Error('User id is not valid')
    }

    const user = await User.findOne({ _id })
    if (!user) {
      logger.error('[user.changePassword] User not found:', _id)
      res.sendStatus(204)
      return
    }

    if (strict && !user.password) {
      logger.error('[user.changePassword] User.password not found:', _id)
      res.sendStatus(204)
      return
    }

    const _changePassword = async () => {
      const password = newPassword
      const passwordHash = await authHelper.hashPassword(password)
      user.password = passwordHash
      await user.save()
      res.sendStatus(200)
    }

    if (strict) {
      const passwordMatch = await bcrypt.compare(currentPassword, user.password!)
      if (passwordMatch) {
        _changePassword()
        return
      }

      res.sendStatus(204)
      return
    }

    _changePassword()
  } catch (err) {
    logger.error(`[user.changePassword] ${i18n.t('DB_ERROR')} ${_id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Check password.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkPassword = async (req: Request, res: Response) => {
  const { id, password } = req.params

  try {
    if (!helper.isValidObjectId(id)) {
      throw new Error('User id is not valid')
    }

    const user = await User.findById(id)

    if (user) {
      if (!user.password) {
        logger.error('[user.changePassword] User.password not found')
        res.sendStatus(204)
        return
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (passwordMatch) {
        res.sendStatus(200)
        return
      }

      res.sendStatus(204)
      return
    }

    logger.error('[user.checkPassword] User not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.checkPassword] ${i18n.t('DB_ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Get Users.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const keyword: string = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'
    const page: number = Number.parseInt(req.params.page, 10)
    const size: number = Number.parseInt(req.params.size, 10)
    const { body }: { body: movininTypes.GetUsersBody } = req
    const { types, user: userId } = body

    const $match: mongoose.FilterQuery<env.User> = {
      $and: [
        {
          type: { $in: types },
        },
        {
          $or: [
            { fullName: { $regex: keyword, $options: options } },
            { email: { $regex: keyword, $options: options } },
          ],
        },
        {
          expireAt: null,
        },
      ],
    }

    if (userId) {
      $match.$and!.push({ _id: { $ne: new mongoose.Types.ObjectId(userId) } })
    }

    const users = await User.aggregate(
      [
        {
          $match,
        },
        {
          $project: {
            company: 1,
            email: 1,
            phone: 1,
            fullName: 1,
            verified: 1,
            language: 1,
            enableEmailNotifications: 1,
            avatar: 1,
            bio: 1,
            location: 1,
            type: 1,
            blacklisted: 1,
            birthDate: 1,
            customerId: 1,
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { fullName: 1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
            pageInfo: [
              {
                $count: 'totalRecords',
              },
            ],
          },
        },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    res.json(users)
  } catch (err) {
    logger.error(`[user.getUsers] ${i18n.t('DB_ERROR')}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete Users.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const { body }: { body: string[] } = req
    const ids: mongoose.Types.ObjectId[] = body.map((id: string) => new mongoose.Types.ObjectId(id))

    for (const id of ids) {
      const user = await User.findById(id)

      if (user) {
        await User.deleteOne({ _id: id })

        if (user.avatar) {
          const avatar = path.join(env.CDN_USERS, user.avatar)
          if (await helper.pathExists(avatar)) {
            await asyncFs.unlink(avatar)
          }
        }

        if (user.type === movininTypes.UserType.Agency) {
          await Booking.deleteMany({ agency: id })
          const properties = await Property.find({ agency: id })
          await Property.deleteMany({ agency: id })
          for (const property of properties) {
            // delete main image
            if (property.image) {
              const image = path.join(env.CDN_PROPERTIES, property.image)
              if (await helper.pathExists(image)) {
                await asyncFs.unlink(image)
              }
            }
            // delete additional images
            if (Array.isArray(property.images)) {
              for (const additionalImageName of property.images) {
                const additionalImage = path.join(env.CDN_PROPERTIES, additionalImageName)
                if (await helper.pathExists(additionalImage)) {
                  await asyncFs.unlink(additionalImage)
                }
              }
            }
          }
        } else if (user.type === movininTypes.UserType.User) {
          await Booking.deleteMany({ renter: id })
        }

        await NotificationCounter.deleteMany({ user: id })
        await Notification.deleteMany({ user: id })
      } else {
        logger.error('User not found:', id)
      }
    }

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.delete] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Validate Google reCAPTCHA v3 token.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const verifyRecaptcha = async (req: Request, res: Response) => {
  try {
    const { token, ip } = req.params
    const result = await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(env.RECAPTCHA_SECRET)}&response=${encodeURIComponent(token)}&remoteip=${ip}`)
    const { success } = result.data

    if (success) {
      res.sendStatus(200)
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.delete] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Send an email. reCAPTCHA is mandatory.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const sendEmail = async (req: Request, res: Response) => {
  try {
    const whitelist = [
      helper.trimEnd(env.ADMIN_HOST, '/'),
      helper.trimEnd(env.FRONTEND_HOST, '/'),
    ]
    const { origin } = req.headers
    if (!origin || whitelist.indexOf(helper.trimEnd(origin, '/')) === -1) {
      throw new Error('Unauthorized!')
    }

    const { body }: { body: movininTypes.SendEmailPayload } = req
    const { from, to, subject, message, isContactForm } = body

    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to,
      subject: isContactForm ? i18n.t('CONTACT_SUBJECT') : subject,
      html:
        `<p>
              ${i18n.t('FROM')}: ${from}<br>
              ${(isContactForm && `${i18n.t('SUBJECT')}: ${subject}<br>`) || ''}
              ${(message && `${i18n.t('MESSAGE')}:<br>${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}<br>`) || ''}
         </p>`,
    }
    await mailHelper.sendMail(mailOptions)

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[user.sendEmail] ${JSON.stringify(req.body)}`, err)
    res.status(400).send(err)
  }
}

/**
 * Check if password exists.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const hasPassword = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const passwordExists = await User.exists({ _id: id, password: { $ne: null } })

    if (passwordExists) {
      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[user.hasPassword] ${i18n.t('DB_ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

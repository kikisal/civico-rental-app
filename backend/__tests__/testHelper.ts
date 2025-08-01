import request from 'supertest'
import cookieParser from 'cookie-parser'
import { nanoid } from 'nanoid'
import mongoose from 'mongoose'
import * as movininTypes from ':movinin-types'
import app from '../src/app'
import * as env from '../src/config/env.config'
import User from '../src/models/User'
import LocationValue from '../src/models/LocationValue'
import Location from '../src/models/Location'
import Notification from '../src/models/Notification'
import NotificationCounter from '../src/models/NotificationCounter'
import * as logger from '../src/utils/logger'
import * as authHelper from '../src/utils/authHelper'

export const getName = (prefix: string) => {
  expect(prefix.length).toBeGreaterThan(1)
  return `${prefix}.${nanoid()}`.toLowerCase()
}

export const getAgencyName = () => getName('agency')

export const ADMIN_EMAIL = `${getName('admin')}@test.movinin.io`
export const USER_EMAIL = `${getName('user')}@test.movinin.io`
export const USER_FULL_NAME = 'user'
export const PASSWORD = 'Un1tTest5'
export const LANGUAGE = 'en'
export const PAGE = 1
export const SIZE = 30

let ADMIN_USER_ID: string
let USER_ID: string

export const initializeLogger = () => {
  logger.disableLogging()
}

export const initialize = async () => {
  const passwordHash = await authHelper.hashPassword(PASSWORD)

  // admin
  const admin = new User({
    fullName: 'admin',
    email: ADMIN_EMAIL,
    language: LANGUAGE,
    password: passwordHash,
    type: movininTypes.UserType.Admin,
  })
  await admin.save()
  expect(admin.id).toBeDefined()
  ADMIN_USER_ID = admin.id

  // user
  const user = new User({
    fullName: USER_FULL_NAME,
    email: USER_EMAIL,
    language: LANGUAGE,
    password: passwordHash,
    type: movininTypes.UserType.User,
  })
  await user.save()
  expect(user.id).toBeDefined()
  USER_ID = user.id
}

export const getAdminUserId = () => ADMIN_USER_ID

export const getUserId = () => USER_ID

export const close = async () => {
  const res = await User.deleteMany({ _id: { $in: [ADMIN_USER_ID, USER_ID] } })
  expect(res.deletedCount).toBe(2)
  await Notification.deleteMany({ user: { $in: [ADMIN_USER_ID, USER_ID] } })
  await NotificationCounter.deleteMany({ user: { $in: [ADMIN_USER_ID, USER_ID] } })
}

export const deleteNotifications = async (bookingId: string) => {
  const notifications = await Notification.find({ booking: bookingId })
  for (const notification of notifications) {
    const nc = await NotificationCounter.findOne({ user: notification.user })
    if (nc?.count) {
      nc.count -= 1
      await nc.save()
    }
    await notification.deleteOne()
  }
}

export const getToken = (cookie: string) => {
  const signedCookie = decodeURIComponent(cookie)
  const token = cookieParser.signedCookie((signedCookie.match(`${env.X_ACCESS_TOKEN}=(s:.*?);`) ?? [])[1], env.COOKIE_SECRET) as string
  return token
}

const signin = async (appType: movininTypes.AppType, email: string) => {
  const payload: movininTypes.SignInPayload = {
    email,
    password: PASSWORD,
  }

  const res = await request(app)
    .post(`/api/sign-in/${appType}`)
    .send(payload)

  expect(res.statusCode).toBe(200)
  const cookies = res.headers['set-cookie'] as unknown as string[]
  expect(cookies.length).toBeGreaterThan(1)
  const token = getToken(cookies[1])
  expect(token).toBeDefined()
  return token
}

export const signinAsAdmin = () => signin(movininTypes.AppType.Admin, ADMIN_EMAIL)

export const signinAsUser = () => signin(movininTypes.AppType.Frontend, USER_EMAIL)

export const signout = async (token: string) => {
  const res = await request(app)
    .post('/api/sign-out')
    .set('Cookie', [`${env.X_ACCESS_TOKEN}=${token};`])
  expect(res.statusCode).toBe(200)

  const cookies = res.headers['set-cookie'] as unknown as string[]
  expect(cookies.length).toBe(1)
  expect(cookies[0]).toContain(`${env.X_ACCESS_TOKEN}=;`)
}

export const createAgency = async (email: string, fullName: string) => {
  const passwordHash = await authHelper.hashPassword(PASSWORD)
  const body = {
    email,
    fullName,
    language: LANGUAGE,
    password: passwordHash,
    type: movininTypes.UserType.Agency,
    avatar: 'avatar.jpg',
    blacklisted: false,
  }
  const agency = new User(body)
  await agency.save()
  expect(agency.id).toBeDefined()
  return agency.id as string
}

export const deleteAgency = async (id: string) => {
  const res = await User.deleteOne({ _id: id })
  expect(res.deletedCount).toBe(1)

  await Notification.deleteMany({ user: id })
  await NotificationCounter.deleteMany({ user: id })
}

export const deleteLocation = async (id: string) => {
  const location = await Location.findById(id)
  expect(location).toBeDefined()

  const valuesRes = await LocationValue.deleteMany({ _id: { $in: location?.values } })
  expect(valuesRes.deletedCount).toBeGreaterThan(1)

  const res = await Location.deleteOne({ _id: id })
  expect(res.deletedCount).toBe(1)
}

export const GetRandomEmail = () => `${getName('random')}@test.movinin.io`

export const GetRandromObjectId = () => new mongoose.Types.ObjectId()

export const GetRandromObjectIdAsString = () => GetRandromObjectId().toString()

export const delay = (milliseconds: number) => new Promise((resolve) => {
  setTimeout(resolve, milliseconds)
})

export const createLocation = async (nameEN: string, nameFR: string, country?: string) => {
  const locationValueBodyEN = {
    language: 'en',
    value: nameEN,
  }
  const locationValueEN = new LocationValue(locationValueBodyEN)
  await locationValueEN.save()

  const locationValueBodyFR = {
    language: 'fr',
    value: nameFR,
  }
  const locationValueFR = new LocationValue(locationValueBodyFR)
  await locationValueFR.save()

  const values = [locationValueEN._id, locationValueFR._id]
  const location = new Location({ country: country || GetRandromObjectIdAsString(), values })
  await location.save()
  expect(location.id).toBeDefined()
  return location.id as string
}

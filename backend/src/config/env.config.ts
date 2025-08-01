import process from 'node:process'
import { Document, Types } from 'mongoose'
import { CookieOptions } from 'express'
import * as movininTypes from ':movinin-types'
import * as helper from '../utils/helper'

/**
 * Get environment variable value.
 *
 * @param {string} name
 * @param {?boolean} [required]
 * @param {?string} [defaultValue]
 * @returns {string}
 */
export const __env__ = (name: string, required?: boolean, defaultValue?: string): string => {
  const value = process.env[name]
  if (required && !value) {
    throw new Error(`'${name} not found`)
  }
  if (!value) {
    return defaultValue || ''
  }
  return String(value)
}

/**
 * ISO 639-1 language codes supported
 * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 *
 * @type {string[]}
 */
export const LANGUAGES = [
  'en',
  'fr',
  'it',
  'de',
  'es'
]

/**
 * Name of the field used for TTL (Time-To-Live) index expiration.
 * MongoDB automatically deletes documents when the date in this field is reached.
 * 
 * @constant
 * @type {string}
 */
export const expireAt = 'expireAt'

/**
 * Website name.
 *
 * @type {string}
 */
export const WEBSITE_NAME = __env__('MI_WEBSITE_NAME', false, "Movin' In")

/**
 * Indicate whether we are in CI environment or not.
 *
 * @type {boolean}
 */
export const CI = helper.StringToBoolean(__env__('MI_CI', false, 'false'))

/**
 * Number of documents to process per batch when deleting obsolete language values.
 * This helps avoid large memory usage and improves performance during deletions.
 * Default is 1000.
 *
 * @type {number}
 */
export const BATCH_SIZE = Number.parseInt(__env__('MI_BATCH_SIZE', false, '1000'), 10)

/**
 * Server Port. Default is 4004.
 *
 * @type {number}
 */
export const PORT = Number.parseInt(__env__('MI_PORT', false, '4004'), 10)

/**
 * Indicate whether HTTPS is enabled or not.
 *
 * @type {boolean}
 */
export const HTTPS = helper.StringToBoolean(__env__('MI_HTTPS'))

/**
 * Private SSL key filepath.
 *
 * @type {string}
 */
export const PRIVATE_KEY = __env__('MI_PRIVATE_KEY', HTTPS)

/**
 * Private SSL certificate filepath.
 *
 * @type {string}
 */
export const CERTIFICATE = __env__('MI_CERTIFICATE', HTTPS)

/**
 * MongoDB database URI. Default is: mongodb://127.0.0.1:27017/movinin?authSource=admin&appName=movinin
 *
 * @type {string}
 */
export const DB_URI = __env__('MI_DB_URI', false, 'mongodb://127.0.0.1:27017/movinin?authSource=admin&appName=movinin')

/**
 * Indicate whether MongoDB SSL is enabled or not.
 *
 * @type {boolean}
 */
export const DB_SSL = helper.StringToBoolean(__env__('MI_DB_SSL', false, 'false'))

/**
 * MongoDB SSL certificate filepath.
 *
 * @type {string}
 */
export const DB_SSL_CERT = __env__('MI_DB_SSL_CERT', DB_SSL)

/**
 * MongoDB SSL CA certificate filepath.
 *
 * @type {string}
 */
export const DB_SSL_CA = __env__('MI_DB_SSL_CA', DB_SSL)

/**
 * Indicate whether MongoDB debug is enabled or not.
 *
 * @type {boolean}
 */
export const DB_DEBUG = helper.StringToBoolean(__env__('MI_DB_DEBUG', false, 'false'))

/**
 * Indicate whether server-side JavaScript, such as $where, $function, $accumulator and map-reduce are supported.
 *
 * @type {boolean}
 */
export const DB_SERVER_SIDE_JAVASCRIPT = helper.StringToBoolean(__env__('MI_DB_SERVER_SIDE_JAVASCRIPT', false, 'false'))

/**
 * Cookie secret. It should at least be 32 characters long, but the longer the better.
 *
 * @type {string}
 */
export const COOKIE_SECRET = __env__('MI_COOKIE_SECRET', false, 'Movinin')

/**
 * Authentication cookie domain.
 * Default is localhost.
 *
 * @type {string}
 */
export const AUTH_COOKIE_DOMAIN = __env__('MI_AUTH_COOKIE_DOMAIN', false, 'localhost')

/**
 * Cookie options.
 *
 * On production, authentication cookies are httpOnly, signed, secure and strict sameSite.
 * This will prevent XSS attacks by not allowing access to the cookie via JavaScript.
 * This will prevent CSRF attacks by not allowing the browser to send the cookie along with cross-site requests.
 * This will prevent MITM attacks by only allowing the cookie to be sent over HTTPS.
 * Authentication cookies are protected against XST attacks as well by disabling TRACE HTTP method via allowedMethods middleware.
 *
 * @type {CookieOptions}
 */
export const COOKIE_OPTIONS: CookieOptions = { httpOnly: true, secure: HTTPS, signed: true, sameSite: 'strict', domain: AUTH_COOKIE_DOMAIN }

/**
 * frontend authentication cookie name.
 *
 * @type {"mi-x-access-token-frontend"}
 */
export const FRONTEND_AUTH_COOKIE_NAME = 'mi-x-access-token-frontend'

/**
 * Admin authentication cookie name.
 *
 * @type {"mi-x-access-token-frontend"}
 */
export const ADMIN_AUTH_COOKIE_NAME = 'mi-x-access-token-admin'

/**
 * Mobile App and unit tests authentication header name.
 *
 * @type {"x-access-token"}
 */
export const X_ACCESS_TOKEN = 'x-access-token'

/**
 * JWT secret. It should at least be 32 characters long, but the longer the better.
 *
 * @type {string}
 */
export const JWT_SECRET = __env__('MI_JWT_SECRET', false, 'Movinin')

/**
 * JWT expiration in seconds. Default is 86400 seconds.
 *
 * @type {number}
 */
export const JWT_EXPIRE_AT = Number.parseInt(__env__('MI_JWT_EXPIRE_AT', false, '86400'), 10) // in seconds (default: 1d)

/**
 * Validation Token expiration in seconds. Default is 86400 seconds.
 *
 * @type {number}
 */
export const TOKEN_EXPIRE_AT = Number.parseInt(__env__('MI_TOKEN_EXPIRE_AT', false, '86400'), 10) // in seconds (default: 1d)

/**
 * SMTP host.
 *
 * @type {string}
 */
export const SMTP_HOST = __env__('MI_SMTP_HOST', true)

/**
 * SMTP port.
 *
 * @type {number}
 */
export const SMTP_PORT = Number.parseInt(__env__('MI_SMTP_PORT', true), 10)

/**
 * SMTP username.
 *
 * @type {string}
 */
export const SMTP_USER = __env__('MI_SMTP_USER', true)

/**
 * SMTP password.
 *
 * @type {string}
 */
export const SMTP_PASS = __env__('MI_SMTP_PASS', true)

/**
 * SMTP from email.
 *
 * @type {string}
 */
export const SMTP_FROM = __env__('MI_SMTP_FROM', true)

/**
 * CDN root folder path.
 *
 * @type {string}
 */
export const CDN_ROOT = __env__('MI_CDN_ROOT', false, '/var/www/cdn')

/**
 * Users' cdn folder path.
 *
 * @type {string}
 */
export const CDN_USERS = __env__('MI_CDN_USERS', true)

/**
 * Users' temp cdn folder path.
 *
 * @type {string}
 */
export const CDN_TEMP_USERS = __env__('MI_CDN_TEMP_USERS', true)

/**
 * Properties' cdn folder path.
 *
 * @type {string}
 */
export const CDN_PROPERTIES = __env__('MI_CDN_PROPERTIES', true)

/**
 * Properties' temp cdn folder path.
 *
 * @type {string}
 */
export const CDN_TEMP_PROPERTIES = __env__('MI_CDN_TEMP_PROPERTIES', true)

/**
 * Locations' cdn folder path.
 *
 * @type {string}
 */
export const CDN_LOCATIONS = __env__('MI_CDN_LOCATIONS', true)

/**
 * Locations' temp cdn folder path.
 *
 * @type {string}
 */
export const CDN_TEMP_LOCATIONS = __env__('MI_CDN_TEMP_LOCATIONS', true)

/**
 * Admin host.
 *
 * @type {string}
 */
export const ADMIN_HOST = __env__('MI_ADMIN_HOST', true)

/**
 * Frontend host.
 *
 * @type {string}
 */
export const FRONTEND_HOST = __env__('MI_FRONTEND_HOST', true)

/**
 * Default language. Default is en. Available options: en, fr.
 *
 * @type {string}
 */
export const DEFAULT_LANGUAGE = __env__('MI_DEFAULT_LANGUAGE', false, 'en')

/**
 * Default Minimum age for rental. Default is 21 years.
 *
 * @type {number}
 */
export const MINIMUM_AGE = Number.parseInt(__env__('MI_MINIMUM_AGE', false, '21'), 10)

/**
 * Expo push access token.
 *
 * @type {string}
 */
export const EXPO_ACCESS_TOKEN = __env__('MI_EXPO_ACCESS_TOKEN', false)

/**
 * Timezone for cenverting dates from UTC to local time.
 * Must be a valid TZ idenfidier: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * Default is UTC.
 *
 * @type {string}
 */
export const TIMEZONE = __env__('MI_TIMEZONE', false, 'UTC')

/**
 * Stripe secret key.
 *
 * @type {string}
 */
export const STRIPE_SECRET_KEY = __env__('MI_STRIPE_SECRET_KEY', false, 'STRIPE_SECRET_KEY')
let stripeSessionExpireAt = Number.parseInt(__env__('MI_STRIPE_SESSION_EXPIRE_AT', false, '82800'), 10)
stripeSessionExpireAt = stripeSessionExpireAt < 1800 ? 1800 : stripeSessionExpireAt
stripeSessionExpireAt = stripeSessionExpireAt <= 82800 ? stripeSessionExpireAt : 82800

/**
 * Stripe Checkout Session expiration in seconds. Should be at least 1800 seconds (30min) and max 82800 seconds. Default is 82800 seconds (~23h).
 * If the value is lower than 1800 seconds, it wil be set to 1800 seconds.
 * If the value is greater than 82800 seconds, it wil be set to 82800 seconds.
 *
 * @type {number}
 */
export const STRIPE_SESSION_EXPIRE_AT = stripeSessionExpireAt

/**
 * Indicates whether PayPal is used in sandbox mode or production.
 *
 * @type {boolean}
 */
export const PAYPAL_SANDBOX = helper.StringToBoolean(__env__('MI_PAYPAL_SANDBOX', false, 'true'))

/**
 * PayPal client ID.
 *
 * @type {string}
 */
export const PAYPAL_CLIENT_ID = __env__('MI_PAYPAL_CLIENT_ID', false, 'PAYPAL_CLIENT_ID')

/**
 * PayPal client secret.
 *
 * @type {string}
 */
export const PAYPAL_CLIENT_SECRET = __env__('MI_PAYPAL_CLIENT_SECRET', false, 'PAYPAL_CLIENT_SECRET')

/**
 * Booking expiration in seconds.
 * Bookings created from checkout with Stripe are temporary and are automatically deleted if the payment checkout session expires.
 *
 * @type {number}
 */
export const BOOKING_EXPIRE_AT = STRIPE_SESSION_EXPIRE_AT + (10 * 60)

/**
 * User expiration in seconds.
 * Non verified and active users created from checkout with Stripe are temporary and are automatically deleted if the payment checkout session expires.
 *
 *
 * @type {number}
 */
export const USER_EXPIRE_AT = BOOKING_EXPIRE_AT

/**
 * Private SSL key filepath.
 *
 * @type {string}
 */
export const ADMIN_EMAIL = __env__('MI_ADMIN_EMAIL', false)

/**
 * Google reCAPTCHA v3 secret key.
 *
 * @type {string}
 */
export const RECAPTCHA_SECRET = __env__('MI_RECAPTCHA_SECRET', false)

/**
 * ipinfo.io API key.
 * Required for more tha, 1000 requests/day.
 *
 * @type {string}
 */
export const IPINFO_API_KEY = __env__('MI_IPINFO_API_KEY', false)

/**
 * Default ISO 2 country code ipinfo.io.
 *
 * @type {string}
 */
export const IPINFO_DEFAULT_COUNTRY = __env__('MI_IPINFO_DEFAULT_COUNTRY', false, 'US')

/**
 * Enables or disables Sentry error reporting. Set to true to enable.
 *
 * @type {boolean}
 */
export const ENABLE_SENTRY = helper.StringToBoolean(__env__('MI_ENABLE_SENTRY', false, 'false'))

/**
 * The Sentry DSN (Data Source Name) used to identify your backend project.
 *
 * @type {string}
 */
export const SENTRY_DSN_BACKEND = __env__('MI_SENTRY_DSN_BACKEND', ENABLE_SENTRY)

/**
 * Sentry traces sample rate.
 * Set to 1.0 to capture 100% of transactions for tracing.
 * 0.1 means 10% of transactions will be sent to Sentry.
 * 0 means no transactions will be sent to Sentry.
 * We recommend adjusting this value in production to avoid high data volume and costs.
 *
 * Learn more at
 * https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#tracesSampleRate
 * 
 * @type {number}
 */
export const SENTRY_TRACES_SAMPLE_RATE = Number.parseFloat(__env__('MI_SENTRY_TRACES_SAMPLE_RATE', false, '1.0'))

/**
 * User Document.
 *
 * @export
 * @interface User
 * @typedef {User}
 * @extends {Document}
 */
export interface User extends Document {
  agency?: Types.ObjectId
  fullName: string
  email: string
  phone?: string
  password?: string
  birthDate?: Date
  verified?: boolean
  verifiedAt?: Date
  active?: boolean
  language: string
  enableEmailNotifications?: boolean
  avatar?: string
  bio?: string
  location?: string
  type?: movininTypes.UserType
  blacklisted?: boolean
  payLater?: boolean
  customerId?: string
  expireAt?: Date
}

/**
 * UserInfo.
 *
 * @export
 * @interface UserInfo
 * @typedef {UserInfo}
 */
export interface UserInfo {
  _id?: Types.ObjectId
  agency?: Types.ObjectId
  fullName: string
  email?: string
  phone?: string
  password?: string
  birthDate?: Date
  verified?: boolean
  verifiedAt?: Date
  active?: boolean
  language?: string
  enableEmailNotifications?: boolean
  avatar?: string
  bio?: string
  location?: string
  type?: string
  blacklisted?: boolean
  payLater?: boolean
}

/**
 * Booking Document.
 *
 * @export
 * @interface Booking
 * @typedef {Booking}
 * @extends {Document}
 */
export interface Booking extends Document {
  agency: Types.ObjectId
  location: Types.ObjectId
  property: Types.ObjectId
  renter: Types.ObjectId
  from: Date
  to: Date
  status: movininTypes.BookingStatus
  cancellation?: boolean
  cancelRequest?: boolean
  price: number
  sessionId?: string
  paymentIntentId?: string
  customerId?: string
  expireAt?: Date
  paypalOrderId?: string
}

/**
 * BookingInfo.
 *
 * @export
 * @interface BookingInfo
 * @typedef {BookingInfo}
 */
export interface BookingInfo {
  _id?: Types.ObjectId
  agency: UserInfo
  property: Types.ObjectId
  renter: UserInfo
  from: Date
  to: Date
  status: movininTypes.BookingStatus
  cancellation?: boolean
  cancelRequest?: boolean
  price: number
}

/**
 * LocationValue Document.
 *
 * @export
 * @interface LocationValue
 * @typedef {LocationValue}
 * @extends {Document}
 */
export interface LocationValue extends Document {
  language: string
  value: string
}

/**
 * Country Document.
 *
 * @export
 * @interface Location
 * @typedef {Location}
 * @extends {Document}
 */
export interface Country extends Document {
  values: Types.ObjectId[]
  name?: string
}

/**
 *CountryInfo.
 *
 * @export
 * @interface CountryInfo
 * @typedef {CountryInfo}
 */
export interface CountryInfo {
  _id?: Types.ObjectId
  name?: string
  values: LocationValue[]
}

/**
 * Location Document.
 *
 * @export
 * @interface Location
 * @typedef {Location}
 * @extends {Document}
 */
export interface Location extends Document {
  country: Types.ObjectId
  longitude?: number
  latitude?: number
  values: Types.ObjectId[]
  name?: string
  image?: string | null
  parentLocation?: Types.ObjectId
}

/**
 *LocationInfo.
 *
 * @export
 * @interface LocationInfo
 * @typedef {LocationInfo}
 */
export interface LocationInfo {
  _id?: Types.ObjectId
  longitude: number
  latitude: number
  name?: string
  image?: string | null
  values: LocationValue[]
  parentLocation?: Types.ObjectId
}

/**
 * Notification Document.
 *
 * @export
 * @interface Notification
 * @typedef {Notification}
 * @extends {Document}
 */
export interface Notification extends Document {
  user: Types.ObjectId
  message: string
  booking: Types.ObjectId
  isRead?: boolean
}

/**
 * NotificationCounter Document.
 *
 * @export
 * @interface NotificationCounter
 * @typedef {NotificationCounter}
 * @extends {Document}
 */
export interface NotificationCounter extends Document {
  user: Types.ObjectId
  count?: number
}

/**
 * Property Document.
 *
 * @export
 * @interface Property
 * @typedef {Property}
 * @extends {Document}
 */
export interface Property extends Document {
  name: string
  type: movininTypes.PropertyType
  agency: Types.ObjectId
  description: string
  image: string
  images?: string[]
  bedrooms: number
  bathrooms: number
  kitchens?: number
  parkingSpaces?: number,
  size?: number
  petsAllowed: boolean
  furnished: boolean
  minimumAge: number
  location: Types.ObjectId
  address?: string
  latitude?: number
  longitude?: number
  price: number
  hidden?: boolean
  cancellation?: number
  aircon?: boolean
  available?: boolean
  rentalTerm: movininTypes.RentalTerm
  blockOnPay?: boolean
}

/**
 * PropertyInfo.
 *
 * @export
 * @interface PropertyInfo
 * @typedef {PropertyInfo}
 * @extends {Document}
 */
export interface PropertyInfo extends Document {
  name: string
  type: movininTypes.PropertyType
  agency: UserInfo
  description: string
  image: string
  images?: string[]
  bedrooms: number
  bathrooms: number
  kitchens?: number
  parkingSpaces?: number,
  size: number
  petsAllowed: boolean
  furnished: boolean
  minimumAge: number
  location: Types.ObjectId
  address?: string
  price: number
  hidden?: boolean
  cancellation?: boolean
  rentalTerm: movininTypes.RentalTerm
}

/**
 * PushToken Document.
 *
 * @export
 * @interface PushToken
 * @typedef {PushToken}
 * @extends {Document}
 */
export interface PushToken extends Document {
  user: Types.ObjectId
  token: string
}

/**
 * Token Document.
 *
 * @export
 * @interface Token
 * @typedef {Token}
 * @extends {Document}
 */
export interface Token extends Document {
  user: Types.ObjectId
  token: string
  expireAt?: Date
}

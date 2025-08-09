import { getBooking } from "src/controllers/bookingController"

const routes = {
  create: '/api/create-booking',
  checkout: '/api/checkout',
  update: '/api/update-booking',
  updateStatus: '/api/update-booking-status',
  delete: '/api/delete-bookings',
  deleteTempBooking: '/api/delete-temp-booking/:bookingId/:sessionId',
  getBooking: '/api/booking/:id/:language',
  getBookingForGuest: '/api/guest-booking/:id/:language',
  getBookingId: '/api/booking-id/:sessionId',
  getBookings: '/api/bookings/:page/:size/:language',
  getRoomBookings: '/api/get-bookings/:roomId',
  hasBookings: '/api/has-bookings/:renter',
  cancelBooking: '/api/cancel-booking/:id',
  checkConflict: '/api/bookings/check-conflict'
}

export default routes

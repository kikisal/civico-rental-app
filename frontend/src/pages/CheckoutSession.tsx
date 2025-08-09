import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { strings } from '@/lang/checkout'
import Layout from '@/components/Layout'
import NoMatch from './NoMatch'
import * as StripeService from '@/services/StripeService'
import * as BookingService from '@/services/BookingService'
import * as UserService from '@/services/UserService'
import Info from './Info'
import CheckoutStatus from '@/components/CheckoutStatus'

import '@/assets/css/checkout-session.css'

function queryParam(key: string) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

const CheckoutSession = () => {
  const { sessionId } = useParams();
  const wasAuthenticated = queryParam("authenticated") === 'true' ? true : false;

  const [bookingId, setBookingId] = useState('')
  const [loading, setLoading] = useState(true)
  const [noMatch, setNoMatch] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!sessionId) {
    setNoMatch(true)
  }

  useEffect(() => {
    if (sessionId) {
      const checkSession = async () => {
        try {
          setLoading(true);
          const status = await StripeService.checkCheckoutSession(sessionId);
          const _bookingId = await BookingService.getBookingId(sessionId);
          
          setBookingId(_bookingId);

          // setNoMatch(status === 204 );
          setNoMatch(false);
          setSuccess(status === 200 || status === 204);
        } catch {
          setSuccess(false)
        } finally {
          setLoading(false)
        }
      }

      checkSession()
    }
  }, [sessionId]);

  return (
    <Layout>
      <div className="checkout-session">
        {
          loading
            ? <Info message={strings.CHECKING} hideLink />
            : (
              noMatch
                ? <NoMatch hideHeader />
                : (
                  success && bookingId ? (
                    <CheckoutStatus
                      bookingId={bookingId}
                      wasAuthenticated={wasAuthenticated}
                      language={UserService.getLanguage()}
                      status={success ? 'success' : 'error'}
                      className="status"
                    />
                  ) : (<span>Something went wrong, contact us on whatsapp to follow up with the order: +39 392 1841604 or +39 342 6377140 or send us an email to civico46rooms@gmail.com</span>)
                )
            )
        }
      </div>
    </Layout>
  )
}

export default CheckoutSession

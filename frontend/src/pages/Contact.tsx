import React, { useState } from 'react'
import * as movininTypes from ':movinin-types'
import Layout from '@/components/Layout'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

import '@/assets/css/contact.css'

const Contact = () => {
  const [user, setUser] = useState<movininTypes.User>()

  const onLoad = (_user?: movininTypes.User) => {
    setUser(_user)
  }

  const htmlContent = `	<div class="flex-info-container">
	<div class="container">
        <h1>Civico 46 Rooms</h1>
        <p class="email"><i class="fa-solid fa-envelope"></i> <a href="mailto:civico46rooms@gmail.com">civico46rooms@gmail.com</a></p>
        
        <div class="phones">
            <p><i class="fa-solid fa-phone"></i> <a href="tel:3921841604">392 184 1604</a></p>
            <p><i class="fa-solid fa-phone"></i> <a href="tel:3426377140">342 637 7140</a></p>
        </div>

        <p class="address"><i class="fa-solid fa-location-dot"></i> Santa Maria di Licodia, Via Regina Margherita 46, 95038, Sicilia, Italia</p>
        
        <!--
        <div class="socials">
            <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
        </div>
        -->

        <p class="website"><a href="https://civico46rooms.it" target="_blank">civico46rooms.it</a></p>
    </div>

	</div>`;

  return (
    <Layout onLoad={onLoad} strict={false}>
      <div className="contact" dangerouslySetInnerHTML={{__html: htmlContent}}>
        
      </div>
      <Footer />
    </Layout>
  )
}

export default Contact

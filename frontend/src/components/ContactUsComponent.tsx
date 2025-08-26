import React from 'react'
import { UNSAFE_getTurboStreamSingleFetchDataStrategy, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
// import * as UserService from "@/services/UserService";

// import '@/assets/css/contact-us.css';
import '@/assets/css/contact.css';

const ContactUsComponent = () => {
  const pageContent = `	<div class="flex-info-container">
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
    <div dangerouslySetInnerHTML={{ __html: pageContent }}></div>
  )
}

export default ContactUsComponent;

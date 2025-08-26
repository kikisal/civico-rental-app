import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, Tab, Dialog, DialogContent, Button } from '@mui/material'
import {
	RoomService,
	Apartment,
	AccessTime,
	AttachMoney,
	Public,
	FlashOn,
	CheckBox,
	Description,
	ContactSupportSharp,
} from '@mui/icons-material'
import L from 'leaflet'
import * as movininTypes from ':movinin-types'
import env from '@/config/env.config'
import { strings } from '@/lang/home'

import * as CountryService from '@/services/CountryService'
import * as LocationService from '@/services/LocationService'
import Layout from '@/components/Layout'
import SearchForm from '@/components/SearchForm'
import LocationCarrousel from '@/components/LocationCarrousel'
import TabPanel, { a11yProps } from '@/components/TabPanel'
import * as _GMap from '@/components/Map'; 
const GMap = _GMap.default;
import Footer from '@/components/Footer'

import '@/assets/css/home.css';

import ChevronLeftIcon from  "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axiosInstance from '@/services/axiosInstance'
import * as UserService from '@/services/UserService'
import AboutUsComponent from '@/components/AboutUsComponent'
import ContactUsComponent from '@/components/ContactUsComponent'

type AssetImage = {
	url: 		string,
	text: 		string | null,
	backdrop: 	string | null,
	image: 		HTMLImageElement | null,
	radius?: 	string | null,
	margin?:	number,
	textAlign?: "center" | "flex-start" | "flex-end",
	textPadding?: string,
};

type EventFunctionSign = () => void;
type DescriptionMap = {[key: string]: string};
		
let currentTimer: any 				  = null;
let bannerImages: AssetImage[] | null = null;
let loadingImages	  				  = false;
let sliderPosition					  = 0;
let productTranslations: Map<string, DescriptionMap> | null = null;
let roomCard: {[key: string]: any} | null = null;


const loadBannerImages = async (onBannerImageLoaded: EventFunctionSign) => {
	const promiseFromImgURL = (assetImage: AssetImage) => {
		return new Promise((res, rej) => {
			const onload = function() {
				assetImage.image = img;
				res(img);
			}

			const onerror = function() {
				rej(`Failed fetching image ${assetImage.url}`);
			}

			const img 	= new Image();
			img.src 	= location.protocol + "//" + location.host + `/assets/${assetImage.url}`;
			img.onload  = onload;
			img.onerror = onerror;
		});
	};

	if (bannerImages) {
		try {
			onBannerImageLoaded();
			return true;
		} catch(ex) {
			return false;
		}
	} else { 
		if (loadingImages) return false;

		loadingImages = true;

		try {
			const res  	   = await fetch(location.protocol + "//" + location.host + "/assets/assets.json");
			const data 	   = await res.json();
			const promises = [];
			for (const img of data.images)
				promises.push(promiseFromImgURL(img));
			
			await Promise.all(promises);
			bannerImages = data.images;
			onBannerImageLoaded();

			return true;
		} catch(ex) {
			return false;
		}
	}

	return false;
}

const loadTranslations = async () => {
	if (productTranslations) return true;

	productTranslations = new Map();

	try {
		const data = await axiosInstance.get('/api/get-translations').then((res) => res.data);
		const description = data.description;
		roomCard		  = data.roomCard;
		const products = Object.keys(description);

		for (const pId of products)
			productTranslations.set(pId, description[pId]);

	} catch(ex) {
		console.log('loadTranslations() Exception Caught: ', ex);
		return false;
	}

	return true;
};

const Home = () => {
	const navigate 	   					   = useNavigate()
	const roomInfoRef  					   = useRef<HTMLDivElement>(null);
	const [_bannerImages, setBannerImages] = useState<AssetImage[]>([]);
	const sliderImageSetRef 			   = useRef<HTMLDivElement>(null);
	const homeContentRef				   = useRef<HTMLDivElement>(null);

	const [countries, setCountries] = useState<movininTypes.CountryInfo[]>([]);

	const [tabValue, setTabValue] = useState(0)
	const [openLocationSearchFormDialog, setOpenLocationSearchFormDialog] = useState(false)
	const [locations, setLocations] = useState<movininTypes.Location[]>([])
	const [location, setLocation] = useState('')
	const [videoLoaded, setVideoLoaded] = useState(false)
	
	const _loadTranslations = async () => {
		if (await loadTranslations()) {
			const roomsCards = document.querySelectorAll('.room-card');
			if (!roomsCards) return;
			// const lang = UserService.
			const lang = UserService.getLanguage() as string;
			const _roomCard = roomCard;

			for (const roomCard of roomsCards) {
				const objId = roomCard.getAttribute('data-id');
				if (!objId) continue;
				let desc  = productTranslations!.get(objId);

				if (!desc) continue;
				const descText = desc[lang];

				const node = roomCard.querySelector('.room-description p') as HTMLParagraphElement;
				node.innerText = descText;

				if (!_roomCard) 
					continue;

				const infoText = _roomCard[lang];
				// const bedroomsNode = roomCard.querySelector('.bedrooms') as any;
				const detailsNode  = roomCard.querySelector('.details-link') as any;
				const fromNode	   = roomCard.querySelector('.from-label') as any;
				try {
					// bedroomsNode.innerText  = infoText.BEDROOM_LABEL;
					detailsNode.innerText   = infoText.DETAILS_LABEL;
					fromNode.innerText 		= infoText.FROM_LABEL + ' ';
				} catch(ex) {
					// ignore
				}
			}
		}
	}

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			const video = entry.target as HTMLVideoElement
			if (entry.isIntersecting) {
				video.muted = true
				video.play()
			} else {
				video.pause()
			}
		})
	}

	const onLoad = async () => {
		const _countries = await CountryService.getCountriesWithLocations('', true, env.MIN_LOCATIONS)
		setCountries(_countries)
		const _locations = await LocationService.getLocationsWithPosition()
		setLocations(_locations);
		const observer = new IntersectionObserver(handleIntersection);
		const video = document.getElementById('cover') as HTMLVideoElement
		if (video) {
			observer.observe(video);
		} else {
			console.error('Cover video not found')
		}
	};
	
	const onRoomInfoMounted = () => {
		const roomInfoSection = document.querySelector("div[section-id='room-info']");

		if (roomInfoSection) {
			const node = roomInfoSection.cloneNode(true) as HTMLDivElement;
			node.classList.remove("hidden");
			roomInfoRef.current?.appendChild(node);
		}
	};

	useEffect(() => {
		if (!roomInfoRef.current) {
			if (currentTimer)
				clearInterval(currentTimer);

			currentTimer = setInterval(() => {
				if (roomInfoRef.current) {
					onRoomInfoMounted();
					clearInterval(currentTimer);
					currentTimer = null;
					return;
				}
			}, 500);
		} else {
			onRoomInfoMounted();
		}

		return () => {
			clearInterval(currentTimer);
			currentTimer = null;
		};
	}, []);

	const onBannerImageLoaded = () => {
		console.log("onBannerImageLoaded()", bannerImages);
		if (bannerImages)
			setBannerImages(bannerImages);
	};

	const onSlideLeft = () => {
		if (!sliderImageSetRef.current || !bannerImages) 
			return;
		
		--sliderPosition;

		if (sliderPosition < 0) 
			sliderPosition = bannerImages.length - 1;

		sliderImageSetRef.current.style.transform = `translateX(${-sliderPosition * 100}%)`;
	};

	const onSlideRight = () => {
		if (!sliderImageSetRef.current || !bannerImages) 
			return;

		++sliderPosition;

		sliderPosition = sliderPosition % bannerImages.length;
		sliderImageSetRef.current.style.transform = `translateX(${-sliderPosition * 100}%)`;
	};

	useEffect(() => {
		_loadTranslations();

		if (!bannerImages) {
			loadBannerImages(onBannerImageLoaded);		
			return;
		}
		
		onBannerImageLoaded();

		return () => {
			sliderPosition = 0;
		}
	}, []);

	useEffect(() => {
		let seekIntervalObj: any = null;

		if (!homeContentRef.current) {
			const seekComponent = () => {
				if (homeContentRef.current) {
					clearInterval(seekIntervalObj);
					seekIntervalObj = null;
					updateBannerHeight();
				}
			};

			seekIntervalObj = setInterval(seekComponent, 500);
		}

		const updateBannerHeight = () => {
			if (!homeContentRef.current) return;

			if (window.innerWidth / window.innerHeight < 1) {
				const ratio = 1.5;
				const width = homeContentRef.current.getBoundingClientRect().width;
				const height = width / ratio;
				homeContentRef.current.style.height = `${height}px`;	
			} else {
				homeContentRef.current.style.height = `calc(100vh - 150px)`;
			}
		}

		const onKeyDown = (e: any) => {
			if (e.key == 'ArrowRight') {
				onSlideRight();
			} else if (e.key == "ArrowLeft") {
				onSlideLeft();
			}
		}

		updateBannerHeight();

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('resize', updateBannerHeight);
		return () => {
			window.removeEventListener('resize', updateBannerHeight);
			window.removeEventListener('keydown', onKeyDown);
			if (seekIntervalObj) {
				clearInterval(seekIntervalObj);
				seekIntervalObj = null;
			}
		}
	}, []);
	
	return (
		<Layout onLoad={onLoad} strict={false}>
			<div className="home">
				<div className="home-content" ref={homeContentRef}>
					<div className="slider-wrapper">
						<div className="slider-nav-wrapper">
							<div className="right-gradient"></div>
							<div className="left-gradient"></div>
							
							<div className="slider-nav-btn" onClick={onSlideLeft}>
								<ChevronLeftIcon htmlColor='#fff'></ChevronLeftIcon>
							</div>
							{/* <div className="slider-image-wrapper"></div> */}
							<div className="slider-nav-btn" onClick={onSlideRight}>
								<ChevronRightIcon htmlColor='#fff'></ChevronRightIcon>
							</div>
						</div>
						<div className='slider-image-set' ref={sliderImageSetRef}>
							{
								_bannerImages.map(
									(img, indx) => 
									<div className="slider-image" style={{left: `${indx * 100}%`, background: img.backdrop ? img.backdrop : "none"}}>
										{img.text && (<div className="image-text" style={{alignItems: img.textAlign ?? "center", padding: img.textPadding ?? "0"}}><span>{img.text}</span></div>)}
										<div className="image-content"><img alt="Image" src={img.image!.src} style={{
											backgroundColor: img.backdrop == null ? "#ccc" : img.backdrop,
											borderRadius: img.radius ? img.radius : "0",
											height: `${(100 - (img.margin ? img.margin : 0))}%`,
											width: `${window.innerWidth/window.innerHeight < 1 ? 100 : "auto"}%`
										}} /></div>
									</div>
								)
							}
{/* 							
							<div className="slider-image">
								<div className="image-text"><span>Text</span></div>
								<div className="image-content"><img alt="Image"/></div>
							</div>
							<div className="slider-image">
								<div className="image-text"><span>Text</span></div>
								<div className="image-content"><img alt="Image"/></div>
							</div> */}
						</div>
					</div>
					
					{/* <div className="home-title">{strings.WELCOME_LABEL + ` ${env.WEBSITE_NAME}`} </div>
					<div className="home-cover" style={{ maxWidth: "700px" }}>{strings.COVER}</div>
					<div className='home-site-description'><span>{strings.HOME_SITE_DESCRIPTION}</span></div> */}
					{/* <div className="home-subtitle">{strings.SUBTITLE}</div> */}

				</div>

				<div className="services">
					<div ref={roomInfoRef} className='rooms-ref'></div>
					<div className='about-us-component'><AboutUsComponent></AboutUsComponent></div>
					{/* <div>{(
						<div className="search">
							<div className="home-search">
								<SearchForm location='6881077a0f398f0c5686da50' />
							</div>
						</div>)}</div> */}
					{/* <h1 style={{ marginTop: "49px" }}>{strings.SERVICES_TITLE}</h1> */}

					{/* <div className="services-boxes">
						<div className="services-box">
							<div className="services-icon-wrapper">
								<Apartment className="services-icon" />
							</div>
							<div className="services-text-wrapper">
								<span className="services-title">{strings.SERVICES_FLEET_TITLE}</span>
								<span className="services-text">{strings.SERVICES_FLEET}</span>
							</div>
						</div>

						<div className="services-box">
							<div className="services-icon-wrapper">
								<AccessTime className="services-icon" />
							</div>
							<div className="services-text-wrapper">
								<span className="services-title">{strings.SERVICES_FLEXIBLE_TITLE}</span>
								<span className="services-text">{strings.SERVICES_FLEXIBLE}</span>
							</div>
						</div>

						<div className="services-box">
							<div className="services-icon-wrapper">
								<AttachMoney className="services-icon" />
							</div>
							<div className="services-text-wrapper">
								<span className="services-title">{strings.SERVICES_PRICES_TITLE}</span>
								<span className="services-text">{strings.SERVICES_PRICES}</span>
							</div>
						</div>

						<div className="services-box">
							<div className="services-icon-wrapper">
								<Public className="services-icon" />
							</div>
							<div className="services-text-wrapper">
								<span className="services-title">{strings.SERVICES_BOOKING_ONLINE_TITLE}</span>
								<span className="services-text">{strings.SERVICES_BOOKING_ONLINE}</span>
							</div>
						</div>

						<div className="services-box">
							<div className="services-icon-wrapper">
								<FlashOn className="services-icon" />
							</div>
							<div className="services-text-wrapper">
								<span className="services-title">{strings.SERVICE_INSTANT_BOOKING_TITLE}</span>
								<span className="services-text">{strings.SERVICE_INSTANT_BOOKING}</span>
							</div>
						</div>

						<div className="services-box">
							<div className="services-icon-wrapper">
								<RoomService className="services-icon" />
							</div>
							<div className="services-text-wrapper">
								<span className="services-title">{strings.SERVICES_SUPPORT_TITLE}</span>
								<span className="services-text">{strings.SERVICES_SUPPORT}</span>
							</div>
						</div>

					</div> */}
				</div>

				{countries.length > 0 && (
					<div className="destinations">
						<h1>{strings.DESTINATIONS_TITLE}</h1>
						<div className="tabs">
							<Tabs
								value={tabValue}
								onChange={handleTabChange}
								aria-label="destinations"
								TabIndicatorProps={{ sx: { display: env.isMobile ? 'none' : null } }}
								sx={{
									'& .MuiTabs-flexContainer': {
										flexWrap: 'wrap',
									},
								}}
							>
								{
									countries.map((country, index) => (
										<Tab key={country._id} label={country.name?.toUpperCase()} {...a11yProps(index)} />
									))
								}
							</Tabs>

							{
								countries.map((country, index) => (
									<TabPanel key={country._id} value={tabValue} index={index}>
										<LocationCarrousel
											locations={country.locations!}
											onSelect={(_location) => {
												setLocation(_location._id)
												setOpenLocationSearchFormDialog(true)
											}}
										/>
									</TabPanel>
								))
							}
						</div>
					</div>
				)}

				{/* <div className="home-map">
          <Map
            title={strings.MAP_TITLE}
            position={new L.LatLng(env.MAP_LATITUDE, env.MAP_LONGITUDE)}
            initialZoom={env.MAP_ZOOM}
            locations={locations}
            onSelelectLocation={async (locationId) => {
              setLocation(locationId)
              setOpenLocationSearchFormDialog(true)
            }}
          />
        </div> */}

				{/* <div className="customer-care">
					<div className="customer-care-wrapper">
						<div className="customer-care-text">
							<h1>{strings.CUSTOMER_CARE_TITLE}</h1>
							<h2>{strings.CUSTOMER_CARE_SUBTITLE}</h2>
							<div className="customer-care-content">{strings.CUSTOMER_CARE_TEXT}</div>
							<div className="customer-care-boxes">
								<div className="customer-care-box">
									<CheckBox className="customer-care-icon" />
									<span>{strings.CUSTOMER_CARE_ASSISTANCE}</span>
								</div>
								<div className="customer-care-box">
									<CheckBox className="customer-care-icon" />
									<span>{strings.CUSTOMER_CARE_MODIFICATION}</span>
								</div>
								<div className="customer-care-box">
									<CheckBox className="customer-care-icon" />
									<span>{strings.CUSTOMER_CARE_GUIDANCE}</span>
								</div>
								<div className="customer-care-box">
									<CheckBox className="customer-care-icon" />
									<span>{strings.CUSTOMER_CARE_SUPPORT}</span>
								</div>
							</div>
							<Button
								variant="contained"
								className="btn-primary btn-home"
								onClick={() => navigate('/contact')}
							>
								{strings.CONTACT_US}
							</Button>
						</div>

						<div className="customer-care-img">
							<img src="/customer-care.png" alt="" />
						</div>
					</div>
				</div> */}
				<div style={{marginBottom: "50px"}}>
					<ContactUsComponent></ContactUsComponent>
				</div>
				<Footer />
			</div>



			<Dialog
				fullWidth={env.isMobile}
				maxWidth={false}
				open={openLocationSearchFormDialog}
				onClose={() => {
					setOpenLocationSearchFormDialog(false)
				}}
			>
				<DialogContent className="search-dialog-content">
					<SearchForm
						location={location}
					// onCancel={() => {
					//   setOpenLocationSearchFormDialog(false)
					// }}
					/>
				</DialogContent>
			</Dialog>

		</Layout>
	)
}

export default Home

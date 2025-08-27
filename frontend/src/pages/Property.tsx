import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
	Button,
	FormControl,
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import Layout from '@/components/Layout'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/properties'
import * as helper from '@/utils/helper'
import * as PropertyService from '@/services/PropertyService'
import * as UserService from '@/services/UserService'
import PropertyInfo from '@/components/PropertyInfo'
import NoMatch from './NoMatch'
import ImageViewer from '@/components/ImageViewer'
import AgencyBadge from '@/components/AgencyBadge'
import DatePicker from '@/components/DatePicker'
import Footer from '@/components/Footer'
import Progress from '@/components/Progress'

import '@/assets/css/property.css'
import BookingCalendar from '@/components/booking-calendar/BookingCalendar'
import AboutUsComponent from '@/components/AboutUsComponent'
import ContactUsComponent from '@/components/ContactUsComponent'

function getTextByLang(lang: string, text: string) {
	const parts = text.split(/\n(?=[a-z]{2}\n)/g);
	const map: any = {};

	for (const part of parts) {
		const match = part.match(/^([a-z]{2})\n([\s\S]*)$/);
		if (match) {
			const [, code, content] = match;
			map[code] = content.trim();
		}
	}

	return map[lang] || null;
}

const Property = () => {
	const navigate = useNavigate()
	const location = useLocation();

	const _minDate = new Date()
	_minDate.setDate(_minDate.getDate() + 1)

	const [loading, setLoading] = useState(false)
	const [noMatch, setNoMatch] = useState(false)
	const [property, setProperty] = useState<movininTypes.Property>()
	const [image, setImage] = useState('')
	const [images, setImages] = useState<string[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [openImageDialog, setOpenImageDialog] = useState(false)
	const [from, setFrom] = useState<Date>()
	const [to, setTo] = useState<Date>()
	const [minDate, setMinDate] = useState<Date>()
	const [maxDate, setMaxDate] = useState<Date>()
	const [hideAction, setHideAction] = useState(false)
	const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
	const [priceLabel, setPriceLabel] = useState('');
	const [selectedDates, setSelectedDates] = useState<{start: string | null, end: string | null}>({ start: null, end: null });

	const [bedCount, setBedCount] = useState(0);

	useEffect(() => {
		const src = (_image: string) => movininHelper.joinURL(env.CDN_PROPERTIES, _image)

		if (property) {
			const _image = src(property.image)
			setImage(_image)
			const _images = property.images ? property.images.map(src) : []
			const __images = [_image, ..._images]
			setImages(__images)
		}
	}, [property])

	useEffect(() => {
		if (openImageDialog) {
			document.body.classList.add('stop-scrolling')
		} else {
			document.body.classList.remove('stop-scrolling')
		}
	}, [openImageDialog])

	const onLoad = async () => {
		const { state } = location;
		if (!state) {
			setNoMatch(true)
			return
		}
		const { propertyId } = state
		const { from: _from } = state
		const { to: _to } = state

		if (!propertyId) {
			setNoMatch(true)
			return
		}

		if (_from || _to) {
			setHideAction(false)
		}

		setLoading(true)
		const _language = UserService.getLanguage()
		setLanguage(_language)
		setFrom(_from || undefined)
		setTo(_to || undefined)
		setMinDate(_from || undefined)
		if (_to) {
			const _maxDate = new Date(_to)
			_maxDate.setDate(_maxDate.getDate() - 1)
			setMaxDate(_maxDate)
		}

		try {
			const _property = await PropertyService.getProperty(propertyId)

			if (_property) {
				setProperty(_property)
				const _priceLabel = await helper.priceLabel(_property, _language, bedCount)
				setPriceLabel(_priceLabel)
			} else {
				setNoMatch(true)
			}
		} catch (err) {
			helper.error(err)
		} finally {
			setLoading(false)
		}
	}

	let doRedirect = false;

	useEffect(() => {
		if (!doRedirect) return;

		setTimeout(() => {
			navigate("/property", {
				state: {
					propertyId: queryParams.get('p'),
					from: undefined,
					to: undefined
				}
			})
		});
	});	

	const queryParams = new URLSearchParams(window.location.search);
	if (queryParams.has("p")) {
		doRedirect = true;
		return (<></>);
	}

	let selectedDescription = "";
	if (property) {
		const tempDiv 		= document.createElement('div');
		tempDiv.innerHTML 	= property.description;

		selectedDescription = getTextByLang(language, tempDiv.innerText);
		if (!selectedDescription) {
			selectedDescription = property.description;
		}
	}

	const handleOnBooking = (bookingData: { roomId: string; startDate: string; endDate: string; totalNights: number }) => {
		// console.log('handleOnBooking()', bookingData);

		navigate('/checkout', {
			state: {
				propertyId: property!._id,
				locationId: property!.location._id,
				from: new Date(bookingData.startDate),
				to: new Date(bookingData.endDate),
				bedCount: bedCount
			}
		});
	}

	const handleDateSelect = (startDate: string | null, endDate: string | null) => {
    	setSelectedDates({ start: startDate, end: endDate });
	};

	return (
		<Layout onLoad={onLoad}>
			{
				!loading && property && image
				&& (
					<>
						<div className="main-page">
							<div className="property-card">
								<div className="property">
									<div className="images-container">
										{/* Main image */}
										<div className="main-image">
											<img
												className="main-image"
												alt=""
												src={image}
												onClick={() => setOpenImageDialog(true)}
											/>
										</div>

										{/* Additional images */}
										<div className="images">
											{
												images.map((_image, index) => (
													<div
														key={_image}
														className={`image${currentIndex === index ? ' selected' : ''}`}
														onClick={() => {
															setCurrentIndex(index)
															setImage(_image)
														}}
														role="button"
														tabIndex={0}
														aria-label="image"
													>
														<img alt="" className="image" src={_image} />
													</div>
												))
											}
										</div>
									</div>

									{/* Property info */}
									<div className="right-panel">
										<div className="right-panel-header">
											<div className="name"><h2>{property.name}</h2></div>
											{priceLabel && <div className="price">{priceLabel}</div>}
										</div>
										<PropertyInfo
											property={property}
											language={language}
											onBedCountChange={async (value) => {
												setBedCount(value);

												const _priceLabel = await helper.priceLabel(property, language, value)
												setPriceLabel(_priceLabel)
											}}
										/>
									</div>
								</div>

								{/* Property description */}
								<div className="description">
									{/* <div dangerouslySetInnerHTML={{ __html: selectedDescription }} /> */}
								</div>

								<div className="property-footer">
									{/* {env.HIDE_AGENCIES ? <div /> : <AgencyBadge agency={property.agency} />} */}

									{
										!hideAction
										// && (
										// 	<form
										// 		className="action"
										// 		onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
										// 			e.preventDefault()

										// 			navigate('/checkout', {
										// 				state: {
										// 					propertyId: property._id,
										// 					locationId: property.location._id,
										// 					from,
										// 					to,
										// 					bedCount: bedCount
										// 				}
										// 			})
										// 		}}
										// 	>
										// 		<FormControl className="from">
										// 			<DatePicker
										// 				label={commonStrings.FROM}
										// 				value={from}
										// 				minDate={new Date()}
										// 				maxDate={maxDate}
										// 				variant="outlined"
										// 				required

										// 				onChange={(date) => {
										// 					if (date) {
										// 						if (to && to.getTime() <= date.getTime()) {
										// 							setTo(undefined)
										// 						}

										// 						const __minDate = new Date(date)
										// 						__minDate.setDate(date.getDate() + 1)
										// 						setMinDate(__minDate)
										// 					} else {
										// 						setMinDate(_minDate)
										// 					}

										// 					setFrom(date || undefined)
										// 				}}
										// 				language={UserService.getLanguage()}
										// 			/>
										// 		</FormControl>
										// 		<FormControl className="to">
										// 			<DatePicker
										// 				label={commonStrings.TO}
										// 				value={to}
										// 				minDate={minDate}
										// 				variant="outlined"
										// 				required
										// 				onChange={(date) => {
										// 					if (date) {
										// 						setTo(date)
										// 						const _maxDate = new Date(date)
										// 						_maxDate.setDate(_maxDate.getDate() - 1)
										// 						setMaxDate(_maxDate)
										// 					} else {
										// 						setTo(undefined)
										// 						setMaxDate(undefined)
										// 					}
										// 				}}
										// 				language={UserService.getLanguage()}
										// 			/>
										// 		</FormControl>
										// 		<Button
										// 			type="submit"
										// 			variant="contained"
										// 			className="btn-action btn-book"
										// 		>
										// 			{strings.BOOK}
										// 		</Button>
										// 	</form>
										// )
										&& (<BookingCalendar
										roomId={property?.bookingRoomId}
										roomName={property?.name}
										locale={language}
										initialMonth={new Date()}
										onBooking={handleOnBooking}
										onDateSelect={handleDateSelect}
										className='booking-calendar'
										></BookingCalendar>)
									}

								</div>

								<ContactUsComponent contactUsTitle={true} lang={language}/>

							</div>

							{
								openImageDialog
								&& (
									<ImageViewer
										src={images}
										currentIndex={currentIndex}
										closeOnClickOutside
										title={property.name}
										onClose={() => {
											setOpenImageDialog(false)
										}}
									/>
								)
							}
						</div>

						<Footer />
					</>
				)
			}

			{loading && <Progress />}
			{noMatch && <NoMatch hideHeader />}
		</Layout>
	)
}

export default Property

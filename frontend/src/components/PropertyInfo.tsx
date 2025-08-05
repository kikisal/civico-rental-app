import React, { useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'
import {
	House as PropertyTypeIcon,
	SingleBed as BedroomsIcon,
	Shower as BathroomsIcon,
	AcUnit as AirconIcon,
	Countertops as KitchensIcon,
	DirectionsCar as ParkingSpacesIcon,
	Chair as FurnishedIcon,
	Pets as PetsAllowedIcon,
	Person as MinimumAgeIcon,
	Check as CheckIcon,
	Clear as UncheckIcon,
	Info as InfoIcon,
	LocationOn as LocationIcon,
	AttachMoney as RentalTermIcon,
	PhotoSizeSelectSmall as SizeIcon,
	Bed as BedIcon
} from '@mui/icons-material'

import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings as cpStrings } from '@/lang/property'
import { strings } from '@/lang/properties'
import * as helper from '@/utils/helper'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

import '@/assets/css/property-info.css'

const EXTRA_BEDS = env.EXTRA_BEDS;
const PRICE_PER_EXTRABED = env.PRICE_PER_EXTRABED;

const propertyInfoLangs: any = {
	it: {
		NO_EXTRA_BEDS: "Nessun letto extra",
		EXTRA_BEDS_LABEL: "Extra letti",
		BED_LABEL: "Letto",
		BEDS_LABEL: "Letti",
	},
	en: {
		NO_EXTRA_BEDS: "No extra beds",
		EXTRA_BEDS_LABEL: "Extra beds",
		BED_LABEL: "Bed",
		BEDS_LABEL: "Beds",
	},
	fr: {
		NO_EXTRA_BEDS: "Pas de lit supplémentaire",
		EXTRA_BEDS_LABEL: "Lits supplémentaires",
		BED_LABEL: "Lit",
		BEDS_LABEL: "Lits",
	},
	es: {
		NO_EXTRA_BEDS: "Sin cama extra",
		EXTRA_BEDS_LABEL: "Lits supplémentaires",
		BED_LABEL: "Cama",
		BEDS_LABEL: "Bett",
	},
	de: {
		NO_EXTRA_BEDS: "Kein Zustellbett",
		EXTRA_BEDS_LABEL: "Zustellbetten",
		BED_LABEL: "Lit",
		BEDS_LABEL: "Betten",
	},
};

function properyInfoStringsGet(language: any): any {
	if (!(language in propertyInfoLangs))
		return propertyInfoLangs['en'];

	return propertyInfoLangs[language];
}

interface PropertyInfoProps {
	property: movininTypes.Property
	description?: boolean
	className?: string
	language: string,
	onBedCountChange?: (value: number) => void
	bedCount?: number,
	disableBedSelection?: boolean
}

const PropertyInfo = ({
	property,
	description,
	className,
	language,
	onBedCountChange,
	bedCount = 0,
	disableBedSelection = false
}: PropertyInfoProps) => {
	const fr = langHelper.fr()
	const [cancellation, setCancellation] = useState('');

	if (!onBedCountChange) onBedCountChange = () => {/** do nothing */};

	useEffect(() => {
		const init = async () => {
			if (property && language) {
				const _cancellation = await helper.getCancellation(property.cancellation, language)
				setCancellation(_cancellation)
			}
		}

		init()
	}, [property, language])

	const getExtraIcon = (extra: number) => (extra === -1
		? <UncheckIcon className="unavailable" />
		: extra === 0
			? <CheckIcon className="available" />
			: <InfoIcon className="extra-info" />)

	const size = `${movininHelper.formatNumber(property.size as number, language)} ${env.SIZE_UNIT}`;

	return (
		(
			property
			&& (
				<div className={`property-info${className ? ` ${className}` : ''}`}>
					<ul className="property-info-list">
						<li className="property-type">
							<Tooltip title={helper.getPropertyType(property.type)} placement="top">
								<div className="property-info-list-item">
									<PropertyTypeIcon />
									<span className="property-info-list-text">{helper.getPropertyType(property.type)}</span>
								</div>
							</Tooltip>
						</li>
						<li className="bedrooms">
							<Tooltip title={helper.getBedroomsTooltip(property.bedrooms, fr)} placement="top">
								<div className="property-info-list-item">
									<BedroomsIcon />
									<span className="property-info-list-text">{property.bedrooms}</span>
								</div>
							</Tooltip>
						</li>
						<li className="bathrooms">
							<Tooltip title={helper.getBathroomsTooltip(property.bathrooms, fr)} placement="top">
								<div className="property-info-list-item">
									<BathroomsIcon />
									<span className="property-info-list-text">{property.bathrooms}</span>
								</div>
							</Tooltip>
						</li>
						<li className="kitchens">
							<Tooltip title={helper.getKitchensTooltip(property.kitchens)} placement="top">
								<div className="property-info-list-item">
									<KitchensIcon />
									<span className="property-info-list-text">{property.kitchens}</span>
								</div>
							</Tooltip>
						</li>
						<li className="parking-spaces">
							<Tooltip title={helper.getKParkingSpacesTooltip(property.parkingSpaces, fr)} placement="top">
								<div className="property-info-list-item">
									<ParkingSpacesIcon />
									<span className="property-info-list-text">{property.parkingSpaces}</span>
								</div>
							</Tooltip>
						</li>
						{
							property.furnished && (
								<li className="aircon">
									<Tooltip title={strings.FURNISHED_TOOLTIP} placement="top">
										<div className="property-info-list-item">
											<FurnishedIcon />
										</div>
									</Tooltip>
								</li>
							)
						}
						{
							property.aircon && (
								<li className="aircon">
									<Tooltip title={strings.AIRCON_TOOLTIP} placement="top">
										<div className="property-info-list-item">
											<AirconIcon />
										</div>
									</Tooltip>
								</li>
							)
						}
						{
							property.petsAllowed && (
								<li className="aircon">
									<Tooltip title={strings.PETS_ALLOWED_TOOLTIP} placement="top">
										<div className="property-info-list-item">
											<PetsAllowedIcon />
										</div>
									</Tooltip>
								</li>
							)
						}
					</ul>
					<ul className="extras-list">
						{
							property.size
							&& (
								<li>
									<Tooltip title={size} placement="left">
										<div className="property-info-list-item">
											<SizeIcon />
											<span className="property-info-list-text">{size}</span>
										</div>
									</Tooltip>
								</li>
							)
						}
						<li>
							<Tooltip title={property.cancellation > -1 ? strings.CANCELLATION_TOOLTIP : cancellation} placement="left">
								<div className="property-info-list-item">
									{getExtraIcon(property.cancellation)}
									<span className="property-info-list-text">{cancellation}</span>
								</div>
							</Tooltip>
						</li>
						{property.location.name && (
							<li>
								<Tooltip title={property.location.name} placement="left">
									<div className="property-info-list-item">
										<LocationIcon />
										<span className="property-info-list-text">{property.location.name}</span>
									</div>
								</Tooltip>
							</li>
						)}

						<li>
							<Tooltip title={cpStrings.MINIMUM_AGE} placement="left">
								<div className="property-info-list-item">
									<MinimumAgeIcon />
									<span className="property-info-list-text">{`${property.minimumAge} ${strings.YEARS}`}</span>
								</div>
							</Tooltip>
						</li>

						<li>
							<hr />
							<Tooltip title={properyInfoStringsGet(language).EXTRA_BEDS_LABEL} placement="left">
								<div className="property-info-list-item">
									<BedIcon />
									<span className="property-info-list-text">
										<div className="property-bed-options">
											<div className="property-bed-option">
												<span>{properyInfoStringsGet(language).EXTRA_BEDS_LABEL}:</span>
											</div>
											<div className="property-bed-option">
												<select className="property-bed-select" disabled={disableBedSelection} onChange={(e) => {
													onBedCountChange(parseInt(e.target.value));
												}}>
													<option selected={bedCount == 0} value="0">{properyInfoStringsGet(language).NO_EXTRA_BEDS}</option>
													{Array.from(Array(EXTRA_BEDS).keys()).map(e => (
														<option selected={bedCount == e + 1} value={e + 1}>{e + 1} {e == 0 ? properyInfoStringsGet(language).BED_LABEL : properyInfoStringsGet(language).BEDS_LABEL} +{(e + 1) * PRICE_PER_EXTRABED} €</option>
													))}
												</select>
											</div>
										</div>
									</span>
								</div>
							</Tooltip>
						</li>
						{description && (
							<li>
								<div className="property-info-list-item">
									<div
										className="property-info-description"
										dangerouslySetInnerHTML={{ __html: property.description }}
									/>
								</div>
							</li>
						)}
					</ul>
				</div>
			)
		)
		|| <></>
	)
}

export default PropertyInfo

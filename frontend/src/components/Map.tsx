import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import * as movininTypes from ':movinin-types'
// import * as UserService from '@/services/UserService'
import { strings } from '@/lang/map'
import * as LocationService from '@/services/LocationService'
import * as helper from '@/utils/helper'

import 'leaflet-boundary-canvas'
import 'leaflet/dist/leaflet.css'
import '@/assets/css/map.css'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

interface Marker {
  name: string,
  position: L.LatLng
}

const markers: Marker[] = [
  // { name: 'Athens (ATH)', position: new L.LatLng(37.983810, 23.727539) },
]
const zoomMarkers: Marker[] = [
  // { name: 'Athens Airport (ATH)', position: new L.LatLng(37.937225, 23.945238) },
  // { name: 'Athens Port Piraeus (ATH)', position: new L.LatLng(37.9495811, 23.6121006) },
]

interface ZoomTrackerProps {
  setZoom: Dispatch<SetStateAction<number>>
}

const ZoomTracker = ({ setZoom }: ZoomTrackerProps) => {
  const mapEvents = useMapEvents({
    zoom() {
      setZoom(mapEvents.getZoom())
    }
  })

  return null
}

interface ZoomControlledLayerProps {
  zoom: number
  minZoom: number
  children: ReactNode
}

const ZoomControlledLayer = ({ zoom, minZoom, children }: ZoomControlledLayerProps) => {
  if (zoom >= minZoom) {
    return (
      <>
        {children}
      </>
    )
  }
  return null
}

interface MapProps {
  title?: string
  position?: LatLngExpression
  initialZoom?: number,
  locations?: movininTypes.Location[]
  className?: string,
  children?: ReactNode
  onSelelectLocation?: (locationId: string) => void
}

const Map = ({
  title,
  position = new L.LatLng(31.792305849269, -7.080168000000015),
  initialZoom,
  locations,
  className,
  children,
}: MapProps) => {
  const _initialZoom = initialZoom || 5.5
  const [zoom, setZoom] = useState(_initialZoom)
  const [map, setMap] = useState<L.Map | null>(null)

  if (map) {
    map.attributionControl.setPrefix('')
  }

  //
  // Tile server
  //

  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  // const language = UserService.getLanguage()
  // let tileURL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
  // if (language === 'fr') {
  //   tileURL = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
  // }

  const getLocationMarkers = (): Marker[] => (
    (locations
      && locations
        .filter((l) => l.latitude && l.longitude)
        .map((l) => ({ name: l.name!, position: new L.LatLng(l.latitude!, l.longitude!) }))
    ) || []
  )

  const getMarkers = (__markers: Marker[]) =>
    __markers.map((marker) => (
      <Marker key={marker.name} position={marker.position}>
        <Popup className="marker">
          <div className="name">{marker.name}</div>
          <div className="action">
            { (
              <button
                type="button"
                className="action-btn"
                onClick={async () => {
                  // try {
                  //   if (onSelelectLocation) {
                  //     const { status, data } = await LocationService.getLocationId(marker.name, 'en')

                  //     if (status === 200) {
                  //       onSelelectLocation(data)
                  //     } else {
                  //       helper.error()
                  //     }
                  //   }
                  // } catch (err) {
                  //   helper.error(err)
                  // }
                  const link = document.createElement('a');
                  link.href = 'google.com/maps/place/Via+Regina+Margherita,+46,+95038+Santa+Maria+di+Licodia+CT/@37.6175844,14.8880866,20z/data=!4m6!3m5!1s0x13115180ec5b4cbf:0x11ec0a25356564b0!8m2!3d37.617611!4d14.8882705!16s%2Fg%2F11c5lm9z6y?entry=tts&g_ep=EgoyMDI1MDgyNS4wIPu8ASoASAFQAw%3D%3D&skid=bbb113bc-205c-4df7-a135-8958648db1e0';
                  link.target = '_blank';
                  link.click();
                  // alert(`clicked on marker: ${marker.name}`);
                }}
              >
                {strings.SELECT_LOCATION}
              </button>
            )}
          </div>
        </Popup>
      </Marker>
    ))

  return (
    <>
      {title && <h1 className="map-title">{title}</h1>}
      <MapContainer
        center={position}
        zoom={_initialZoom}
        className={`${className ? `${className} ` : ''}map`}
        ref={setMap}
        zoomControl={false}
        scrollWheelZoom={false}
        touchZoom={false}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileURL}
        />
        <ZoomTracker setZoom={setZoom} />
        <ZoomControlledLayer zoom={zoom} minZoom={7.5}>
          {
            getMarkers(zoomMarkers)
          }
        </ZoomControlledLayer>
        <ZoomControlledLayer zoom={zoom} minZoom={5.5}>
          {
            getMarkers(markers)
          }
        </ZoomControlledLayer>
        <ZoomControlledLayer zoom={zoom} minZoom={_initialZoom}>
          {
            getMarkers(getLocationMarkers())
          }
        </ZoomControlledLayer>
        {children}
      </MapContainer>
    </>
  )
}

export default Map

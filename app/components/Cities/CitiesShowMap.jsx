import React from 'react'
import _ from 'underscore'

import Map, { Marker, InfoWindow } from 'google-maps-react-pi'
import styles from './_Maps.scss'

class CitiesShowMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
  // "x": 4.674535,
  // "y": -74.084084,

  // console.log("+++ +++ center of map now:", new window.google.maps.LatLng(4.5, -74));

    return (   
      <div className={styles.map} >
        <Map google={window.google} zoom={14} initialCenter={{ lat: 4.674535, lng: -74.084084 }}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Name of the Place</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default CitiesShowMap

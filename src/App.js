import React, { Component } from 'react';
import './App.css';
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiY2hhbm55eGNoYW5ueSIsImEiOiJjamVhdW44djExM3lxMzNsZWYzb3d1dno0In0.7_sU_bkhGL412R_zN7_rQQ"
});

class App extends Component {

  constructor(props) {
    super(props);
  }

  onStyleLoad(map) {
    this.map = map;
    this.map.addLayer({
        "id": "terrain-data",
        "type": "circle",
        "source": {
            type: 'vector',
            url: 'mapbox://channyxchanny.trips'
        },
        'source-layer': 'console',
        "paint": {
          'circle-radius': 4,
          'circle-color': {
             property: 'speed',
             stops: [
             [0, '#ff0000'],
             [60, '#00ff00']
             ]
          }
        }
    });
  }

  render() {
    return (
      <div className="App">
        <Map className="Map"
          onStyleLoad={ this.onStyleLoad.bind(this) }
          apiUrl={'mapbox://channyxchanny.trips'}
          style='mapbox://styles/mapbox/dark-v9'
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[-122.5, 37.8]}
          zoom={[10]}
        />
        <div className="Legend">
          <p className="Legend-title">Car Speed</p>
          <svg className="Legend-gradient">
              <defs>
                  <linearGradient id="Gradient"
                       x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="red" />
                      <stop offset="100%" stopColor="green" />
                  </linearGradient>
              </defs>
              <rect x="0" y="0" width="150" height="50" fill= "url(#Gradient)" />
          </svg>
          <div className="Legend-container">
            <span className="Legend-container-item">0mph</span>
            <span className="Legend-container-item">30mph</span>
            <span className="Legend-container-item">60mph</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

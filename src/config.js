export const mapboxgl_access_token = 'pk.eyJ1IjoiamFtZXN0cmltYmxlIiwiYSI6InN2ZWdyRXcifQ.DUYTX94mn7OPzjO-ocG04Q';

// API url
export const url = [
  './data/',
  '.csv'
];

export const api = 'https://pmd3-production-drafter-onsgeo.publishmydata.com/v1/sparql/live?query=';

// Colors and options
export const colours = [
    "#86d1f7",/*"#1f77b4",*/ "#ff7f0e", "#3453a4",/*"#2ca02c",*/ "#d62728", "#81d693", /*"#9467bd",*/ "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
]; // d3.schemeCategory10, with some colours changed to be similar to CNN map
//export const colours = [
//  'rgb(43, 175, 219)',
//  'rgb(234, 56, 179)',
//  'rgb(43, 225, 179)',
//  'rgb(232, 241, 47)',
//  'rgb(247, 93, 43)'
//];

export const options = [
  {niceName: 'Ethnicity', varName: 'ethnicity'},
  {niceName: 'Social grade', varName: 'class'},
  {niceName: 'Hours worked', varName: 'hours'},
  {niceName: 'Housing type', varName: 'home'},
  {niceName: 'Housing tenure', varName: 'tenure'}
];

export const unitise = {
  'ethnicity': 'people',
  'class': 'people',
  'hours': 'workers',
  'home': 'homes',
  'tenure': 'homes'
};

export const mapConfig = {
  style: './data/style-omt-modified.json',
  center: [-1.2471735, 50.8625412],
  zoom: 5,
  maxZoom: 13,
  minZoom: 4
}

//TODO
export const newDotsSourceConfig = {
  "type": 'vector',
  "url": "mapbox://jamestrimble.5isnyyn3?ab=cd&fresh=true",   // FIXME: don't use fresh=true in production
  "promoteId": { "censusdots": "id" },
  "buffer": 0,
  "maxzoom": 13,
  "minzoom": 0
};

export const dotsSourceConfig = {
  "type": 'vector',
  "tiles": ['https://cdn.ons.gov.uk/maptiles/administrative/oa/v1/dots/{z}/{x}/{y}.pbf'],
  "promoteId": { "dots": "id" },
  "buffer": 0,
  "maxzoom": 13,
  "minzoom": 8
};

export const boundsSourceConfig = {
  "type": "vector",
  "promoteId": { "OA_bound_ethnicity": "oa11cd" },
  "tiles": ["https://cdn.ons.gov.uk/maptiles/t9/{z}/{x}/{y}.pbf"],
  "minzoom": 11,
  "maxzoom": 14
};

export const newDotsLayerConfig = {
  id: 'newdots',
  type: 'circle',
  source: 'newdots',
  'source-layer': 'censusdots',
  paint: {
    'circle-color':
      ["get", "category"],
    'circle-radius':
      ['interpolate', ['linear'], ['zoom'], 4, .5, 8, 1.1, 12, 1.7, 14, 2.2],
      //['interpolate', ['linear'], ['zoom'], 4, .2, 7, 1, 8, 1.4, 8.999999, 2, 9, 1.4, 9.999999, 2, 10, 1.4, 10.999999, 2, 11, 1.4, 11.999999, 2, 12, 1.7, 14, 2.5],
    'circle-opacity': .8
  }
};

export const dotsLayerConfig = {
  id: 'dots-join',
  type: 'circle',
  source: 'dots',
  'source-layer': 'dots',
  paint: {
    'circle-color':
      ['case',
        ['!=', ['feature-state', 'color'], null],
        ['feature-state', 'color'],
        'rgba(0, 0, 0, 0)'
      ],
    'circle-radius':
      ['interpolate', ['linear'], ['zoom'], 2, .5, 8, 2, 12, 2, 14, 3],
    'circle-opacity': .8
  }
};

export const boundsLayerConfig = {
  id: 'bounds',
  type: 'fill',
  source: 'bounds',
  'source-layer': 'OA_bound_ethnicity',
  "paint": {
    "fill-outline-color": "#ffffff",
    "fill-color": "#ffffff",
    "fill-opacity": 0
  }
};

export const boundsLinesLayerConfig = {
  id: 'boundslines',
  type: 'line',
  source: 'bounds',
  'source-layer': 'OA_bound_ethnicity',
  "paint": {
    "line-opacity": [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      1
    ],
    "line-color": "rgb(255, 255, 255)",
    "line-width": 1
  }
};

export const centroidsSourceConfig = {
  "type": "geojson",
  "promoteId": "code"
};

export const centroidsLayerConfig = {
  id: 'centroids',
  type: 'circle',
  source: 'centroids',
  paint: {
    'circle-opacity': 0,
    'circle-radius': 0
  }
};

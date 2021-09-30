export const mapboxgl_access_token = 'pk.eyJ1IjoiYXJrYmFyY2xheSIsImEiOiJjamdxeDF3ZXMzN2IyMnFyd3EwdGcwMDVxIn0.P2bkpp8HGNeY3-FOsxXVvA';

// API url
export const url = [
  './data/',
  '.csv'
];

export const api = 'https://pmd3-production-drafter-onsgeo.publishmydata.com/v1/sparql/live?query=';

// Colors and options
export const colours = [
  'rgb(43, 175, 219)',
  'rgb(234, 56, 179)',
  'rgb(43, 225, 179)',
  'rgb(232, 241, 47)',
  'rgb(247, 93, 43)'
];

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
  style: './data/style-omt.json',
  center: [-1.2471735, 50.8625412],
  zoom: 12,
  maxZoom: 14,
  minZoom: 8
}

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
      ['interpolate', ['linear'], ['zoom'], 8, 1, 12, 1.5, 14, 2],
    'circle-opacity': 1
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
      0
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

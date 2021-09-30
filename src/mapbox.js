import { mapboxgl_access_token } from './config.js';

import mapbox from 'mapbox-gl';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = mapboxgl_access_token;

const key = {};

export { mapbox, key };

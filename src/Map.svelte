<script>
	import { onMount, setContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';

	setContext(key, {
		getMap: () => map
	});

	export let config;

	let container;
	let map;

  // Create popup class for map tooltips
  var popup = new mapbox.Popup({
    closeButton: false,
    closeOnClick: false
  });

  let listeners = [];  // Save the arguments passed to the `on` function before
                       // map is loaded

  export const addSource = (id, source) => map.addSource(id, source);
  export const addLayer = (layer, beforeId) => map.addLayer(layer, beforeId);
  export const areTilesLoaded = () => map.areTilesLoaded();
  export const getZoom = () => map.getZoom();
  export const querySourceFeatures = (sourceId, parameters) => map.querySourceFeatures(sourceId, parameters);
  export const getFeatureState = (feature) => map.getFeatureState(feature);
  export const setFeatureState = (feature, state) => map.setFeatureState(feature, state);
  export const removeFeatureState = (feature, key) => map.removeFeatureState(feature, key);
  export const isSourceLoaded = (id) => map.isSourceLoaded(id);
  export const queryRenderedFeatures = (geometry, options) => map.queryRenderedFeatures(geometry, options);
  export const setPaintProperty = (layerId, name, value) => map.setPaintProperty(layerId, name, value);
  export const setFilter = (layerId, filter) => map.setFilter(layerId, filter);

  export function on(type, layerId, listener) {
    if (map)
      map.on(type, layerId, listener);
    else
      listeners.push({type, layerId, listener});
  }

  export const removePopup = () => popup.remove();

  // Populate the popup and set its coordinates
  // based on the feature found.
  export function populatePopup(data, hoveredId, colours, lngLat) {
    let popupHtml = `<strong>Output area ${hoveredId}</strong>`;
    data.headers.forEach(function(header, i) {
      popupHtml += `<br><span class="dot mr-1" style="background-color:${colours[i]}"></span>${header.name}: ${data.values[hoveredId].counts[i]}`;
    });
    popup
      .setLngLat(lngLat)
      .setHTML(popupHtml)
      .addTo(map);
  }

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

		link.onload = () => {
			map = new mapbox.Map({
				container,
				...config
			});
			listeners.forEach(({type, layerId, listener}) => {
        map.on(type, layerId, listener);
      });
		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});
</script>

<div bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

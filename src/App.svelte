<script>
	import { onMount } from 'svelte';
	import { csvParse } from 'd3';
	import Map from './Map.svelte';
	import MapMarker from './MapMarker.svelte';
  import * as config from './config.js';
  import { tsv2json, json2geo, peoplePerDot, calculateVisiblePercentages } from './utils.js';

  var data = {
    'headers': [],
    'values': {},
    'totals': [],
    'perc': [],
  };

  // TODO: consider making sure centroids load before data, or something like that
  let centroidsAdded = false;

  let map;
  let selectorValue;
  let units;

  let count = "";
  let spinnerDisplayStyle = "flex";

  // DOM elements
  // TODO: un-comment postcode search
  //const form = document.getElementById('form');
  const postcode = document.getElementById('postcode');

  // TODO: possibly re-add feature that caches data using `store` variable

  function showData(data, dim) {
    genLegend(data);
    clearDots();
    updateDots();
    units = config.unitise[dim];
    spinnerDisplayStyle = 'none';
  }

  // Function to get data
  function getData(dim) {
    spinnerDisplayStyle = 'flex';
    let dataurl = config.url[0] + dim + config.url[1];
    fetch(dataurl)
      .then((response) => {
        return response.text();
      })
      .then((tsvdata) => {
        var t1 = performance.now();
        data = tsv2json(tsvdata);
        var t2 = performance.now();
        console.log("tsv2json time", t2 - t1);
        showData(data, dim);
      });
  }

  // Function to get color for a value based on breaks
  function getColor(value, breaks) {
    for (let i=0; i<breaks.length; i++) {
      if (value <= breaks[i]) {
        //if (/*FIXME*/ true || document.getElementById('legend' + i).checked) {
        if (data.headers[i].checked) {
          return config.colours[i];
        } else {
          return null;
        }
      }
    }
    console.log(value, breaks);
    console.warn("Reached a unexpected place in getColor()");
    return null;
  }

  // Function to add layers to map
  function makeLayers() {

    // Variable for highlighting areas
    let hoveredId = null;

    map.addSource('dots', config.dotsSourceConfig);
    map.addSource('bounds', config.boundsSourceConfig);

    map.addLayer(config.dotsLayerConfig, 'boundary_country');
    map.addLayer(config.boundsLayerConfig, 'boundary_country');
    map.addLayer(config.boundsLinesLayerConfig, 'boundary_country');

    // Show data on hover
    map.on('mousemove', 'bounds', function (e) {
      if (e.features.length > 0) {
        if (hoveredId) {
          map.setFeatureState(
            { source: 'bounds', sourceLayer: 'OA_bound_ethnicity', id: hoveredId },
            { hover: false }
          );
        }
        hoveredId = e.features[0].id;
        map.setFeatureState(
          { source: 'bounds', sourceLayer: 'OA_bound_ethnicity', id: hoveredId },
          { hover: true }
        );

        map.populatePopup(data, hoveredId, config.colours, e.lngLat);
      }
    });

    // Remove tooltips on mouseleave
    map.on('mouseleave', 'bounds', function () {
      if (hoveredId) {
        map.setFeatureState(
          { source: 'bounds', sourceLayer: 'OA_bound_ethnicity', id: hoveredId },
          { hover: false }
        );
      }
      hoveredId = null;

      map.removePopup();
    });

    // Update legend on zoom
    map.on('zoom', function () {
      updateUnits();
    });
  }

  // Function to set properties of map features
  function setProperties(dots) {
    //console.log(data.values.E00115816);
    for (let dot of dots) {
      let code = dot.substring(0, 9);
      let num = +dot.substring(9);
      let color = getColor(num, data.values[code].breaks);

      map.setFeatureState({
        source: 'dots',
        sourceLayer: 'dots',
        id: dot
      }, { color });
    }
    // TODO: make sure it's okay to 
    if (centroidsAdded && map.isSourceLoaded('centroids')) {
      updateLegend();
    }
  }

  // Function to check if new dots have been loaded
  function updateDots() {
    let startTime = performance.now();
    if (data.totals[0]) {
      let features = map.querySourceFeatures('dots', { 'sourceLayer': 'dots' });
      let newdots = [];
      for (let feature of features) {
        let id = feature.properties.id;
        let state = map.getFeatureState({
          source: 'dots',
          sourceLayer: 'dots',
          id: id
        });
        if (!state['color']) {
          newdots.push(id);
        }
      }
      setProperties(newdots);
      let endTime = performance.now();
      //console.log(endTime - startTime, "ms elapsed");
    }
  }

  function updateLegend() {
    // Add add group counts for each visible feature
    let features = map.queryRenderedFeatures({ layers: ['centroids'] });
    let ids = features.map(feature => feature.id);
    let perc = calculateVisiblePercentages(data, ids);
    for (let i=0; i<perc.length; i++)
      document.getElementById('perc' + i).innerHTML = perc[i] + '%';
  }

  // Function to clear map dots styling
  function clearDots() {
    map.removeFeatureState({
      source: 'dots',
      sourceLayer: 'dots'
    });
  }

  // Function to add legend scale
  function genLegend(data) {
// FIXME: make the following work (maybe in the Svelte HTML?)
//    for (let i=0; i<data.headers.length; i++) {
//      let element = document.getElementById('legend' + i);
//      element.onclick = () => {
//        clearDots();
//        updateDots();
//      };
//    }
  }

  // Function to load OA centroids (for calculating averages in view)
  function loadCentroids() {
    fetch(config.url[0] + 'oalatlng' + config.url[1])
    .then(response => response.text())
    .then(rawdata => {
      let t1 = performance.now();
      let geojson = json2geo(csvParse(rawdata));
      let t2 = performance.now();
      console.log("json2geo time", t2 - t1);
      console.log(geojson);
      map.addSource('centroids', {data: geojson, ...config.centroidsSourceConfig});
      centroidsAdded = true;
      map.addLayer(config.centroidsLayerConfig);
    })
  }

  // Function to display units based on zoom
  function updateUnits() {
    count = peoplePerDot(map.getZoom());
  }

  //// Function to get a postcode lng/lat from COGS
  //function gotoPostcode(e) {
  //  let code = postcode.value.replace(new RegExp(' ', 'g'), '').toUpperCase();
  //  let query = `SELECT ?lat ?lng
  //  WHERE {
  //    <http://statistics.data.gov.uk/id/postcode/unit/${code}> <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat ;
  //    <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?lng .
  //  }
  //  LIMIT 1`;
  //  fetch(config.api + encodeURIComponent(query))
  //    .then(response => response.text())
  //    .then(rawdata => d3.csvParse(rawdata))
  //    .then(data => {
  //      if (data[0]) {
  //        map.flyTo({
  //          center: [data[0].lng, data[0].lat],
  //          zoom: 14
  //        });
  //      } else {
  //        postcode.value = null;
  //        postcode.placeholder = "Not found. Type a postcode...";
  //      }
  //    });
  //  e.preventDefault();
  //}

	onMount(() => {
    // ADD LAYERS + DATA ONCE MAP IS INITIALISED
    map.on('load', function () {
      //genOptions(config.options);
      makeLayers();
      updateUnits();
      loadCentroids();
      getData(selectorValue);
    });

    // Set up an event listener on the map.
    map.on('sourcedata', function (e) {
      if (map.areTilesLoaded()) {
        updateDots();
      }
    });
  });

  //// Set event listener on postcode search
  //form.addEventListener('submit', gotoPostcode);
</script>

<style>
  body {
    background-color: #222222;
  }

  .h4 {
    font-size: 1.4em;
  }

  :global(.mr-1) {
    margin-right: .25rem !important;
  }

  :global(.mb-1) {
    margin-bottom: .25rem !important;
  }

  #map {
    height: 100vh;
    width: 100vw;
  }

  #nav {
    position: absolute;
    pointer-events: none;
    z-index: 100;
  }

  #search {
    background-color: #222222dd;
    color: #eeeeee;
    pointer-events: all;
  }

  #loader {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #22222277;
    z-index: 90;
  }

  :global(.mapboxgl-popup-content) {
    padding: 3px 6px !important;
  }

  :global(.dot) {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
  }
</style>

<div id="nav" class="container-fluid">
  <div class="row">
    <div id="search" class="col-sm-7 col-md-5 col-lg-4 col-xl-3 p-3 mr-auto">
      <p class="font-weight-bold h4">Census Dot Density, 2011</p>
      <form id="form" class="mb-2">
        <div class="form-row my-2">
          <div class="col-9">
            <input type="text" id="postcode" class="form-control form-control-sm" placeholder="Enter postcode..." />
          </div>
          <div class="col-3">
            <button type="submit" class="btn btn-info btn-sm btn-block">Go!</button>
          </div>
        </div>
      </form>
      <div class="form-row mb-2">
        <div class="col">
          <select class="form-control form-control-sm"
                  bind:value={selectorValue}
                  on:change={() => getData(selectorValue)}>
                    {#each config.options as option, i}
                      {#if i === 0}
                        <option value="{option.varName}" selected>{option.niceName}</option>
                      {:else}
                        <option value="{option.varName}">{option.niceName}</option>
                      {/if}
                    {/each}
                  </select>
        </div>
      </div>
      <div id="legend"> 
        {#each data.headers as h, i}
          <p class="mb-1">
            <span class="dot mr-1" style="background-color: {config.colours[i]}"></span>
            <input type="checkbox" bind:checked={h.checked} on:change={() => {clearDots(); updateDots();}}/>
            <small>
              {h.name}
              <span id="perc{i}"></span>
              <span class="text-secondary">({data.perc[i]}%)</span>
            </small>
          </p>
        {/each}
      </div>
      <p class="mt-2 mb-0">1 dot = <span id="count">{count}</span> <span id="units">{units}</span></p>
      <p class="mb-0"><small>% in this area <span class="text-secondary">(% national avg)</span></small></p>
    </div>
  </div>
</div>
<div id="loader" class="justify-content-center" style="display: {spinnerDisplayStyle};">
  <div class="spinner-border text-secondary m-auto" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
<Map bind:this={map} config={config.mapConfig}>
</Map>

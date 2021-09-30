// Function to turn CSV (string) into array of objects
export function tsv2json(string) {
  let json = {
    'headers': [],
    'values': {},
    'totals': [],
    'perc': [],
  };
  string = string.replace(/['"]+/g, '');
  let array = string.split('\n');
  let headers = array[0].split(',');
  headers.shift();
  json.headers = headers;
  json.totals = new Array(headers.length).fill(0);
  for (var i = 1; i < array.length; i++) {
    let row = array[i].split(',');
    if (row[1]) {
      let tot = 0;
      let counts = [];
      let breaks = [];
      for (let j = 1; j < row.length; j++) {
        let val = +row[j];
        tot += val;
        counts.push(val);
        breaks.push(Math.round(tot / 10));  // TODO: maybe improve breaks
        json.totals[j - 1] += val;
      }
      json.values[row[0]] = {
        'counts': counts,
        'breaks': breaks
      }
    }
  }
  let sum = json.totals.reduce((a, b) => a + b);
  for (let tot in json.totals) {
    json.perc.push(Math.round(100 * (json.totals[tot] / sum)));
  }
  return json;
}

// Function to convert JSON to GeoJSON
export function json2geo(json) {
  let geojson = {
    "type": "FeatureCollection",
    "features": []
  };
  for (let item of json) {
    let feature = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [+item.lng, +item.lat]
      },
      "properties": {
        "code": item.code
      }
    };
    geojson.features.push(feature);
  }
  return geojson;
}

export function peoplePerDot(zoom) {
  //FIXME
  if (zoom >= 13) return 10;
  if (zoom === 12) return 20;
  if (zoom === 11) return 40;
  if (zoom === 10) return 80;
  if (zoom === 9) return 160;
  return 320;
}

function toRoundedPercentages(counts) {
  const sum = counts.reduce((a, b) => a + b);
  return counts.map((num) => Math.round((num / sum) * 100));
}

export function calculateVisiblePercentages(data, ids) {
  let counts = new Array(data.headers.length).fill(0);
  // TODO: deduplicate IDs using a set to be make sure there are no duplicates?
  // ids = ids.filter((v, i, a) => a.indexOf(v) === i);
  for (let id of ids) {
    let values = data.values[id].counts;
    for (let i=0; i<values.length; i++) {
      counts[i] += values[i];
    }
  }
  return toRoundedPercentages(counts);
}

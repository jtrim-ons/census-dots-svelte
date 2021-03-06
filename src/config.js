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

//export const options = [
//  {niceName: 'Ethnicity', varName: 'ethnicity'},
//  {niceName: 'Social grade', varName: 'class'},
//  {niceName: 'Hours worked', varName: 'hours'},
//  {niceName: 'Housing type', varName: 'home'},
//  {niceName: 'Housing tenure', varName: 'tenure'}
//];
export const options =
[
  {
    "niceName": "Ethnic group",
    "varName": "KS201EW_Ethnic_group_All_usual_residents",
    "tileset": "Usual_residents_1",
    "units": "usual residents"
  },
  {
    "niceName": "National identity",
    "varName": "KS202EW_National_identity_All_usual_residents",
    "tileset": "Usual_residents_1",
    "units": "usual residents"
  },
  {
    "niceName": "Country of birth",
    "varName": "KS204EW_Country_of_birth_All_usual_residents",
    "tileset": "Usual_residents_1",
    "units": "usual residents"
  },
  {
    "niceName": "Religion",
    "varName": "KS209EW_Religion_All_usual_residents",
    "tileset": "Usual_residents_2",
    "units": "usual residents"
  },
  {
    "niceName": "Health and provision of unpaid care",
    "varName": "KS301EW_Health_and_provision_of_unpaid_care_All_usual_residents",
    "tileset": "Usual_residents_2",
    "units": "usual residents"
  },
  {
    "niceName": "Sex",
    "varName": "QS104EW_Sex_All_usual_residents",
    "tileset": "Usual_residents_2",
    "units": "usual residents"
  },
  {
    "niceName": "Second address",
    "varName": "QS106EW_Second_address_All_usual_residents",
    "tileset": "Usual_residents_3",
    "units": "usual residents"
  },
  {
    "niceName": "Ethnic group",
    "varName": "QS201EW_Ethnic_group_All_usual_residents",
    "tileset": "Usual_residents_3",
    "units": "usual residents"
  },
  {
    "niceName": "Country of birth  detailed ",
    "varName": "QS203EW_Country_of_birth__detailed__All_usual_residents",
    "tileset": "Usual_residents_3",
    "units": "usual residents"
  },
  {
    "niceName": "Religion",
    "varName": "QS208EW_Religion_All_usual_residents",
    "tileset": "Usual_residents_4",
    "units": "usual residents"
  },
  {
    "niceName": "Provision of unpaid care",
    "varName": "QS301EW_Provision_of_unpaid_care_All_usual_residents",
    "tileset": "Usual_residents_4",
    "units": "usual residents"
  },
  {
    "niceName": "General health",
    "varName": "QS302EW_General_health_All_usual_residents",
    "tileset": "Usual_residents_4",
    "units": "usual residents"
  },
  {
    "niceName": "Long term health problem or disability",
    "varName": "QS303EW_Long_term_health_problem_or_disability_All_usual_residents",
    "tileset": "Usual_residents_5",
    "units": "usual residents"
  },
  {
    "niceName": "Year of arrival in UK",
    "varName": "QS801EW_Year_of_arrival_in_UK_All_usual_residents",
    "tileset": "Usual_residents_5",
    "units": "usual residents"
  },
  {
    "niceName": "Length of residence in the UK",
    "varName": "QS803EW_Length_of_residence_in_the_UK_All_usual_residents",
    "tileset": "Usual_residents_5",
    "units": "usual residents"
  },
  {
    "niceName": "Household size",
    "varName": "QS406EW_Household_size_All_household_spaces_with_at_least_one_usual_resident",
    "tileset": "Household_spaces_1",
    "units": "household spaces with at least one usual resident"
  },
  {
    "niceName": "Number of rooms",
    "varName": "QS407EW_Number_of_rooms_All_household_spaces_with_at_least_one_usual_resident",
    "tileset": "Household_spaces_1",
    "units": "household spaces with at least one usual resident"
  },
  {
    "niceName": "Number of bedrooms",
    "varName": "QS411EW_Number_of_bedrooms_All_household_spaces_with_at_least_one_usual_resident",
    "tileset": "Household_spaces_2",
    "units": "household spaces with at least one usual resident"
  },
  {
    "niceName": "Central heating",
    "varName": "QS415EW_Central_heating_All_household_spaces_with_at_least_one_usual_resident",
    "tileset": "Household_spaces_2",
    "units": "household spaces with at least one usual resident"
  },
  {
    "niceName": "Household composition",
    "varName": "KS105EW_Household_composition_All_households",
    "tileset": "Households_1",
    "units": "households"
  },
  {
    "niceName": "Household language",
    "varName": "KS206EW_Household_language_All_households",
    "tileset": "Households_1",
    "units": "households"
  },
  {
    "niceName": "Tenure",
    "varName": "KS402EW_Tenure_All_households",
    "tileset": "Households_1",
    "units": "households"
  },
  {
    "niceName": " Rooms  bedrooms and central heating ",
    "varName": "KS403EW__Rooms__bedrooms_and_central_heating__All_households",
    "tileset": "Households_2",
    "units": "households"
  },
  {
    "niceName": "Household composition   Households",
    "varName": "QS113EW_Household_composition___Households_All_households",
    "tileset": "Households_2",
    "units": "households"
  },
  {
    "niceName": "Households by deprivation dimensions",
    "varName": "QS119EW_Households_by_deprivation_dimensions_All_households",
    "tileset": "Households_2",
    "units": "households"
  },
  {
    "niceName": "Accommodation type   Households",
    "varName": "QS402EW_Accommodation_type___Households_All_households",
    "tileset": "Households_3",
    "units": "households"
  },
  {
    "niceName": "Occupancy rating  rooms ",
    "varName": "QS408EW_Occupancy_rating__rooms__All_households",
    "tileset": "Households_3",
    "units": "households"
  },
  {
    "niceName": "Persons per room   Households",
    "varName": "QS409EW_Persons_per_room___Households_All_households",
    "tileset": "Households_4",
    "units": "households"
  },
  {
    "niceName": "Persons per bedroom   Households",
    "varName": "QS413EW_Persons_per_bedroom___Households_All_households",
    "tileset": "Households_4",
    "units": "households"
  },
  {
    "niceName": "Marital and civil partnership status",
    "varName": "KS103EW_Marital_and_civil_partnership_status_All_usual_residents_aged_16_and_over",
    "tileset": "Adults_1",
    "units": "usual residents aged 16 and over"
  },
  {
    "niceName": "Qualifications and students",
    "varName": "KS501EW_Qualifications_and_students_All_usual_residents_aged_16_and_over",
    "tileset": "Adults_1",
    "units": "usual residents aged 16 and over"
  },
  {
    "niceName": "Highest level of qualification",
    "varName": "QS501EW_Highest_level_of_qualification_All_usual_residents_aged_16_and_over",
    "tileset": "Adults_1",
    "units": "usual residents aged 16 and over"
  }
];

//export const unitise = {
//  'ethnicity': 'people',
//  'class': 'people',
//  'hours': 'workers',
//  'home': 'homes',
//  'tenure': 'homes'
//};

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

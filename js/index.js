const u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
const identity = [u.substr(0, 8), u.substr(8, 4), `4000-8${u.substr(13, 3)}`, u.substr(16, 12)].join('-');

const config = {
  host: 'sense-demo.qlik.com',
  secure: true,
  port: 443,
  prefix: '',
  identity: identity,
  appId: '133dab5d-8f56-4d40-b3e0-a6b401391bde', // Helpdesk
};

const configMap = {
  host: 'sense-demo.qlik.com',
  secure: true,
  port: 443,
  prefix: '',
  identity: identity,
  appId: '4052680c-fd97-4f49-ac83-e026cdd26d65',
};

const init = async () => {
  const { qdtEnigma, qdtCompose, QdtList, QdtSelections, QdtPicasso, useBarChartSettings, QdtMapBox } = window.QdtComponents;

  const engineApiAppPromise = qdtEnigma(config);
  const engineApiAppMapPromise = qdtEnigma(configMap);
  
  const app = await engineApiAppPromise;
  const appMap = await engineApiAppMapPromise;
  
  qdtCompose({
    element: document.getElementById('qdtlist'),
    component: QdtList,
    app,
    options: { height: 300 },
    properties: {
      qListObjectDef: {
        qDef: {
          qFieldDefs: ['Case Owner'],
        },
        qInitialDataFetch: [{
          qWidth: 1,
          qHeight: 1000,
        }],
      },
    }
  });

  qdtCompose({
    // element: document.getElementsByClassName("qdtselections")[0],
    element: document.getElementById('qdtselections1'),
    component: QdtSelections,
    app,
    options: {},
    properties: {
      qSelectionObjectDef: {},
    }
  });

  qdtCompose({
    element: document.getElementById('qdtselections2'),
    component: QdtSelections,
    app,
    options: {},
    properties: {
      qSelectionObjectDef: {},
    }
  });

  qdtCompose({
    element: document.getElementById('qdtbarchart'),
    component: QdtPicasso,
    app,
    options: {
      settings: useBarChartSettings({
        orientation: 'horizontal',
      }),
      height: 300,
    },
    properties: {
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Case Owner Group'] }, qNullSuppression: true },
        ],
        qMeasures: [
          { qDef: { qDef: 'Avg([Case Duration Time])', autoSort: false }, qSortBy: { qSortByNumeric: -1 } },
        ],
        qInterColumnSortOrder: [1, 0],
      },
    }
  });

  qdtCompose({
    element: document.getElementById('qdtmap'),
    component: QdtMapBox,
    app: appMap,
    options: { 
      height: 300,
      center: [-140, 50],
      zoom: 4,
      pitch: 90,
      antialias: true,
      interactive: true,
      scrollZoom: true,
      boxZoom: false,
      dragRotate: true,
      dragPan: true,
      keyboard: false,
      doubleClickZoom: false,
      touchZoomRotate: false,
      handleMapCallback: ({ map }) => {
        map.flyTo({
          center: [-94.39962116967581, 40.61298086159351],
          zoom: 3,
          bearing: -8,
          speed: 0.6,
          curve: 1,
          pitch: 58,
          easing(t) {
            return t;
          },
          essential: true,
        });
      },
    },
    properties: {
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['ID'] } },
          { qDef: { qFieldDefs: ['lat'] } },
          { qDef: { qFieldDefs: ['lon'] } },
          { qDef: { qFieldDefs: ['gender'] } },
        ],
        qMeasures: [],
        qInitialDataFetch: [{
          qWidth: 4,
          qHeight: 2500,
        }],
      },
    }
  });

}
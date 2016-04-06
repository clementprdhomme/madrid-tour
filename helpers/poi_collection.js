import PoiModel from './poi_model.js';

export default class PoiCollection {

  constructor(pois) {
    this._rawData = pois;
  }

  get models() { return this._rawData.map(poi => new PoiModel(poi)); }

};

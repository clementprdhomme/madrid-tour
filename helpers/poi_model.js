export default class PoiModel {

  constructor(poi) {
    this._rawData = poi;
  }

  get name() { return this._rawData.name; }
  get category() { return this._rawData.category; }
  get coords() { return this._rawData.coords; }
  get link() { return this._rawData.link; }
  get openingHours() { return this._rawData.opening_hours; }
  get todayOpeningHours() { return this._getOpeningHoursForToday(); }
  get isOpened() { return this.activeRates.length; }
  get alwaysFree() { return this._rawData.prices.always_free; }
  get rates() { return this._rawData.prices ? this._rawData.prices.rates : []; };
  get todayRates() { return this._getRatesForToday(true); }
  get todayHourBasedRates() { return this._getRatesForToday(false); }
  get todayNonHourBasedRates() {
    return this.todayRates.filter(rate => {
      return !~rate.indexOf(this.todayHourBasedRates);
    });
  }
  get todayRates() { return this._getRatesForToday(); }
  get activeRates() { return this._getActiveRates(true); }
  get activeHourBasedRates() { return this._getActiveRates(false); }
  get activeNonHourBasedRates() {
    return this.activeRates.filter(rate => {
      return !~rate.indexOf(this.activeHourBasedRates);
    });
  }

  /* Return an array of the opening hours for the passed day
   * 0 = Sunday, 6 = Saturday */
  getOpeningHoursFor(day) {
    return this.openingHours[day];
  }

  /* Get the opening hours for today*/
  _getOpeningHoursForToday() {
    const today = (new Date()).getDay();
    return this.getOpeningHoursFor(today);
  }

  /* Return an array of the rates for the passed day
   * If includeNonHourBasedRates, don't filter out the rates without periods
   * 0 = Sunday, 6 = Saturday */
  getRatesFor(day, includeNonHourBasedRates = true) {
    return this.rates.map(rate => {
      return includeNonHourBasedRates && !rate.periods && !rate.default && rate || {
        name: rate.name,
        amount: rate.amount,
        periods: rate.default ? this.getOpeningHoursFor(day) : rate.periods[day]
      };
    });
  }

  /* Get the rates for today
   * If includeNonHourBasedRates, don't filter out the rates without periods */
  _getRatesForToday(includeNonHourBasedRates = true) {
    const today = (new Date()).getDay();
    return this.getRatesFor(today, includeNonHourBasedRates);
  }

  /* Get the rates applicable at the current day and time
   * If includeNonHourBasedRates, don't filter out the rates without periods */
  _getActiveRates(includeNonHourBasedRates = true) {
    const currentHour = (new Date()).getHours() + (new Date()).getMinutes() / 60;
    const todayRates = this._getRatesForToday(includeNonHourBasedRates);
    return todayRates.filter(rate => {
      return includeNonHourBasedRates && !rate.periods ||
        rate.periods.filter(range => range[0] <= currentHour &&
        range[1] > currentHour).length;
    });
  }

};

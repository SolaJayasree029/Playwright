const { homePage } = require("../page-object-model/homePage");
const { movieSelectionPage } = require("../page-object-model/movieSelectionPage");
const { movieDisplayPage } = require("../page-object-model/movieDisplayPage");
const {
  seatSelectionAndPaymentPage,
} = require("../page-object-model/seatSelectionAndPaymentPage");

class pageObjectList {
  constructor(page) {
    this.page = page;
    this.homeObj = new homePage(this.page);
    this.movieSelObj = new movieSelectionPage(this.page);
    this.movieDisObj = new movieDisplayPage(this.page);
    this.seatObj = new seatSelectionAndPaymentPage(this.page);
  }
  homePageObj() {
    return this.homeObj;
  }
  movieSelectionPage() {
    return this.movieSelObj;
  }
  movieDisplayPage() {
    return this.movieDisObj;
  }
  seatSelectionAndPaymentPage() {
    return this.seatObj;
  }
}
module.exports = { pageObjectList };

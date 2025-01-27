const { expect } = require("@playwright/test");

class seatSelectionAndPaymentPage {
  constructor(page) {
    this.page = page;
  }
  async selectSeatAvailable() {
    await this.page.locator('(//a////[@class="__text"])[1]').click();
    await this.page.locator('//*[@id="btnPopupAccept"]').click();
    await this.page.locator("#pop_1").click();
    await this.page.waitForLoadState();
    await this.page.locator("#proceed-Qty", { state: "visible" }).click();
    await this.page.locator('(//a[@class="_available"])[1]').click();
  }
  async verifyURL() {
    await this.page
      .locator('//a[@id="btmcntbook"][@class="bar-btn _primary"]')
      .click();
    //await expect(this.page).toHaveURL("https://in.bookmyshow.com/buytickets/avatar-the-way-of-water-3d-hyderabad/movie-hyd-ET00342441-MT/" +dateTotal +"#!seatlayout");
    await expect(this.page).toHaveURL(/buytickets/);
  }
}
module.exports = { seatSelectionAndPaymentPage };

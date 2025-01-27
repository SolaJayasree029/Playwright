const { expect } = require("@playwright/test");

class movieDisplayPage {
  constructor(page) {
    this.page = page;
  }
  async bookTicketButtonDetails() {
    await expect(this.page.getByRole("button", { name: "Book tickets" })).toHaveText("Book tickets");
    await expect(
      this.page.getByRole("button", { name: "Book tickets" })
    ).toHaveCSS("background-color", "rgb(248, 68, 100)");
    await expect(
      this.page.getByRole("button", { name: "Book tickets" })
    ).toHaveCSS("color", "rgb(255, 255, 255)");
  }
  async popupRej() {
    await this.page.locator('//*[@class = "No thanks"]').click();
  }
  async languageDetails() {
    await this.page.click("text=Book tickets");
    this.page.on("dailog", async (dialog) => {
      expect(dialog.message()).toEqual("Select language and format");
      await dialog.accept();
    });
    await this.page.locator("//li[1]//*//span[text()='3D']").click();
  }
  async dateSelectionDetails() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = today.toLocaleString("default", { month: "short" });
    const dates = await this.page
      .locator('(//a//*[@class="date-numeric"])[1]')
      .textContent();
    const months = await this.page
      .locator('(//a//*[@class="date-month"])[1]')
      .textContent();
    console.log(months.trim() === mm);
    console.log(dates.trim() === dd);
    const dateTotal =
      today.getFullYear() * 1e4 +
      (today.getMonth() + 1) * 100 +
      today.getDate() +
      "";
  }
  async countOfTheatresAndShows() {
    const Movie = await this.page.$$("ul[id='venuelist'] li");
    console.log(Movie.length);
    await this.page.waitForTimeout(2000);
    for (var i = 0; i < Movie.length; i++) {
      var namesk = await this.page
        .locator("a.__venue-name")
        .nth(i)
        .textContent();
      console.log(namesk);
      await this.page.waitForTimeout(100);

      //no of shows in individual theatres
      var shows = await this.page
        .locator("li[data-name='" + namesk + "'] div.__details")
        .count();
      console.log(shows);
      //to get timings also
      for (var j = 0; j < shows; j++) {
        var sho = await this.page
          .locator("li[data-name='" + namesk + "'] div.__text")
          .nth(j)
          .textContent();
        console.log(sho.trim());
      }
    }
  }
}
module.exports = { movieDisplayPage };

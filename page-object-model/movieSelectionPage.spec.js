const { expect } = require("@playwright/test");

class movieSelectionPage {
  constructor(page) {
    this.page = page;
  }
  async validateHeader() {
    await expect(this.page).toHaveTitle(
      "Movie Tickets, Plays, Sports, Events & Cinemas near Hyderabad - BookMyShow"
    );
    await expect(this.page.getByText("Sign in")).toBeVisible();
  }
  async selectMovie() {
    await this.page.locator("//div[text()='See All ›']//parent::a").click();
  }
  async movieDetails() {
    const movieName = await this.page.locator(
      "//div[text()='Avatar: The Way of Water']"
    );
    await movieName.click();
    await expect(movieName).toContainText("Avatar: The Way of Water");
    await this.page.locator("#div.sc-qswwm9-1.eQtXbA");
    // await expect(page).toHaveScreenshot('landing.png');
  }
}
module.exports = { movieSelectionPage };
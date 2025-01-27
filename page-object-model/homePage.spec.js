const { expect } = require("@playwright/test");

class homePage {
  constructor(page) {
    this.page = page;
  }
  async gotoPage() {
    await this.page.goto("https://in.bookmyshow.com/");
    await this.page.waitForLoadState();
  }
  async visibleCities() {
    await expect(this.page.getByText("Mumbai")).toBeVisible();
    await expect(this.page.getByText("Hyderabad")).toBeVisible();
    /*pop up text is visible or not
        page.on("dailog", async (dialog) => {
        expect(dialog.message()).toEqual("Popular Cities");
        await dialog.accept();
        });*/
  }
  async selectCity() {
    const tbox = this.page.locator("input.sc-hCaUpS.cLnzvB");
    await tbox.getAttribute("placeholder");
    await expect(tbox).toHaveAttribute("placeholder", "Search for your city");
    //await page.locator("//*[@placeholder='Search for your city']").isEditable();//2nd way
    await tbox.type("Hyderabad");
    await this.page
      .locator("//li/span/strong[1]")
      .waitFor({ state: "attached" });
    await this.page.locator("//li/span/strong[1]").click();
    await this.page.keyboard.press("Enter");
  }
  async firstUrl() {
    await expect(this.page).toHaveURL(
      "https://in.bookmyshow.com/explore/home/hyderabad"
    );
  }
}

module.exports = { homePage };

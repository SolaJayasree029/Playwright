const {test, expect} = require('@playwright/test');

test('Parking Cost Details', async ({page})=>{

    //Opening the web page
    //goto() method is used to open the webpage
    await page.goto('https://www.shino.de/parkcalc/');

    //Title of the Page
    const pageTitle = await page.title();
    console.log(pageTitle);
    
    //Page MainHeading to have the text
    //toHaveText() is used to compare full text passed and evaluated
    await expect(page.locator('p.PageTitle')).toHaveText('PARKING COST CALCULATOR');
    await expect(page.locator('p.PageTitle')).toHaveCSS("color", "rgb(51, 48, 108)");
    //To get the list of options available in the text

    await page.waitForSelector('p strong');
    const name = await page.locator('p.Bodycopy').allInnerTexts("\n");
    console.log(...name);
//using loop
   // const typesOfParkings = [];
    // const count = await name.count();
    // for(let i=0; i<count; i++) 
    // {
    //   const details = await name.nth(i).innerText();
    //   typesOfParkings.push(details);
    // }
    // console.log(typesOfParkings);
})

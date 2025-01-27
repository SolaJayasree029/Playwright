const{test, expect} = require('@playwright/test');

//Test cases to assert error scenarios

test('Leaving Date/Time Earlier Than Starting Date/Time', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption({label:'Valet Parking'});


    //Select Entry and Exit Date, time, AM/PM
    await page.fill('#StartingDate','01/12/2025');
    await page.fill('#StartingTime', "12:00");
    await page.check('input[value="AM"][name="StartingTimeAMPM"]');
    await page.fill('#LeavingDate','01/13/2023');
    await page.fill('#LeavingTime', "11:00");
    await page.check('input[value="PM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("ERROR! Your Leaving Date Or Time Is Before Your Starting Date or Time");
})

test('Date Format is not correct', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption({label:'Economy Parking'});


    //Select Entry and Exit Date, time, AM/PM
    await page.locator('#StartingDate','21/12/2024');
    await page.fill('#StartingTime', "12:00");
    await page.check('input[value="PM"][name="StartingTimeAMPM"]');
    await page.locator('#LeavingDate','21/13/2024');
    await page.fill('#LeavingTime', "11:00");
    await page.check('input[value="PM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("ERROR! Enter A Correctly Formatted Date");
})

test('Zero Cost', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption('Long-Term Surface Parking');


    //Select Entry and Exit Date, time, AM/PM
    await page.fill('#StartingDate','01/11/2025');
    await page.fill('#StartingTime', "10:00");
    await page.check('input[value="AM"][name="StartingTimeAMPM"]');
    await page.fill('#LeavingDate','01/11/2025');
    await page.fill('#LeavingTime', "12:00");
    await page.check('input[value="AM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("$ 0.00        (-1 Days, 14 Hours, 0 Minutes)");
})

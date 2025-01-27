const {test, expect} = require('@playwright/test');

test('Calculate Price', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    //returning count of the typesofparkinglot options
    const options = await page.$$('#ParkingLot option');//locator to get multiple elements available
    console.log(options.length);
})

test('Valet Parking', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption({label:'Valet Parking'});


    //Select Entry and Exit Date, time, AM/PM
    await page.fill('#StartingDate','01/12/2024');
    await page.fill('#StartingTime', "12:00");
    await page.check('input[value="PM"][name="StartingTimeAMPM"]');
    await page.fill('#LeavingDate','01/13/2024');
    await page.fill('#LeavingTime', "11:00");
    await page.check('input[value="PM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("$ 36.00        (1 Days, 11 Hours, 0 Minutes)");
    console.log("Valet Parking TestCase Successful")
})

test('Short-Term Parking', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption({label:'Short-Term Parking'});


    //Select Entry and Exit Date, time, AM/PM
    await page.fill('#StartingDate','01/12/2024');
    await page.fill('#StartingTime', "12:00");
    await page.check('input[value="AM"][name="StartingTimeAMPM"]');
    await page.fill('#LeavingDate','01/12/2024');
    await page.fill('#LeavingTime', "1:30");
    await page.check('input[value="AM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("$ 3.00        (0 Days, 1 Hours, 30 Minutes)");
    console.log("Short Term Parking TestCase Successful")
})

test('Economy Parking', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption({label:'Economy Parking'});


    //Select Entry and Exit Date, time, AM/PM
    await page.fill('#StartingDate','01/12/2024');
    await page.fill('#StartingTime', "12:00");
    await page.check('input[value="AM"][name="StartingTimeAMPM"]');
    await page.fill('#LeavingDate','01/13/2025');
    await page.fill('#LeavingTime', "11:00");
    await page.check('input[value="AM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("$ 2,844.00        (367 Days, 11 Hours, 0 Minutes)");
    console.log("Economy Parking TestCase Successful")
})

test('Long-Term Garage Parking', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption('Long-Term Garage Parking');


    //Select Entry and Exit Date, time, AM/PM
    await page.fill('#StartingDate','01/12/2025');
    await page.fill('#StartingTime', "12:00");
    await page.check('input[value="AM"][name="StartingTimeAMPM"]');
    await page.fill('#LeavingDate','01/18/2025');
    await page.fill('#LeavingTime', "23:59");
    await page.check('input[value="AM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("$ 72.00        (6 Days, 23 Hours, 59 Minutes)");
    console.log("Long-Term Garage Parking TestCase Successful");
})

test('Long-Term Surface Parking', async({page})=>{
    await page.goto('https://www.shino.de/parkcalc/');

    await page.locator("#ParkingLot").selectOption('Long-Term Surface Parking');


    //Select Entry and Exit Date, time, AM/PM
    await page.fill('#StartingDate','01/12/2024');
    await page.fill('#StartingTime', "12:00");
    await page.check('input[value="AM"][name="StartingTimeAMPM"]');
    await page.fill('#LeavingDate','01/12/2024');
    await page.fill('#LeavingTime', "3:00");
    await page.check('input[value="AM"][name="LeavingTimeAMPM"]');

    await page.click('input[type="submit"]');

    await page.waitForSelector('tbody tr:nth-child(4) td:nth-child(2)');
    const price = await page.locator('tbody tr:nth-child(4) td:nth-child(2)').textContent();
    console.log(price);

    //Assertions for price checking
    await expect( page.locator('tbody tr:nth-child(4) td:nth-child(2)')).toContainText("$ 6.00        (0 Days, 3 Hours, 0 Minutes)");
    console.log("Long-Term Surface Parking TestCase Successful")
})
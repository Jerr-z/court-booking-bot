

async function bookUBCCourtsTask({ page, data: {url, numOfPlayers, numOfHours, startTime} }) {
    await page.goto(url);

    await page.locator('.k-dropdown.service-select').click();
    await page.locator(`li:has-text(${numOfHours} h)`).click();

    
}
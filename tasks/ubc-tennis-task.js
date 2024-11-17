

async function bookUBCCourtsTask({ page, data: {url, numOfPlayers, numOfHours, startTime} }) {
    await page.goto(url);

    // Entering number of hours 

    await page.locator('.k-dropdown.service-select').click();
    await page.locator(`li:has-text(${numOfHours} h)`).click();

    // Entering number of attendees
    await page.locator('#number-of-attendees').fill(`${numOfPlayers}`);

    // Select timeslot with specified start time
    const dateOptions = {hour: '2-digit', minute: '2-digit', hour12: true};
    const timeString = startTime.toLocaleString('en-US', options);
    await page.locator(`span[title^=${timeString}]:has-text("Book Now")`).click();

    // Click Reserve Button
    await page.locator(".button-book").click();

    // CWL Login If needed
    const loginPageUrl = "https://portal.recreation.ubc.ca/index.php"
    if (page.url().startsWith(loginPageUrl)) {
        await page.locator('a[href="/sso/index.php"]').click();
        await page.locator('#username').fill(CWL_USERNAME);
        await page.locator('#password').fill(CWL_PASSWORD);
        await page.locator('button').click();
    }

    await page.locator("a[title='Next']:has-text('Next')").click();


    await page.locator("label:has-text('UBC Student')").click();

    await page.locator("a[title='Add to Cart']").click();

    // use pre-existing payment method
    await page.locator(".payment-amounts").click();

    // TODO: add logic for filling the form
    
    await page.locator(".process-now").click();
}


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
    await page.waitForSelector('.button-book');
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
    try {
        await page.locator(".payment-amounts").click();
    } catch (error) {
        // add alternative payment method
        await page.locator("add-new-card").click();
        await page.locator('[id*=credit-card-holder-name]').fill(CREDIT_CARD_HOLDER_NAME);
        await page.locator('[id*=credit-card-number]').fill(CREDIT_CARD_NUMBER);
        await page.select('[id*=expiry-month]', EXPIRY_MONTH);
        await page.select('[id*=year]', EXPIRY_YEAR);
        await page.locator('input[id*=cvv-number]').fill(CVV);
        await page.locator('input[id*=street]').fill(STREET);
        await page.locator('input[id*=city]').fill(CITY);
        await page.select('[id*=country]', countryMap[COUNTRY]);
        // how do you select province
        
    }

    
    
    
    await page.locator(".process-now").click();
}

const countryMap = {
    "Albania": "2",
    "Algeria": "3",
    "Angola": "6",
    "Anguilla": "7",
    "Argentina": "10",
    "Armenia": "11",
    "Australia": "13",
    "Austria": "14",
    "Bahamas": "16",
    "Belgium": "21",
    "Bermuda": "24",
    "Bolivia": "26",
    "Brazil": "30",
    "Brunei Darussalam": "32",
    "Canada": "38",
    "Chile": "43",
    "China": "44",
    "Colombia": "47",
    "Costa Rica": "52",
    "Croatia": "54",
    "Cyprus": "56",
    "Ecuador": "62",
    "Egypt": "63",
    "Finland": "72",
    "France": "73",
    "Germany": "80",
    "Ghana": "81",
    "Greece": "83",
    "Grenada": "85",
    "Guam": "87",
    "Guatemala": "88",
    "Hong Kong": "96",
    "Hungary": "97",
    "Iceland": "98",
    "India": "99",
    "Indonesia": "100",
    "Iran, Islamic Republic of": "101",
    "Iraq": "102",
    "Ireland": "103",
    "Israel": "104",
    "Italy": "105",
    "Jamaica": "106",
    "Japan": "107",
    "Kazakhstan": "109",
    "Korea, Democratic People's Republic of": "112",
    "Korea, Republic of": "113",
    "Kuwait": "114",
    "Lebanon": "118",
    "Lithuania": "123",
    "Luxembourg": "124",
    "Macedonia, the Former Yugoslav Republic of": "126",
    "Madagascar": "127",
    "Malaysia": "129",
    "Mauritius": "136",
    "Mexico": "138",
    "Morocco": "144",
    "Netherlands": "150",
    "New Zealand": "153",
    "Nicaragua": "154",
    "Nigeria": "156",
    "Norway": "160",
    "Pakistan": "162",
    "Palestinian Territory, Occupied": "164",
    "Panama": "165",
    "Paraguay": "167",
    "Peru": "168",
    "Philippines": "169",
    "Poland": "171",
    "Portugal": "172",
    "Romania": "176",
    "Russian Federation": "177",
    "Saudi Arabia": "187",
    "Serbia": "240",
    "Singapore": "192",
    "Slovenia": "194",
    "South Africa": "197",
    "Spain": "199",
    "Sweden": "205",
    "Switzerland": "206",
    "Taiwan": "208",
    "Thailand": "211",
    "Turkey": "218",
    "Ukraine": "223",
    "United Arab Emirates": "224",
    "United Kingdom": "225",
    "United States": "226",
    "Uruguay": "228",
    "Viet Nam": "232",
    "Virgin Islands, British": "233",
    "Virgin Islands, U.S.": "234"
};

export default bookUBCCourtsTask;
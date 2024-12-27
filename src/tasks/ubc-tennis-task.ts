// noinspection SpellCheckingInspection

import 'dotenv/config'
import {setTimeout} from "node:timers/promises";
import {ConsoleMessage} from 'puppeteer';
import {BookUBCTennisTaskRequest} from "../model/ubc-tennis";
import {BrowserState, IndexedDBItems, LocalStorageItems, SessionStorageItems} from "../model/browser-state";

export async function bookUBCCourtsTask({ page, data } : BookUBCTennisTaskRequest) {
    page.on('console', (msg: ConsoleMessage) => {
        console.log('BROWSER LOG:', msg.text());
    });

    console.log('Starting task');
    let {url, numOfPlayers, numOfHours, startTime} = data;

    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('arrived at ' + url);
    // Wait for the dropdown button to appear, then click it
    await page.waitForSelector('#facility-page-content > div.facility-selected-items.second-row > span > span', { visible: true });
    await page.locator('#facility-page-content > div.facility-selected-items.second-row > span > span').click();

    // Wait for the dropdown options to load
    await page.waitForSelector('#service-duration-dropdown_listbox');


    // Select the option based on numOfHours
    await page.locator(`#service-duration-dropdown_listbox > li:nth-child(${numOfHours})`).click();
    console.log('selected # of hours');
    await setTimeout(3000);

    // Entering number of attendees
    await page.locator('#facility-page-content > div.number-of-people-input > span > span > input.k-formatted-value.service-select.num-of-spots.small.border-require.k-input').fill(`${numOfPlayers}`);
    console.log('entered number of attendees');


    // Select timeslot with specified start time
    const dateObj = new Date(startTime);
    const hour = (dateObj.getUTCHours() + 24) % 12 || 12;
    const hourString = (hour < 10 ? '0' : '') + `${hour}:00`;
    console.log(hourString);

    await page.waitForSelector(`::-p-xpath(//div[div[span[starts-with(@title, '${hourString}') and text()='Book Now']]])`);
    console.log('Book Now grid found!');
    await page.locator(`::-p-xpath(//div[div[span[starts-with(@title, '${hourString}') and text()='Book Now']]])`).click();
    console.log("Book Now clicked");
    
    // Click Reserve Button
    await page.waitForSelector('.button-book');
    await page.locator(".button-book").click();
    console.log("Reserve clicked");

    // wait for redirect  
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // CWL Login If needed
    const loginPageUrl = "https://portal.recreation.ubc.ca/index.php?returnUrl=https"
    if (page.url().startsWith(loginPageUrl)) {
        console.log("redirected to cwl login page");
        await page.locator('a[href="/sso/index.php"]').click();
        await page.locator('#username').fill(process.env.CWL_USERNAME || '');
        await page.locator('#password').fill(process.env.CWL_PASSWORD || '');
        await page.locator('button').click();
        console.log('Waiting for duo push');
        await page.waitForFunction(
            (selector)=>{
                console.log(!document.querySelector(selector));
                return !document.querySelector(selector);
            }, 
            {polling:'raf'},
            '.device-icon'
        );
        console.log('Duo push completed');
        await page.waitForNavigation({waitUntil: 'networkidle0'});
        
        try {
            await page.waitForSelector('#trust-browser-button', {timeout: 2000});
            await page.locator('#trust-browser-button').click();
            console.log("Trust this browser button clicked");
        } catch(e) {
            console.log("No need to click browser button")
        }

        console.log('Login Successful, redirecting to payment process');
        // await page.waitForNavigation();

    }

    const paymentUrl = 'https://ubc.perfectmind.com/24063/Menu/BookMe4EventParticipants';
    await page.waitForFunction(
        () => {
        const paymentUrl = 'https://ubc.perfectmind.com/24063/Menu/BookMe4EventParticipants';
        console.log(document.location.href);
        return document.location.href.includes(paymentUrl)},
        { timeout:100000, polling: 1000 });

    if (page.url().startsWith(paymentUrl)) {
        console.log('arrived at payment page');
    }

    await setTimeout(5000)

    await page.waitForSelector('div.next-button-container');
    console.log('Next Button is here')
    await page.waitForFunction(() => {
            if (!document.querySelector('div.next-button-container')) {
                return false;
            }
            try {
                let nextButton = document.querySelector('div.next-button-container') as HTMLElement;
                if (nextButton) {
                    nextButton.click()
                }
                return true;
            } catch {
                return false;
            }
        }, {polling: 'raf'}, null);

    console.log("Selected payee name");

    
    await page.waitForSelector('.radio-item');

    // if UBC student then use student price :)
    if ((await page.$$('.radio-item')).length > 1) {
        console.log("UBC Student identified")
        await page.locator('::-p-xpath(//label[contains(., "UBC Student")]/preceding-sibling::input)').click();
    } else {
        await page.locator('tr input[type="radio"]').click();
    }

    await setTimeout(1000);
    await page.locator("a[title='Add to Cart']").click();

    // use pre-existing payment method
    // try {
    //     await page.locator(".payment-amounts").click();
    // } catch (error) {
    //     // add alternative payment method
    //     await page.locator("add-new-card").click();
    //     await page.locator('[id*=credit-card-holder-name]').fill(process.env.CREDIT_CARD_HOLDER_NAME);
    //     await page.locator('[id*=credit-card-number]').fill(process.env.CREDIT_CARD_NUMBER);
    //     await page.select('[id*=expiry-month]', process.env.EXPIRY_MONTH);
    //     await page.select('[id*=year]', process.env.EXPIRY_YEAR);
    //     await page.locator('input[id*=cvv-number]').fill(process.env.CVV);
    //     await page.locator('input[id*=street]').fill(process.env.STREET);
    //     await page.locator('input[id*=city]').fill(process.env.CITY);
    //     await page.select('[id*=country]', countryMap[process.env.COUNTRY]);
    //     // how do you select province
    //     await page.locator(`[id*=state]:has-text(${process.env.STATE})`).click();
    //     await page.locator('.zip').fill(process.env.ZIP_CODE)
    // }
    //await setTimeout(1000)
    //await page.locator(".process-now").click();
}

export async function getAllCourtUrlsTask({page, data}) {

    const homePageUrl = 'https://ubc.perfectmind.com/24063/Clients/BookMe4FacilityList/List?widgetId=c7c36ee3-2494-4de2-b2cb-d50a86487656&calendarId=e65c1527-c4f8-4316-b6d6-3b174041f00e';

    await page.goto(homePageUrl, { waitUntil: 'networkidle0' });

    await page.waitForSelector('ul[aria-label="Page sizes drop down"]');
    await setTimeout(500);

    const selectDisplayTwentyItems = () => {
        const paginationDropDown = document.querySelectorAll('ul[aria-label="Page sizes drop down"] li') as NodeListOf<HTMLElement>;
        if (paginationDropDown != null && paginationDropDown.length > 3) {
            paginationDropDown[3].click(); return true;
        }

    };

    await page.waitForFunction(selectDisplayTwentyItems, {}, null);

    const getAllCourtUrls = async () => {
        let buttons = document.querySelectorAll('.tablet-details-wrapper .pm-confirm-button') as NodeListOf<HTMLElement>;
        console.log(`There are ${buttons.length} buttons`)
        let urls = Array.from(buttons).map(val => (val as HTMLAnchorElement).href);
        console.log(urls);
        return urls;
    }

    return await page.evaluate(getAllCourtUrls);
}

// login and returns browser state
export async function loginTask({page, data}) {
    const loginUrl = "https://portal.recreation.ubc.ca/index.php?returnUrl=https%3A%2F%2Fubc.perfectmind.com%2F24063%2FClients%2FBookMe4FacilityList%2FList%3FwidgetId%3Dc7c36ee3-2494-4de2-b2cb-d50a86487656%26calendarId%3De65c1527-c4f8-4316-b6d6-3b174041f00e"
    await page.goto(loginUrl, { waitUntil: 'networkidle0' });
    await page.locator('a[href="/sso/index.php"]').click();
    await page.locator('#username').fill(process.env.CWL_USERNAME || '');
    await page.locator('#password').fill(process.env.CWL_PASSWORD || '');
    await page.locator('button').click();
    console.log('Waiting for duo push');
    await page.waitForFunction(
        (selector)=>{
            console.log(!document.querySelector(selector));
            return !document.querySelector(selector);
        },
        {polling:'raf'},
        '.device-icon'
    );
    console.log('Duo push completed');
    await page.waitForNavigation({waitUntil: 'networkidle0'});

    try {
        await page.waitForSelector('#trust-browser-button', {timeout: 2000});
        await page.locator('#trust-browser-button').click();
        console.log("Trust this browser button clicked");
    } catch(e) {
        console.log("No need to click browser button")
    }

    console.log('Login Successful');
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

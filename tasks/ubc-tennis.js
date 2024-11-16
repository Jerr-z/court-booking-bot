const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 871,
            height: 743
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('https://ubc.perfectmind.com/24063/Clients/BookMe4FacilityList/List?widgetId=c7c36ee3-2494-4de2-b2cb-d50a86487656&calendarId=e65c1527-c4f8-4316-b6d6-3b174041f00e');
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Court 04 facility photo Court 04 Tennis Court Location: Tennis Centre Choose) >>>> ::-p-aria(Choose)'),
            targetPage.locator('div:nth-of-type(4) > div.tablet-details-wrapper > a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"listView\\"]/div/div[4]/div[3]/a)'),
            targetPage.locator(':scope >>> div:nth-of-type(4) > div.tablet-details-wrapper > a')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 81,
                y: 20.203125,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(1 h)'),
            targetPage.locator('#b0910bd2-abc6-42ab-850d-6c85ae1f1feb'),
            targetPage.locator('::-p-xpath(//*[@id=\\"b0910bd2-abc6-42ab-850d-6c85ae1f1feb\\"])'),
            targetPage.locator(':scope >>> #b0910bd2-abc6-42ab-850d-6c85ae1f1feb')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 102,
                y: 23.46875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(2 h)'),
            targetPage.locator('li.k-hover'),
            targetPage.locator('::-p-xpath(//*[@id=\\"service-duration-dropdown_listbox\\"]/li[2])'),
            targetPage.locator(':scope >>> li.k-hover')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 93,
                y: 19.546875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('body'),
            targetPage.locator('::-p-xpath(/html/body)'),
            targetPage.locator(':scope >>> body')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 172,
                y: 1608.5,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Choose service duration) >>>> ::-p-aria(select)'),
            targetPage.locator('div.facility-selected-items span.k-select'),
            targetPage.locator('::-p-xpath(//*[@id=\\"facility-page-content\\"]/div[3]/span/span/span[2])'),
            targetPage.locator(':scope >>> div.facility-selected-items span.k-select')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 4.796875,
                y: 24.46875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(1 h)'),
            targetPage.locator('li.k-hover'),
            targetPage.locator('::-p-xpath(//*[@id=\\"service-duration-dropdown_listbox\\"]/li[1])'),
            targetPage.locator(':scope >>> li.k-hover')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 100,
                y: 23.46875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(1 h)'),
            targetPage.locator('li.k-hover'),
            targetPage.locator('::-p-xpath(//*[@id=\\"service-duration-dropdown_listbox\\"]/li[1])'),
            targetPage.locator(':scope >>> li.k-hover')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 105,
                y: 16.46875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.number-of-people-caption'),
            targetPage.locator('::-p-xpath(//*[@id=\\"facility-page-content\\"]/div[5])'),
            targetPage.locator(':scope >>> div.number-of-people-caption'),
            targetPage.locator('::-p-text(2\n                        Number)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 163,
                y: 0.46875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.number-of-people-input > span > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"facility-page-content\\"]/div[6]/span/span)'),
            targetPage.locator(':scope >>> div.number-of-people-input > span > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 83,
                y: 14.96875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Number of attendees)'),
            targetPage.locator('#number-of-attendees'),
            targetPage.locator('::-p-xpath(//*[@id=\\"number-of-attendees\\"])'),
            targetPage.locator(':scope >>> #number-of-attendees')
        ])
            .setTimeout(timeout)
            .fill('4');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.scheduler-wrapper'),
            targetPage.locator('::-p-xpath(//*[@id=\\"facility-page-content\\"]/div[9])'),
            targetPage.locator(':scope >>> div.scheduler-wrapper')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 147,
                y: 10.46875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#facilityLandingPageModelContainer'),
            targetPage.locator('::-p-xpath(//*[@id=\\"facilityLandingPageModelContainer\\"])'),
            targetPage.locator(':scope >>> #facilityLandingPageModelContainer')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 348,
                y: 1869.703125,
              },
            });
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Reserve)'),
            targetPage.locator('div.booking-summary > button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"facility-page-content\\"]/div[10]/button)'),
            targetPage.locator(':scope >>> div.booking-summary > button'),
            targetPage.locator('::-p-text(Reserve)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 208,
                y: 19.46875,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(CWL Login[role=\\"image\\"])'),
            targetPage.locator('img'),
            targetPage.locator('::-p-xpath(/html/body/div[1]/div[6]/div/div/div/div[2]/div/div[1]/div/div[1]/p[4]/a/img)'),
            targetPage.locator(':scope >>> img')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 38.84375,
                y: 17,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Login Name)'),
            targetPage.locator('#username'),
            targetPage.locator('::-p-xpath(//*[@id=\\"username\\"])'),
            targetPage.locator(':scope >>> #username')
        ])
            .setTimeout(timeout)
            .fill(CWL_USERNAME);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#password'),
            targetPage.locator('::-p-xpath(//*[@id=\\"password\\"])'),
            targetPage.locator(':scope >>> #password')
        ])
            .setTimeout(timeout)
            .fill(CWL_PASSWORD);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Login)'),
            targetPage.locator('button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"col2\\"]/form/div[3]/button)'),
            targetPage.locator(':scope >>> button')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 28.453125,
                y: 26.2578125,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#overlay'),
            targetPage.locator('::-p-xpath(//*[@id=\\"overlay\\"])'),
            targetPage.locator(':scope >>> #overlay')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 472,
                y: 520,
              },
            });
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Next) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div.bm-form-navbar span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"event-attendees\\"]/div[2]/div/a/span)'),
            targetPage.locator(':scope >>> div.bm-form-navbar span'),
            targetPage.locator('::-p-text(Next)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 5.703125,
                y: 9.7265625,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Next)'),
            targetPage.locator('div.bm-form-navbar > a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"main-content\\"]/div/div/div[5]/a)'),
            targetPage.locator(':scope >>> div.bm-form-navbar > a')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 23,
                y: 7.0234375,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('div.add-new-card'),
            frame.locator('::-p-xpath(//*[@id=\\"a1d9c51f-9adf-4fe1-8756-d2fef0873be2\\"]/ko-components.checkout.checkout/div[1]/div[2]/div/ko-components.checkout.payment/div[2]/form/div[2])'),
            frame.locator(':scope >>> div.add-new-card')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 16,
                y: 31,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Payment Method[role=\\"radio\\"])'),
            frame.locator('div.add-new-card > div:nth-of-type(1) input'),
            frame.locator('::-p-xpath(//*[@id=\\"a1d9c51f-9adf-4fe1-8756-d2fef0873be2\\"]/ko-components.checkout.checkout/div[1]/div[2]/div/ko-components.checkout.payment/div[2]/form/div[2]/div[1]/div[1]/input)'),
            frame.locator(':scope >>> div.add-new-card > div:nth-of-type(1) input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 12,
                y: 10,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});

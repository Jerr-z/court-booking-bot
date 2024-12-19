import type { Page } from 'puppeteer'

export type BookUBCTennisTaskRequest = {
    page: Page;
    data: BookUBCTennisTaskRequestData
}

export type BookUBCTennisTaskRequestData = {
    url: string;
    numOfPlayers: number;
    numOfHours: number;
    startTime: string;
}
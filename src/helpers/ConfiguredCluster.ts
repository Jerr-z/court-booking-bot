import { Cluster } from "puppeteer-cluster";
import UserAgent from "user-agents";
import puppeteer from 'puppeteer-extra';
import AnonymizeUA from 'puppeteer-extra-plugin-anonymize-ua';
import SteathPlugin from 'puppeteer-extra-plugin-stealth';
import 'dotenv/config'

puppeteer.use(AnonymizeUA())
puppeteer.use(SteathPlugin())

class PuppeteerCluster {
    public cluster: Cluster | undefined;
    constructor() {}

    async init() {
        // TODO: maybe proxies in the future?

        const userAgent = new UserAgent()
        const puppeteerOptions = {
            headless: false,
            defaultViewport: null,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                `--user-agent=${userAgent.toString()}`
            ]
        };

        this.cluster = await Cluster.launch(
            {
                puppeteer: puppeteer,
                concurrency: Cluster.CONCURRENCY_PAGE,
                maxConcurrency: parseInt(process.env.PARALLEL_TASKS || '') || 1,
                timeout: 5 * 60 * 1000,
                puppeteerOptions
            }
        )

        console.log('Cluster created')
    }

    getCluster() {
        return this.cluster
    }

}

export default PuppeteerCluster;
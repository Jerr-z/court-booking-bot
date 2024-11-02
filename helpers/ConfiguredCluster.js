import { Cluster } from "puppeteer-cluster";
import UserAgent from "user-agents";
import puppeteer from 'puppeteer-extra';

puppeteer.use(require('puppeteer-extra-plugin-anonymize-ua')())
puppeteer.use(require('puppeteer-extra-plugin-stealth')())

class PuppeteerCluster {
    constructor() {
        this.cluster = this.createCluster()
    }

    async createCluster() {
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
              `--user-agent=${userAgent}`
            ]
        };

        let cluster = await Cluster.launch(
            {
                puppeteer: puppeteer,
                concurrency: Cluster.CONCURRENCY_BROWSER,
                maxConcurrency: parseInt(process.env.PARALLEL_TASKS) || 1,
                timeout: 5 * 60 * 1000,
                puppeteerOptions
            }
        );

        return cluster  
    }

    getInstance() {
        return this.cluster
    }
}

export default new PuppeteerCluster();
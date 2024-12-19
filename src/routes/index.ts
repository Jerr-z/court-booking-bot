import express from 'express'
import puppeteerCluster from '../helpers/ConfiguredCluster.js';
import { bookUBCCourtsTask, getAllCourtUrlsTask } from '../tasks/ubc-tennis-task.js';
import {BookUBCTaskRequestBodySchema} from "../model/schema.js";
import {calculateSleepTime} from "../helpers/utils.js";
import { Cluster } from 'puppeteer-cluster';


const router = express.Router();
let clusterInstance: Cluster<any, any>;
(async () => {
    clusterInstance = await puppeteerCluster.getInstance();
})();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/court', function(req, res) {
  // TODO validate data

  let validationResult = BookUBCTaskRequestBodySchema.validate(req.body)

  if (validationResult.error) {
    res.status(400).send(`Error: ${validationResult.error}`);
    return;
  }

  console.log(validationResult.value)
  let triggerDelay = calculateSleepTime(new Date(validationResult.value.startTime))
  setTimeout(() => clusterInstance.execute(validationResult.value, bookUBCCourtsTask), triggerDelay)
  console.log(`Task queued, waking up in ${triggerDelay} ms`);
  res.status(200).send();
});

router.get('/getUrls', function(req, res) {
  clusterInstance.execute(req.body, getAllCourtUrlsTask).then((urls) => {res.status(200).send(urls)});
});

export default router;

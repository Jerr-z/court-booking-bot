import express from 'express'
import {bookUBCCourtsTask, getAllCourtUrlsTask, loginTask} from '../tasks/ubc-tennis-task.js';
import {BookUBCTaskRequestBodySchema} from "../model/schema.js";
import {calculateSleepTime} from "../helpers/utils.js";
import PuppeteerCluster from "../helpers/ConfiguredCluster.js";


const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/court', async function(req, res) {
  let clusterInstance = new PuppeteerCluster();
  await clusterInstance.init()

  let validationResult = BookUBCTaskRequestBodySchema.validate(req.body)

  if (validationResult.error) {
    res.status(400).send(`Error: ${validationResult.error}`);
    return;
  }

  console.log(validationResult.value)
  let triggerDelay = calculateSleepTime(new Date(validationResult.value.startTime))
  setTimeout(() => clusterInstance.cluster?.execute(null, loginTask), triggerDelay - 60 * 1000)
  setTimeout(() => clusterInstance.cluster?.execute(validationResult.value, bookUBCCourtsTask), triggerDelay - 300)
  console.log(`Task queued, waking up in ${triggerDelay} ms`);
  res.status(200).send();
  await clusterInstance.cluster?.idle();
  await clusterInstance.cluster?.close();
});

router.get('/getUrls', async function(req, res) {
  let clusterInstance = new PuppeteerCluster();
  await clusterInstance.init()
  clusterInstance.cluster?.execute(req.body, getAllCourtUrlsTask).then((urls) => {res.status(200).send(urls)});
  await clusterInstance.cluster?.idle();
  await clusterInstance.cluster?.close();
});

export default router;

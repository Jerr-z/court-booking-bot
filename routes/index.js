import express from 'express'
import puppeteerCluster from '../helpers/ConfiguredCluster.js';
import bookUBCCourtsTask from '../tasks/ubc-tennis-task.js';


var router = express.Router();
let clusterInstance;
(async () => {
    clusterInstance = await puppeteerCluster.getInstance();
})();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/court', function(req, res) {
  // TODO validate data
  console.log(req.body)
  clusterInstance.execute(req.body, bookUBCCourtsTask);
  console.log('Task queued');
  res.status(200).send();
});

export default router;

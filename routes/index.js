import express from 'express'
import puppeteerCluster from '../helpers/ConfiguredCluster.js';
import bookUBCCourtsTask from '../tasks/ubc-tennis-task.js';


var router = express.Router();
let clusterInstance = puppeteerCluster.getInstance().cluster

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/court', function(req, res) {
  // TODO validate data
  clusterInstance.queue(bookUBCCourtsTask, req.body);
});

export default router;

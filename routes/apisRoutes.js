const router = require('express').Router();

const apisCtrl = require('../controllers/apisCtrl');


router.post('/getCustomerDetail', apisCtrl.customers);
router.post('/getTransactionsDetails', apisCtrl.geeTransactionsDetailByAccountId);

module.exports = router;

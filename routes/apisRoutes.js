const router = require('express').Router();

const apisCtrl = require('../controllers/apisCtrl');


router.post('/getCustomerDetail', apisCtrl.customers);
router.post('/getTransactionsDetails', apisCtrl.geeTransactionsDetailByAccountId);

module.exports = router;












// const user = await User.findOne({ username: req.body.username });
      // if (!user) {
      //   return res.status(404).json({ error: 'User not found' });
      // }
  
      // // Find accounts for user
     

      // let Account = await dbConnect('accounts');
      // // const accounts = await Account.find({ account_id: user.accounts});
      // let accounts = user.accounts;
  
      // // Map accounts to desired format
      // const formattedAccounts = accounts.map(account => {
      //   // const accounts = await Account.find({ account_id: user.accounts});
      //   // return {
      //   //   account_id: account.account_id,
      //   //   limit: account.limit,
      //   //   transaction_count: account.transaction_count,
      //   // };
      // });
  
      // // Construct response object
      // const response = {
      //   name: user.name,
      //   birthdate: user.birthdate.toISOString().slice(0, 10),
      //   email: user.email,
      //   accounts: formattedAccounts,
      // };
  
      // // Send response
      // res.json(response);
          //   {
      //     $lookup: {
      //       from: 'accounts',
      //       localField: 'accounts',
      //       foreignField: 'account_id',
      //       as: 'accounts'
      //     }
      //   },
      //   {
      //     $unwind: '$accounts'
      //   },
      //   {
      //     $lookup: {
      //       from: 'transactions',
      //       localField: 'accounts.account_id',
      //       foreignField: 'account_id',
      //       as: 'accounts.transactions'
      //     }
      //   },
      //   {
      //     $group: {
      //       _id: '$_id',
      //       name: { $first: '$name' },
      //       birthdate: { $first: '$birthdate' },
      //       email: { $first: '$email' },
      //       accounts: { $push: '$accounts' }
            
      //     }
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       name: 1,
      //       birthdate: 1,
      //       email: 1,
      //       accounts: {
      //         account_id: 1,
      //         limit: 1,
      //         transaction_count: '$accounts.transactions.transaction_count' 
      //       }
      //     }
      //   }
      // ])      
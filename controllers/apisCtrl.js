const dbConnect = require("../config/db");

let obj = {

  // API 1:


  // Type: POST
  
  // Functionality: Take username as input and Return the Following
  
  
  // Sample Response: 
  
  // {
  
  //             name: "Christine Douglas",
  
  //             birthdate: "1989-12-25",
  
  //             email: "abcd@yahoo.com",
  
  //             accounts: [
  
  //                   {
  
  //                      account_id: 371138,
  
  //                      limit: 9000,
  
  //                      transaction_count: 14
  
  //                   }
  
  //                   .
  
  //                   .
  
  //                   .
  
  //                   {}
  
  //             ]
  
  //  }




  customers: async (req, res) => {
    
    try {
      //Use aggregation framework to lookup Customer and accounts
      let Customer = await dbConnect("customers");
      const data = await Customer.aggregate([
        { $match: { username: req.body.username } },
          {
          $lookup: {
            from: 'accounts',
            localField: 'accounts',
            foreignField: 'account_id',
            as: 'accounts'
          }
        },
        {
          $unwind: '$accounts'
        },
        {
          $lookup: {
            from: 'transactions',
            localField: 'accounts.account_id',
            foreignField: 'account_id',
            as: 'accounts.transactions'
          }
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            birthdate: { $first: '$birthdate' },
            email: { $first: '$email' },
            accounts: { $push: '$accounts' }
            
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            birthdate: { $dateToString: { format: "%Y-%m-%d", date: "$birthdate" }},
            email: 1,
            accounts: {
              $map: {
                input: '$accounts',
                as: 'account',
                in: {
                  account_id: '$$account.account_id',
                  limit: '$$account.limit',
                  transaction_count: {
                    $let: {
                      vars: {
                        transactions: {
                          $filter: {
                            input: '$$account.transactions',
                            as: 'transaction',
                            cond: { $eq: ['$$transaction.account_id', '$$account.account_id'] }
                          }
                        }
                      },
                      in: { $arrayElemAt: ['$$transactions.transaction_count', 0] }
                    }
                  }
                }
              }
            }
          }
        }
      ]).toArray();

      if(data.length == 0){
        return res.status(404).json({msg:"dataNotFound"});
      }
    
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },





//   API 2:


// Type: POST

// Functionality: Take account_id as input and Return the Following

// Sample Response:

// {

//       total_amount_sold: 121 // where transaction_code is "sell"

//       total_amount_bought: 4545 // where transaction_code is "buy"

// }
  
  geeTransactionsDetailByAccountId: async(req,res)=>{
    try {
      let Transactions = await dbConnect("transactions");
      let account_id = parseInt(req.body.account_id);
      let data = await Transactions.find({'account_id':account_id}).toArray();
     
      if(data.length == 0){
        return res.status(404).json({msg:"dataNotFound"});
      }
      let total_sold = 0;
      let total_bought = 0;
          data.forEach(data => {
            data.transactions.forEach(transaction => {
              if (transaction.transaction_code === 'sell') {
                total_sold += 1;
              } else if (transaction.transaction_code === 'buy') {
                total_bought += 1;
              }
            });
          });
  
          const result = {
            total_amount_sold: total_sold,
            total_amount_bought: total_bought
          };

          res.status(200).json(result);
          
      
    } catch (err) {
      res.status(500).json(err.message);
      
    }
}
};
module.exports = obj;

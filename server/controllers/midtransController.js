const axios = require('axios')
class midtransController {
  static getToken(req, res, next){
    let getCurrentTimestamp = () => {
      return "" + Math.round(new Date().getTime() / 1000);
    };
    axios({
      // Below is the API URL endpoint
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from("SB-Mid-server-P5564rc_3yoCN6FJl_OW6tTW").toString("base64")
        // Above is API server key for the Midtrans account, encoded to base64
      },
      data:
        // Below is the HTTP request body in JSON
        {
          transaction_details: {
            order_id: "order-csb-" + getCurrentTimestamp(),
            gross_amount: req.params.amount
          },
          credit_card: {
            secure: true
          },
          customer_details: {
            first_name: req.params.name,
            email: "testmidtrans@mailnesia.com",
            phone: "08111222333"
          }
        }
    }).then(snapResponse => {
      let snapToken = snapResponse.data.token;
      console.log("Retrieved snap token:", snapToken);
      // Pass the Snap Token to frontend, render the HTML page
      return res.status(200).json(snapToken);
    }).catch(err => {
      return res.status(500).json(err.message)
    })
  }
}

module.exports = midtransController

// curl --location --request GET 'https://api.sandbox.midtrans.com/v2/ORDER_ID/status' \
// > --header 'Accept: application/json' \
// > --header 'Content-Type: application/json' \
// > --header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
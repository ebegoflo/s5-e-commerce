// funcion PayPal

// $("#paypal-button-container").click(paypal);
let clientTotal = document.getElementById("total-amount");
function paypal() {
  paypal.Button.render({

      env: 'sandbox', // sandbox | production

      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
          sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
          production: 'AXogq8X2C5u1kEiDR8P8KHsbQfS3YgiyxFd1Ovvjenv8nD-10pOhb4M9xOc_G6T1Adc3HKsdg5iEw1S9'
      },

      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,

      // payment() is called when the button is clicked
      payment: function(data, actions) {

          // Make a call to the REST api to create the payment
          return actions.payment.create({
              payment: {
                  transactions: [
                      {
                          amount: { total: `${clientTotal}`, currency: 'MXN' }
                      }
                  ]
              }
          });
      },

      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {

          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(function() {
              window.alert('Payment Complete!');
          });
      }

  }, '#paypal-button-container');
}

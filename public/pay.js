// // import Razorpay from '../node_modules/razorpay';



// var razorpayKey = "rzp_test_PTZS8NwftiF8Fv";
// var razorpaySecret = "QKZwaBXBZDuvoyM53NA0E8Hd";


// var paymentLink = new Razorpay.PaymentLink({
//   key: razorpayKey,
//   amount: 100, // The amount of the payment in rupees.
//   recipient: "9999999999", // The mobile number of the recipient.
// });


// // Get the payment link as a string.
// var paymentLinkString = paymentLink.generateLink();
// console.log(paymentLinkString)

// // When the user clicks on the pay button, open the payment link in a new tab.
// var payButton = document.getElementById("payButton");
// payButton.addEventListener("click", function() {
//   window.open(paymentLinkString, "_blank");
// });

// document.body.style.backgroundColor = "red";

// export default Razorpay;







// Your JavaScript code

const amountInput = document.getElementById("amount");
const payButton = document.getElementById("payButton");
const paymentLinkDiv = document.getElementById("paymentLink");


// Access the recipientInfo variable defined in pay.pug


const scriptTag = document.querySelector('script[data-recipient-info]');
const recipientInfo = JSON.parse(scriptTag.getAttribute('data-recipient-info'));
// console.log(recipientInfo);

// Create a Razorpay instance with your API key
var rzp = new Razorpay({
    key: 'rzp_test_PTZS8NwftiF8Fv', // Replace with your actual API key
});


function generatelink(amount){
    // Define payment options and use recipientInfo for prefill
    // console.log(amount);
    var options = {
        amount: amount, // Amount in paise (Example: 10000 paise = ₹100)
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Purchase Description',
        recipient: String(recipientInfo.mobileNumber),
        handler: function (response) {
            // Handle successful payment response
            alert('Payment successful: ' + response.razorpay_payment_id);
        },
        prefill: {
            name: recipientInfo.name,
            email: recipientInfo.email, // You can also pass the recipient's email if available
            contact: recipientInfo.mobileNumber,
        },
        theme: {
            color: '#F37254',
        },
    };

    // Open the Razorpay payment window

     rzp.open(options);
    
    // a.then((response) => {
    //     // Payment successful
    //     alert('Payment successful: ' + response.razorpay_payment_id);
    //     // Update UI or perform actions based on successful payment
    //     paymentLinkDiv.textContent = "Payment successful!"; // Example UI update
    //   })
    //   .catch((error) => {
    //     // Payment failed
    //     console.error('Payment failed:', error);
    //     // Handle the error gracefully, provide user feedback
    //     paymentLinkDiv.textContent = "Payment failed. Please try again."; // Example UI update
    //   });
    // const transferData = {
    //     account: 'account_id',  // Razorpay Account ID of the receiver
    //     amount: 50000,  // Amount in paisa (e.g., 50000 for 500 INR)
    //     currency: 'INR',
    //     mode: 'NEFT',  // Transfer mode (NEFT/IMPS/RTGS)
    //     purpose: 'refund',  // Purpose of the transfer
    //     queue_if_low_balance: true,
    //   };
      
    //   razorpay.transfers.create(transferData, (error, transfer) => {
    //     if (error) {
    //       console.error(error);
    //       // Handle error
    //     } else {
    //       console.log(transfer);
    //       // Transfer successful, handle success
    //     }
    //   });

}
const pathname = window.location.pathname; // "/api/v1/chat/64f1b013f439059eb19f2eea"
const parts = pathname.split('/');
const recId = parts[parts.length - 1]; 

payButton.addEventListener("click",  async ()=> {
    // Get the entered amount from the input field
    const amount = parseFloat(amountInput.value) || 0; // Convert to a number
    
    // Check if the amount is greater than 0
    if (!(amount > 0)) {
        // Display an error message if the amount is invalid
        paymentLinkDiv.innerHTML = "Please enter a valid amount.";
        
    } 
    else {
        // Generate the payment link
         generatelink(amount * 100); // Convert to paise
        //  console.log(JSON.stringify({amount}));
        await fetch(`/api/v1/pay/${recId}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({amount: (amount+0.02*amount)}),
        })
        paymentLinkDiv.innerHTML = "";
    }
    
    amountInput.value ="";
    
});
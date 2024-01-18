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
console.log(recipientInfo);

// Create a Razorpay instance with your API key
var rzp = new Razorpay({
    key: 'rzp_test_PTZS8NwftiF8Fv', // Replace with your actual API key
});


function generatelink(amount){
    // Define payment options and use recipientInfo for prefill
    console.log(amount);
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

}

payButton.addEventListener("click", function () {
    // Get the entered amount from the input field
    const amount = parseFloat(amountInput.value) || 0; // Convert to a number

    // Check if the amount is greater than 0
    if (amount > 0) {
        // Generate the payment link
        generatelink(amount * 100); // Convert to paise
    } else {
        // Display an error message if the amount is invalid
        paymentLinkDiv.innerHTML = "Please enter a valid amount.";
    }
    amountInput.value ="";
});
// Initialize RippleAPI (Replace with your credentials)
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({ server: 'wss://s1.ripple.com' });

// Connect to the XRPL server
api.connect().then(() => {
    console.log('Connected to XRPL');
}).catch((error) => {
    console.error('Error connecting to XRPL:', error);
});

// Get account balance and display it
const accountAddress = 'YOUR_ACCOUNT_ADDRESS';
api.getAccountInfo(accountAddress).then((info) => {
    const balance = info.xrpBalance / 1000000; // Convert from drops to XRP
    document.getElementById('balance').textContent = balance.toFixed(6);
}).catch((error) => {
    console.error('Error fetching account balance:', error);
});

// Handle XRP send form submission
const sendForm = document.getElementById('send-form');
sendForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    // Create and submit a payment transaction (Replace with your logic)
    const payment = {
        source: {
            address: accountAddress,
            maxAmount: {
                value: amount,
                currency: 'XRP'
            }
        },
        destination: {
            address: recipient,
            amount: {
                value: amount,
                currency: 'XRP'
            }
        }
    };

    api.preparePayment(accountAddress, payment).then((prepared) => {
        // Sign the transaction (Replace with your signing logic)
        // Send the transaction (Replace with your sending logic)
        console.log('Transaction prepared:', prepared.txJSON);
    }).catch((error) => {
        console.error('Error preparing payment:', error);
    });
});

// Get transaction history and display it
const transactionHistory = document.getElementById('transaction-history');
api.getTransactions(accountAddress).then((transactions) => {
    transactions.forEach((tx) => {
        const li = document.createElement('li');
        li.textContent = `Type: ${tx.type}, Amount: ${tx.outcome.deliveredAmount.value} XRP`;
        transactionHistory.appendChild(li);
    });
}).catch((error) => {
    console.error('Error fetching transaction history:', error);
});

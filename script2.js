const balanceEl = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add Transaction
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    description: description.value,
    amount: +amount.value
  };


  transactions.push(transaction);
  updateUI();
  updateLocalStorage();

  description.value = '';
  amount.value = '';
});

// Update UI
function updateUI() {
  transactionList.innerHTML = '';
  let balance = 0;

  transactions.forEach((tx) => {
    const li = document.createElement('li');
    li.classList.add(tx.amount < 0 ? 'expense' : 'income');
    li.innerHTML = `
      ${tx.description} <span>${tx.amount < 0 ? '-' : '+'}₹${Math.abs(tx.amount)}</span>
      <button onclick="deleteTransaction(${tx.id})">❌</button>
    `;
    transactionList.appendChild(li);
    balance += tx.amount;
  });

  balanceEl.innerText = `₹${balance.toFixed(2)}`;
}

function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  updateUI();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
updateUI();
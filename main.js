const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const someTransactions = [
  {id: 1, text:'Flower', amount: -20},
  {id: 2, text:'Milk', amount: -5},
  {id: 3, text:'Rom', amount: -30},
  {id: 4, text:'Salary', amount: 400}
];

let transactions = someTransactions;

//add transaction
function addTransaction(e) {
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');

  }
  else{
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionsDOM(transaction);
    updateValues();

    text.value = '';
    amount.value = '';
  }
}

//generate id
function generateID() {
  return Math.floor(Math.random() * 10000000000);
}

// transactions => DOM

function addTransactionsDOM(transaction) {
  //sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  //class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);

}
//update balance,income, expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item),0)
  .toFixed(2);

  const income = amounts
                .filter(item => item > 0)
                .reduce((acc,item) => (acc += item), 0)
                .toFixed(2);

  const expense = (amounts
                .filter(item => item < 0)
                .reduce((acc,item) => (acc += item), 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;


}
//remove transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  init();
}

//init app
function init() {
  list.innerHTML = '';


  transactions.forEach(addTransactionsDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction)

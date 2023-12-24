
const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");

const totalExpense = document.getElementById('total-expense')
const availableBudget = document.getElementById('available-amount')

let newEntryHtml;
let income;
let expense;
let id = 0;
let lst;
let totalbudget;

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  income = sum;
  totalIncome.innerHTML = formatMoney(sum);
}

function calculateExpense() {
  let sum = 0;
  for (let item of expenseList.children) {
    const valueStringEx =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");
   
    sum += parseFloat(valueStringEx);
  }

  console.log(sum)
  expense = Math.abs(sum);
 
  totalExpense.innerHTML = formatMoney(sum);
}

function calculateBudget(){
  console.log(expense);
  console.log(income);
  totalbudget = income-expense;

  availableBudget.innerHTML = formatMoney(totalbudget);
}

function deleteEntry(id, val, sign) {
  localStorage.setItem(id, val);
  console.log(sign);
  
  if(sign === '+'){
    income -= val;
    
    totalIncome.innerHTML = formatMoney(income);
    console.log(id, val);
    let del;
    del = "delete" + id;
    console.log(del);
    const deleteHtml = document.getElementById(del)
    deleteHtml.style.display = "none";
  
    totalbudget -= val;
    availableBudget.innerHTML = formatMoney(totalbudget);
  }

  else{
    expense -= val;
    
    totalExpense.innerHTML = formatMoney(expense);
    console.log(id, val);
    let del;
    del = "delete" + id;
    console.log(del);
    const deleteHtml = document.getElementById(del)
    deleteHtml.style.display = "none";
  
    totalbudget += val;
    availableBudget.innerHTML = formatMoney(totalbudget);
  }
}

function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  const list = type === "income" ? incomeList : expenseList;
  lst=list
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  id++;

   newEntryHtml = `
    <li class="py-2.5" id="delete${id}" >
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
            onclick="deleteEntry(${id}, ${value}, '${sign}')"
          >
            Delete
          </span>
         
        </div>
      </div>
    </li>
    `;

  list.innerHTML += newEntryHtml;

  calculateIncome();
  calculateExpense();
  calculateBudget() ;
}

addExpenseButton.addEventListener("click", addEntry);
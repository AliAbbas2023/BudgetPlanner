//Initialize Variables
const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");
const income_date=document.getElementById("income-date");
const income_amount=document.getElementById("income-amount");

let expense=[];
let income=0;
//Static Expense Data
// const d_expense=[
//     {id:1,text:"flower",amount:20},
//     {id:2,text:"Book",amount:30},
//     {id:3,text:"Camera",amount:50},
//     {id:4,text:"Laptop",amount:200}
// ];

//Init
function initTransaction(){
    list.innerHTML="";
    expense.forEach(addExpenseDOM);
    
    updateValues();
}

//Add Static Income
function addIncome(){
    income+=1000;
    balance.innerText=`$${income}`;
}
//Add Income Through Form Input
function addIncomeThroughForm(e){
    e.preventDefault();
    if(income_date.value.trim()==="" || income_amount.value.trim()===""){
        alert("Please fill all the fields")
    }
    else{
        const incom_amt=Number(income_amount.value.trim())
        addIncomeDynamic(incom_amt);
        // income=income+income_amount.value;
        // balance.innerText=`$${income}`;
        // console.log(income_date.value+" "+income_amount.value);
        income_amount.value="";
        income_date.value="";
        hideIncomPanel();
    }
}
//Add Dynamic Income
function addIncomeDynamic(amount){
    income+=amount;
    balance.innerText=`$${income}`;
    money_plus.innerText=`$${income}`;
}
//Deduct Income
function deductIncome(amount){
    income-=amount;
    balance.innerText=`$${income}`;
}

//Add Expense Data Dynamically Through Inputed Properties
function addExpense(e){

    e.preventDefault();
    if(text.value.trim()==="" || amount.value.trim()===""){
        alert("Please fill all the fields")
    }
    else{
        if(income>=amount.value.trim()){
            expense.push({
                id:generateID(),
                text:text.value.trim(),
                amount:Number(amount.value.trim())
            })
            addExpenseDOM(expense)
            deductIncome(amount.value);
            initTransaction();
            text.value="";
            amount.value="";
        }
        else{
            alert("Not enough money")
        }
      
    }
}
function generateID(){
    return Math.floor(Math.random()*9000);
}
//Remove Expense dynamically from expense collection
function removeExpense(id){
    const DeletedExpense=expense.filter(expense=>expense.id===id);
    console.log(DeletedExpense)
    addIncomeDynamic(DeletedExpense[0].amount);
    expense=expense.filter(expense=>expense.id!==id);
    addExpenseDOM(expense);
    initTransaction();
}

//Update Value to show i.e Income Expense
function updateValues(){
    const amount=expense.map(expense=>expense.amount)
    const total=amount.reduce((acc,curr)=>(acc+=curr),0)
    
    // const income=amount.filter(item=>item>0).reduce((acc,curr)=>(acc+=curr),0);
    // const expense=amount.filter(item=>item<0).reduce((acc,curr)=>(acc+=curr),0)*-1;
    
    money_minus.innerText=`$${total}`;
}


//Add Expense Data In DOM
function addExpenseDOM(expense){

    const sign=expense.amount<0 ? '-' : '+';
    const item=document.createElement('li');
    item.classList.add(expense.amount<0 ? "money-minus" : "money-plus");
    
    item.innerHTML = `${expense.text}<span>${sign}${expense.amount}</span>
     <button class="delete-btn" onclick="removeExpense(${expense.id})">x</button>
     `
     
  list.appendChild(item)
}

form.addEventListener("submit",addExpense)


//Show Income Panel
function showIncomPanel(){
    document.getElementById("incomformcontainer").style.display="block";
}


//Hide Income Panel
function hideIncomPanel(){
    document.getElementById("incomformcontainer").style.display="none";
}

//Show Expense Panel
function showExpensePanel(){
    document.getElementById("expenseformcontainer").style.display="block";
}
//Hide Expense Panel
function hideExpensePanel(){
    document.getElementById("expenseformcontainer").style.display="none";
}
//Add Income Listener
let button = document.getElementById("income-panel-btn");
button.addEventListener("click", showIncomPanel);

let incomeAddBtn=document.getElementById("income-add")
incomeAddBtn.addEventListener("click",addIncomeThroughForm);

let expensePanelBtn=document.getElementById("expense-panel-btn")
expensePanelBtn.addEventListener("click",showExpensePanel);


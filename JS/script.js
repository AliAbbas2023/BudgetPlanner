//Initialize Variables
const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");
const date=document.getElementById("date");
const e_Form=document.getElementById("e-form");
const e_Description=document.getElementById("e-desc");
const e_Amount=document.getElementById("e-amount");
const income_date=document.getElementById("income-date");
const income_amount=document.getElementById("income-amount");

const Sdate=document.getElementById("sdate");
const Edate=document.getElementById("edate");


let expense=[];
let e_expense={};
let objIndex=0;
let income=0;
//const localStorageTransaction=JSON.parse(localStorage.getItem("expense"));
//let expense=localStorage.getItem("expense") !==null ? localStorageTransaction:[];
//Static Expense Data
const d_expense=[
    {id:1,text:"flower",amount:20,date: 'Fri Jan 21 2023 05:00:00'},
    {id:2,text:"Book",amount:30,date: 'Fri Jan 19 2023 05:00:00'},
    {id:3,text:"Camera",amount:50,date: 'Fri Jan 18 2023 05:00:00'},
    {id:4,text:"Laptop",amount:200,date: 'Fri Jan 20 2023 05:00:00'}
];
expense=d_expense;
//Init
function initTransaction(){
    list.innerHTML="";
    expense.forEach(addExpenseDOM);
    
    updateValues();
}
function initFilterTransaction(filterArr){
    list.innerHTML="";
    filterArr.forEach(addExpenseDOM);
    
}
//Update Value to show i.e Income Expense
function updateValues(){
    const amount=expense.map(expense=>expense.amount)
    const total=amount.reduce((acc,curr)=>(acc+=curr),0)
    
    // const income=amount.filter(item=>item>0).reduce((acc,curr)=>(acc+=curr),0);
    // const expense=amount.filter(item=>item<0).reduce((acc,curr)=>(acc+=curr),0)*-1;
    
    money_minus.innerText=`$${total}`;
}

//#region Income Handler
//Add Static Income
function addIncome(){
    income+=1000;
    balance.innerText=`$${income}`;
}
//Add Income Through Form Input
function addIncomeThroughForm(e){
    e.preventDefault();
    if(income_date.value.trim()==="" || income_amount.value.trim()===""){
        console.log("fill all");
    }
    else{
        const incom_amt=Number(income_amount.value.trim())
        hideIncomPanel();
        addIncomeDynamic(incom_amt);
        income_amount.value="";
        income_date.value="";
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
//#endregion 



//#region Expense Handler
//Add Expense Data Dynamically Through Inputed Properties
function addExpense(e){
    e.preventDefault();
    if(text.value.trim()==="" || amount.value.trim()===""){
        console.log("fill all fields with");
    }
    else{
        if(income>=amount.value.trim()){
            expense.push({
                id:generateID(),
                text:text.value.trim(),
                amount:Number(amount.value.trim()),
                date:new Date(date.value.trim())
            })
            // console.log("expense"+expense);
            addExpenseDOM(expense)
            deductIncome(amount.value);
            //updateLocalStorage();
            initTransaction();
            text.value="";
            amount.value="";
        }
        else{
            console.log("Amount not enough");
        }
      
    }
}
function generateID(){
    return Math.floor(Math.random()*9000);
}
function EditExpenseData(e){
    e.preventDefault();
    if(e_Description.value.trim()==="" || e_Amount.value.trim()===""){
        console.log("fill all fields with");
    }
    else{
        if(income>=e_Amount.value.trim()){
            expense[objIndex].text=e_Description.value.trim();
            expense[objIndex].amount=Number(e_Amount.value.trim())

            addExpenseDOM(expense)
            initTransaction();
            e_Description.value="";
            e_Amount.value="";
        }
        else{
            console.log("Amount not enough");
            //alert("Not enough money")
        }
      
    }
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
//Add Expense Data In DOM
function addExpenseDOM(expense){
    const sign=expense.amount<0 ? '' : '+';
    const item=document.createElement('li');
    item.classList.add(expense.amount<0 ? "money-minus" : "money-plus");
    
    item.innerHTML = `${expense.text}<span>${sign}${expense.amount}</span>
     <button class="delete-btn" onclick="removeExpense(${expense.id})">x</button>
     <button class="edit-btn" onclick="editExpensePanel(${expense.id})">E</button>
     <button class="detail-btn" onclick="viewExpense(${expense.id})">D</button>
     `
  list.appendChild(item)
}
//Edit Expense Data Dynamically From expense collection
function editExpensePanel(id){
    e_expense=expense.filter(expense=>expense.id===id);
    objIndex = expense.findIndex((expense => expense.id === id));
    hideExpensePanel();
    ShowEditExpensePanel();
    // text.value=editedExpense[0].text;
}
function viewExpense(id)
{
    const viewedExpense=expense.filter(expense=>expense.id===id);
    ShowExpenseData(viewedExpense);
}
function ShowExpenseData(data){
    console.log(data)
}
function filterExp(){
    // const d1=new Date('Fri Jan 27 2023 05:00:00');
    // const d2=new Date('Fri Jan 29 2023 05:00:00');
    if(Sdate.value==""){
        const expectedDate=expense.filter(a => {
            var date = new Date(a.date);
            return (date >= Sdate.value && date <= Edate.value);
        });
    }
    else if(Edate.value==""){
        confirm("Please select edate date");
    }
    const expectedDate=expense.filter(a => {
        var date = new Date(a.date);
        return (date >= new Date(Sdate.value) && date <= new Date(Edate.value));
    });
    addExpenseDOM(expectedDate);
    initFilterTransaction(expectedDate);
    console.log(expectedDate)
}
//#endregion 


//#region Panels
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
function ShowEditExpensePanel(){
    //window.open("http://127.0.0.1:5500/Html/EditExpense.html", "_blank");
     document.getElementById("editExpenseFormContainer").style.display="block";
}
//#endregion



//#region Listener Functions
//IncomePanel Listener
let button = document.getElementById("income-panel-btn");
button.addEventListener("click", showIncomPanel);
//IncomeAdd Listener
let incomeAddBtn=document.getElementById("income-add")
incomeAddBtn.addEventListener("click",addIncomeThroughForm);
//ExpenseAdd Listener
let expensePanelBtn=document.getElementById("expense-panel-btn")
expensePanelBtn.addEventListener("click",showExpensePanel);
//EditExpense Listener
let EditExpensePanelBtn=document.getElementById("edit-expense-panel-btn")
EditExpensePanelBtn.addEventListener("click",EditExpenseData);

let filterBtn=document.getElementById("dateFilterBtn")
filterBtn.addEventListener("click",filterExp);

//Form Listener
 form.addEventListener("submit",addExpense)
//#endregion



//Update localStorage
function updateLocalStorage(){
    localStorage.setItem("expense",JSON.stringify(expense));
}
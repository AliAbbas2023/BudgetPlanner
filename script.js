const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");

const d_transection=[
    {id:1,text:"flower",amount:20},
    {id:2,text:"Book",amount:30},
    {id:3,text:"Camera",amount:50},
    {id:4,text:"Laptop",amount:200}
];

let transaction=d_transection;

//Add Transaction
function addTransaction(){
    e.preventDefault();
    if(text.ariaValueMax.trim()==="" || amount.ariaValueMax.trim()===""){
        alert("Please fill all the fields")
    }
    else{
        transaction.push({
            id:transaction.length+1,
            text:text.ariaValueMax.trim(),
            amount:Number(amount.ariaValueMax.trim())
        })
        addTransactionDOM(transaction[transaction.length-1])
        text.value="";
        amount.value="";
    }
}
function generateID(){
    return Math.floor(Math.random()*9000);
}
function addTransactionDOM(transaction){
    const sign=transaction.amount<0 ? '-' : '+';
    const item=document.createElement('li');
    item.classList.add(transaction.amount<0 ? "money-minus" : "money-plus");
    
    item.innerHTML = `${transaction.text}<span>${sign}${transaction.amount}</span>
     <button class="delete-btn" onclick="">x</button>
     `
     
    // if(document.getElementById("balance")){
    //     // element exists
    //     console.log(balance)
    // }
    // else{
    //     console.log(balance)
    // }
  list.appendChild(item)
}
//Update Value
function updateValues(){
    const amount=d_transection.map(transaction=>transaction.amount)
   
    const total=amount.reduce((acc,curr)=>(acc+=curr),0)
    console.log(total)
    balance.innerHTML=total;
    const income=amount.filter(item=>item>0).reduce((acc,curr)=>(acc+=curr),0);
   
    const expense=amount.filter(item=>item<0).reduce((acc,curr)=>(acc+=curr),0)*-1;
    console.log(expense)
    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}
//Init
function initTransaction(){
    list.innerHTML="";
    transaction.forEach(addTransactionDOM);
    updateValues();
}
addTransactionDOM(transaction[0])

addTransactionDOM(transaction[1])
updateValues()


form.addEventListener("submit",addTransaction)
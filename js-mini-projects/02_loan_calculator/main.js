//variables
const _amount = document.getElementById('amount');
const _interest = document.getElementById('interest');
const _years = document.getElementById('years');
const _inputForm = document.getElementById('input-form');
const _loadingScreen = document.getElementById('loading');
const _result = document.getElementById('result');

loadAllEvents();

function loadAllEvents(){
   _inputForm.addEventListener('submit', eventCalculateLoan);
}

//calculate loan
function eventCalculateLoan(e){
   e.preventDefault();
   if((_amount.value!=='') || (_interest.value!=='') || (_years.value!=='')){
      _loadingScreen.style.display='block';
      setTimeout(calculating, 3000);
   }else{
      showErrorMessage();
   }
}
function calculating(){
   _loadingScreen.style.display='none';
   calculateLoan(_amount.value,_interest.value,_years.value);
   result.style.display = 'block';
}

const _monthlyPayment = document.getElementById('monthly-payment');
const _totalPayment = document.getElementById('total-payment');
const _totalInterest = document.getElementById('total-interest');
function calculateLoan(amount, interest, years){
   // loan calculation
   const monthlyInterest = interest/100/12;
   const repayMonths = years*12;
   const x = Math.pow(1+monthlyInterest,repayMonths);
   const monthlyPayment = (amount*x*monthlyInterest) / (x-1);
   const totalPayment = monthlyPayment*repayMonths;
   const totalInterest = totalPayment - amount;

   _monthlyPayment.textContent = monthlyPayment.toFixed(2);
   _totalPayment.textContent = totalPayment.toFixed(2);
   _totalInterest.textContent = totalInterest.toFixed(2);
}

//show Error Message
const _error = document.getElementById('error-message');
function showErrorMessage(){
   _error.style.display='block';
   setTimeout(clearError, 3000);
}
function clearError(){
   _error.style.display='none';
}

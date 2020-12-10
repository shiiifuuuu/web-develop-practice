const _userInput = document.getElementById('user-input');
const _appForm = document.getElementById('app-form');
const _btn = document.querySelector('#app-form .btn-form');
const _min = document.getElementById('min');
const _max = document.getElementById('max');
const _message = document.getElementById('message');
const _again = document.getElementById('again');

let min=1, 
   max=10, 
   winNumber,
   lives=3;

_min.textContent=min;
_max.textContent=max;

// Generating random win number from 1-10
function randomWinNumber(){
   let random = Math.floor(Math.random()*10+1);
   return random;
}
//initializing win number
winNumber=randomWinNumber();

_appForm.addEventListener('submit', guessNumber);
function guessNumber(e){
   e.preventDefault();
   _message.style.display='block';
   let value = parseInt(_userInput.value);
   if(isNaN(value)){
      setMessage('Input your Number..', '#333');
      setTimeout(messageHide,2000);
   }
   else if(value>max || value<min){
      setMessage(`${value} is our of range!`, 'brown');
      _userInput.value='';
      setTimeout(messageHide,4000);
   }
   else if(value === winNumber){
      setMessage(`${_userInput.value} is correct! YOU WIN`, 'green');

      _userInput.disabled='true';

      _again.style.display='inline';
   }else{
      lives--;
      if(lives>0){
         setMessage(`${_userInput.value} is wrong. You have ${lives} lives left.`, 'red');
      }else{
         setMessage(`Game Over. You Lost! The Correct Number was ${winNumber}`, 'red');
         _btn.disabled=true;
         _userInput.disabled=true;
         _again.style.display='inline';
      }
   }
}
function setMessage(message,color){
   _message.textContent=message;
   _message.style.color=color;
   _userInput.style.borderColor=color;
}
function messageHide(){
   _message.style.display='none';
}
//Window reload
_again.addEventListener('click', function(e){
   window.location.reload();
})

//Select all from input when clicked
_userInput.addEventListener('click', function(e){
   e.target.select();
})
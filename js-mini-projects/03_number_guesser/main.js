const _userInput = document.getElementById('user-input');
const _appForm = document.getElementById('app-form');
const _btnSubmit = document.querySelector('#app-form .btn-form');
const _min = document.getElementById('min');
const _max = document.getElementById('max');
const _message = document.getElementById('message');
// const _again = document.getElementById('again');

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
   // console.log(e.target.children[2].className);
   //window reload
   if(e.target.children[2].className === 'btn-replay'){
      window.location.reload();
   }

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
      disableAll();

      setMessage(`${value} is correct!\nYOU WIN`, 'green');      
   }else{
      lives--;
      if(lives>0){
         setMessage(`${value} is wrong. You have ${lives} lives left.`, 'red');
      }else{
         setMessage(`Game Over. You Lost!\nThe Correct Number was ${winNumber}`, 'red');

         disableAll();
      }      
   }
   e.preventDefault();
}
function setMessage(message,color){
   _message.style.display='block';
   _message.textContent=message;
   _message.style.color=color;
   _userInput.style.borderColor=color;
}
function disableAll(){
   _userInput.disabled=true;
   _userInput.style.borderColor='gray';

   _btnSubmit.className = 'btn-replay';
   _btnSubmit.value = 'Play Again';
}
function messageHide(){
   _message.style.display='none';
}

//Select all from input when clicked
_userInput.addEventListener('click', function(e){
   e.target.select();
})
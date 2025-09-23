import { words } from "./data.js";
const inputs = document.getElementById('inputs');
const btn = document.getElementById('btn');


let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);


function generateArea(){
  inputs.innerHTML = "";
  for (let i = 0; i < 5; i++) {
      inputs.innerHTML += `
             <div id="inputBox${i}" class="tryDiv flex items-center justify-between">
        </div>
     `;
     const tryDiv = document.querySelectorAll(".tryDiv");
   for (let j = 0; j < randomWord.length; j++) {
    tryDiv[i].innerHTML += `
    <input id="letter-${i}-${j}" class="bg-white border-b-4 outline-none text-center  text-2xl border-blue-900 w-10 h-10" type="text" maxlength="1">
    `; 
   }
     
  }

}

function setAutoFocus(){
  const allInputs = document.querySelectorAll("#inputs input");
  
  if(allInputs.length > 0){
    allInputs[0].focus();
  }

  allInputs.forEach((input,index)=>{
    input.addEventListener("input",()=>{
      const nextInput = allInputs[index + 1];
      if(nextInput && input.value !== "" ){

      //  if(nextInput === allInputs[randomWord.length]){
      //    checkTry();
       // }

        nextInput.focus();
      }
    });
  });

   allInputs.forEach((input,index)=>{ 
    input.addEventListener("keydown",(e)=>{
       if(e.key === "Backspace" && input.value === ""){
        const prevInput = allInputs[index - 1];
        if(prevInput){
          prevInput.focus();
          prevInput.value = "";
        }
       }
    });
    });

    
}
generateArea();


function checkTry(rowIndex){
      const divTry = document.querySelectorAll(`#inputBox${rowIndex} input`);
      for (let j = 0; j < randomWord.length; j++) {
       const input = divTry[j];
       const letter = input.value.toUpperCase();
       const correctLetter = randomWord[j].toUpperCase();

       if(letter === correctLetter){
         input.style.background = "#008236";
         input.style.color = "white";
       } else if(randomWord.includes(letter)){
         input.style.background = "#f0b100";
         input.style.color = "white";
       } else{
          input.style.background = "#E7000B";
          input.style.color = "white";
       }
      }

}
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < randomWord.length; j++) {
    const lastInput = document.getElementById(`letter-${i}-${j}`);
     lastInput.addEventListener('input',()=>{
      checkTry(i);
     });
  }
  
}


setAutoFocus();



//#f0b100 yellow
//#E7000B red

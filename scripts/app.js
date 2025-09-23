import { words } from "./data.js";
const inputs = document.getElementById('inputs');
const btn = document.getElementById('btn');


let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);


function generateArea(){
  inputs.innerHTML = "";

     for(let i = 0 ; i < 5 ; i++){
     inputs.innerHTML += `
             <div id="inputBox${i}" class="flex items-center justify-between">
        </div>
     `;
     const inputBox = document.getElementById(`inputBox${i}`);
     for (let j = 0; j < randomWord.length; j++) {
      inputBox.innerHTML += `
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
      if(nextInput && input.value !== ""){
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
function logic(){

}
generateArea();
btn.addEventListener("click",()=>{
    for (let i = 0; i < randomWord.length; i++) {
      
    }
});
setAutoFocus();





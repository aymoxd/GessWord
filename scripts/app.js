import { wordsEN } from "./data.js";
import { wordsAR } from "./data.js";
const inputs = document.getElementById('inputs');
const btn = document.getElementById('btn');
const popup = document.getElementById('popup');
const hack = document.getElementById('hack');
const eng = document.getElementById('english');
const arab = document.getElementById('arabic');
const play = document.getElementById('play');
const game = document.getElementById('game');
const firstPage = document.getElementById('firstPage');

let words = wordsEN;
let selectLang = false;

play.addEventListener('click',()=>{
         firstPage.classList.remove('flex');
         firstPage.classList.add('hidden');
         game.classList.remove('hidden');
         game.classList.add('flex');

});
eng.addEventListener('click',()=>{
  words = wordsEN;
  arab.classList.remove('bg-green-600');
  eng.classList.add('bg-green-600');
  selectLang = true;
});
arab.addEventListener('click',()=>{
  words = wordsAR;
  eng.classList.remove('bg-green-600');
  arab.classList.add('bg-green-600');
  selectLang = true;
});

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
      let userWord = "";

      for (let j = 0; j < randomWord.length; j++) {
       const input = divTry[j];
       const letter = input.value.toUpperCase();
       const correctLetter = randomWord[j].toUpperCase();
         
         userWord += letter;


       if(letter === correctLetter){
         input.style.background = "#008236"; //green
         input.style.color = "white";
       } else if(randomWord.toUpperCase().includes(letter) && letter !== correctLetter){
         input.style.background = "#f0b100";  //yellow
         input.style.color = "white";
       } else{
          input.style.background = "#E7000B";  //red
          input.style.color = "white";
       }
      }
      if(userWord === randomWord.toUpperCase()){
          popup.classList.remove('hidden');
        popup.classList.add('flex');
        popup.innerHTML = `
         <div class="fixed bg-white z-50 shadow-lg py-5 px-10 md:py-10 md:px-20 rounded-lg flex flex-col items-center justify-center text-base md:text-xl space-y-4">
      <h1 class="text-gray-700">🎉 You Win!</h1>
      <h1 class="text-gray-700">  Congratulations! You guessed the word correctly  🚀</h1>
      <button  id="reset" class="bg-blue-700 text-white py-3 cursor-pointer transform transition-all duration-300  active:scale-95 px-12 rounded-md">Play again</button>
    </div>
        `;
         reset.addEventListener("click",()=>{
          location.reload();
         });  

      } else if(rowIndex === 4){
        popup.classList.remove('hidden');
        popup.classList.add('flex');
          popup.innerHTML = `
         <div class="fixed bg-white z-50 shadow-lg py-5 px-10 md:py-10 md:px-20 rounded-lg flex flex-col items-center justify-center text-base md:text-xl space-y-4">
      <h1 class="text-gray-700 font-bold">you loose </h1>
      <h1 class="text-gray-700">The word was <span class="text-blue-800 font-bold">${randomWord}</span></h1>
      <button id="reset" class="bg-blue-700 text-white py-3 cursor-pointer transform transition-all duration-300  active:scale-95 px-12 rounded-md">Try again</button>
    </div>
          `;
         reset.addEventListener("click",()=>{
          location.reload();
         });
      }


}
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < randomWord.length; j++) {
    const lastInput = document.getElementById(`letter-${i}-${randomWord.length-1}`);
     lastInput.addEventListener('input',()=>{
      checkTry(i);
     });
  }
  
  
}


setAutoFocus();

let ctrToggle = false;

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "m") {
    ctrToggle = !ctrToggle;

    if (ctrToggle) {
      hack.innerHTML = randomWord;
    } else {
      hack.innerHTML = "key colors";
    }
  }
});




//#f0b100 yellow
//#E7000B red

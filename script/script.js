'use strict';
const test = 1; 

document.addEventListener('DOMContentLoaded', function() {
   const btnOpenModal = document.querySelector('#btnOpenModal');
   const modalBlock = document.querySelector('#modalBlock');
   const closeModal = document.querySelector('#closeModal');
   const questionTitle = document.querySelector('#question');
   const formAnswers = document.querySelector('#formAnswers');
   
   btnOpenModal.addEventListener('click',() => {
      modalBlock.classList.add('d-block');
      playTest();
   });
   closeModal.addEventListener('click', () => {
      modalBlock.classList.remove('d-block')
   });


   const playTest = () => {
      const renderQuestions = () => {
         questionTitle.textContent = 'Какого цвета бургер вы хотите?';
         
         const burgerName = 'Стандарт';
         const burgerImage = './image/burger.png'
         formAnswers.innerHTML = `<div class="answers-item d-flex flex-column">
               <input type="radio" id="answerItem1" name="answer" class="d-none">
               <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${burgerImage}" alt="burger">
                  <span>${burgerName}</span>
               </label>
            </div>  
            `
         
      };
      renderQuestions();
   }
})

//Помещая код в document.addEventListener 'DOMContentLoaded'
//Остальной скрипт запустится только после полной загрузки DOM дерева





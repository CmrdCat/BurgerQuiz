'use strict';

document.addEventListener('DOMContentLoaded', function() {
   const btnOpenModal = document.querySelector('#btnOpenModal');
   const modalBlock = document.querySelector('#modalBlock');
   const closeModal = document.querySelector('#closeModal');
   const questionTitle = document.querySelector('#question');
   const formAnswers = document.querySelector('#formAnswers');
   const burgerMenu = document.querySelector('#burgerMenu');
   const prevButton = document.querySelector('#prev');
   const nextButton = document.querySelector('#next');
   const modalDialog = document.querySelector('.modal-dialog');


   const questions = [
      {
         question: "Какого цвета бургер?",
         answers: [
            {
               title: 'Стандарт',
               url: './image/burger.png'
            },
            {
               title: 'Черный',
               url: './image/burgerBlack.png'
            }
         ],
         type: 'radio'
      },
      {
         question: "Из какого мяса котлета?",
         answers: [
            {
               title: 'Курица',
               url: './image/chickenMeat.png'
            },
            {
               title: 'Говядина',
               url: './image/beefMeat.png'
            },
            {
               title: 'Свинина',
               url: './image/porkMeat.png'
            }
         ],
         type: 'radio'
      },
      {
         question: "Дополнительные ингредиенты?",
         answers: [
            {
               title: 'Помидор',
               url: './image/tomato.png'
            },
            {
               title: 'Огурец',
               url: './image/cucumber.png'
            },
            {
               title: 'Салат',
               url: './image/salad.png'
            },
            {
               title: 'Лук',
               url: './image/onion.png'
            }
         ],
         type: 'checkbox'
      },
      {
         question: "Добавить соус?",
         answers: [
            {
               title: 'Чесночный',
               url: './image/sauce1.png'
            },
            {
               title: 'Томатный',
               url: './image/sauce2.png'
            },
            {
               title: 'Горчичный',
               url: './image/sauce3.png'
            }
         ],
         type: 'radio'
      }
   ];

   let count = -100;
   let interval;
   modalDialog.style.top = count + `%`;

   const animateModal = () => {
      modalDialog.style.top = count + `%`;
      count += 1.5;
      interval = requestAnimationFrame(animateModal);

      if (count > 0) {
         cancelAnimationFrame(interval);
         count = -100;
      }
   }


   burgerMenu.style.display = "none";

   let clientWidth = document.documentElement.clientWidth; //Присваиваем в переменную ширину экрана при загрузке страницы
   
   if (clientWidth < 768) {
      burgerMenu.style.display = "flex";
   } else {
      burgerMenu.style.display = "none";
   }

   window.addEventListener('resize', function() {
      clientWidth = document.documentElement.clientWidth;

      if (clientWidth < 768) {
         burgerMenu.style.display = "flex";
      } else {
         burgerMenu.style.display = "none";
      }
   }) //Событие отслеживает изменение размера окна

   burgerMenu.addEventListener('click',() => {
      burgerMenu.classList.add("active");
      modalBlock.classList.add('d-block');
      playTest();
   });





   btnOpenModal.addEventListener('click',() => {
      interval = requestAnimationFrame(animateModal);
      modalBlock.classList.add('d-block');
      playTest();
   });
   closeModal.addEventListener('click', () => {
      modalBlock.classList.remove('d-block');
      burgerMenu.classList.remove("active");
   });

document.addEventListener('click',(event) => {
   if (
      !event.target.closest('.modal-dialog') && 
      !event.target.closest('#btnOpenModal') &&
      !event.target.closest('#burgerMenu')
      ){
      modalBlock.classList.remove('d-block');
      burgerMenu.classList.remove("active");
      cancelAnimationFrame(interval);
      count = -100;
   }
})

   const playTest = () => {
      let numberQuestion = 0;

      const renderAnswers = (index) => {
         questions[index].answers.forEach((answer) => {
            const answerItem = document.createElement('div');

            answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
            answerItem.innerHTML = `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
               <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${answer.url}" alt="burger">
                  <span>${answer.title}</span>
               </label>
               `;

            formAnswers.appendChild(answerItem);
         });
      };

      const renderQuestions = (indexQuestion) => {
         formAnswers.innerHTML = '';

         questionTitle.textContent = `${questions[indexQuestion].question}`;

         renderAnswers(indexQuestion);

         if (indexQuestion < 1) {
            prevButton.style.display = "none"
         } else {
            prevButton.style.display = "flex"
         };
         if (indexQuestion >= questions.length - 1) {
            nextButton.style.display = "none"
         } else {
            nextButton.style.display = "flex"
         }
      };
      renderQuestions(numberQuestion);
      

      nextButton.onclick = () => {
         numberQuestion++;
         renderQuestions(numberQuestion);
      };
      prevButton.onclick = () => {
         numberQuestion--;
         renderQuestions(numberQuestion);
      };
   };

   


})

//Помещая код в document.addEventListener 'DOMContentLoaded'
//Остальной скрипт запустится только после полной загрузки DOM дерева





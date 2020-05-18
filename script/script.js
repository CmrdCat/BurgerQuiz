'use strict';

//Обработчик событий, скрипт будет загружаться только после загрузки html документа
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
   const sendButton = document.querySelector('#send');
   const modalTitle = document.querySelector('.modal-title');



    // Your web app's Firebase configuration


   const firebaseConfig = {
      apiKey: "AIzaSyAPYNc0sa9ZIrijdidP8lDss1brvnZX0Po",
      authDomain: "testburger-e3950.firebaseapp.com",
      databaseURL: "https://testburger-e3950.firebaseio.com",
      projectId: "testburger-e3950",
      storageBucket: "testburger-e3950.appspot.com",
      messagingSenderId: "410194197010",
      appId: "1:410194197010:web:e5a9f7135724efd36eb6cb",
      measurementId: "G-LCVMQ9YVJF"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   //Функция получения данных
   const getData = () => {
      formAnswers.textContent = "LOAD";   

      nextButton.classList.add('d-none');
      prevButton.classList.add('d-none');
      modalTitle.textContent = "";
      setTimeout(() => {
         firebase.database().ref().child('questions').once('value')
            .then(snap => playTest(snap.val()))
      },1000)
      

   }

   //Можно использовать этот код для подгрузки данных с JSON файла в корне
   // fetch('./questions.json')
   //    .then(res => res.json())
   //    .then(obj => playTest(obj.questions))
   //    .catch(err => {
   //       formAnswers.textContent = "Ошибка загрузки данных";
   //       console.error(err);
   //     })


// Установка анимации для модального окна.
// Окно плавно спускается с верхнего края экрана
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
//Присваиваем в переменную ширину экрана при загрузке страницы
   let clientWidth = document.documentElement.clientWidth; 
   
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




//Открытие и закрытие модального окна
   btnOpenModal.addEventListener('click',() => {
      interval = requestAnimationFrame(animateModal);
      modalBlock.classList.add('d-block');
      getData();

   });
   closeModal.addEventListener('click', () => {
      modalBlock.classList.remove('d-block');
      burgerMenu.classList.remove("active");
   });

//Закрттие модального окна через клик вне окна
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
});

//Запуск теста по нажатию на кнопку
   const playTest = (questions) => {
      const obj = {};
      const finalAnswers = [] ;
      let numberQuestion = 0;
      modalTitle.textContent = "Ответьте на вопросы"
//Функция рендера  ответов из переменной выше
      const renderAnswers = (index) => {
         questions[index].answers.forEach((answer) => {
            const answerItem = document.createElement('div');

            answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
            answerItem.innerHTML = `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
               <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${answer.url}" alt="burger">
                  <span>${answer.title}</span>
               </label>
               `;
            formAnswers.appendChild(answerItem);
         });
      };
//Функция чтения вопросов из переменной выше и вызов функции рендера ответов
      const renderQuestions = (indexQuestion) => {
         formAnswers.innerHTML = '';
         switch(true) {
            // case (numberQuestion === 0):
            //    questionTitle.textContent = `${questions[indexQuestion].question}`;
            //    renderAnswers(indexQuestion);
            //    prevButton.classList.add('d-none');
            //    break;
            case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
               questionTitle.textContent = `${questions[indexQuestion].question}`;
               renderAnswers(indexQuestion);
               nextButton.classList.remove('d-none');
               prevButton.classList.remove('d-none');
               sendButton.classList.add('d-none');
               nextButton.textContent = "Вперёд";
               prevButton.textContent = "Назад";
               if (numberQuestion === 0) {                  
                  prevButton.classList.add('d-none');
               }
               break;
            case (numberQuestion === questions.length):
               modalTitle.textContent = '';
               nextButton.classList.add('d-none');
               sendButton.classList.remove('d-none');
               sendButton.textContent = "Отправить";
               prevButton.textContent = "Изменить выбор";
               questionTitle.textContent = "Отличный выбор! Оставьте данные для связи";
               formAnswers.innerHTML = `
                  <div class="form-group">
                     <label for="numberPhone">Введите номер телефона для связи</label>
                     <input type="phone" class="form-control" id="numberPhone">
                  </div>
               `;

               const numberPhone = document.getElementById('numberPhone');
               numberPhone.addEventListener('input', (event) => {
                  event.target.value = event.target.value.replace(/[^0-9+-]/, "")
               });

               break;
            case (numberQuestion === questions.length + 1):
               questionTitle.textContent = "Мы скоро свяжемся с вами";
               formAnswers.textContent = "Спасибо за пройденный тест!";
               sendButton.classList.add('d-none');
               prevButton.classList.add('d-none');

               for (let key in obj) {
                  let newObj = {};
                  newObj[key] =obj[key];
                  finalAnswers.push(newObj);
               }

               setTimeout(() => {
                  modalBlock.classList.remove('d-block');
                  numberQuestion = 0;
               }, 3000);
               break;
         }
         
      };

      const checkAnswer = () => {
         
         const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
         inputs.forEach((input, index) => {
            switch(true) {
               case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
                  obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                  break;
               case (numberQuestion === questions.length):
                  obj[`Номер телефона`] = input.value;
                  break;
            }
         })
      }
      //Запускаем функцию 
      renderQuestions(numberQuestion);
      
//Функционал для кнопок <- и ->
      nextButton.onclick = () => {
         checkAnswer();
         numberQuestion++;
         renderQuestions(numberQuestion);
      };
      prevButton.onclick = () => {
         numberQuestion--;
         renderQuestions(numberQuestion);
      };
      sendButton.onclick = () => {
         checkAnswer();
         numberQuestion++;
         renderQuestions(numberQuestion);
         firebase
            .database()
            .ref()
            .child('contacts')
            .push(finalAnswers)
         console.log(finalAnswers);
      };
      
   };

   


})
//Помещая код в document.addEventListener 'DOMContentLoaded'
//Остальной скрипт запустится только после полной загрузки DOM дерева





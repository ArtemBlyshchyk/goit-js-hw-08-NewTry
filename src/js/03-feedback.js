import Throttle from 'lodash.throttle';
// 1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".

const form = document.querySelector('.feedback-form');
console.log(form);
const formEmail = form.elements.email;
console.log(formEmail);
const formMessage = form.elements.message;
console.log(formMessage);

let formData = {};
// 4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

form.addEventListener('input', Throttle(feedback, 500));

function feedback() {
  formData = {
    email: formEmail.value,
    message: formMessage.value,
  };
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', formDataJSON);
}

// 2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
document.addEventListener('DOMContentLoaded', () => {
  const getFormData = localStorage.getItem('feedback-form-state');
  formData = JSON.parse(getFormData);
  if (formData) {
    formEmail.value = formData.email;
    formMessage.value = formData.message;
  }
});

// 3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(formData);
  localStorage.clear();
  //   formEmail.value = '';
  //   formMessage.value = '';
  form.reset();
});

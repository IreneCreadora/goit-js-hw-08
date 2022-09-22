import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  const key = e.target.name;
  const value = e.target.value;
  formData[key] = value;
  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

updateForm();

function updateForm() {
  if (localStorage.getItem(FORM_KEY)) {
    const { email = '', message = '' } = JSON.parse(
      localStorage.getItem(FORM_KEY)
    );
    refs.form.email.value = email;
    refs.form.message.value = message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(FORM_KEY)));
  localStorage.removeItem(FORM_KEY);
  e.target.reset();
}

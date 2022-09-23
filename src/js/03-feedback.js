import throttle from 'lodash.throttle';
import storage from './storage';

const FORM_KEY = 'feedback-form-state';
const savedFormData = storage.load(FORM_KEY) || {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

updateForm();

function updateForm() {
  Object.entries(savedFormData).forEach(([name, value]) => {
    refs.form.elements[name].value = value;
  });
}

function onFormInput({ target: { name, value } }) {
  savedFormData[name] = value;
  storage.save(FORM_KEY, savedFormData);
}

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;

  console.log({
    email: email.value,
    message: message.value,
  });
  storage.remove(FORM_KEY);
  e.target.reset();
  // const form = e.currentTarget;
  // const data = {};

  // new FormData(form).forEach((value, name) => {
  //   data[name] = value;
  // });

  // console.log(data);
}

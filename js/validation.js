let form = document.querySelector('.buy_form')
let validateBtn = form.querySelector('#validateBtn')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log('clicked on validate')
})

form.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log('clicked on validate')
  console.log('from: ', from.value)
  console.log('password: ', password.value)
  console.log('passwordConfirmation: ', passwordConfirmation.value)
  console.log('where: ', where.value)
  console.log('message: ', message.value)
})

let fields = form.querySelectorAll('.field')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
    }
  }
})
for (let i = 0; i < fields.length; i++) {
  if (!fields[i].value) {
    console.log('field is blank', fields[i])
    let error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = 'Cannot be blank'
    form[i].parentElement.insertBefore(error, fields[i])
  }
}

//   удаляю ошибки при начала валидации 
form.addEventListener('submit', function (event) {
  event.preventDefault()

  let errors = form.querySelectorAll('.error')

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }

  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
      let error = document.createElement('div')
      error.className = 'error'
      error.style.color = 'red'
      error.innerHTML = 'Cannot be blank'
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }
})

//проверка на ошибки когда не совпадают пароли 
form.addEventListener('submit', function (event) {
  event.preventDefault()

  let errors = form.querySelectorAll('.error')

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }

  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
      let error = document.createElement('div')
      error.className = 'error'
      error.style.color = 'red'
      error.innerHTML = 'Cannot be blank'
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }

  if (password.value !== passwordConfirmation.value) {
    console.log('not equals')
    let error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = 'Passwords doesnt match'
    password.parentElement.insertBefore(error, password)
  }
})

//функция которая принимает на вход строку и вовзращает в DOM элемент 
let generateError = function (text) {
  let error = document.createElement('div')
  error.className = 'error'
  error.style.color = 'red'
  error.innerHTML = text
  return error
}

//переношу в отдельную функцию отчисстку ошибок 
let removeValidation = function () {
  let errors = form.querySelectorAll('.error')

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

//вызываю ее
form.addEventListener('submit', function (event) {
  event.preventDefault()

  removeValidation()

  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
      let error = generateError('Cant be blank')
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }

  if (password.value !== passwordConfirmation.value) {
    console.log('not equals')
    let error = generateError('Password doesnt match')
    password.parentElement.insertBefore(error, password)
  }
})

//выношу проверку полей на пустоту 
let checkFieldsPresence = function () {
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
      let error = generateError('Cant be blank')
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }
}

//вызываю ее
form.addEventListener('submit', function (event) {
  event.preventDefault()

  removeValidation()

  checkFieldsPresence()

  if (password.value !== passwordConfirmation.value) {
    console.log('not equals')
    let error = generateError('Password doesnt match')
    password.parentElement.insertBefore(error, password)
  }
})

//выношу валидацию пароля 
let checkPasswordMatch = function () {
  if (password.value !== passwordConfirmation.value) {
    console.log('not equals')
    let error = generateError('Password doesnt match')
    console.log(error)
    password.parentElement.insertBefore(error, password)
  }
}

//
form.addEventListener('submit', function (event) {
  event.preventDefault()

  removeValidation()

  checkFieldsPresence()

  checkPasswordMatch()
})
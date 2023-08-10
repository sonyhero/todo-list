import * as Yup from 'yup'

export const basicFormSchema = Yup.object().shape({
  email: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках
    .email('Invalid email address')
    //не сабмитим, если поле не заполнено
    .required('Required'),
  password: Yup.string().min(8, 'Must be longer than 8 characters').required('Required'),
})

import { useActions, useAppSelector } from '@/common/hooks'
import { authThunks } from '../../auth.slice'
import { selectCaptchaUrl } from '@/features/auth/auth.selectors'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export const loginFormSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Must be longer than 8 characters').required('Required'),
  rememberMe: Yup.boolean().default(true),
  captcha: Yup.string().default(''),
})

export type LoginSchemaType = Yup.InferType<typeof loginFormSchema>

export const useLogin = () => {
  const { login } = useActions(authThunks)
  const captcha = useAppSelector(selectCaptchaUrl)
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    defaultValues: {
      rememberMe: true,
    },
    resolver: yupResolver(loginFormSchema),
  })

  const onSubmit = (values: LoginSchemaType) => {
    login(values)
      .unwrap()
      .catch((err) => {
        toast.error(err.data.message)
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { captcha, control, handleSubmitForm }
}

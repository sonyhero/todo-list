import { useActions } from '../../../../common/hooks'
import { authThunks } from '../../auth.slice'
import { FormikHelpers, useFormik } from 'formik'
import { basicFormSchema } from '../basic-shema'
import { LoginParamsType } from '../../../../api/api'
import { ResponseAppType } from '../../../../common/types'

export const useLogin = () => {
  const { login } = useActions(authThunks)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    },
    validationSchema: basicFormSchema,
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: ResponseAppType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    },
  })

  return { formik }
}

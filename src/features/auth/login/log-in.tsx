import { Card } from '@/components/ui/card'
import s from './log-in.module.scss'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'
import { useLogin } from '@/features/auth/Login/hooks/useLogin'

export const Login = () => {
  const { captcha, control, handleSubmitForm } = useLogin()

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        Login
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <ControlledTextField
          name={'email'}
          label={'Email'}
          type={'default'}
          placeholder={'enter your email'}
          control={control}
          className={s.email}
        />
        <ControlledTextField
          name={'password'}
          label={'Password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.password}
          autoComplete={'on'}
        />
        <ControlledCheckbox control={control} variant={'default'} name={'rememberMe'} label={'Remember me'} />
        {captcha && (
          <>
            <ControlledTextField
              name={'captcha'}
              label={'Captcha'}
              type={'default'}
              placeholder={'enter captcha'}
              control={control}
              className={s.password}
            />
            <img src={`${captcha}`} alt="captcha img" />
          </>
        )}
        <Button fullWidth={true} className={s.submit} type="submit">
          Login
        </Button>
      </form>
    </Card>
  )
}

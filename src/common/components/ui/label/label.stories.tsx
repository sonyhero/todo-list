import type { Meta } from '@storybook/react'
import { LabelDemo } from '@/common/components/ui/label/label'
import { TextField } from '@/common/components/ui/textfield'

const meta = {
  title: 'Components/LabelDemo',
  component: LabelDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof LabelDemo>

export default meta

export const LabelStoryPrimary = () => {
  return (
    <>
      <LabelDemo label={'Input'} disabled={false} variant={'primary'}>
        <TextField type={'default'} value={'Input'} disabled={false} />
      </LabelDemo>
    </>
  )
}
export const LabelStorySecondary = () => {
  return (
    <>
      <LabelDemo label={'Input'} disabled={false} variant={'secondary'}>
        <TextField type={'default'} value={'Input'} disabled={false} />
      </LabelDemo>
    </>
  )
}
export const LabelStoryDisabled = () => {
  return (
    <>
      <LabelDemo label={'Input'} disabled={true}>
        <TextField type={'default'} value={'Input'} disabled={true} />
      </LabelDemo>
    </>
  )
}

import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxDemo } from '@/components/ui/checkbox/checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxDemo,
  tags: ['autodocs'],
  argTypes: {
    value: {
      options: ['default', 'withText'],
      control: { type: 'radio' },
    },
    onChange: { action: 'checked changes' },
  },
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const ShowCheckbox: Story = {
  args: {
    variant: 'default',
    value: true,
  },
}

export const DisabledCheckbox: Story = {
  args: {
    value: true,
    disabled: true,
    variant: 'default',
  },
}

export const CheckboxWithText: Story = {
  args: {
    value: false,
    variant: 'withText',
    label: 'Test',
  },
}

export const DisabledCheckboxWithText: Story = {
  args: {
    value: false,
    variant: 'withText',
    disabled: true,
    label: 'Test',
  },
}

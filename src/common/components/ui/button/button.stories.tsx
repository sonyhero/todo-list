import type { Meta, StoryObj } from '@storybook/react'

import { Logout } from '@/assets'
import { Button } from '@/common/components/ui/button/button'

const meta = {
  title: 'Components/Buttons',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
    onClick: { action: 'button clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Logout />
        Button primary
      </>
    ),
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Logout />
        Button secondary
      </>
    ),
    disabled: false,
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Tertiary Button',
    disabled: false,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
export const AsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a',
  },
}
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/common/components/ui/card/card'
import { Button } from '@/common/components/ui/button'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const ShowCard: Story = {
  args: {
    children: (
      <>
        <a href="">Ссылка</a>
        <Button variant={'primary'} />
      </>
    ),
  },
}

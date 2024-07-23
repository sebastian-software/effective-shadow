import type { Meta, StoryObj } from "@storybook/react"
import { Shadow } from "./Shadow"

const meta = {
  title: "Shadow",
  component: Shadow
} satisfies Meta<typeof Shadow>

export default meta
type Story = StoryObj<typeof meta>

export const ShadowDemo: Story = {}

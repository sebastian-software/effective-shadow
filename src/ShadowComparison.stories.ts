import type { Meta, StoryObj } from "@storybook/react-vite"
import { ShadowComparison } from "./ShadowComparison"

const meta = {
  title: "Comparison",
  component: ShadowComparison,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof ShadowComparison>

export default meta
type Story = StoryObj<typeof meta>

export const AllShadows: Story = {}

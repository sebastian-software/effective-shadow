import CheckIcon from "../icons/check.svg?react"
import CopyIcon from "../icons/copy.svg?react"
import GitCompareIcon from "../icons/git-compare.svg?react"
import GithubIcon from "../icons/github.svg?react"
import HeartIcon from "../icons/heart.svg?react"
import ImageIcon from "../icons/image.svg?react"
import LayersIcon from "../icons/layers.svg?react"
import LightbulbIcon from "../icons/lightbulb.svg?react"
import PackageIcon from "../icons/package.svg?react"
import PaintbrushIcon from "../icons/paintbrush.svg?react"
import PaletteIcon from "../icons/palette.svg?react"
import SlidersIcon from "../icons/sliders.svg?react"
import SplineIcon from "../icons/spline.svg?react"
import SquareIcon from "../icons/square.svg?react"
import StarIcon from "../icons/star.svg?react"
import SunIcon from "../icons/sun.svg?react"
import SunriseIcon from "../icons/sunrise.svg?react"
import ZapIcon from "../icons/zap.svg?react"

export const icons = {
  check: CheckIcon,
  copy: CopyIcon,
  "git-compare": GitCompareIcon,
  github: GithubIcon,
  heart: HeartIcon,
  image: ImageIcon,
  layers: LayersIcon,
  lightbulb: LightbulbIcon,
  package: PackageIcon,
  paintbrush: PaintbrushIcon,
  palette: PaletteIcon,
  sliders: SlidersIcon,
  spline: SplineIcon,
  square: SquareIcon,
  star: StarIcon,
  sun: SunIcon,
  sunrise: SunriseIcon,
  zap: ZapIcon
} as const

export type IconName = keyof typeof icons

interface IconProps {
  name: IconName
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 28,
  xl: 48
}

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const IconComponent = icons[name]
  const pixelSize = sizeMap[size]

  return (
    <IconComponent
      width={pixelSize}
      height={pixelSize}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  )
}

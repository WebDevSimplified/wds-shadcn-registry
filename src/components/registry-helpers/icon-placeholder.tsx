import { useLocalStorage } from "@/hooks/useLocalStorage"
import {
  Cancel01Icon,
  Loading03Icon,
  Tick02Icon,
  UnfoldMoreIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  CaretUpDownIcon,
  CircleNotchIcon,
  XIcon as XIconPhosphor,
  CheckIcon as CheckIconPhosphor,
  EyeSlashIcon,
  EyeIcon as EyeIconPhosphor,
} from "@phosphor-icons/react"
import {
  RiCheckLine,
  RiCloseLine,
  RiExpandUpDownLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLoader4Line,
  type RemixiconComponentType,
} from "@remixicon/react"
import {
  IconCheck,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconSelector,
  IconX,
} from "@tabler/icons-react"
import {
  CheckIcon,
  ChevronsUpDownIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react"
import type { ComponentType } from "react"

export const ICON_LIBRARIES = [
  "lucide",
  "tabler",
  "hugeicons",
  "phosphor",
  "remixicon",
] as const
export type IconLibrary = (typeof ICON_LIBRARIES)[number]

export function iconLibraryToLabel(library: IconLibrary) {
  switch (library) {
    case "lucide":
      return "Lucide"
    case "tabler":
      return "Tabler"
    case "hugeicons":
      return "Hugeicons"
    case "phosphor":
      return "Phosphor"
    case "remixicon":
      return "Remix Icon"
    default:
      console.error(`Unsupported icon library: ${library satisfies never}`)
      return library
  }
}

export function IconPlaceholder(
  props: {
    [K in IconLibrary]: keyof (typeof ICON_MAP)[K]
  } & React.ComponentProps<"svg">,
) {
  const [iconLibrary] = useLocalStorage<IconLibrary>(
    "preferred-icon-library",
    "lucide",
  )
  switch (iconLibrary) {
    case "lucide": {
      const Comp = ICON_MAP[iconLibrary][props.lucide]
      return <Comp {...props} />
    }
    case "tabler": {
      const Comp = ICON_MAP[iconLibrary][props.tabler]
      return <Comp {...props} />
    }
    case "hugeicons": {
      const iconData = ICON_MAP[iconLibrary][props.hugeicons]
      const width =
        typeof props.strokeWidth === "string"
          ? parseInt(props.strokeWidth)
          : (props.strokeWidth ?? 2)
      return <HugeiconsIcon icon={iconData} {...props} strokeWidth={width} />
    }
    case "phosphor": {
      const Comp = ICON_MAP[iconLibrary][props.phosphor]
      return <Comp {...props} />
    }
    case "remixicon": {
      const Comp = ICON_MAP[iconLibrary][props.remixicon]
      // eslint-disable-next-line react/no-children-prop
      return <Comp {...props} children={undefined} />
    }
    default:
      throw new Error(
        `Unsupported icon library: ${iconLibrary satisfies never}`,
      )
  }
}

const ICON_MAP = {
  lucide: {
    EyeOffIcon,
    EyeIcon,
    ChevronsUpDownIcon,
    XIcon,
    Loader2Icon,
    CheckIcon,
  },
  hugeicons: {
    Loading03Icon,
    UnfoldMoreIcon,
    Cancel01Icon,
    Tick02Icon,
    ViewOffSlashIcon,
    ViewIcon,
  },
  phosphor: {
    CircleNotchIcon,
    CaretUpDownIcon,
    XIcon: XIconPhosphor,
    CheckIcon: CheckIconPhosphor,
    EyeSlashIcon,
    EyeIcon: EyeIconPhosphor,
  },
  remixicon: {
    RiLoader4Line,
    RiExpandUpDownLine,
    RiCloseLine,
    RiCheckLine,
    RiEyeOffLine,
    RiEyeLine,
  },
  tabler: {
    IconLoader2,
    IconSelector,
    IconX,
    IconCheck,
    IconEyeOff,
    IconEye,
  },
} as const satisfies Record<
  Exclude<IconLibrary, "hugeicons" | "remixicon">,
  Record<string, ComponentType<React.SVGProps<SVGSVGElement>>>
> &
  Record<"hugeicons", Record<string, IconSvgElement>> &
  Record<"remixicon", Record<string, RemixiconComponentType>>

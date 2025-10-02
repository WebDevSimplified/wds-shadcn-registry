import { generateOpenGraphImage } from "@/lib/generateOpenGraphImage"
import { getCollection } from "astro:content"

const components = (await getCollection("docs")).filter(entry =>
  entry.id.startsWith("components/"),
)

export function GET() {
  return generateOpenGraphImage({
    title: "WDS Shadcn Registry",
    category: "Docs",
    footerText: `${components.length} Components`,
  })
}

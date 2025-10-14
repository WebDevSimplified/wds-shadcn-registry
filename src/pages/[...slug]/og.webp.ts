import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { generateOpenGraphImage } from "@/lib/generateOpenGraphImage"

const CATEGORY_LABELS: Record<string, string> = {
  "getting-started": "Getting Started",
  components: "Components",
  contributing: "Contributing",
}

function deriveCategory(slug: string) {
  const [firstSegment] = slug.split("/")
  return CATEGORY_LABELS[firstSegment]
}

function buildInstallCommand(slug: string): string | undefined {
  const [parent, componentName] = slug.split("/")
  if (parent !== "components" || componentName == null) return undefined
  return `shadcn add @wds/${componentName}`
}

export async function getStaticPaths() {
  const docs = await getCollection("docs")

  return docs.map(entry => ({
    params: { slug: entry.id },
  }))
}

export const GET: APIRoute = async ({ params }) => {
  const docs = await getCollection("docs")
  const slug = params.slug
  if (slug == null) return new Response(null, { status: 400 })

  const entry = docs.find(entry => entry.id === slug)
  if (entry == null) return new Response(null, { status: 404 })
  const category = deriveCategory(slug)

  return generateOpenGraphImage({
    title: entry.data.title,
    tags: category ? [category] : [],
    secondaryText: buildInstallCommand(slug) ?? "WDS Shadcn Registry",
  })
}

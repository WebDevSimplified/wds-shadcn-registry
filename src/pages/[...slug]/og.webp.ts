import type { APIRoute } from "astro"
import { getCollection, type CollectionEntry } from "astro:content"
import { generateOpenGraphImage } from "@/lib/generateOpenGraphImage"

const CATEGORY_LABELS: Record<string, string> = {
  index: "Docs",
  "getting-started": "Getting Started",
  components: "Components",
  contributing: "Contributing",
}

const FALLBACK_TITLE = "WDS Shadcn Registry"
const DEFAULT_FOOTER_TEXT = "Web Dev Simplified • Shadcn Registry"

function normalizePath(value?: string | null): string {
  if (value == null) return "index"
  const normalized = value.replace(/^\/+/, "").replace(/\/+$/, "")
  return normalized === "" ? "index" : normalized
}

function resolveDocsEntry(docs: CollectionEntry<"docs">[], targetSlug: string) {
  return docs.find(entry => normalizePath(entry.id) === targetSlug)
}

function deriveCategory(slug: string): string {
  const [firstSegment = "index"] = slug.split("/")
  if (CATEGORY_LABELS[firstSegment] != null) {
    return CATEGORY_LABELS[firstSegment]
  }
  return firstSegment
    .split("-")
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

function buildInstallCommand(slug: string): string | undefined {
  const segments = slug.split("/")
  if (segments[0] !== "components" || segments.length < 2) return undefined
  const componentSlug = segments.slice(1).join("/")
  return `shadcn@latest add @wds/${componentSlug}`
}

export const GET: APIRoute = async ({ params }) => {
  const docs = await getCollection("docs")
  const slugParam = params.slug
  const slugValue = Array.isArray(slugParam) ? slugParam.join("/") : slugParam
  const normalizedTarget = normalizePath(slugValue)
  const entry = resolveDocsEntry(docs, normalizedTarget)

  const effectiveSlug = entry?.id ?? normalizedTarget
  const title = entry?.data.title ?? FALLBACK_TITLE
  const category = deriveCategory(effectiveSlug)
  const installCommand = buildInstallCommand(effectiveSlug)

  return generateOpenGraphImage({
    title,
    category,
    installCommand,
    footerText: DEFAULT_FOOTER_TEXT,
  })
}

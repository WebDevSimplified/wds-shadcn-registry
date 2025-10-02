import satori, { type SatoriOptions } from "satori"
import fs from "fs/promises"
import path from "path"
import sharp from "sharp"

const [bgImg, logo, regularFont, boldFont] = await Promise.all([
  fs.readFile(path.resolve("./src/assets/og/graph-paper.svg"), "base64"),
  fs.readFile(path.resolve("./src/assets/og/logo.png"), "base64"),
  fs.readFile(path.resolve("./src/assets/og/Barlow-Regular.ttf")),
  fs.readFile(path.resolve("./src/assets/og/Barlow-Bold.ttf")),
])

const satoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Barlow",
      data: regularFont,
      weight: 400,
      style: "normal",
    },
    {
      name: "Barlow",
      data: boldFont,
      weight: 600,
      style: "normal",
    },
  ],
} satisfies SatoriOptions

export async function generateOpenGraphImage({
  title,
  category,
  installCommand,
  footerText = "WDS Shadcn Registry",
}: {
  title: string
  category: string
  installCommand?: string
  footerText?: string
}) {
  const titleChildren: Array<
    | string
    | {
        type: string
        props: { style?: Record<string, string | number>; children: string }
      }
  > = [
    {
      type: "span",
      props: {
        style: {
          display: "block",
        },
        children: title,
      },
    },
  ]

  if (installCommand) {
    titleChildren.push({
      type: "span",
      props: {
        style: {
          display: "inline-flex",
          alignItems: "center",
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.75rem",
          backgroundColor: "rgba(240, 240, 240, 0.08)",
          color: "#F0F0F0",
          border: "1px solid rgba(240, 240, 240, 0.2)",
          fontSize: "2rem",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        },
        children: installCommand,
      },
    })
  }

  const svg = await satori(
    {
      type: "div",
      key: "1",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          width: "100%",
          height: "100%",
          padding: "3rem",
          background: "#111",
          boxSizing: "border-box",
          position: "relative",
          gap: "2rem",
          color: "#F0F0F0",
          fontFamily: "Barlow",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                backgroundImage: `url("data:image/svg+xml;base64,${bgImg}")`,
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                maskImage:
                  "radial-gradient(60% 60%, hsl(0, 0%, 0%, .80), transparent)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
                height: "100%",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      width: "fit-content",
                      padding: "0.5rem 1.75rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(240, 240, 240, 0.3)",
                      fontSize: "1.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#F0F0F0",
                      backgroundColor: "rgba(17, 17, 17, 0.7)",
                    },
                    children: category,
                  },
                },
                {
                  type: "h1",
                  props: {
                    style: {
                      margin: 0,
                      fontSize: "5.5rem",
                      fontWeight: 600,
                      lineHeight: "1.1",
                      textWrap: "balance",
                    },
                    children: titleChildren,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      flexGrow: 1,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    },
                    children: [
                      {
                        type: "img",
                        props: {
                          src: `data:image/png;base64,${logo}`,
                          style: {
                            width: "5rem",
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "2rem",
                            color: "#CCC",
                          },
                          children: footerText,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    satoriOptions,
  )

  const webp = await sharp(Buffer.from(svg)).webp({ quality: 100 }).toBuffer()
  const arrayBuffer = new ArrayBuffer(webp.length)
  new Uint8Array(arrayBuffer).set(webp)

  return new Response(arrayBuffer, {
    headers: { "Content-Type": "image/webp" },
  })
}

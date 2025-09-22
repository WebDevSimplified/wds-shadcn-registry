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
  tags,
  secondaryText,
}: {
  title: string
  tags: string[]
  secondaryText: string
}) {
  const svg = await satori(
    {
      type: "div",
      key: "1",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "3rem",
          background: "#111",
          boxSizing: "border-box",
          position: "relative",
          gap: "1rem",
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
                display: "flex",
                gap: "1rem",
              },
              children: tags.map(tag => ({
                type: "div",
                props: {
                  style: {
                    border: "1px solid #CCC",
                    color: "#CCC",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    fontSize: "1.25rem",
                    background: "#111",
                  },
                  children: tag,
                },
              })),
            },
          },
          {
            type: "h1",
            props: {
              style: {
                textAlign: "center",
                fontSize: "5.5rem",
                fontWeight: "bold",
                margin: 0,
                lineHeight: "1",
                textWrap: "balance",
              },
              children: title,
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
                    children: secondaryText,
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

// apps/web/src/app/blog/page.tsx
// Server component — reads all blog posts from the filesystem at
// build time (static generation).  Passes the list to BlogFilter
// as a prop; no client-side API fetch needed.

import type { Metadata } from "next"
import { getAllBlogs }    from "@/lib/blogLoader"
import BlogFilter        from "@/components/blog/BlogFilter"

export const metadata: Metadata = {
  title:       "Blog - Cubosapiens",
  description: "Community blogs on technical topics, open source, engineering guides and more.",
  keywords:    ["blog", "technical blog", "open source", "engineering", "guides", "cubosapiens"],
  authors:     [{ name: "CUBOSAPIENS", url: "https://cubosapiens.world/blog" }],
  creator:     "CUBOSAPIENS",
  metadataBase: new URL("https://cubosapiens.world/blog"),
  alternates: { canonical: "https://cubosapiens.world/blog" },
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://cubosapiens.world/blog",
    siteName:    "CUBOSAPIENS",
    title:       "Blog — CUBOSAPIENS",
    description: "Community blogs on technical topics, open source, engineering guides and more.",
    images: [{ url: "https://cubosapiens.world/og-image.png", width: 1200, height: 630, alt: "CUBOSAPIENS Blog" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Blog — CUBOSAPIENS",
    description: "Community blogs on technical topics, open source, engineering guides and more.",
    images:      ["https://cubosapiens.world/og-image.png"],
  },
}

export default function BlogPage() {
  const blogs = getAllBlogs()

  return (
    <div className="page-container">
      <BlogFilter blogs={blogs} />
    </div>
  )
}

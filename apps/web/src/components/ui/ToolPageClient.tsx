"use client"

import { useState, useEffect, useCallback } from "react"
import Link                                 from "next/link"
import type { Tool }                        from "@/types"
import Image from"next/image"
import Recommended from "./Recommened"
interface Props {
  tool:        Tool
  recommended: Tool[]
}

export default function ToolPageClient({ tool, recommended }: Props)
{
  const [isFullscreen, setIsFullscreen] = useState(false)

  // ESC key exits fullscreen
  const handleKey = useCallback((e: KeyboardEvent) => {
    if(e.key === "Escape") setIsFullscreen(false)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [handleKey])

  // When fullscreen — hide header and footer
  useEffect(() => {
    const header = document.querySelector(".header-wrap") as HTMLElement
    const footer = document.querySelector(".footer")      as HTMLElement
    if(isFullscreen)
    {
      if(header) header.style.display = "none"
      if(footer) footer.style.display = "none"
      document.body.style.overflow = "hidden"
    }
    else
    {
      if(header) header.style.display = ""
      if(footer) footer.style.display = ""
      document.body.style.overflow = ""
    }
    return () => {
      if(header) header.style.display = ""
      if(footer) footer.style.display = ""
      document.body.style.overflow = ""
    }
  }, [isFullscreen])

  return (
    <>
      <div className="tool-page">

        {/* LEFT */}
        <div className="tool-page-main">
          {tool.isLive ? (
           <div className={`iframe-wrap ${isFullscreen ? "is-fullscreen" : ""}`}>
            {isFullscreen &&
              <div className="tool-fullscreen-bar">
                <span className="tool-fullscreen-name">{tool.name}</span>
                <button className="tool-fullscreen-exit" onClick={() => setIsFullscreen(false)}>X</button>
              </div>}
              <iframe
                src={tool.url}
                className="tool-iframe"
                title={tool.name}
                allow="geolocation; camera"
              />
            </div>
          ) : (
            <div className="tool-coming-soon">
              <span className="tool-coming-icon">{tool.icon.endsWith(".png") || tool.icon.endsWith(".svg") ? (
                      <Image
                        src={`/icons/${tool.icon}`}
                        alt={tool.name}
                        className="tool-card-icon-img"
                        width={48}
                        height={48}
                        unoptimized
                        // style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <span>{tool.icon}</span>
                    )}</span>
              <h2>Coming Soon</h2>
              <p>This tool is under development. Check back soon.</p>
            </div>
          )}
           <div className="tool-page-header">
            <div className="tool-page-icon">{tool.icon.endsWith(".png") || tool.icon.endsWith(".svg") ? (
                      <Image
                        src={`/icons/${tool.icon}`}
                        alt={tool.name}
                        className="tool-page-icon"
                        width={48}
                        height={48}
                        unoptimized
                        // style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <span>{tool.icon}</span>
                    )}</div>
            <div className="tool-page-holder">
              <h1 className="tool-page-title">{tool.name}</h1>
              <p className="tool-page-desc">{tool.longDescription}</p>
            </div>
            {tool.isLive && (
              <button
                className="tool-open-btn"
                onClick={() => setIsFullscreen(true)}
              >
                Fullscreen
              </button>
            )}
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <aside className="tool-page-sidebar">
            <Recommended recommended ={recommended} isTool={true}/>
        </aside>
      </div>
    </>
  )
}
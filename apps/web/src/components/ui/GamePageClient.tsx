"use client"

import { useState, useEffect, useCallback } from "react"
import type { Games } from "@/types"
import Image from "next/image"
import Recommended from "./Recommened"

interface Props {
  game: Games
  recommended: Games[]
}

export default function GamePageClient({ game, recommended }: Props){
    const [isFullscreen, setIsFullscreen] = useState(false)

  // ESC exits fullscreen
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsFullscreen(false)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [handleKey])

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isFullscreen])

  return <>
    {/* ── MAIN LAYOUT ────────────────────────────────────── */}
    <div className="game-page">

      {/* LEFT — main content */}
      <div className="game-page-main">

        {/* Game embed or coming soon */}
        {game.isLive ? (
          <div className={`iframe-wrap ${isFullscreen ? "is-fullscreen" : ""}`}>
            {isFullscreen &&
              <div className="tool-fullscreen-bar">
                <span className="tool-fullscreen-name">{game.name}</span>
                <button className="tool-fullscreen-exit" onClick={() => setIsFullscreen(false)}>X</button>
              </div>}
            <iframe
              src={game.url}
              className="game-iframe"
              title={game.name}
              allow="autoplay"
            />
          </div>
        ) : (
            <div className="game-coming-soon">
              <span className="game-coming-icon">{game.icon}</span>
              <h2>Coming Soon</h2>
              <p>This game is under development. Check back soon!</p>
            </div>
          )}

        {/* Game info bar */}
        <div className="game-page-header">
          <div className="game-page-icon">{game.icon.endsWith(".png") || game.icon.endsWith(".svg") ? (
            <Image
              src={`/icons/${game.icon}`}
              alt={game.name}
              className="game-page-icon"
              width={48}
              height={48}
              unoptimized
            />
          ) : (
            <span>{game.icon}</span>
          )}</div>
          <div className="game-page-holder">
            <h1 className="game-page-title">{game.name}</h1>
            <span className="game-genre-pill">{game.genre}</span>
            <p className="game-page-desc">{game.longDescription}</p>
          </div>
          <div className="game-page-actions">
            {game.isLive && (
              <button
                className="game-fullscreen-btn"
                onClick={() => setIsFullscreen(true)}
              >
                Fullscreen
              </button>
            )}
          </div>
        </div>
      </div>
      {/* RIGHT — sidebar (desktop only) */}
      <aside className="game-page-sidebar">
        <Recommended recommended={recommended} isTool={false} />
      </aside>

    </div>
  </>
}

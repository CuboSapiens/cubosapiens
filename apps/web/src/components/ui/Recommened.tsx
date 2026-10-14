import Image from "next/image";
import Link from "next/link";
import type { Tool , Games} from "@/types"
type Props={
  recommended : (Tool[] | Games[]),
  isTool:boolean
}

export default function Recommended({recommended,isTool}:Props) {
return isTool ? <><div className="recommended-list">
            {recommended.map(rec => (
              <Link
                key={rec.id}
                href={`/tools/${rec.slug}`}
                className="recommended-card"
              >
                <div className="recommended-icon">{rec.icon.endsWith(".png") || rec.icon.endsWith(".svg") ? (
                      <Image
                        src={`/icons/${rec.icon}`}
                        alt={rec.name}
                        className="recommended-icon "
                        width={48}
                        height={48}
                        unoptimized
                        // style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <span>{rec.icon}</span>
                    )}</div>
                <div className="recommended-info">
                  <p className="recommended-name">{rec.name}</p>
                  <p className="recommended-desc">
                    {rec.description.length > 40
                      ? rec.description.slice(0, 40) + "…"
                      : rec.description}
                  </p>
                </div>
                {rec.isLive && <span className="recommended-live">LIVE</span>}
              </Link>
            ))}
          </div></>

          :

          <><div className="recommended-list">
            {recommended.map(rec => (
              <Link
                key={rec.id}
                href={`/games/${rec.slug}`}
                className="recommended-card"
              >
                <div className="recommended-icon">{rec.icon.endsWith(".png") || rec.icon.endsWith(".svg") ? (
                      <Image
                        src={`/icons/${rec.icon}`}
                        alt={rec.name}
                        className="recommended-icon "
                        width={48}
                        height={48}
                        unoptimized
                        // style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <span>{rec.icon}</span>
                    )}</div>
                <div className="recommended-info">
                  <p className="recommended-name">{rec.name}</p>
                  <p className="recommended-desc">
                    {rec.description.length > 40
                      ? rec.description.slice(0, 40) + "…"
                      : rec.description}
                  </p>
                </div>
                {rec.isLive && <span className="recommended-live">LIVE</span>}
              </Link>
            ))}
          </div></>


}

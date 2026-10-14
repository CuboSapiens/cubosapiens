export type ToolCategory =
  | "image"
  | "pdf"
  | "generator"
  | "text"
  | "converter"
  | "game"
  | "ai"

export interface FAQ {
  q: string;
  a: string;
}
export interface Tool {
  id:          number
  name:        string
  slug:        string
  description: string
  category:    ToolCategory
  icon:        string
  url:         string
  isLive:      boolean
  isFeatured:  boolean
  usageCount:  number
  order:       number
  createdAt:   string
  updatedAt: string
  releaseDate: string
  longDescription: string
  ratingCount:number
  faq: FAQ[]
  devices:string
  controls:string
  contributorId:number
}
export interface Games{
  id:          number
  name:        string
  slug:        string
  description: string
  genre:    ToolCategory
  icon:        string
  url:         string
  isLive:      boolean
  isFeatured:  boolean
  playCount:  number
  order:       number
  createdAt:   string
  updatedAt: string
  releaseDate: string
  longDescription: string
  ratingCount:number
  faq: FAQ[]
  devices:string
  controls:string
  contributorId:number
}

export type BlogTag =
  | "technical"
  | "oss"
  | "guides"
  | "general"
  | "others"

export interface ApiResponse<T> {
  success: boolean
  data:    T | null
  error:   string | null
}

export interface CounterResponse {
  success:   boolean
  visits:    number
  downloads: number
}
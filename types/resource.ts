export type ResourceType = 'video' | 'course' | 'article' | 'documentation'
export type ResourceLevel = 'beginner' | 'intermediate' | 'advanced'
export type ResourceLanguage = 'fr' | 'en'
export type ResourcePrice = 'free' | 'paid'

export interface Resource {
  title: string
  author: string
  platform: string
  type: ResourceType
  topics: string[]
  level: ResourceLevel
  language: ResourceLanguage
  price: ResourcePrice
  url: string
  description?: string
  _path?: string
}

export interface ResourceFilters {
  topics: string[]
  type: ResourceType[]
  level: ResourceLevel[]
  language: ResourceLanguage | null
  price: ResourcePrice | null
  search: string
}

export type SortOption = 'title' | 'recent'


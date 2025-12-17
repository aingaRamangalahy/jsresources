/**
 * Collection Types
 * 
 * Collections are curated groups of resources organized by theme.
 * Resources self-declare which collections they belong to via the `collections` field.
 */

export interface Collection {
  /** Unique identifier (e.g., 'staff-picks') */
  id: string
  /** Display title (e.g., 'Staff Picks') */
  title: string
  /** Short description for cards */
  description: string
  /** Emoji icon for visual identity */
  icon: string
  /** Tailwind color name for theming (e.g., 'amber', 'emerald') */
  color: string
  /** Whether to show on homepage */
  featured: boolean
  /** Display order (lower = first) */
  order: number
  /** Optional longer description (from markdown body) */
  body?: string
  /** Nuxt Content path */
  _path?: string
}

/** Collection with computed resource count */
export interface CollectionWithCount extends Collection {
  resourceCount: number
}


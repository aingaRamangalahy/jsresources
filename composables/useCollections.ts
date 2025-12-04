import type { Collection, CollectionWithCount } from '~/types/collection'
import type { Resource } from '~/types/resource'

/**
 * Composable for managing collections
 * Provides methods to fetch collections and their resources
 */
export function useCollections() {
  /**
   * Fetch all collections sorted by order
   */
  const fetchCollections = async (): Promise<Collection[]> => {
    const collections = await queryContent<Collection>('collections')
      .sort({ order: 1 })
      .find()
    
    return collections
  }

  /**
   * Fetch featured collections (for homepage)
   */
  const fetchFeaturedCollections = async (): Promise<Collection[]> => {
    const collections = await queryContent<Collection>('collections')
      .where({ featured: true })
      .sort({ order: 1 })
      .find()
    
    return collections
  }

  /**
   * Fetch a single collection by ID
   */
  const fetchCollection = async (id: string): Promise<Collection | null> => {
    try {
      const collection = await queryContent<Collection>('collections')
        .where({ id })
        .findOne()
      
      return collection
    } catch {
      return null
    }
  }

  /**
   * Fetch resources belonging to a collection
   */
  const fetchResourcesByCollection = async (collectionId: string): Promise<Resource[]> => {
    const resources = await queryContent<Resource>('resources')
      .where({ collections: { $contains: collectionId } })
      .find()
    
    return resources
  }

  /**
   * Count resources in a collection
   */
  const countResourcesInCollection = async (collectionId: string): Promise<number> => {
    const resources = await queryContent<Resource>('resources')
      .where({ collections: { $contains: collectionId } })
      .only(['_path'])
      .find()
    
    return resources.length
  }

  /**
   * Fetch collections with resource counts (for display)
   */
  const fetchCollectionsWithCounts = async (): Promise<CollectionWithCount[]> => {
    const collections = await fetchFeaturedCollections()
    
    const collectionsWithCounts = await Promise.all(
      collections.map(async (collection) => {
        const resourceCount = await countResourcesInCollection(collection.id)
        return {
          ...collection,
          resourceCount,
        }
      })
    )
    
    return collectionsWithCounts
  }

  /**
   * Get color classes for a collection based on its color property
   */
  const getCollectionColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      amber: {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        hover: 'hover:border-amber-500/50 hover:bg-amber-500/15',
      },
      violet: {
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/30',
        text: 'text-violet-400',
        hover: 'hover:border-violet-500/50 hover:bg-violet-500/15',
      },
      emerald: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-500/50 hover:bg-emerald-500/15',
      },
      blue: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-500/50 hover:bg-blue-500/15',
      },
      rose: {
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        hover: 'hover:border-rose-500/50 hover:bg-rose-500/15',
      },
      cyan: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        hover: 'hover:border-cyan-500/50 hover:bg-cyan-500/15',
      },
    }

    return colorMap[color] || colorMap.blue
  }

  return {
    fetchCollections,
    fetchFeaturedCollections,
    fetchCollection,
    fetchResourcesByCollection,
    countResourcesInCollection,
    fetchCollectionsWithCounts,
    getCollectionColorClasses,
  }
}


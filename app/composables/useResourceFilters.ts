import type { Resource, ResourceFilters, SortOption } from '~/types/resource'

export const useResourceFilters = () => {
  const filters = useState<ResourceFilters>('resourceFilters', () => ({
    topics: [],
    type: [],
    level: [],
    language: null,
    price: null,
    search: ''
  }))

  const sortBy = useState<SortOption>('sortBy', () => 'title')

  const filterResources = (resources: Resource[]): Resource[] => {
    let filtered = [...resources]

    // Filter by topics
    if (filters.value.topics.length > 0) {
      filtered = filtered.filter(resource =>
        filters.value.topics.some(topic => resource.topics.includes(topic))
      )
    }

    // Filter by type (multiple selection)
    if (filters.value.type.length > 0) {
      filtered = filtered.filter(resource => filters.value.type.includes(resource.type))
    }

    // Filter by level (multiple selection)
    if (filters.value.level.length > 0) {
      filtered = filtered.filter(resource => filters.value.level.includes(resource.level))
    }

    // Filter by language
    if (filters.value.language) {
      filtered = filtered.filter(resource => resource.language === filters.value.language)
    }

    // Filter by price
    if (filters.value.price) {
      filtered = filtered.filter(resource => resource.price === filters.value.price)
    }

    // Search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchLower) ||
        resource.author.toLowerCase().includes(searchLower) ||
        resource.description?.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy.value) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'recent':
          return 0 // Would need date field for this
        default:
          return 0
      }
    })

    return filtered
  }

  const resetFilters = () => {
    filters.value = {
      topics: [],
      type: [],
      level: [],
      language: null,
      price: null,
      search: ''
    }
  }

  const toggleTopic = (topic: string) => {
    const index = filters.value.topics.indexOf(topic)
    if (index > -1) {
      filters.value.topics.splice(index, 1)
    } else {
      filters.value.topics.push(topic)
    }
  }

  const toggleType = (type: string) => {
    const index = filters.value.type.indexOf(type as any)
    if (index > -1) {
      filters.value.type.splice(index, 1)
    } else {
      filters.value.type.push(type as any)
    }
  }

  const toggleLevel = (level: string) => {
    const index = filters.value.level.indexOf(level as any)
    if (index > -1) {
      filters.value.level.splice(index, 1)
    } else {
      filters.value.level.push(level as any)
    }
  }

  return {
    filters,
    sortBy,
    filterResources,
    resetFilters,
    toggleTopic,
    toggleType,
    toggleLevel
  }
}


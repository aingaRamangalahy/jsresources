import type { Resource, ResourceFilters, SortOption } from '~/types/resource'

export const useResourceFilters = () => {
  const filters = useState<ResourceFilters>('resourceFilters', () => ({
    topics: [],
    type: [],
    level: [],
    language: null,
    price: null,
    search: '',
  }))

  const sortBy = useState<SortOption>('sortBy', () => 'title')

  const filterResources = (resources: Resource[]): Resource[] => {
    let filtered = [...resources]

    if (filters.value.topics.length > 0) {
      filtered = filtered.filter(resource =>
        filters.value.topics.some(topic => resource.topics.includes(topic)),
      )
    }

    if (filters.value.type.length > 0) {
      filtered = filtered.filter(resource =>
        filters.value.type.includes(resource.type),
      )
    }

    if (filters.value.level.length > 0) {
      filtered = filtered.filter(resource =>
        filters.value.level.includes(resource.level),
      )
    }

    if (filters.value.language) {
      filtered = filtered.filter(
        resource => resource.language === filters.value.language,
      )
    }

    if (filters.value.price) {
      filtered = filtered.filter(
        resource => resource.price === filters.value.price,
      )
    }

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchLower)
        || resource.author.toLowerCase().includes(searchLower)
        || resource.platform.toLowerCase().includes(searchLower)
        || resource.description?.toLowerCase().includes(searchLower)
        || resource.topics.some(t => t.toLowerCase().includes(searchLower)),
      )
    }

    filtered.sort((a, b) => {
      if (sortBy.value === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
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
      search: '',
    }
  }

  const hasActiveFilters = computed(() => {
    const f = filters.value
    return (
      f.topics.length > 0
      || f.type.length > 0
      || f.level.length > 0
      || f.language !== null
      || f.price !== null
      || f.search.trim() !== ''
    )
  })

  const toggleTopic = (topic: string) => {
    const index = filters.value.topics.indexOf(topic)
    if (index > -1) {
      filters.value.topics.splice(index, 1)
    }
    else {
      filters.value.topics.push(topic)
    }
  }

  const toggleType = (type: string) => {
    const typed = type as Resource['type']
    const index = filters.value.type.indexOf(typed)
    if (index > -1) {
      filters.value.type.splice(index, 1)
    }
    else {
      filters.value.type.push(typed)
    }
  }

  const toggleLevel = (level: string) => {
    const typed = level as Resource['level']
    const index = filters.value.level.indexOf(typed)
    if (index > -1) {
      filters.value.level.splice(index, 1)
    }
    else {
      filters.value.level.push(typed)
    }
  }

  return {
    filters,
    sortBy,
    filterResources,
    resetFilters,
    hasActiveFilters,
    toggleTopic,
    toggleType,
    toggleLevel,
  }
}

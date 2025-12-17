export const useResourceStats = () => {
  const totalResources = useState<number>('totalResources', () => 0)

  const setTotalResources = (count: number) => {
    totalResources.value = count
  }

  return {
    totalResources,
    setTotalResources
  }
}


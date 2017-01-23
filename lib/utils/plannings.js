export const findUpdates = (prev, next) => {
  const updates = next.filter(planning => {
    const previous = prev.find(p => p.id === planning.id)
    if (!previous || !previous.length) {
      if (planning.is_priority === 1) {
        return true
      }
      return false
    }
    if (previous.is_priority !== planning.is_priority && planning.is_priority === 1) {
      return true
    }
    return false
  })

  if (!updates) {
    return null
  }

  const indexed = updates.reduce((acc, n) => ({
    ...acc,
    [n.id]: n
  }), {})

  return indexed
}

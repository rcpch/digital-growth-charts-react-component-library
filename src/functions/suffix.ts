export function stndth(centile) {
    if (centile === 2) {
      return centile + 'nd'
    }
    if (centile === 91) {
      return centile + 'st'
    } else {
      return centile + 'th'
    }
  }
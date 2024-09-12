export const numberAry = (len) => {
  const result = []
  for (let index = 1; index <= len; index++) {
    result.push(String(index).padStart(2, '0'))
  }
  return result
}

export const numberSeven = (len) => {
  const result = []
  for (let index = 0; index <= len; index++) {
    result.push(String(index).padStart(2, '0'))
  }
  return result
}

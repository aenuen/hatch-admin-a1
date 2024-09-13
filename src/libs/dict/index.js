import api from '@/api'
export const gainDictList = async (type) => {
  const data = localStorage.getItem(type)
  if (data) {
    return JSON.parse(data)
  } else {
    await api.dict.type({ type }).then(({ code, data, msg }) => {
      if (code === 200) {
        localStorage.setItem(type, JSON.stringify(data))
        return data
      } else {
        this.$message.error(msg)
      }
    })
  }
}

export const gainDictName = async (type, value) => {
  const data = await gainDictList(type)
  let res = ''
  data.forEach((item) => {
    if (item.value === value) {
      res = item.label
    }
  })
  return res
}

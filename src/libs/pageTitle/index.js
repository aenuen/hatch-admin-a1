import { title } from '@/set/site'

export default (pageTitle) => (pageTitle ? `${pageTitle} - ${title}` : `${title}`)

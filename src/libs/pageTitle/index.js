import { title } from '@/config/site'

export default (pageTitle) => (pageTitle ? `${pageTitle} - ${title}` : `${title}`)

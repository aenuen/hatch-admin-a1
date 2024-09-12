import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Video Admin'

export default pageTitle => pageTitle ? `${pageTitle} - ${title}` : `${title}`

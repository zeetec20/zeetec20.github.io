import ThemeService from '@/services/themeService'
import {atom} from 'recoil'

const themeService = new ThemeService()

export const theme = atom({
    key: `theme_${(new Date()).toISOString()}`,
    default: themeService.getThemeMode()
})
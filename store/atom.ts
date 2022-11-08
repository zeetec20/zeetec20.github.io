import ThemeService from '@/services/themeService'
import {atom} from 'recoil'

const themeService = new ThemeService()
const uniqcode = (new Date()).toISOString()
const themeDefault = themeService.getThemeMode()

export const theme = atom({
    key: `theme_${uniqcode}`,
    default: themeDefault,
    effects_UNSTABLE: [

    ],
    effects: [
        ({onSet}) => {
            onSet((newValue, _, __) => themeService.useThemeMode(newValue))
        }
    ]
})

export const navbarLoading = atom({
    key: `navbar_loading_${uniqcode}`,
    default: false
})
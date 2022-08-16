import {SetterOrUpdater} from 'recoil'
import { ThemeMode } from '@/types'
import ThemeService from '@/services/themeService'

const themeService = new ThemeService()

export const switchThemeMode = (theme: ThemeMode, setTheme: SetterOrUpdater<ThemeMode>) => {
    switch (theme) {
        case ThemeMode.dark:
            setTheme(ThemeMode.light)
            themeService.setLightMode()
            break
        case ThemeMode.light:
            setTheme(ThemeMode.dark)
            themeService.setDarkMode()
            break
    }
}
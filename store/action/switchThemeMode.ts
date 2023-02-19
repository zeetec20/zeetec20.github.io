import {SetterOrUpdater} from 'recoil'
import { ThemeMode } from '@/types'
import { setDarkMode, setLightMode } from '@/services/theme'

export const switchThemeMode = (theme: ThemeMode, setTheme: SetterOrUpdater<ThemeMode>) => {
    switch (theme) {
        case ThemeMode.dark:
            setTheme(ThemeMode.light)
            setLightMode()
            break
        case ThemeMode.light:
            setTheme(ThemeMode.dark)
            setDarkMode()
            break
    }
}
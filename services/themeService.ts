import {setCookie, getCookie} from 'cookies-next'
import {ThemeMode} from '@/types'

export default class ThemeService {
    setDarkMode = () => setCookie('theme', ThemeMode.dark)
    
    setLightMode = () => setCookie('theme', ThemeMode.light)
    
    getThemeMode = (): ThemeMode => {
        switch (getCookie('theme')?.toString()) {
            case '0':
                return ThemeMode.dark
            case '1':
                return ThemeMode.light
            default:
                return ThemeMode.light
        }
    }

    useThemeMode = (theme: ThemeMode) => {
        if (theme == ThemeMode.dark) {
            document.body.classList.add('theme-dark') 
            document.body.classList.remove('theme-light')
        }
        if (theme == ThemeMode.light) {
            document.body.classList.add('theme-light') 
            document.body.classList.remove('theme-dark')
        }
    }
}
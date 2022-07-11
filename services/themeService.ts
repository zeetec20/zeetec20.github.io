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
}
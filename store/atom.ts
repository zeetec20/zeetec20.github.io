import ThemeService from '@/services/themeService'
import { ThemeMode } from '@/types'
import {atom, useRecoilValue} from 'recoil'

const themeService = new ThemeService()

export const theme = atom({
    key: 'theme',
    default: themeService.getThemeMode()
})
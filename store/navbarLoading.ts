import { atom } from "recoil";

export const navbarLoading = atom({
    key: `navbar_loading__${(new Date()).getTime()}`,
    default: false
})
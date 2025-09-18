import { createI18n } from "vue-i18n"

import zh from "./zh"
import en from "./en"


// 默认语言 - 
const default_lang = "en"

const i18n = createI18n({
    legacy: false,
    locale: default_lang,
    globalInjection: true,
    messages:{
        zh,
        en
    }
    
})

export default i18n //对外暴露 i18n, 在 main.js 中挂载

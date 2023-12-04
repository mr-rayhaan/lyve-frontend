export default interface MenuItem {
    name?: LanguageObject
    description?: LanguageObject
    image?: string
    price?: number
    customization_name?: LanguageObject
    variant_name?: LanguageObject
    variant_price?: number
}

interface LanguageObject {
    en?: string
    ar?: string
}
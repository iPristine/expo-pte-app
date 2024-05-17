import {SecureStore} from "@/src/lib/secure-store";
import {SECURE_STORAGE_KEYS} from "@/src/constants";
import {ColorSchemeName} from "react-native";
import {VariantProp} from "react-native-paper/lib/typescript/components/Typography/types";

export class AppService {
    static async saveTheme(themeName: string) {
        await SecureStore.save(SECURE_STORAGE_KEYS.themeName, themeName)
    }

    static async loadThemeName(): Promise<string | null> {
        const themeName = await SecureStore.load(SECURE_STORAGE_KEYS.themeName)
        return themeName ? (themeName as string) : null
    }

    static async clearThemeName() {
        await SecureStore.clear(SECURE_STORAGE_KEYS.themeName)
    }

    static async saveFontSize(fontVariant: VariantProp<string>){
        await SecureStore.save(SECURE_STORAGE_KEYS.fontSize, fontVariant)
    }

    static async loadFontSize(): Promise<string | null> {
        const fontSize = await SecureStore.load(SECURE_STORAGE_KEYS.fontSize)
        return fontSize ? (fontSize as VariantProp<string>) : null
    }

    static async clearFontSize() {
        await SecureStore.clear(SECURE_STORAGE_KEYS.fontSize)
    }
}
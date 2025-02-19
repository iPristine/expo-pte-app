import * as ExpoSecureStore from "expo-secure-store"
import { SECURE_STORAGE_KEYS } from "@/src/constants"
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecureStoreValues = Object.values(SECURE_STORAGE_KEYS)

type StorageKey = (typeof SecureStoreValues)[number]

export class MyAsyncStore {
  static async save(key: StorageKey, value: string | object) {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value)
    await AsyncStorage.setItem(key, stringValue)
  }

  static async load(key: StorageKey): Promise<string | null | object> {
    const value = await AsyncStorage.getItem(key)
    if (value === null) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  static async clear(key: StorageKey): Promise<void> {
    await AsyncStorage.removeItem(key)
  }
}

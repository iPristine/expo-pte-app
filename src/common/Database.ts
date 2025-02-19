import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';


const id = require("@/assets/docs/docs.db");

let db: null | SQLite.SQLiteDatabase = null;

const getDatabasePath = async () => {
  // Получите путь к файлу базы данных из ассетов
  const asset = Asset.fromModule(id);
  await asset.downloadAsync();

  await SQLite.importDatabaseFromAssetAsync('docs1.db', {forceOverwrite: true, assetId: id});
  
  return 'docs1.db';
};

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync(await getDatabasePath());
  }
  return db;
};
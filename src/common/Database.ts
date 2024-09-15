import * as SQLite from 'expo-sqlite';

let db: null | SQLite.SQLiteDatabase = null;

SQLite.importDatabaseFromAssetAsync('docs1.db', {assetId: require('@/assets/docs/docs.db')});

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('docs1.db');
  }
  return db
}
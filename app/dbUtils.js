import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

const dbUrl = 'https://github.com/Joelmarugg/dbtest/raw/refs/heads/master/jjbars_2.db';
const dbFileName = 'jjbars_2.db';
const sqliteDirectory = FileSystem.documentDirectory + 'SQLite/';
const dbFileUri = sqliteDirectory + dbFileName;

export async function ensureDatabaseLoaded() {
  if (global.jjbarsDB) {
    return global.jjbarsDB;
  }
  // Prüfe, ob Datei existiert
  const fileInfo = await FileSystem.getInfoAsync(dbFileUri);
  if (!fileInfo.exists) {
    // Lade die Datei herunter
    try {
      const dirInfo = await FileSystem.getInfoAsync(sqliteDirectory);
      if (dirInfo.exists) {
        await FileSystem.deleteAsync(sqliteDirectory, { idempotent: true });
      }
      await FileSystem.makeDirectoryAsync(sqliteDirectory, { intermediates: true });
    } catch (cleanupErr) {
      // Ignorieren oder loggen
    }
    const downloadResult = await FileSystem.downloadAsync(dbUrl, dbFileUri);
    if (downloadResult.status !== 200) {
      throw new Error(`Download fehlgeschlagen mit Status: ${downloadResult.status}`);
    }
  }
  // Öffne die DB
  const db = await SQLite.openDatabaseAsync(dbFileName);
  global.jjbarsDB = db;
  return db;
} 
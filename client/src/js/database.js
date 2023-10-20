import { openDB } from 'idb';
const dbName = 'jate';
const dbVersion = 1;

const initDb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB(dbName, dbVersion)
  const tx = db.transaction(dbName, 'readwrite')
  const store = tx.objectStore(dbName)
  return await store.put({ id: 1, value: content })
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB(dbName, dbVersion)
  const tx = db.transaction(dbName, 'readonly')
  const store = tx.objectStore(dbName)
  const request = store.getAll()
  const result = await request
  return result?.value
};

initDb();

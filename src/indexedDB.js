import { openDB } from 'idb';

const DB_NAME = 'karmaDB';
const DB_VERSION = 1;
const STORE_NAME = 'quotes';

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('category', 'category');
      }
    },
  });
  return db;
};

export const addQuote = async (quote, category='humanity') => {
  const db = await initDB();
  await db.add(STORE_NAME, { text: quote, category, createdAt: new Date() });
};

export const getAllQuotes = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

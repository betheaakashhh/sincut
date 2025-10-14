import { initDB, addQuote, getAllQuotes } from './indexedDB';
import quotes from './data/qoute';

export const populateQuotes = async () => {
  const existingQuotes = await getAllQuotes();
  if (existingQuotes.length === 0) {
    for (let q of quotes) {
      await addQuote(q.text, q.category);
    }
    console.log('Quotes added to IndexedDB');
  } else {
    console.log('Quotes already exist in IndexedDB');
  }
};

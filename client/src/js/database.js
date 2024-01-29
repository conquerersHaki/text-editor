import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
const putDb = async (content) => {
  console.log('Adding content to the database');
    // Create a connection to the database and version we want to use
    const jateDB = await openDB('jate', 1);
    // new transaction, specify the database and data privileges
    const transaction = jateDB.transaction('jate', 'readwrite');
    const objectStore = transaction.objectStore('jate');
    // pass in the content
    const request = objectStore.add({ id: 1, value: content });
    // confirmation
    const result = await request;
    console.log('🚀 - Data added to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
const getDb = async () => {
  console.log('Getting all content from the database');
    // creating connection
    const jateDB = await openDB('jate', 1);
    // specify the database
    const transaction = jateDB.transaction('jate', 'readonly');
    const objectStore = transaction.objectStore('jate');
    // get all data in the database
    const request = objectStore.get();
    // confirmation
    const result = await request;
    console.log('All content retrieved from the database:', result);
    return result;
};



initdb();
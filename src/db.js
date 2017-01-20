import Dexie from 'dexie'

const db = new Dexie('test')
db.version(1).stores({items: '++id'})

export default db

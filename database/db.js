import * as SQLite from 'expo-sqlite'

const openDb = async ()=>{
  const db = SQLite.openDatabaseAsync("sentence.db")
  return db
}

export const initDb = async ()=>{
  const db = await openDb()
  db.execAsync('CREATE TABLE sentence(id INTEGER PRIMARY KEY AUTOINCREMENT, frasa TEXT, translate TEXT)')
  return db
}

export const getAllSentence = async ()=>{
  const db = await openDb()
  
  try{
  const allSentence = db.getAllAsync('SELECT * FROM sentence ORDER BY id DESC')
  return allSentence
  }catch(error){
    console.log(error)
  }
}

export const getInsertSentence = async (frasa, translate)=>{
  const db = await openDb()
  const tambah = await db.runAsync('INSERT INTO sentence (frasa, translate) VALUES(?,?)',[frasa, translate])
  return tambah
}

export const getEditSentence = async (frasa, translate, id)=>{
  const db = await openDb()
  const edit = await db.runAsync('UPDATE sentence SET frasa = ?, translate = ? WHERE id = ?', frasa, translate, id)
  return edit
}

export const getDeleteSentence = async (id)=> {
  const db = await openDb()
  const hapus = await db.runAsync('DELETE FROM sentence WHERE id = ?',[id])
  return hapus
}


import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {FontAwesome} from '@expo/vector-icons'
import React, {useState, useRef, useEffect} from 'react'
import {
  initDb,
  getAllSentence,
  getEditSentence,
  getDeleteSentence,
  getInsertSentence
} from '../database/db.js'
import * as Speech from 'expo-speech'
export function Beranda() {
  const [input, setInput] = useState('')
  const [inputFrasa, setInputFrasa] = useState(null)
  const [inputTranslate, setInputTranslate] = useState(null)
  const [inputEdit, setEditInput] = useState({})
  const [items, setItems] = useState([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputEditVisible, setInputEditVisible] = useState(false)
  const [idItem, setIdItem] = useState(null)
  const [idEditItem, setIdEditItem] = useState(0)
  const [counter, setCounter] = useState(0)
  const [buttonTambah, setTambahButton] = useState(true)
 
 
 useEffect(()=>{
   const setup = async ()=>{
     await initDb()
     const all = await getAllSentence()
     setItems(all)
   }
   setup()
 },[counter])
 
 
  const handleInput = (name, value)=>{
    setInput((prev)=>({...prev, [name]: [value]}))
  }
  
  const handlePress = ()=>{
    setCounter(prev=> prev + 1)
    setInputVisible(true)
    setTambahButton(false)
  }
  
  const handlePressAdd = ()=> {
    if(input.frasa == null){
      alert("frasa wajib diisi")
      return
    }else if(input.translate == null){
      alert("translate wajib diisi")
      return
    }
    const frasa = input.frasa.toString()
    const translate = input.translate.toString()
    getInsertSentence(frasa, translate)
    setCounter(prev => prev + 1)
    setInputVisible(false)
    setTambahButton(true)
  }
  
  
  const handlePressClose = ()=>{
    setInputVisible(false)
    setInputEditVisible(false)
    setTambahButton(true)
  }
  
  const handleDelete = (id)=>{
    getDeleteSentence(id)
    setCounter(prev => prev + 1)
}

  const handleVoiceStart = (id) =>{
    let text = items[id].frasa.toString()
    Speech.speak(text, {
      onDone: ()=> setIdItem(null),
      onStopped: ()=> setIdItem(null),
      language: "en-US"
      })
    setIdItem(id)
    
  }
  
  const handleVoiceStop = ()=> {
    setIdItem(null)
    Speech.stop()
  }
  
  const handlePressEdit = () =>{
    const varInputFrasa = inputFrasa
    const varInputTranslate = inputTranslate
    getEditSentence(varInputFrasa, varInputTranslate, idEditItem)
    setCounter(prev=> prev + 1)
    setInputEditVisible(false)
    setTambahButton(true)
    
  }
  
  
  const handleEditOpen = (data)=> {
    setIdEditItem(data.id)
    setInputFrasa(data.frasa)
    setInputTranslate(data.translate)
    setInputEditVisible(true)
    setTambahButton(false)
  }
  

  
  return (
    <>
     <ScrollView style={styles.container}>
         <View>
    
       {items.map((data, index)=>(
         <React.Fragment key={data.id}>
      <Shadow
        style={{margin: 10, width: 300,height: 70}}
        distance={1} // seberapa jauh bayangan
        startColor={"rgba(0,0,0)"} // warna awal shadow
        offset={['10%', '30%']} // arah shadow [x, y]
        containerViewStyle={{ margin: 90 }}
      >
      <View style={{
        width: '130%',
        flexDirection: 'column'
      }}>
      <View>
      <View style={styles.frasatranslate}>
      <View style={styles.frasplay}>
      {idItem == index? 
      <>
      <FontAwesome name='pause-circle' size={40} onPress={handleVoiceStop}/> 
      </>
      : 
      <>
      <FontAwesome name='play-circle' size={40} onPress={()=>{handleVoiceStart(index)}}/>
      </>
        
      }

      </View>
      <View style={styles.confrasa}>
        <View style={styles.frasa}>
        <Text style={{fontSize: 29}}>{data.frasa}</Text>
        </View>
        <View style={styles.translate}>
        <Text>{data.translate}</Text>
        </View>
      </View>

        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        marginLeft: '70%',
        marginTop: -45,
      }}>
      <View style={{
        marginRight: 9
      }}>
      <FontAwesome name='pencil' size={19} onPress={()=>handleEditOpen(data)}/>
      </View>
      <View>
      <FontAwesome name='trash' size={19} onPress={()=>{handleDelete(data.id)}}/>
      </View>
      </View>
      </View>
            

      </Shadow>
      </React.Fragment>
      ))}

    </View>
    </ScrollView>
    
     {inputEditVisible && 
        <>
 <View style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: '#161414b8'
    }}>
    
    <View style={styles.containerInput}>
      <TextInput style={styles.input}
      placeholder="Enter Frasa"
      value={inputFrasa.toString()}
      onChangeText={(value)=>setInputFrasa(value)}/>
     <TextInput style={styles.input}
      placeholder="Enter Translate"
      value={inputTranslate.toString()}
      onChangeText={(value)=>setInputTranslate(value)}/>
      
      <View style={{
        flexDirection: 'row',
        margin: 7,
        marginLeft: '10%'
      }}>
      <View>
   <TouchableOpacity style={{
          width: 130,
          height: 60,
          borderRadius: 7,
          backgroundColor: '#1a9f92',
          textAlign: 'center',
          alignItems: 'center'
        }} 
        onPress={()=> {handlePressEdit()}}>
        <Text style={{
          fontSize: 20,
          marginTop: 14
        }}>Edit</Text>
        </TouchableOpacity>
        </View>
      <View style={{
        marginLeft: 30
      }}>
   <TouchableOpacity style={{
          width: 130,
          height: 60,
          borderRadius: 7,
          backgroundColor: '#1a9f92',
          textAlign: 'center',
          alignItems: 'center'
        }} 
        onPress={handlePressClose}>
        <Text style={{
          fontSize: 20,
          marginTop: 14
        }}>Close</Text>
        </TouchableOpacity>
    </View>
    </View>
    </View>
    </View>
        </>

      }
    
          {inputVisible && 
        <>
    <View style={{
      width: 600,
      height: 1000,
      position: 'absolute',
      backgroundColor: '#161414b8'
    }}>
    
    <View style={styles.containerInput}>
      <TextInput style={styles.input}
      placeholder="Enter Frasa"
      onChangeText={(value)=>handleInput('frasa',value)}/>
      
     <TextInput style={styles.input}
      placeholder="Enter Translate"
      onChangeText={(value)=>handleInput('translate',value)}/>
      
      <View style={{
        flexDirection: 'row',
        margin: 7,
        marginLeft: '10%'
      }}>
      <View>
   <TouchableOpacity style={{
          width: 130,
          height: 60,
          borderRadius: 7,
          backgroundColor: '#1a9f92',
          textAlign: 'center',
          alignItems: 'center'
        }} 
        onPress={handlePressAdd}>
        <Text style={{
          fontSize: 20,
          marginTop: 14
        }}>Tambah</Text>
        </TouchableOpacity>
        </View>
      <View style={{
        marginLeft: 30
      }}>
   <TouchableOpacity style={{
          width: 130,
          height: 60,
          borderRadius: 7,
          backgroundColor: '#1a9f92',
          textAlign: 'center',
          alignItems: 'center'
        }} 
        onPress={handlePressClose}>
        <Text style={{
          fontSize: 20,
          marginTop: 14
        }}>Close</Text>
        </TouchableOpacity>
    </View>
    </View>
    </View>
    </View>
        </>
      }

      
            {buttonTambah && 
             <TouchableOpacity style={{
          width: 60,
          height: 60,
          borderRadius: 7,
          backgroundColor: '#1a9f92',
          position: 'absolute',
          top: '80%',
          left: '70%',
          textAlign: 'center',
          alignItems: 'center'
        }} 
        onPress={handlePress}>
        <Text style={{
          fontSize: 70,
          marginTop: -20
        }}>+</Text>
        </TouchableOpacity>   
            }
           
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f98b58'
  },
  input: {
    borderRadius: 5,
    marginLeft: 50,
    backgroundColor: '#f2d18c',
    width: '60%',
    color: 'black',
    height: 45,
    marginTop: 30,
    borderWidth: 1
  },
  frasatranslate: {
    width: '80%',
    flexDirection: 'row',
    color: 'red',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    margin: 8,
    backgroundColor: '#f2d18c',
  },
  frasa: {
    width: 312,
    fontSize: 700,
  },
  translate: {
    width: 315,
  },
  frasplay: {
    marginTop: 4
  },
  confrasa: {
    marginLeft: 9
  },
  containerInput: {
    width: 460,
    marginTop: '40%'
  }
});
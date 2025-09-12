import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {FontAwesome} from '@expo/vector-icons'
import {useState} from 'react'
import * as Speech from 'expo-speech'
export function Beranda() {
  const [input, setInput] = useState({})
  const [inputEdit, setEditInput] = useState({})
  const [items, setItems] = useState([])
  const [itemsUpdate, setItemsUpdate] = useState([...items])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputEditVisible, setInputEditVisible] = useState(false)
  const [idItem, setIdItem] = useState(0)
  const [idEditItem, setIdEditItem] = useState(0)
  const [bicara, setBicara] = useState(true)
 
 
  const handleInput = (name, value)=>{
    setInput((prev)=>({...prev, [name]: [value]}))
  }
  
  const handlePress = ()=>{
    setInputVisible(true)
    
  }
  
  const handlePressAdd = ()=> {
    setItems([...items, { 
      frasa: input.frasa,
      translate: input.translate}])
      setInputVisible(false)
      setInput('')
  }
  
  const handlePressClose = ()=>{
    setInputVisible(false)
    setInputEditVisible(false)
  }
  
  const handleDelete = (id)=>{
    setItems((prev)=> prev.filter((_,index)=> {return index !== id}))
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
    setItems(prev => prev.map((data, index)=>{
      return idEditItem === index? {...data, frasa: inputEdit.frasa, translate: inputEdit.translate }: data
    }))
    setInputEditVisible(false)

  }
  
  const handleEditOpen = (id)=> {
    setIdEditItem(id)
    setInputEditVisible(true)
  }
  
  const handleEditInput = (name, value)=> {
    setEditInput(prev => ({[name] : [value]}))
  }

  
  return (
    <>
     <ScrollView style={styles.container}>
         <View>
    
       {items.map((data, index)=>(
         <>
      <Shadow key={index}
        style={{margin: 10}}
        distance={1} // seberapa jauh bayangan
        startColor={"rgba(0,0,0)"} // warna awal shadow
        offset={[27, 20]} // arah shadow [x, y]
        containerViewStyle={{ margin: 90 }}
      >
      <View style={{
        width: 360,
        flexDirection: 'row'
      }} key={index}>
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
        marginLeft: -58,
        marginTop: 32
      }}>
      <View style={{
        marginRight: 10
      }}>
      <FontAwesome name='pencil' size={19} onPress={()=>handleEditOpen(index)}/>
      </View>
      <View>
      <FontAwesome name='trash' size={19} onPress={()=>{handleDelete(index)}}/>
      </View>
      </View>
      </View>
            

      </Shadow>
      </>
      ))}

    </View>
    </ScrollView>
    
     {inputEditVisible && 
        <>
       {items.map((data, index)=>(
              <View key={index} style={{
      width: 600,
      height: 1000,
      position: 'absolute',
      backgroundColor: '#161414b8'
    }}>
      <TextInput style={styles.input}
      placeholder={data.frasa.toString()}
      onChangeText={(value)=>handleEditInput('frasa',value)}/>
     <TextInput style={styles.input}
      placeholder="Enter Translate"
      value={data.translate}
      onChangeText={(value)=>handleEditInput('translate',value)}/>
      
      <View style={{
        flexDirection: 'row',
        margin: 7,
        marginLeft: 80
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
          ))
       }
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
      <TextInput style={styles.input}
      placeholder="Enter Frasa"
      onChangeText={(value)=>handleInput('frasa',value)}/>
      
     <TextInput style={styles.input}
      placeholder="Enter Translate"
      onChangeText={(value)=>handleInput('translate',value)}/>
      
      <View style={{
        flexDirection: 'row',
        margin: 7,
        marginLeft: 80
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
        </>
      }

      
    
            <TouchableOpacity style={{
          width: 60,
          height: 60,
          borderRadius: 7,
          backgroundColor: '#1a9f92',
          position: 'absolute',
          top: 800,
          left: 350,
          textAlign: 'center',
          alignItems: 'center'
        }} 
        onPress={handlePress}>
        <Text style={{
          fontSize: 70,
          marginTop: -20
        }}>+</Text>
        </TouchableOpacity>
        <Text>{}</Text>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f98b58',
    marginTop: 6
  },
  input: {
    borderRadius: 5,
    marginLeft: 50,
    backgroundColor: '#f2d18c',
    width: 350,
    height: 45,
    marginTop: 30,
    borderWidth: 1
  },
  frasatranslate: {
    width: 400,
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
  }
});
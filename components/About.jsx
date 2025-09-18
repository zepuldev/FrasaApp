import {StyleSheet, View, Text, Image, Linking, TouchableOpacity, ScrollView} from 'react-native'
import {Shadow} from 'react-native-shadow-2';
import ImageTrakteer from '../assets/teer.png'
export function About(){
  
  const handleOpen = () => {
    const link = "https://teer.id/zepul"
    Linking.openURL(link)
  }
  
  return(
    <>
    <Shadow style={styles.container}
        distance={1} // seberapa jauh bayangan
        startColor={"rgba(0,0,0)"} // warna awal shadow
        offset={['4%', '5%']} // arah shadow [x, y]
        containerViewStyle={{ margin: 5 }}
      >
    <View >
    <Text style={{
      fontSize: 26,
    }}>Aplikasi ini saya buat untuk belajar bahasa inggris, dengan menaruh frasa dan bisa text to speech ini bertujuan untuk melatih pendengaran dan ucapan kita. semoga app ini bermanfaat buat anda. dan jangan lupa support saya lewat trakteer{'\n\n'}
    Developer: Zepul</Text>
    <TouchableOpacity onPress={handleOpen}>
    <Image source={ImageTrakteer}  style={{
      width: '59%',
      height: '28%',
      marginTop: '10%'
      
    }}/>
    </TouchableOpacity>
    </View>
    </Shadow>
    </>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f98b58',
    padding: '7%',
    // marginTop: '10%',
    // marginLeft: '9%'
  }
})
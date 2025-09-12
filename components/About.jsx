import {StyleSheet, View, Text, Image, Linking, TouchableOpacity} from 'react-native'
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
        offset={[27, 300]} // arah shadow [x, y]
        containerViewStyle={{ margin: 90 }}
      >
    <View >
    <Text style={{
      fontSize: 26
    }}>Aplikasi ini saya buat untuk belajar bahasa inggris, dengan menaruh frasa dan bisa text to speech ini bertujuan untuk melatih pendengaran dan ucapan kita. semoga app ini bermanfaat buat anda. dan jangan lupa support saya lewat trakteer{'\n\n'}
    Developer: Zepul</Text>
    <TouchableOpacity onPress={handleOpen}>
    <Image source={ImageTrakteer}  style={{
      width: 190,
      height:55,
      marginTop: 10
      
    }}/>
    </TouchableOpacity>
    </View>
    </Shadow>
    </>
    )
}

const styles = StyleSheet.create({
  container: {
    width: 380,
    backgroundColor: '#f98b58',
    padding: 30,
    marginTop: 270,
    marginLeft: 40
  }
})
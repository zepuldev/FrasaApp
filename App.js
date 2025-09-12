import { StatusBar, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Beranda} from './components/Beranda.jsx'
import {About} from './components/About.jsx'


export default function App() {
  
const Drawer = createDrawerNavigator();
    
  
  return (
    <>
    <StatusBar
        barStyle="light-content" // warna teks status bar (light/dark)
        backgroundColor="black" // warna background status bar
      />
    <NavigationContainer>
    <Drawer.Navigator screenOptions={styles.headerStyle}>
      <Drawer.Screen options={{
        drawerIcon: ({color, size})=>(
    <FontAwesome name="edit" size={30}/>),
        drawerLabelStyle: {
          fontSize: 25,
          color: 'black'
        }
      }} name= "Home" component={Beranda}/>
      <Drawer.Screen options={{
        drawerIcon: ({color, size})=>(
    <FontAwesome name="simplybuilt" size={30}/>),
        drawerLabelStyle: {
          fontSize: 25,
          color: 'black'
        }
      }} name="About" component={About}/>
      
    </Drawer.Navigator>
    </NavigationContainer>
    </>
 
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    headerTitle: "Frasan",
      drawerStyle: {
        backgroundColor: '#f98b58',
        borderRadius: 20
      },
      headerStyle: {
        backgroundColor:'#f2d18c'
      }
  },
  
  labelTab: {
    drawerLabelStyle: {
          fontSize: 19,
          color: 'black'
        },
    drawerActiveTintColor: 'red',
    drawerActiveBackgroundColor: '#edeaea',
  },
  
    
})


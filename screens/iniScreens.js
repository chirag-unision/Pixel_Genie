import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import {Permissions} from 'expo';
import {shareAsync} from 'expo-sharing';
import { Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height;

export function create({ navigation }) {

    const [data,setData] = useState({});
    const [prompt,setPrompt] = useState('');
    const [imageUri,setImageUri] = useState('http://127.0.0.1:5000/getSticker');
    const [loadState,setLoadState] = useState(false);
    const [check,setCheck] = useState(true);
    const [imgLocalUri,setImgLocalUri] = useState('');

    React.useEffect(()=>{
        requestPermission();
    },[])

    const requestPermission = async () => {
        try {
          const {status} = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          if (status === 'granted') {
            console.log('You can use');
          } else {
            console.log('permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
    }

    const sendprompt= () => {
      Keyboard.dismiss();
        setLoadState(true);
        axios.get('http://192.168.29.152:5000/?prompt='+prompt.toString().replace(' ', '+'))
        .then(async function (response) {
          const data= response.data.default;
          // const blob = new Blob([data], { type: 'image/jpg' });
          const blob= "data:image/png;base64," + data;
            setImageUri(blob);  
            setLoadState(false);

            getLocalUri();
            setCheck(true);

            // navigation.navigate('Payload');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const saveImageAsync= async (uri)=> {
        // Generate a unique filename for the image
        // const filename = `${Date.now()}.jpg`;
        // let stickerName= prompt.toString().replace(' ','_')+'.jpg';
      
        try {
          // Download the image
          // const { uri } = await FileSystem.downloadAsync(imageUri, FileSystem.documentDirectory + stickerName);
          // const { uri } = await FileSystem.downloadAsync(imageUri.substring(22), FileSystem.documentDirectory + stickerName);
      
          // Save the image to the device's media library
          const asset = await MediaLibrary.createAssetAsync(uri);
          const album = await MediaLibrary.getAlbumAsync('Stickers');
          if (album === null) {
            await MediaLibrary.createAlbumAsync('Stickers', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
      
          // Return the saved image location
          return Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        } catch (error) {
            console.error(error);
          return null;
        }
    }

    const getLocalUri= async () => {
      let stickerName= prompt.toString().replace(' ','_')+'.png';
      // console.log(imageUri)
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'stickers', {intermediates: true});

      // Write the base64 data to a file in the new directory
      let filePath = FileSystem.documentDirectory + 'stickers/' + stickerName;
      await FileSystem.writeAsStringAsync(filePath, imageUri, {encoding: FileSystem.EncodingType.Base64});
    
      // Get the URI of the file that was just created
      let fileInfo = await FileSystem.getInfoAsync(filePath);
      let fileURI = fileInfo.uri; 

      const { uri } = await FileSystem.downloadAsync(fileURI, FileSystem.documentDirectory + stickerName);
      setImgLocalUri(uri);
    }

    const shareImg= async (uri) => {
      shareAsync(uri);
    }

    let loaderUrl= require('../assets/1493.gif');
    return (
        <View style={{ flex: 1, alignItems: 'center', }}>
            <Text
                onPress={() => alert('This is the "set tour" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold',margin:10 }}>Create Sticker</Text>
            <TextInput placeholder='Prompt Here' style={styles.input}  onChangeText={(text)=> setPrompt(text)} />
            <Pressable
                onPress={sendprompt}
                disabled={prompt=='' || loadState}
                style={styles.button}><Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Create</Text></Pressable>
                {loadState && <Text style={styles.loader}>WAITING...</Text>}
                {check && <View style={styles.offShow}>
                  <Text style={styles.closeBtn} onPress={()=> setCheck(false)}>
                    <Ionicons name={'close-outline'} size={50} color={'#000'} />;
                  </Text>
                  <Image source={{uri: imageUri}} style={{borderWidth:2 , width: windowWidth-80, height: windowWidth-80, marginVertical: 10}}></Image>
                  {imageUri && <View style={styles.btnContainer}>
                    <Pressable
                      onPress={()=>saveImageAsync(imgLocalUri)}
                      style={styles.button2}><Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>Download</Text></Pressable>
                    <Pressable
                      onPress={()=>shareImg(imgLocalUri)}
                      style={styles.button3}><Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>Share</Text></Pressable>
                  </View>}
                </View>}
                
        </View>
    );
}

export function initTour({ navigation }) {
    return (
    <View>
        <Pressable
            onPress={() => navigation.navigate('setATour')}
            style={styles.button}><Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Create Sticker</Text></Pressable>
        {/* <Pressable
            onPress={() => navigation.navigate('setAJourney')}
            style={styles.button}><Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Start Journey</Text></Pressable>
        <Pressable
            onPress={() => navigation.navigate('setACompanion')}
            style={styles.button}><Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Find Companion</Text></Pressable> */}
    </View>
    );
}

export function payloadPage({ navigation }) {
    return (
    <View>
        <Text>Hey There!</Text>
    </View>
    );
}

const styles= StyleSheet.create({
    button: {
        fontSize: 45, 
        fontWeight: 'bold', 
        backgroundColor: '#5555f5', 
        margin: '5%',
        padding: 15,
        borderRadius: 10,
        width: '90%'

    },
    button2: {
        fontWeight: 'bold', 
        backgroundColor: '#5555f5', 
        margin: 5,
        padding: 20,
        borderRadius: 10,
        flex: 1
    },
    button3: {
        fontWeight: 'bold', 
        backgroundColor: '#555555', 
        margin: 5,
        padding: 20,
        borderRadius: 10,
        flex: 1
    },
    loader: {
        fontSize: 20, 
        fontWeight: 'bold', 
        backgroundColor: '#000000', 
        color: 'white',
        margin: 15,
        padding: 15,
        borderRadius: 10,

    },
    input: {
        height: 50,
        width: '85%',
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 18
      },
      btnContainer:{
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: windowWidth-40,
        position: 'absolute',
        bottom: 10
      },
      offShow:{
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff90',
        height: windowHeight-100,
        width: windowWidth,
        flex: 1,
        alignItems: 'center'
      },
      closeBtn:{
        width: windowWidth,
        textAlign: 'right',
        paddingHorizontal: 20
      }
})

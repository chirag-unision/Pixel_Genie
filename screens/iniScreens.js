import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import * as jsondata from '../android/app/src/main/assets/contents.json';
import {PermissionsAndroid} from 'react-native';

export function setTour({ navigation }) {

    const [data,setData] = useState({});
    const [prompt,setPrompt] = useState('');
    const [imageUri,setImageUri] = useState('');
    const [loadState,setLoadState] = useState(false);
    
    // const requestPermission = async () => {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         {
    //           title: 'App Permission',
    //           message:
    //             'App needs access to your storage',
    //           buttonNegative: 'Deny',
    //           buttonPositive: 'OK',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log('You can use');
    //       } else {
    //         console.log('permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    // }

    const sendprompt= () => {
        // requestPermission();
        setLoadState(true);
        axios.get('http://192.168.115.22:5000/?prompt='+prompt.toString().replace(' ', '+'))
        .then(function (response) {
            console.log(response);
            let blob= response.data.default;
            setImageUri("data:image/png;base64," + blob);  
            setLoadState(false);

            // navigation.navigate('Payload');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const addToWhatsApp= () => {
        alert("Under Development");
        // let RNFS= require('react-native-fs');
        // let identifier= 'stickerbook';
        // let stickerName= prompt.toString().replace(' ','_')+'.webp';
        // // var path = '../android/app/src/main/assets/'+identifier+'/'+stickerName;
        // var path = RNFS.DocumentDirectoryPath+''+identifier+'/'+stickerName;

        // // write the file
        // RNFS.writeFile(path, imageUri.substring(22), 'utf8')
        // .then((success) => {
        //     console.log('FILE WRITTEN!');
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });

        // jsondata.sticker_packs[0].stickers.push({
        //     "image_file": "stickerName"
        //   })

        // path = RNFS.DocumentDirectoryPath+'/android/app/src/main/assets/contents.json';

        // // write the file
        // RNFS.writeFile(path, JSON.stringify(jsondata), 'utf8')
        // .then((success) => {
        //     console.log('JSON WRITTEN!');
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });

        // WhatsappStickers.addStickerPack(identifier, name)
        // .then(() => console.log(`Successfully added sticker pack ${name} to WhatsApp!`))
        // .catch(error => console.error(`Error adding sticker pack ${name}`, error))

        
        
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', }}>
            <Text
                onPress={() => alert('This is the "set tour" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Create Sticker</Text>
            <TextInput placeholder='Prompt Here' style={styles.input}  onChangeText={(text)=> setPrompt(text)} />
            <Pressable
                onPress={sendprompt}
                style={styles.button}><Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Create</Text></Pressable>
                {loadState && <Image source={{uri: require('../assets/1493.gif')}} style={{width: 100, height: 100}}></Image>}
                <Image source={{uri: imageUri}} style={{width: 200, height: 200}}></Image>
                {imageUri && <Pressable
                onPress={addToWhatsApp}
                style={styles.button2}><Text style={{fontSize: 15, color: 'white', textAlign: 'center'}}>Add to WhatsApp</Text></Pressable>}
                
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
        <Text>Hey</Text>
    </View>
    );
}

const styles= StyleSheet.create({
    button: {
        fontSize: 45, 
        fontWeight: 'bold', 
        backgroundColor: '#F4717F', 
        margin: 15,
        padding: 15,
        borderRadius: 10,

    },
    button2: {
        fontSize: 45, 
        fontWeight: 'bold', 
        backgroundColor: '#5cd65c', 
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
      }
})

import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

// agora nao vamos pedir a configuracao via codigo nativo
// como no cli, agora pedimos por js
// expo-constants jah vem por padrao
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Upload() {
  const [avatar, setAvatar] = useState();

  async function imagePickerCall() {
    // soh pro ios
    if (Constants.platform.ios) {
      const { status } = await Permisssions.askAsync(Permissions.CAMERA_ROLL)

      if (status !== 'granted') {
        alert("Nós precisamos dessa permissão");
        return;
      }
    }

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    
    // importante: o expo nao devolve o nome original da imagem, nao temos acesso
    console.log(data);
    // poderia fazer pra pegar da camera tb
    //const data = await ImagePicker.launchCameraAsync({});
    
    if (data.canceled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  async function uploadImage() {
    const data = new FormData();

    // prapegar o nome que o expo da para a aimgem
    // nao eh o nome original, eh soh um codigo mesmo
    const path = avatar.uri.split('/');
    const name = path[path.lenght - 1];

    data.append('file', {
      // eh obrigatorio o campo name
      name,
      uri: avatar.uri,
      type: avatar.type,
    });

    await axios.post('http//localhost:3333/files', data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {/* tava dando ruim aplicar o borderRadius na imagem, na view
        eh sempre melhor */}
        <Image
          style={styles.avatarImage}
          source={{
            uri: avatar
              ? avatar.uri
              : 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif',
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={uploadImage}
      >
        <Text style={styles.buttonText}> Escolher imagem </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}> Enviar imagem </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  avatar: {
    borderRadius: 70,
    // tive que colocar essa linha tb pra aparecer o  borderRadius
    overflow: 'hidden',
  },
  avatarImage: {
    width: 100,
    height: 100,
  },
});

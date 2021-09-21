import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

export default function Upload() {
  const [avatar, setAvatar] = useState();

  function imagePickerCallback(data) {
    if (data.didCancel) {
      // da pra exibir msg pro usuario aqui
      return;
    }

    if (data.error) {
      return;
    }

    if (data.customButton) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  async function uploadImage() {
    const data = new FormData();

    data.append('file', {
      name: avatar.fileName,
      uri: avatar.uri,
      type: avatar.type,
    });

    await axios.post('http//localhost:3333/files', data);
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: avatar
            ? avatar.uri
            : 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif',
        }}
        style={styles.avatar}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          ImagePicker.showImagePicker(
            {
              mediaType: 'photo',
              title: 'Selecione uma foto',
              takePhotoButtonTitle: 'Tire uma foto',
              chooseFromLibraryButtonTitle: 'Escolha uma foto da sua galeria',
              customButtons: [{name: 'meu_botao', title: 'outro botao'}],
            },
            imagePickerCallback,
          )
        }>
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

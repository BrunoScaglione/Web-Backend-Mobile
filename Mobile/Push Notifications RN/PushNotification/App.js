
//// O QUE FIZEMOS NESSE TUTORIAL:

// 1) criamos app firebase seguindo os passos que tao no firebase
// 2) usamos a biblioteca "react-native-push-notification" soh tendo que modificar o Andorid xml e o arquivo de cores
// 3) Ai copiamos e colamos o codigo de exemplo dentro do componentDidMount que na verdade jah era pra ser 
// um UseEffect

// MAS O PROBLEMA EHQ ISSO EH PRA MANDAR MENSAGEM PELO CONSOLE DO FIREBASE, QUEREMOS MANDAR PELO SERVIDOR PORRA
// NO FIREBASE TEM UM TUTORIAL DE COMO SETARAS COISAS(Inclusive usando a biblioteca deles de messaging)
// e FAZER COM O SERVIDOR, COMO TAMBEM A PARTE DO USUARIO CLICKAR NA NOTIFICACAO E TAL

// entoa vou tirar tudo que tinha coloca no AndroidMaifest.xml pra fazer do jeito certo agora as coisas.


// import React, {Component} from 'react';
// import {View, Text} from 'react-native';
// import PushNotification from "react-native-push-notification";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }
 
//   componentDidMount(){

//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function (token) {
//         console.log("TOKEN:", token);
//       },

//       // (required) Called when a remote or local notification is opened or received
//       onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//       },
//     });
//   };

//   render() {
//     return (
//       <View style={{justifyContent: 'center', alignItems: 'center'}}>
//         <Text> Received Push Notification </Text>
//       </View>
//     );
//   }
// }





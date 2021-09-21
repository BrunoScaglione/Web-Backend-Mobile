## GUIA FIREBASE MESSAGING ##


# Com o Firebase messaging vamos conseguir fazer duas coisas muita daoras:
  1) Enviar notificações à dispositivos específicos ou grupos de dispositivos pelo nosso servidor
  2) Enviar mensagens para dispositivos com por exemplo token de confirmacao de email, recuperacao de senha
  (quando o site te da a opcao de confirmar por email ou por msg no telefone, essa seria a opcao da msg(inclusive tem prazo de expiracao)) 

# How it Works:
A gente vai usar o FCM (Firebase Cloud Messaging) pra madar as notificacoes pros dispositivos dos usuarios. A gente 
precisa usar o servico de cloud pq n ta diretamente ligado às funcionalidade do nosso aplicativo, inclusive o cara pode receber notificacao quando ele nao ta nem no background.

A primeira etapa, é requisitar para o FireBase um token do dispositivo, isso pelo no lado do cliente,  na hora que o componente montar (dentro do UseEffect, na vdd quase todo codigo sempre vai ta dentro dele). 

Ai depois a gente faz um POST para nosso server e guarda a token no model do User (precisamos de uma propriedade ou coluna na db que vais er o array de tokens do usuario(pq ele pode ter mais de um dispositivo))). Lembrando que essas tokens tem expiracao e vamos ter q fazer refesh e dar update na  db com o tempo.

Ai com o token do dispositivo a gente manda uma notificacao usando o pacote "firebase-admin", onde a gente vai passar um objeto que tem a propriedade mensagem(e outras que veremos logo mais) que ter as config da msg e os dados que a gente via mandar pro dispositivo. 

Podemos mandar para um dispositivo específico, como foi o exmplo que accabei de falar, mas tambem podemos mandar para grupos de dispositivos(veremos depois)

Entao precisamos de um metodo para "escutar" essas mensagem que tao chegando, ser ao método onMessage(pra quando o usuario ta com o app aberto) ou seTbackgroundHandler(pra quando o usuario nao ta com app aberto), que permitira a gente implementar um callback, que vai receber como argumento o evento que eh o objeto da mensagem

Ai pro usuario vai chegar a notificacao, e tem duas possibilidades: 
 1) Ele ta com o app aberto --> nao vai exibir notificacao(assumindo que estamos mandando uma notification property(já falaremos melhor sobre isso)) mas vai mandar o evento que eh o proprio objeto, para que a gente possaimplementar um callback que reebe esse evento e faaz alguma coisa, tipo armazenar sla

 2) App ta em background ou nem ta aberto --> vai exibir notificacao pro usuario e mandar evento 


Por fim, o usuario pode clicar na notificacao, ai a gente tem que usar o método onNotifiationOpened que tb vai chamar um callback que tem como arumento a mensagem. Aqui podemos implementar o react native navigation

Se o usuário nao clicar, uma hora a notificacao vai expirar por defualt e sumir.

link: 

# Messages and Notifications 

Basicamente a ganete vai mandar uma mensagem, que contem algumas propriedades. A mais importante são data e notification. Pro nosso proposito estamos interessado em notification. E dentro dessa notification tem prpriedade de android e ios que ai a gennte pode setar a notification (titulo, body) como tb configuracoes(cor, icone etc)

link:

# Setup Firebase App

>> yarn add @react-native-firebase/app

Bom, preimeiro precisamos criar um app firebase, é basicamente ir no firebase e segui os passos de criacao(dica: nao colocar analytics pq ai nao precisa esperar ele confirmar o seu app, a nao ser que a gente esteja indo pra producao ai eh bom colocar analytics, mas tem varias ferramentas pra iss tb fora firebase), a coloca o json detro da pasta andorid/src. O "Andorid Package name" tem que ser o que ta na tag maifest em /android/app/src/main/AndoirdManifest

Colocar o plugin do google service em /andorid/build.gradle:

---------------------

buildscript {
  dependencies {
    //...other dependencies
    classpath 'com.google.gm:google-services:4.2.0'
  }
}

--------------------

E executar o plugin colcoando no FINAL do arquivo em /android/app/build.gradle

------------------------
apply plugin: 'google.gms.google-services'

-------------------------

Ai agora eh soh fazer o build, que o autolink jah eh pra ser feito

>> npx react-native run-android 

// getting started
link: https://rnfirebase.io/

//firebase console
link: ps://console.firebase.google.com/u/0/project/pushnotification-10b47/overview

# Setup Firebase App in Android

Se por alguma razao o autolink nao der certo, da pra fazer manual, olhar o link abaixo.

link: https://firebase.google.com/docs/cloud-messaging/android/client

# Setup Firebase Messaging 

// pra lidar com as msg no cliente
>> yarn add @react-native-firebase/messaging 

//pra mandar mensagens pelo servidor
>> yarn add firebase-admin

// No comeco do nosso App.js(ou outro) vamo ter q ter isso
import messaging from '@react-native-firebase/messaging';

async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}

link: https://rnfirebase.io/messaging/usage

# Get client's device Token (client side)

pedaço de código:

function App() {
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);
}

link: 

# Post token to our server(client-side) and then store them with User model(server-side)

é importante a gente implemmenta um controller no backend que vai colocar inserir essas tokens na nossa db(lembrando que precisamos de uma proppriedade tokens pra guardar as token do usuario (array de strings))

Tem um post no medium que o cara explica bem, link abaixo:

link: https://medium.com/@zainmanji/how-to-structure-firebase-push-notifications-in-your-react-native-app-6847712d1c31


# Send Messages or Notifications (server-side)

Vamos ter as tokens de cada usuario que estao guardaddas na nossa db, eia pegamos elas e mandamos a mesnsagem assim:

Nesse exemplo estamos mandando uma mensagem para varios dispositivos, usando o método senMulticast. Tem outros metodos queveremos jah

pedço de código:
 ---------------------
await admin.messaging().sendMulticast({
  tokens: [
    /* ... */
  ], // ['token_1', 'token_2', ...]
  notification: {
    title: 'Basic Notification',
    body: 'This is a basic notification sent from the server!',
    imageUrl: 'https://my-cdn.com/app-logo.png',
  },
});

-----------------------

link: https://rnfirebase.io/messaging/notifications

# Listen to User Clicks in Notification Events(client-side) (integration with react navigation)

Agor ao front ened tem que receber essa mesnsagens, e assim que receber tem que chamr um método pra fazer alguma coisa, aqui que vamos entrar com o react native navigation pra direcionar o usuario pra uma pagina especifica da nossa aplicacao:

pedaço de código:

Descricao dos métodos:

getInitialNotification: When the application is opened from a quit state.
onNotificationOpenedApp: When the application is running, but in the background.

---------------------------------------
import React, { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

-------------------------------------------
link: https://rnfirebase.io/messaging/server-integration

# Configure Messages(server-side)
  # Sending Messages API (configure message, options etc)
    # Message Object (which contains notification and android object as properties)

    link: https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#Notification

    # Android object(which contains a notification object as property)

    link: https://firebase.google.com/docs/reference/admin/node/admin.messaging.AndroidConfig

    # Android Notification Object

    obs: podemos mandar cor e icone por aqui, como tambem da pra configurar por default no codigo nativo, sepa no .json mas n sei como, mas sei q da mudando o AndoridManifest.xml tb(jah veremos)

    link: https://firebase.google.com/docs/reference/admin/node/admin.messaging.AndroidNotification
  
  # Configurations in .json
    # Tempo duraca da notificacao
     -----------------------
    // <projectRoot>/firebase.json
    {
      "react-native": {
        "messaging_android_headless_task_timeout": 30000
      }
    }
    --------------------------

    # Canal da notificacao

      ----------------------
    // <projectRoot>/firebase.json
    {
      "react-native": {
        "messaging_android_notification_channel_id": "high-priority"
      }
    }
    --------------------------

    # Cor da Notificacao

    // <projectRoot>/firebase.json
    {
      "react-native": {
        "messaging_android_notification_color": "@color/hotpink"
      }
    }

    link dos tres: https://l.facebook.com/l.php?u=https%3A%2F%2Frnfirebase.io%2Fmessaging%2Fusage%3Ffbclid%3DIwAR0MQ7CdY7uuHM1UPQgv8wCBAhhEVrwCiSWofKrqiZvIOxJZiKV9M6dVRm0%23firebasejson&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew

  # Manually Configure default Color and Icon Natively (AndroidManifest.xml)

  No AndoridManifest.xml vai ter tipo isso:

    <!-- Set custom default icon. This is used when no icon is set for incoming notification messages.
      See README(https://goo.gl/l4GJaQ) for more. -->
  <meta-data
      android:name="com.google.firebase.messaging.default_notification_icon"
      android:resource="@drawable/ic_stat_ic_notification" />
  <!-- Set color used with incoming notification messages. This is used when no color is set for the incoming
      notification message. See README(https://goo.gl/6BKBk7) for more. -->
  <meta-data
      android:name="com.google.firebase.messaging.default_notification_color"
      android:resource="@color/colorAccent" />

  Para mudar o ícone a gente que trocar "@drawable/ic_stat_ic_notification" pelo nosso drawable(lembra que setamos um novo para o icone do app?)  e o "@color/colorAccent" pela nossa cor.

  O drawable a gente pag em android/app/src/main/res/alguma das pastas (todas contem os mesmo arquivos soh muda a resolucao) ai peagmos o nome doarquivo e colocamos no lugar de ic_stat_ic_notification.

  A cor a gente paga em android/app/src/main/values/colors.xml e troca clorAccent pelo nome da cr que a gente definiu lah

  link: https://l.facebook.com/l.php?u=https%3A%2F%2Ffirebase.google.com%2Fdocs%2Fcloud-messaging%2Fandroid%2Fclient%3Ffbclid%3DIwAR3phsW4Pk-tPqFeNMP52agpMb8PUYvveAxy-ow-3bGY0hcDvjieV0DwDK0&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew


# Sending message to oneDevice (client-side)

-------------------
// This registration token comes from the client FCM SDKs.
var registrationToken = 'YOUR_REGISTRATION_TOKEN';

var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

-----------------
alias esse link aqui de baixo de muita coisa, eh um guia pra mandar msg pelo servidor

link: https://l.facebook.com/l.php?u=https%3A%2F%2Ffirebase.google.com%2Fdocs%2Fcloud-messaging%2Fsend-message%3Ffbclid%3DIwAR1lJSCFjHPNHtB_eoAIvQINWMfQMO4iP15ECzM7gCyGGONvvR9lPoXYgJU%23send_a_batch_of_messages&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew

# Sending messages to many devices(server-side)

jah fizeo isso em exemplo anterior:

pedço de código:
 ---------------------
await admin.messaging().sendMulticast({
  tokens: [
    /* ... */
  ], // ['token_1', 'token_2', ...]
  notification: {
    title: 'Basic Notification',
    body: 'This is a basic notification sent from the server!',
    imageUrl: 'https://my-cdn.com/app-logo.png',
  },
});

 alias esse link aqui de baixo de muita coisa, eh um guia pra mandar msg pelo servidor

link: https://l.facebook.com/l.php?u=https%3A%2F%2Ffirebase.google.com%2Fdocs%2Fcloud-messaging%2Fsend-message%3Ffbclid%3DIwAR1lJSCFjHPNHtB_eoAIvQINWMfQMO4iP15ECzM7gCyGGONvvR9lPoXYgJU%23send_a_batch_of_messages&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew

-----------------------
# Using Topics

Topicos sao categorias que os dispositivos podem entrar. Elas sao uteis pq muitas vezes queremos mandar notificaao soh pra um grupo de dispositivos, por exemplo, os que compraram leite na nossa pataforma, entao no lado do cliente
ele tem que "se inscrever" nesse grupo. Ai pra mandar msg pra todo mundo desse gupo eh bem facil, isso economiza o nosso trabalho de ter que ficar agrupando certos grupos de tokens!

  # subscribing to a topic (client-side)

 --------------
  messaging()
  .subscribeToTopic('weather')
  .then(() => console.log('Subscribed to topic!'));

 --------------
  link: https://l.facebook.com/l.php?u=https%3A%2F%2Frnfirebase.io%2Fmessaging%2Fusage%3Ffbclid%3DIwAR0vKyCGS-gc2MGbDns7KEl2yjMAiVztT64HJaOMT59gJpj5s_ODJ8Cz9Lk&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew

  # Sending messages to topic (server-side)

------------------------------
  // The topic name can be optionally prefixed with "/topics/".
  var topic = 'highScores';
  var message = {
    data: {
      score: '850',
      time: '2:45'
    },
    topic: topic
  };
  // Send a message to devices subscribed to the provided topic.
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });

------------------------
 alias esse link aqui de baixo de muita coisa, eh um guia pra mandar msg pelo servidor

  link: https://l.facebook.com/l.php?u=https%3A%2F%2Ffirebase.google.com%2Fdocs%2Fcloud-messaging%2Fsend-message%3Ffbclid%3DIwAR1lJSCFjHPNHtB_eoAIvQINWMfQMO4iP15ECzM7gCyGGONvvR9lPoXYgJU%23send_a_batch_of_messages&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew

  # Sending messages to topics with conditions

  Para enviar uma mensagem para uma combinação de tópicos, especifique uma condição, que é uma expressão booleana que especifica os tópicos de destino. Por exemplo, a seguinte condição enviará mensagens para dispositivos que estão inscritos em TopicA e TopicB ou TopicC:

  "'TopicA' in topics && ('TopicB' in topics || 'TopicC' in topics)"
  No FCM, todas as condições entre parênteses são avaliadas primeiro e depois a expressão é analisada da esquerda para a direita. Na expressão acima, um usuário que se inscreveu em um só tópico não receberá a mensagem. Do mesmo modo, um usuário que não se inscreveu em TopicA também não receberá a mensagem. Somente estas combinações são válidas:

  TopicA e TopicB
  TopicA e TopicC

  É possível incluir até cinco tópicos na sua expressão condicional

  ---------------------------

  // Define a condition which will send to devices which are subscribed
  // to either the Google stock or the tech industry topics.
  var condition = "'stock-GOOG' in topics || 'industry-tech' in topics";
  // See documentation on defining a message payload.
  var message = {
    notification: {
      title: '$GOOG up 1.43% on the day',
      body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    condition: condition
  };
  // Send a message to devices subscribed to the combination of topics
  // specified by the provided condition.
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });

  ---------------------------

  link:

# Sending custom lot of messages(server-side)

  Esse recurso pode ser usado para criar um conjunto personalizado de mensagens e enviá-las para diferentes destinatários, incluindo tópicos ou tokens de registro de dispositivos específicos. Use esse recurso quando, por exemplo, for necessário enviar simultaneamente mensagens para diferentes públicos com detalhes ligeiramente diferentes no corpo da mensagem.

  ----------------------------

  // Create a list containing up to 500 messages.
  const messages = [];
  messages.push({
    notification: {title: 'Price drop', body: '5% off all electronics'},
    token: registrationToken,
  });
  messages.push({
    notification: {title: 'Price drop', body: '2% off all books'},
    topic: 'readers-club',
  });
  admin.messaging().sendAll(messages)
    .then((response) => {
      console.log(response.successCount + ' messages were sent successfully');
    });

-----------------------------------

alias esse link aqui de baixo de muita coisa, eh um guia pra mandar msg pelo servidor

link: https://l.facebook.com/l.php?u=https%3A%2F%2Ffirebase.google.com%2Fdocs%2Fcloud-messaging%2Fsend-message%3Ffbclid%3DIwAR1lJSCFjHPNHtB_eoAIvQINWMfQMO4iP15ECzM7gCyGGONvvR9lPoXYgJU%23send_a_batch_of_messages&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew

# admin.message() methods API(server-side)

link: https://l.facebook.com/l.php?u=https%3A%2F%2Ffirebase.google.com%2Fdocs%2Freference%2Fadmin%2Fnode%2Fadmin.messaging.Messaging%3Ffbclid%3DIwAR1XDSINvflLLsSI7r1X3fnN9q5fP2CqjrNc79kwmzoiaH2Ng_5FibhgwTk%23sendtodevice&h=AT3whJJZoxHpvNk2CxZNSyQtvQcwTpKKydWBWLBvYkuoJxw9s64LyHeN0_DJszJc2IPIOVwP9f6fSje3Gp8ZaxGmyJ6GFnngjFyW49ShP-AIeOqpHl_t6gdw2faTNUHb6s28Ew


















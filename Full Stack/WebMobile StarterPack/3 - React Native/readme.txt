###### Usando vanilla react native (sem expo) #######

################LER ISSO##############
/// o react navigation mudou pra versao 5 e nao ta rodando a versao anterior 
/// entao vo fazer o exemplo sem rodar mesmo e depois vejo a versao 5 no rocketseat
// entao nao espere que esse código rode, mas vai ser bom pra entender os conceitos

1. abir emulador
kk
2. No terminal:
>> adb devices
// devera retoornar lista com dispositvos conectados:
// exemplo:
// List of devices attached
//NOME_DO_SEU_EMULADOR   device

!!!Importante:  precisa rodar com npx !!!

3. Para criar projeto:
>> npx react-native init [nome]

4. se estiver conectado, na pasta do projeto roda:
!apenas no primeiro bundle
>> npx react-native run-android

// se a gente fechar o emulador e abrir  é só rodar:
>> react-native start pra dar o bundle no dispositivo

// a gente soh vai ter que rodar >>npx react-native run-android
// denovo quando a gente instalar alguma dependencia que mexe com 
// o  código nativo

//////Configuracao depastas:

andoroid - onde ficam as configuracoes e codigo nativo (vamo soh mexer pro deploy)

app.json - determina como a nossa aplicacao eh exibida pro usuario final (os nomes)

///nnavegacao

>> yarn add react-navigation@2.18.3

// instalar bibilioteca axios para lidar com nossa api (criamos no 1-NodeJS)

>> yarn add axios




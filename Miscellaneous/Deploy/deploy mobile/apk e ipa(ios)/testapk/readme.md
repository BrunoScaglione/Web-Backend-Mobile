## 1. em app.json:

## adicionar:

"android": {
      "package": "com.companyname.yourappname",
      "versionCode": 1
    }

dentro de "ios":

"bundleIdentifier": "com.companyname.yourappname"

em backgorundColor trocar pela nossa nossa cor de fundo:

ex:

"backgroundColor": "#7D40E7"


em "name" colocar o nome do app:

"name": "nomedoapp",

## 2. fazer o build

expo build:android expo build:ios

importante: o build tem duas opcoes para android: gerar apk ou app bundle.
Pra mandar pra loja fazer o app budle pq eh mais eficiente, mas pra testar e mandar pra
pessoas apk eh mais facil.

## 3. vamos gerar o apki :

expo build:android -t apk

# perguntas do expo:

keystore eh uma chave que meio que croptografa o seu app,
vamos deixar o expo criar pra gente, jah que estamos criando agr o app

## vai gerar uns links pra gente:
pra ver detalhes e acompanhar tudoque acontece na aplicacao:

https://expo.io/turtle-status

pra acompanhar as builds:

https://expo.io/dashboard/bruno_scaglione/builds/2ed19f4b-e443-42c4-8cf9-80ab38d3c180

e jah deixa o link com download automatico:

Successfully built standalone app: https://expo.io/artifacts/5af0e364-acf8-40b0-bae9-704b1ee5c6c4


o daora eh que as buildsrodam nos pcs do pessoal do expo, entao da pra criar apk e ipa 
apartir do android mesmo e sem precisar do sdk nem Xcode na nossa maquina!


## ai baixa em "download" o apk e depois abre o emulador e arrasta o apk pra dentro 
## que ele vai instalar

## vamos gerar o ipa

expo build:ios

pelo jeito nao precisa mais da conta apple

no caso do ipa nao da pra testar tao facilmente como com apk.
primeiro tem que criar o nosso app 
vamos precisar entrar em testfligthts depois e ai vai ta disponiveis 
nossos apps ali pra testar.

mas pra mandar o ipa la pra dentro vamos precisar usar um app
chamado transporter, arrasta pra dentro do transporter

ai tem que cadastrar o email dos testers(pessoas que tem iphone) e
eles vao conseguir baixar oaplicativo pelo testflight

## uma coisa mt foda do epo eh que ele jah vem com update over the air, que eh
## dar update no nosso app sem passar pelas lojas: (eh oq seria o codepush da microsoft)
eh soh executar:

expo publish 







// reactotron

>> npm install --save-dev reactotron-react-native


////// pacotes de fontes

//instalar lib
>> yarn add react-native-vector-icons

//realizar link da biblioteca com codigo nativo
>> react-native link

//reinicie seu emulador(react-native start novamente) e agora em qualquer
// componente voce pode utilizar o pacote de fontes que preferir utilizando
// o componente Icon

Ex:

import Icon from 'react-native-vector-icons/FontAwesome';

return <Icon name="home" size={18} color="#999">

//////////////problema com fonte ---solucao //////////

Automatic way to add fonts

Add this piece of code in android\app\build.gradle. I only want MaterialCommunityIcons.ttf if you want other font add them here it will be added automatically.

project.ext.vectoricons = [
	iconFontNames: ['Ionicons.ttf'] // Add fonts needed
]

`apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"`
This is manual way (If automatic didn't work)

Step 1

Move the .ttf file from the node_modules\react-native-vector-icons\Fonts that you want to android\app\src\main\assets\fonts after that cd android and run ./gradlew clean or gradlew clean

Step 2

Add this line in android\app\build.gradle

project.ext.vectoricons = [
	iconFontNames: ['Ionicons.ttf', 'AnotherFont.ttf'] //name of all the fonts added from node_modules in step 1.
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"







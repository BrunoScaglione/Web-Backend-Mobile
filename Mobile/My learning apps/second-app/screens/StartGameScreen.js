import React, {useState} from 'react';
import { 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard, // not a component, an api that we can interact with the native device istself
    Alert, // not a component, an api that we can interact with the native device istself
 } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer'

const styles = StyleSheet.create({
    screen: {

        //////////////IPORTANTE - FIQUEI 1HORA NESSE PROBLEMA///////////
        /// Estamos no componente StartGameScrren que é  filho de View em App.js
        // eu Não posso colocar flex 1 no filho sem o pai ter um tamanho definido
        // se nao da uns bugs como o botao nao aparecer
        flex: 1, // takes all the space it can (horizontally and vertically)
        padding: 10,
        alignItems: 'center',
        // justifyContent: 'flex-start' already is default

    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',

        // These styles below our now setup in Card.js

        // ///// shadow properties only work on IOS
        // shadowColor: 'black',
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 6,
        // shadowOpacity: 0.26,
        // /// for android its just elevation: a number (it has already configured the shadow)
        // elevation: 5, // you can tune by changing this number
        // padding: 20,
        // borderRadius: 10,
        // backgroundColor: 'white' 
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: '40%'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }

});

function StartGameScreen (props) {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    console.log(confirmed +'one');
    const [selectedNumber, setSelectedNumber] = useState();

    function numberInputHandler (inputText) {
        console.log(confirmed +'two');
        // replace anthing that is not in range [0-9] with '' globally (regex)
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }



    function confirmInputHandler () {
        console.log(confirmed +'three');
        console.log("confirm" + enteredValue);
        // checking user input
        const chosenNumber = parseInt(enteredValue);
        // we cant do if chosenNumber === NaN doesnt work
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // Alert.alert(title -- string, message -- string, buttons  -- array of objects)
            Alert.alert('Invalid number', 'Number has to be a number between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return
        }
    

        setEnteredValue('');
        setConfirmed(true);
        //even though we just set to '' entered value
        // this is ok, because all of these set will be executed at once
        // and enteredvalue will be '' only in the next render cycle 
        setSelectedNumber(chosenNumber); 
    
    }



    function resetInputHandler () {
        console.log(confirmed +'four');
        setEnteredValue('');
        setConfirmed(false);
        Keyboard.dismiss();
    }


    // if the user confirmed lets give him this message
    let confirmedOutput;
    console.log(confirmed +'five');
    if (confirmed) {
        console.log(confirmed +'six');
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text> You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title="Start Game" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
    }



    return (
        // dismiss the keyboard when we press at other place
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <Input 
                    style={styles.input}
                    blurOnSubmit // will close keyboard whrn clicking check button on keyboard(android)
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    keyboardType = "number-pad" //user has to enter number(ios)
                    maxLenght = {2} 
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                {/* to style the button, remember we have to wrap the button with View */}

                {/* // aqui tinha dado um bug falando que eu tinha escrito texto fora da text EventTarget, mas eu nao tinha feito isso 
                // ai apaguei a linha e refiz e funcionou */}
                    <View style={styles.button}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                    {/* eu tinha colocado antes : onPress={() => {confirmInputHandler}}
                    isso da errado pq dentro do parenteses tem que executar uma funcao, e nao apenas apontar, pq nessa notacao
                    o evento ja aconteceu */}
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                    </View>
                </View> 
            </Card>
            {console.log(confirmed + 'seven')}
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

export default StartGameScreen;


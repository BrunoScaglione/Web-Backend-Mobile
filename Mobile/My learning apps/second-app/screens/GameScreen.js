import React, {useState, useRef,useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import { setWorldOriginAsync } from 'expo/build/AR';


// this function doesnt rely on props neither state, so putting
// outside the functional component is better for performance
// we will use exclude to exclude for example the users numbber in the first guess
// so that it will never guess in the first try
function generateRandomBetween (min, max, exclude) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()*(max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum;
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    }
});

function GameScreen (props) {

    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );

    const [rounds, setRounds] = useState(0);

    /// useRef is like state, but unlike it, when we change the values of currentLow
    // and currentHigh we dont rerender the component. And that what we want because it
    // doesent change our view
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    

    // takes a function as argument after component is rendered this function is executed
    // remember component did mount in old react

    const {userChoice, onGameOver} = props;
    
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver]);


    // direction the next guess should be (lower or greater)
    function nextGuessHandler (direction) {
        // validating if the user is lying or not
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
        (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(`Don't lie`, `You know that this is wrong...`, [{text: 'Sorry', style: 'cancel'}] )
        } else {
            // if we give correct hint
            if (direction === 'lower') {
                currentHigh.current = currentGuess;
            } else {
                currentLow.current = currentGuess;
            }

            const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
            setCurrentGuess(nextNumber);
            setRounds(curRounds => curRounds + 1);
        }
        
    }

    return (
        <View style= {styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title= "LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title= "GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/>

            </Card>
        </View>
    )
    }

export default GameScreen;
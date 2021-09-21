import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal} from 'react-native';


const styles = StyleSheet.create({
    inputContainer: {
        // we deleted flexDirection because we want it to be from top to bottom, which is the default
        flex: 1, // to ensure it takes all the available space, if we dont set this, it will take as much space as its child elements do
        // when we set flex, the children will take as much space as we set the parent (input container)
        // aqui a gente acabou nao definindo flex: 1 pra View rrot do App.js, mas acho q n bugou pq o pai do inputContainer eh um Modal sla
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttons: {
        // by default the width would be the cildres width, but we dont want that
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        // 40% of the parent, which itself is 60% of the screen (root View)
        width: '40%',
    }
})

function GoalInput(props) {

    const [enteredGoal, setEnteredGoal] = useState('');

    function goalInputHandler(enteredText) {
        setEnteredGoal(enteredText);
    }

    function addGoalHandler() {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    }



    return (
        // Modal is used for the part of code it wraps be opened by something
        // in this case it opens when we click a button (see App.js)
        <Modal visible={props.visible} animationType="slide">
        <View style = {styles.inputContainer}>
            <TextInput 
            placeholder="Course Goal" 
            style = {styles.input}
            onChangeText={goalInputHandler}
            value={enteredGoal}
            />
            {/* here  we are calling a function that changes state in App.js, since we are rendering
            this component there, this function is called within the scope of the variables it changes
            no problem*/}
            <View style={styles.buttons}>
                <View  style={styles.button}>
                    <Button title="ADD" onPress={addGoalHandler}/>
                </View>
                <View  style={styles.button}>
                    <Button title="CANCEL" color="red" onPress={props.onCancel}/>
                </View>
            </View>
        </View>
        </Modal>
    )
}

export default GoalInput;
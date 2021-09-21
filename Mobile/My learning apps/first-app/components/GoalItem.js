import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10, // margin up and down. Ex of how this is based in css but not the same
        backgroundColor: "#ccc",
        borderColor: 'black',
        borderWidth: 1
    }
});


function GoalItem (props) {
    return (
        // when we click we get opacity
        // we have TouchableHighlight that changes background
        // and there are others Touchable components 
        // here we used bind to leave a default argument for when the function gets called
        <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)} >
        {/* // we could have put onTouch/onTouch start in the View, but these are low level
        functionalities and wed have to do a lot of manual work to get the tiime we wanted a press for example */}
        <View style={styles.listItem}>
            <Text> {props.title} </Text>
        </View>
        </TouchableOpacity>
    )
};




export default GoalItem;
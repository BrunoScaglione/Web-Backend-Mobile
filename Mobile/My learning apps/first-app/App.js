import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const [outputText, setOutputText] = useState("Welcome")
  // setOutputText whrn called will re render the entire component and
  // we will have a new outputText state
  return (
        // View is like a div
    <View style={styles.container}>

          {/* text can only  be outputed between <Text> tags , this is different from  
          webdevelopment when you can put text bwtween almost anything  */}
      <Text>{outputText}</Text>
      {/* Button in self closing tag in react native */}
      {/* text between tags in React is now title in ReactNative */}
      {/* OnClick in React is now Onpress in ReactNative */}
      <Button title="Change Text" onPress={() => setOutputText('You Pressed the button')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


//////////
////we will build a trivial app that you type 
//and se a list of your goals in the course

///// View is mainly for applying atyles and layout the content

import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';


// react native has  few built in components, but they have specific 
///and important uses for structuring the app
export default function App () 
return (
    <View style={{padding: 40}}>
    {/* input area  */}
    {/* in ReactNative every view organizes its children with flexbox already by default */}
    {/* and if you use flexbox in the web, the default is to organize in row
      here the default is by column */}
      <View style={{
      flexDirection: 'row',
      // main axis - comeca a colocar da esquerda para direita ao contrario do default
      // de cima para baixo
      justifyContent: 'space-between',
      // cross axis - centraliza verticcalmente o botao com o imput
      alignItems: 'center' // if it was default strech the children get streched to th height of parent
    }}>

      {/* by defualt a View (as a parent) component will have the size of its child is taking
      if we want to make it bigger along the main axis: 
       ----use flex: 1 property in the child
      if we want to make it bigger in the cross axis(stretch):
      ----- use alignItems: 'strech' property in the parent */}

        <TextInput placeholder="Course Goal" style = {{
          // obs: we used to use this kind of way in css: border-color
          // but its not suported in javascript, consequntly on reactnative
          flex : 1, // ocupa omaximo de espaco possivel,(considerando que os outros tem q caber apertadinhos)
          // o flex divide o available space em segmentos.
          // Ex: se outro componente (irmao desse) tem flex: 2, o espaco disponivel
          // horizontal vai ser dividido em 3 e o outro componente vai ocupar 2/3 dele
          // esse sumero é relativo
    
          // width: '80%',
          borderColor: 'black',
          borderWidth: 1,
          padding: 10
          }}/>
        <Button title="ADD"/>
      </View>
      {/* listing area */}
      <View>

      </View>
    </View>
  )

///////
/// inline styling in not the best way
/// is prefered to create a Stylecheet 
// but way not just use a simple javascript object? You can, but Stylesheet maybe
// will give you future better performance , so it doesnt hurt to use


// Lets re-do the app with stylesheet:

import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, FlatList } from 'react-native';




const styles = StyleSheet.create({
  // we can create any name like "screen " that helps us identify
  // but of course inside it has to be the css-like notation
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem: {
    padding: 10,
    marginVertical: 10, // margin up and down. Ex of how this is based in css but not the same
    // margin: 10,
    backgroundColor: "#ccc",
    borderColor: 'black',
    borderWidth: 1
  }
})


function App () {

  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([])

  function goalInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }


  function addGoalHandler() {
    console.log(enteredGoal);
    // this syntax is ok but doesnt garantee that we get the 
    // most updated state in all cases
    // setCourseGoals([...courseGoals, enteredGoal])
    // this one is recommended: (remember in React prevState =>)
    setCourseGoals(courseGoals => [...courseGoals, enteredGoal]);
  }

  // this is the same as:
  // const goalInputHandler = enteredText => {
  //   setEnteredGoal(enteredText);
  // }

  return (
    <View style = {styles.screen}>
      <View style = {styles.inputContainer}>
        <TextInput 
          placeholder="Course Goal" 
          style = {styles.input}
          // dont add parentisis, because we doont want it to execute, we want react native 
          // to know this is the function to run on every event
          onChangeText={goalInputHandler}
          value={enteredGoal}
          />
        <Button title="ADD" onPress={addGoalHandler}/>
      </View>
      <View>
      {/* default is vertical scrolling */}
      {/* <ScrollView> not  very good */}
        {/* listing area */}
        {/* we need to privide a key(just like web react) so that react can know to o update later
        if it needs to. For know lets use goal as ther key, assuming its unique just to mmove forward */}
        {/* we are wrapping Text inside  a View component, because View accepts more styling options */}
        {courseGoals.map(goal => (
          // key should be added to  the root element of the list

          // we can see that the items box will  be stretched horizonta
          //lly which is the cross axis. This is default behaviour
          // if we didnt want this we wold have to add algin items: center for example
          // in the view parent
          <View key={goal} style={styles.listItem}>
            <Text> {goal} </Text>
          </View>
        ))}
      {/* </ScrollView> not very good */} 
      </View>
    </View>
  );
}

export default App;

// IMPORTANT: IF THE CONTENT EXCEEDS THE SCREEN, DIFFERENTLY FROM WEB WERE YOU CAN ALWAYS SCROLL
// IN NATIVE BY DEFAULT YOU CANT SCROLL, YOU HAVE TO BE SPECIFIC THAT THE VIEW IS SCROLLABLE 
// WITH <ScrollView> BUT ISGENERALLY NOT GOOD BECAUSE IT RENDERS ALL of items before hand
// <FlatList> is better!! 

// Lets do it with FlatList now:


import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, FlatList } from 'react-native';




const styles = StyleSheet.create({
  // we can create any name like "screen " that helps us identify
  // but of course inside it has to be the css-like notation
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem: {
    padding: 10,
    marginVertical: 10, // margin up and down. Ex of how this is based in css but not the same
    // margin: 10,
    backgroundColor: "#ccc",
    borderColor: 'black',
    borderWidth: 1
  }
})


function App () {

  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }


  function addGoalHandler() {
    console.log(enteredGoal);
    setCourseGoals(courseGoals => [
      ...courseGoals, 
      // now coursegoals is an array of objects
      {id: Math.random().toString(), value: enteredGoal}]);
  }

  return (
    <View style = {styles.screen}>
      <View style = {styles.inputContainer}>
        <TextInput 
          placeholder="Course Goal" 
          style = {styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
          />
        <Button title="ADD" onPress={addGoalHandler}/>
      </View>
      <View>
        <FlatList
        // Flatlist automatically adds keys to children but onlt if our data is composed of objects
          keyExtractor={(item, index) => item.id} // if ours item had key propertie we wouldnt need this, because it the default search for key
          // data we want to render
          data= {courseGoals}
          // a function that will be applied to every item
          renderItem={itemData => (
            <View style={styles.listItem}>
              {/* item Data is an object, with some other properties also  */}
              <Text> {itemData.item.value} </Text>
            </View>
        )}
        />
      </View>
    </View>
  );
}

export default App;


///////// FINAL APP STARTS HERE (COMMENT ABOVE TO WORK)
//// now lets use custom components which is better for organizaton and efficiency 
//in components folder we will store them


import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, FlatList, Modal } from 'react-native';

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
})


function App () {

 // this state should be here , and not inside the components, because bpth components need it
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  function addGoalHandler(goalTitle) {
    // console.log(enteredGoal);
    setCourseGoals(courseGoals => [
      ...courseGoals, 
      // it used to be value: enntered goal 
      // but entered goal is not managed in App.js anymore, so
      // the way that we can make this function get called by the button onPress inside Input.js
      // is by passing as argument e goaltitle (which we get from the input box)
      {id: Math.random().toString(), value: goalTitle}]);
    // after clicking ADD Button we want to close modalLearn React Native
    setIsAddMode(false)
  }


  function removeGoalHandler(goalId) {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal=> goal.id !== goalId);
    });
  }

  function cancelGoalAdditionHandler() {
    setIsAddMode(false);
  }

  return (
    <View style = {styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
    {/* // we are passing a function as props */}
      <GoalInput  onAddGoal={addGoalHandler} visible={isAddMode} onCancel={cancelGoalAdditionHandler}/>
      <View>
        <FlatList
          keyExtractor={(item, index) => item.id} // if ours item had key propertie we wouldnt need this, because it the default search for key
          data= {courseGoals}
          renderItem={itemData => (
            <GoalItem title={itemData.item.value} id={itemData.item.id} onDelete={removeGoalHandler}/>
        )}
        />
      </View>
    </View>
  );
}

export default App;

// we will delete a goal when we press the goal
// so lets make the view in GoalItem.js listen this event



## ReactJS(web)

https://github.com/keppelen/react-facebook-login

# 1) Create account with facebook developers then click in setup (FacebookLogin) and put the url (can skip other steps)and go to settings, put url (localhost in this case) of the appliccation, logo photo etc

# 2) >> yarn addreact-facebook-login

# 3) create .env file with HTTPS:true  in the first line

# 4) Craete a component like this example piece of code(from the application Tranversy tutorial)
// he used class components here, so we would probably change to functional


# 5) We get the data store in state in this example, but in our app we would treta ths exactly like 
a form, we send the user data to the server side and then we will store him in the database, and the 
client will receive a token from us and etc ( see details infolder Authenticcation). Obs: we are receiving an
id from facebook and an acesstokenfrom facebook in the api call, we can use it to get facebook related things 
in our application in any moment in time, BUT since the token has expiration, we will have the user will have to log again at ertain point, or we will have to refresh the token in background

import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebok extends Component {
  state ={
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  }

  responseFacebook = response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })
  }

  componentClicked = () => console.log("clicked");

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <div style={{
          width: '400px',
          margin:  'auto',
          background: '#f4f4f4',
          padding: '20px'

        }}>
          <img src={this.state.picture} alt={this.state.name}/>
          <h2> Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          // pega no facebook developers o APPID 
          appId="621410188588604"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} 
        />
      )
    }

    return (
      <div>
        {fbContent}
      </div>
    )
  }
}


## React Native (mobile)

In React Native its more tricky, but not that much, we just have to use Facebooks SDK for React ative 
that warps around Andorid and Ios SDK's  and permits facebook native integration

# Follow the steps in this link for SDK instalaltion:
https://developers.facebook.com/docs/react-native/getting-started

#OBS: by the end of the steps, you wll need to click on a link to configure 
# Android SDK, but the link wasnt working, so this is the page:
https://developers.facebook.com/docs/facebook-login/android

# And the Usage is here:
https://developers.facebook.com/docs/react-native/login






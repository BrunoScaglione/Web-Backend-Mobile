import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const {values, handleChange} = this.props
        return (
            <MuiThemeProvider>
                <>
                    <AppBar title="Enter User Details" />
                    <TextField
                        hintText="Enter Your First Name"
                        floatingLabelText="First Name"
                        onChange={() => handleChange('firstname')} // aqui achei meio estranho que ele meio q chamou essa funcao
                        defualtValue={values.firstName}      // e nao eh pra fazer isso, tem que deixar em funcao do evento
                    />
                    <br/>
                    <TextField
                        hintText="Enter Your Last Name"
                        floatingLabelText="Last Name"
                        onChange={() => handleChange('firstname')} // aqui achei meio estranho que ele meio q chamou essa funcao
                        defualtValue={values.lastName}      // e nao eh pra fazer isso, tem que deixar em funcao do evento
                    />
                    <TextField
                        hintText="Enter Your Email"
                        floatingLabelText="Email"
                        onChange={() => handleChange('firstname')} // aqui achei meio estranho que ele meio q chamou essa funcao
                        defualtValue={values.email}       // e nao eh pra fazer isso, tem que deixar em funcao do evento
                    />
                    <RaisedButton 
                        label="Continue"
                        primary={true} //blue color
                        style={styles.button}
                        onClick={this.continue}
                    />
                </>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormUserDetails;
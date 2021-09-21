import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class FormPersonalUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values, handleChange} = this.props
        return (
            <MuiThemeProvider>
                <>
                    <AppBar title="Enter User Details" />
                    <TextField
                        hintText="Enter Your Occupation"
                        floatingLabelText="Occupation"
                        onChange={() => handleChange('occupation')} 
                        defualtValue={values.occupation}    
                    />
                    <br/>
                    <TextField
                        hintText="Enter Your City"
                        floatingLabelText="City"
                        onChange={() => handleChange('city')} 
                        defualtValue={values.city}      
                    />
                    <TextField
                        hintText="Enter Your Bio"
                        floatingLabelText="Bio"
                        onChange={() => handleChange('bio')} 
                        defualtValue={values.bio}       
                    />
                    <RaisedButton 
                        label="Continue"
                        primary={true} //blue color
                        style={styles.button}
                        onClick={this.continue}
                    />
                    <RaisedButton 
                        label="Back"
                        primary={false} //blue color
                        style={styles.button}
                        onClick={this.back}
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

export default FormPersonalUserDetails;
import React from "react"
import { Button , TextField, Typography} from "@material-ui/core";
import { render } from "react-dom";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextAnimation from 'react-animate-text';
import TextLoop from 'react-text-loop';
import OuterDesign from '../auxiliar/OuterDesign'
import PageDesign from "../auxiliar/PageDesign";


class RecoverPass extends React.Component {

    constructor() {
        super()
        this.state = {
            emailUser: null,

            codeSuccess: {
                email: null,
                givenCode: 0,
                
            },

            enteredCode: 0,

            newpass: null,
            renewpass: null, 
            
            updateSuccess: {
                password: null,
            },

            //pt send - resend
            resendPass: 0,
            //show forms
            showEmailFormInput: 1,
            showCodeFormInput: 0,
            showPassFormInput: 0,
            //parola resetata cu succes
            successReset: 0


        }
    }
 
    handleInput = event => {
        const { value, name } = event.target;
        console.log(value);
        this.setState ({[name]:value})
    }

    handleSubmitEmail = event => {
        event.preventDefault()
        let credential = this.state.emailUser
        
        console.log("credential: " + credential)

        axiosInstance.post("/login/recover-password", credential)
            .then(
                res => {
                    const val = res.data;
                    this.setState({
                        codeSuccess: val
                    });
                    console.log(this.state.codeSuccess)

            })
            .catch(error => {
                console.log(error)
            });

            this.setState({resendPass: 1});
            this.setState({showCodeFormInput: 1});
    }

    handleSubmitCode = event => {
        event.preventDefault()
        //console.log("entered code " + this.state.enteredCode)
        //console.log("given code " + this.state.codeSuccess.givenCode)

         if(this.state.codeSuccess.givenCode == this.state.enteredCode) {

            this.setState({showCodeFormInput: 0})
            this.setState({showEmailFormInput: 0})
            this.setState({showPassFormInput: 1})
        }
    }


    handleSubmitPassword = event => {
        event.preventDefault();

        if (this.state.newpass === this.state.renewpass) {

            let credentilas = {
                email: this.state.emailUser,
                password: this.state.newpass
            }
    
            axiosInstance.put("/user/passwordupdate", credentilas)
                .then(
                    res => {
                        const val = res.data;
                        this.setState({
                            updateSuccess: val
                            
                        });
                        
                        this.setState({successReset: 1})
                        this.setState({showPassFormInput: 0})
                    }
                )
                .catch(error => {
                    console.log(error)
                })
        }        
    }

    showEmailInputForm = () => {
        return (<><br></br>
            <form style={{textAlign:'center'}} onSubmit={this.handleSubmitEmail}>
                    <Typography variant="h6" > <View><div>Recover Account Password</div></View></Typography>
                            <Typography
                                variant="subtitle2"
                                color="textPrimary"
                                component="h2"
                            ><br></br>
                            <View><div>Enter Email Address:</div></View>  
                            </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Email"
                                    name="emailUser"
                                    placeholder="Email"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                                <div>
                            </div><br></br>
        
                            <div id="buttons">
                                <Button
                                    variant="contained"
                                    id="create"
                                    type="submit"
                                >
                                {this.state.resendPass === 0? 
                                    "Send Code" : "Resend Code"}
                                </Button>
                            </div>
                        
                        </form></>
        )
    }

    showCodeInputForm = () => {
        return (
            <form style={{textAlign:'center'}} onSubmit={this.handleSubmitCode}>
                <Typography 
                    variant="subtitle2"
                    color="textPrimary"
                    component="h2"
                >
                <View><div>Enter Code:</div></View>
                </Typography>
                    <TextField
                        required={true}
                        id="required"
                        label="Code"
                        name="enteredCode"
                        placeholder="Code"
                        onChange={this.handleInput}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                    />
                    <div>
                </div><br></br>
        
                <div id="buttons">
                    <Button
                        variant="contained"
                        id="create"
                        type="submit"
                    >
                    Verify Code
                    </Button>
                </div>
            </form>
        )
    }

    showPasswordInputForm = () => {
        return (<><br></br>
            <form style={{textAlign:'center'}} onSubmit={this.handleSubmitPassword}>
                    <Typography variant="h6" >  <View><div>Recover Account Password</div></View></Typography>
                            <Typography
                                variant="subtitle2"
                                color="textPrimary"
                                component="h2"
                            ><br></br>
                            <View><div>Enter New Password:</div></View>
                            </Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="newpass"
                                    label="Password"
                                    type="password"
                                    id="newpass"
                                    onChange={this.handleInput}
                                    autoComplete="current-password"
                                />
                                
                                <div>
                            </div>

                            <Typography 
                                 variant="subtitle2"
                                 color="textPrimary"
                                 component="h2"
                            ><br></br>
                            <View><div>Reenter New Password:</div></View>
                            </Typography>
                                <TextField 
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="renewpass"
                                    label="Password"
                                    type="password"
                                    id="renewpass"
                                    onChange={this.handleInput}
                                    autoComplete="current-password"
                                />
                                
                                <div>
                            </div><br></br>
        
                            <div id="buttons">
                                <Button
                                    variant="contained"
                                    id="create"
                                    type="submit"
                                >
                                Set New Password
                                </Button>
                            </div>
                        
                        </form></>
        )
    }

    showSuccessMessage = () => {
        return (<>
            <br></br>
            <View style={styles.text}>
                <TextAnimation>Yay! Your password was reset!</TextAnimation><br></br>
            </View>

            <View style={styles.text}>
                <TextAnimation>Enjoy</TextAnimation>
            </View><br></br><br></br>
           
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Button 
                variant="contained"
                type="submit"  
                onClick={() => (this.props.history.push("/poosh"))}
            >
            Go To Login Page
            </Button></div>
            </>
        )
    }


    render() {
        return (
            <React.Fragment>

            <PageDesign></PageDesign>

                {this.state.showEmailFormInput === 1? 
                    this.showEmailInputForm() : null}
                <br></br>

                {this.state.showCodeFormInput === 1? 
                    this.showCodeInputForm() : null}

                {this.state.showPassFormInput === 1?
                    this.showPasswordInputForm() : null}

                {this.state.successReset === 1?
                    this.showSuccessMessage() : null}


            </React.Fragment>
        )
    }

}

const styles = StyleSheet.create({
    image: {
        backgroundImage: 'url(https://i.pinimg.com/originals/97/e6/da/97e6da909e3eb054ab949e90000ad38a.jpg)',
        height: 30,
        position: 'center',
    },
    image2: {
        backgroundImage: 'url(https://i.pinimg.com/564x/b3/9a/b3/b39ab3fe49219db65d4336b86c3ffcb2.jpg)',
        height: 550,
        width: 1550,
        position: "absolute",
        right: 0,
        top: 167,
    },
    text: {
        fontSize:20,
        textAlign: 'center',
        textShadow: 'black',
        alignItems: 'center',
        //chocolate
    }
});


export default withStyles(styles)(RecoverPass);



import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import axiosInstance from "../axios"
import { Grid } from "@material-ui/core";
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextAnimation from 'react-animate-text';
import TextLoop from 'react-text-loop';
import { Component } from 'react'
import Typical from 'react-typical'
import OuterDesign from '../auxiliar/OuterDesign'


class Login extends React.Component {
    
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            username: "",

            loginSuccess: {
                role: "",
                id: 0
            }
        }
        
    }

    handleInput = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
        console.log(value);
    };

    addLogIn = (logIn) => {
        const val = localStorage.getItem("USER_ID");

        let dto = {
            id: val,
            loggedIn: logIn,
            loggedOut: "In Session"
        }

        console.log(dto);

        axiosInstance
            .post(
                "/user/addLog", dto
            )
            .then(res => {
                console.log("")
            })
            .catch(error => {
                console.log(error);
            });
    }

    onSubmitFun = event => {
        event.preventDefault();
        let credentilas = {
            email: this.state.email,
            password: this.state.password
        }

        axiosInstance.post("/login", credentilas)
            .then(
                res => {
                    const val = res.data;
                    this.setState({
                        loginSucces: val
                    });
                    console.log("Succes");
                    console.log(this.state.loginSucces);
                    this.setState({username : this.state.email})

                    localStorage.setItem("USER", res.data.role);
                    localStorage.setItem("USER_ID", res.data.id);

                    console.log(this.state.username + ':' + this.state.password)
                    localStorage.setItem("token", 'Basic ' + btoa(this.state.username + ':' + this.state.password))


                    console.log(this.state.loginSucces.role)


                    if (this.state.loginSucces.role === "USER") {
                        var today = new Date(),
                        login = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

                        console.log(login)

                        this.addLogIn(login)
                        
                        this.props.history.push("/poosh/home");
                        //console.log("da ma")
                    }
                    
                    if (this.state.loginSucces.role === "ADMINISTRATOR") {
                        this.props.history.push("/poosh/administrator");
                    }
                }
            )
            .catch(error => {
                console.log(error)
            })
    }

    loopDimensions = () => {
        return (<>
            <h4>• The Eight Dimensions of Wellness •</h4>
            <TextLoop>
                    <div>☍ FINANCIAL ☍</div>
                    <div>〄 INTELECTUAL 〄</div>
                    <div>⑂ OCUPATIONAL ⑂</div>
                    <div>⚤ SOCIAL ⚤</div>
                    <div>ꐕ PHYSICAL ꐕ</div>
                    <div>☼ ENVIRONMENTAL ☽</div>
                    <div>☯ SPIRITUAL ☯</div>
                    <div>♡ EMOTIONAL ♡</div>
                    
                </TextLoop><br></br>
            </>
        );
    }

    showFormForLogin = () => {
        return (<>
            <form style={{textAlign:'center'}} onSubmit={this.onSubmitFun}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="off"
                        onChange={this.handleInput}
                        autoFocus
                    /><br></br>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={this.handleInput}
                        autoComplete="current-password"
                    /><br></br>
                    <br></br>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        
                    Sign In
                    </Button>
                </form>   
        </>
        )
    }

    render() {

        return (
           <React.Fragment>            
        
            <OuterDesign></OuterDesign>

            <View style = {styles.text}>
                {this.loopDimensions()}            
            </View>
    
                
            {this.showFormForLogin()}
            
            <View style={styles.button1} >
            <Button 
                variant="contained"
                type="submit"  
                onClick={() => (this.props.history.push("/poosh/create-account"))} 
            >
                 Create Account
            </Button></View><br></br>

            <View style={styles.button2} >
            <Button 
                variant="contained"
                type="submit"     
                onClick={() => (this.props.history.push("/poosh/recover-password"))}  
            >
            Forgot password
            </Button></View>
    

        </React.Fragment>
        );
    }
}


const styles = StyleSheet.create({
    text: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textShadow: 'black',
        alignItems: 'center',
        fontFamily: 'Roboto',
        //chocolate
    },
    button1: {
        alignSelf: "flex-end",
        position: "absolute",
        right: 250,
        bottom: 135,
    },

    button2: {
        alignSelf: "flex-end",
        position: "absolute",
        right: 190,
        bottom: 75,
    }

});



export default withStyles(styles)(Login);

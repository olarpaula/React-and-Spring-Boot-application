import React from "react"
import { Button , TextField, Typography} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextAnimation from 'react-animate-text';
import OuterDesign from '../auxiliar/OuterDesign'

class CreateAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstNameUser: null,
            lastNamenUser: null,
            emailUser: null,
            passwordUser: null,

            successCreate: 0

        }
    }
 
    handleInput = event => {
        const { value, name } = event.target;
        console.log(value);
        this.setState ({
            [name]:value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        let newUser = {
            firstName: this.state.firstNameUser,
            lastName: this.state.lastNamenUser,
            email: this.state.emailUser,
            password: this.state.passwordUser,

        }
        axiosInstance.put("/user/createAcc", newUser)
            .then(res => {
                console.log(res.data)
                newUser = res.data
            })
            .catch(error => {
                console.log(error)
            });
        
            this.setState({successCreate: 1});
    }

    
handleSpaces = (e) => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
      alert("Do not include spaces!");
    }
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };


    showFormforAdding = () => {
        return (<>
            <form style={{alignSelf:'flex-end', position: "absolute",left: 50,bottom: 60}} onSubmit={this.handleSubmit}>
                        <Typography variant="h6"> Create Account         
                </Typography>
                        <div>
                            <div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    First Name:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="First Name"
                                    name="firstNameUser"
                                    placeholder="First Name"
                                    onChange={this.handleSpaces}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Last Name:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Last Name"
                                    name="lastNamenUser"
                                    placeholder="LastName"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Email:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="email"
                                    type="email"
                                    label="Email"
                                    name="emailUser"
                                    placeholder="Email"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            <div>
                        </div>

                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Password:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    type="password"
                                    label="Password"
                                    name="passwordUser"
                                    placeholder="Password"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                    inputProps={{ minLength: 5 , maxLength: 10}}
                                />
                            <div>
                        </div><br></br>
                                  
                        <div id="buttons">
                            <Button
                                variant="contained"
                                id="create"
                                type="submit"
                            >
                                Create Account
                </Button>
                        </div>
                    </form>
            </>
        )
    }

    showSuccessMesage = () => {
        const idUser = localStorage.getItem("USER"); 
        return (<>
        {console.log(idUser)};
        {idUser === "ADMINISTRATOR" ? this.props.history.push("/poosh/administrator") : null}
            <br></br>
            <View style={styles.text}>
                <TextAnimation>Yay! Account created!</TextAnimation><br></br>
            </View>

            <View style={styles.text}>
                <TextAnimation>Enjoy</TextAnimation>
            </View><br></br><br></br>
           
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Button 
                variant="contained"
                type="submit"  
                onClick={() => 
                    (this.props.history.push("/poosh"))
                }
                // onClick={() => idUser === "ADMINISTRATOR" ? console.log("da") : console.log("nu")
                // }
            >
            Go To Login Page
            </Button></div>
            </>
        )
    }


    render() {
        return (
            <React.Fragment>

                <OuterDesign></OuterDesign>

                {this.state.successCreate === 0 ?
                    this.showFormforAdding() : this.showSuccessMesage()}
                

            </React.Fragment>
            
        )
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
        //chocolate
    },
});


export default withStyles(styles)(CreateAccount);




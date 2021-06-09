import React from "react"
import { Button , TextField, Typography} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';



class NewUser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //id: 90,
            firstNameUser: null,
            lastNamenUser: null,
            emailUser: null,
            passwordUser: null 

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
        axiosInstance.put("/user", newUser)
            .then(res => {
                console.log(res.data)
                newUser = res.data
            })
            .catch(error => {
                console.log(error)
            });
    }

    customizeBackground = () => {
        const gradientHeight = 400
        const gradientBackground = 'wheat'
        const data = Array.from({ length: gradientHeight})

        return (
            <View >
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'fixed', 
                            width: 1600,
                            backgroundColor: gradientBackground,
                            height: 1,
                            bottom: (gradientHeight-i),
                            opacity: (1 / gradientHeight) * (i + 1)
                        }}
                    />
                ))}
            </View>
        )
    }

    showFormforAdding = () => {
        return (<>
            <form style={{alignSelf:'flex-end', position: "absolute",left: 500,bottom: 60}} onSubmit={this.handleSubmit}>
                        <Typography variant="h6" color="lightslategrey" textDecorationStyle="solid"> Add New User         
                </Typography>
                        <div>
                            <div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    User First Name:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="First Name"
                                    name="firstNameUser"
                                    placeholder="First Name"
                                    onChange={this.handleInput}
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
                                    User Last Name:
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
                                    User Email:
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
                        </div>

                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    User Password:
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
                                />
                            <div>
                        </div><br></br>
                                  
                        <div id="buttons">
                            <Button
                                variant="contained"
                                id="create"
                                type="submit"
                            >
                                Add New User
                </Button>
                        </div>
                    </form>
            </>
        )
    }


    render() {
        return (
            <React.Fragment>

                <View style = {styles.image}></View>

                <View style = {styles.text}>
                    <h4>POOSH YOUR LIFESTYLE</h4>
                </View>  

                <View style = {styles.image}></View>
                <View style = {styles.image2}></View>

                {this.customizeBackground()}

                {this.showFormforAdding()}
                

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
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textShadow: 'black',
        alignItems: 'center',
        //chocolate
    },
});


export default withStyles(styles)(NewUser);




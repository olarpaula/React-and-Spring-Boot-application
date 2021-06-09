import React from "react"
import { Button , TextField, Typography} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';

class UpdateProfile extends React.Component {

    constructor() {
        super()
        this.state = {
            id: null,
            
            userGender: null,
            age: null,
            weight: null,
            height: null,
            workoutFrequency: null,
            neck: null,
            hip: null,
            waist: null,
        
            badCredentials: null,

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
        const data = localStorage.getItem("USER_ID");
        this.setState({id: data})

        let credentials = {
            id: data,
            userGender: this.state.userGender,
            age: this.state.age,
            weight: this.state.weight,
            height: this.state.height,
            workoutFrequency: this.state.workoutFrequency,
            neck: this.state.neck,
            hip: this.state.hip,
            waist: this.state.waist,
        }


        axiosInstance.put("/profile/updateProfile", credentials)
            .then(res => {
                console.log(res.data)

                this.setState({nutritionProfile: res.data})
                
                //localStorage.setItem("PROFILE", this.state.nutritionProfile);
                
                this.props.history.push("/poosh/my-profile");
            })
            .catch(error => {
                console.log(error)
                this.setState({badCredentials: 1})
                //console.log(this.state.badCredentials)
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
            <View style={styles.text}>
                <h4>• My Profile •</h4>
            </View>

            <form style={{alignSelf:'flex-end', position: "absolute",left: 520, top: 250}} onSubmit={this.handleSubmit}>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Gender:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Gender"
                                    name="userGender"
                                    placeholder="Gender"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                           
                            <div></div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Age:
                    </Typography>
                                <TextField
                                    required={true}
                                    //id="required"
                                    label= "Age"
                                    name="age"
                                    placeholder= {this.state.age === null ? "Age" : "" + this.state.age}
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
                                    Weight (kg):
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label= "Weight"
                                    name="weight"
                                    placeholder={this.state.weight === null ? "Weight" : "" + this.state.weight}
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
                                    Height (cm):
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Height"
                                    name="height"
                                    placeholder= {this.state.height === null ? "Height" : "" + this.state.height}
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            <div></div>
                    </form>
            
      
        <form style={{alignSelf:'flex-end', position: "absolute",left: 780, top: 250}} onSubmit={this.handleSubmit}>
        
        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Workout Frequency:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Workout Frequency"
                                    name="workoutFrequency"
                                    placeholder="Workout Frequency"
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
                                    Neck (cm):
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label= "Neck" 
                                    name="neck"
                                    placeholder= {this.state.neck === null ? "Neck" : "" + this.state.neck}
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
                                    Waist (cm):
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label= "Waist" 
                                    name="waist"
                                    placeholder= {this.state.waist === null ? "Waist" : "" + this.state.waist}
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
                                    Hip (cm):
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label= "Hip" 
                                    name="hip"
                                    placeholder= {this.state.hip === null ? "Hip" : "" + this.state.hip}
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            <div>
                        </div>

                        <br></br>
                                  
                        <div id="buttons">
                            <View style={styles.saveBtn}>
                            <Button
                                variant="contained"
                                id="create"
                                type="submit"
                            >
                                Save
                </Button></View>
                <br></br><br></br>
                        </div>
                        </form>
        
            </>
        
        )
    }

    onTitleChange = e => {
        this.setState({ title: e.target.value });
    };

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

                {this.state.badCredentials === 1 ? <View style = {styles.badCredentials}><>Bad Credentials!</></View> : null}

                {console.log("AGE " + this.state.age)}

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
        width: 1750,
        position: "absolute",
        right: 0,
        top: 167,
    },
    text: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textShadow: 'black',
        alignItems: 'center',
        //chocolate
    },
    saveBtn: {
        alignSelf: "flex-end",
        position: "absolute",
        left: 300,
        bottom: 30,
    },
    badCredentials: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textShadow: 'black',
        alignItems: 'center',
        botom: '20'
        //chocolate
    },
});


export default withStyles(styles)(UpdateProfile);




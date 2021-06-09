import React from "react"
import {IconButton, Button , TextField, Typography} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PageDesign  from '../auxiliar/PageDesign';
import CardActions from '@material-ui/core/CardActions';
import PersonIcon from '@material-ui/icons/Person';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

class NewProfile extends React.Component {

    constructor() {
        super()
        this.state = {
            id: null,
            
            userGender: "FEMALE",
            age: null,
            weight: null,
            height: null,
            workoutFrequency: "SEDENTARY",
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
                
            })
            .catch(error => {
                console.log(error)
                this.setState({badCredentials: 1})
            });
        
        this.props.history.push("/poosh/my-profile")
    }

    
    setGender = event => {
        this.setState({userGender:event.target.value})
    }

    setWorkoutFreq = event => {
        this.setState({workoutFrequency:event.target.value})
    }
    

    showFormforAdding = () => {
        return (<>
        
            <form style={{alignSelf:'flex-end', position: "absolute",left: 510, top: 200}} onSubmit={this.handleSubmit}>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Gender:
                    </Typography>

                            <RadioGroup value={this.state.userGender} onChange={(e) => this.setGender(e)}>
                                <FormControlLabel value="FEMALE" control={<Radio/>} label="Female"/>
                                <FormControlLabel value="MALE" control={<Radio/>} label="Male"/>

                            </RadioGroup>
                            
                           
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

                    </form>
            
      
         <form style={{alignSelf:'flex-end', position: "absolute",left: 800, top: 200}} onSubmit={this.handleSubmit}> 
        
        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Workout Frequency:
                    </Typography>

                        <RadioGroup value={this.state.workoutFrequency} onChange={(e) => this.setWorkoutFreq(e)}>
                                <FormControlLabel value="SEDENTARY" control={<Radio/>} label="Sedentary"/>
                                <FormControlLabel value="LIGHT" control={<Radio/>} label="Light"/>
                                <FormControlLabel value="MODERATE" control={<Radio/>} label="Moderate"/>
                                <FormControlLabel value="ACTIVE" control={<Radio/>} label="Active"/>
                                <FormControlLabel value="VERY_ACTIVE" control={<Radio/>} label="Very active"/>


                            </RadioGroup>
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
                        </form></>
        
        )
    }

  

    render() {

        return (
            <React.Fragment>

                <PageDesign></PageDesign>

                <View >
                    <CardActions style={{position:"relative", left:"1330px", top:"-135px"}}>
                        <IconButton aria-label="info" onClick={() => (this.props.history.push("/poosh/home"))}> <PersonIcon /> </IconButton>

                        <IconButton aria-label="add to basket" onClick={() => (this.props.history.push("/poosh"))}> <DeviceHubIcon /> </IconButton>
                    </CardActions>

                </View>

                
                {this.showFormforAdding()}

                {this.state.badCredentials === 1 ? <View style = {styles.badCredentials}><>Bad Credentials!</></View> : null}


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
        left: 250,
        bottom: -30,
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


export default withStyles(styles)(NewProfile);




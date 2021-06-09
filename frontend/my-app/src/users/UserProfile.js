import  React from "react"
import { IconButton, Button, Typography, Box} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextLoop from 'react-text-loop';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { ControlCameraOutlined } from "@material-ui/icons";
// import TouchableOpacity from 'react-native-gesture-handler';
import PageDesign  from '../auxiliar/PageDesign';
import PersonIcon from '@material-ui/icons/Person';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CardHeader from '@material-ui/core/CardHeader';


class UserProfile extends React.Component {

    constructor() {
        super()
        this.state = {
            nutritionProfile: {
                id: null,
                bmi: null,
                maintainWeightCal: null,
                mildweightLossCal: null,
                weightLossCal: null,
                extremeLossCal: null,
                bodyFat: null,
                bmr: null,
                idealWeight: null,
                lbm: null,
                bmiRange: null,
                bodyFatRange: null
                
            },
        }
    }

    componentDidMount() {
        const idUser = localStorage.getItem("USER_ID");
        axiosInstance.post("/profile/nutritionProfile", idUser)
            .then(res => {
                this.setState({
                    nutritionProfile: res.data
                });
                console.log(res.data)
                console.log(this.state.nutritionProfile)
            })
            .catch(error => {
                //console.log("id: " + idUser)
                console.log(error);
            });

    };
 
 
    render() {
        const bull = <span style={{display:'inline-block', margin:'0 2px', transform:'scale(0.8)'}} >•</span>;

        return (
            <React.Fragment>

                <PageDesign></PageDesign>
                <View >
                    <CardActions style={{position:"relative", left:"1330px", top:"-135px"}}>
                        <IconButton aria-label="info" onClick={() => (this.props.history.push("/poosh/home"))}> <PersonIcon /> </IconButton>

                        <IconButton aria-label="add to basket" onClick={() => (this.props.history.push("/poosh"))}> <DeviceHubIcon /> </IconButton>
                    </CardActions>

                    <CardActions style={{position:"relative", left:"700px", top:"-55px"}}>
                        <IconButton aria-label="add to favorites" onClick={() => (this.props.history.push("/poosh/MyWishlist"))}> <FavoriteIcon /> </IconButton>
                        <IconButton aria-label="add to basket" onClick={() => (this.props.history.push("/poosh/MyBasket"))}> <AddShoppingCartIcon /> </IconButton>
                    </CardActions>

                </View>

                <Box width="80%"  top={210} left={230}  position="absolute" display="flex" >
                    <Card  style={{backgroundColor: "oldlace ", height: "780px", width: "1050px"}}  >
                    <CardHeader 
                        title = {<Typography style={{textAlign:'center', fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}> {bull} My Nutrition Profile {bull} </Typography>}
                        subheader = {<Typography style={{textAlign:'center',fontSize: "18px", fontFamily:'"Apple Color Emoji"'}}> Real Statistics </Typography>}
                    />

                    <CardContent>
                        <Typography> {bull} Body Mass Index {bull} <br>
                        </br>BMI is widely used as a general indicator of whether a person has a healthy body weight for their height.
                            <br></br>My Result: {this.state.nutritionProfile.bmi} kg/m<br></br>
                            BMI Range: {this.state.nutritionProfile.bmiRange}<br></br>
                        </Typography><br></br>

                        <Typography> {bull} Body Fat {bull} <br></br>
                        The scientific term for body fat is "adipose tissue." Its primary purpose is to store lipids from which the body creates energy.<br></br>
                            My Result: {this.state.nutritionProfile.bodyFat} %<br></br>
                            Body Fat Range: {this.state.nutritionProfile.bodyFatRange}
                        </Typography><br></br>

                        <Typography> {bull} Ideal Weight {bull} <br></br>
                        The Ideal Weight Calculator computes ideal bodyweight (IBW) ranges based on height, gender, and age.<br></br>
                            My Result: {this.state.nutritionProfile.idealWeight} kg
                        </Typography><br></br>

                        <Typography> {bull} Calories {bull} <br></br>
                            The amount of calories to eat each day in order to mantain your weight, to lose 0.25 kg/week, 0.5 kg/week and 3 kg/week.<br></br>
                            Mantain Weight: {this.state.nutritionProfile.maintainWeightCal}<br></br>
                            Mild Weight Loss: {this.state.nutritionProfile.mildweightLossCal}<br></br>
                            Weight Loss: {this.state.nutritionProfile.weightLossCal}<br></br>
                            Extreme Weight Loss: {this.state.nutritionProfile.extremeLossCal}<br></br>
                        </Typography><br></br>

                        <Typography> {bull} Basal Metabolic Rate {bull} <br></br>
                             Daily calorie needs based on activity level<br></br>
                             My Result: {this.state.nutritionProfile.bmr} calories/day
                        </Typography>
                        
                    </CardContent>
                    
                </Card>

                
                </Box>
                
                <Box width="10%"  bottom={-300} right={20}  position="absolute" display="flex" >
                    <Card  style={{backgroundColor: "oldlace ", height: "60px", width: "100px"}}  >
                        
                    
                        <CardActions style={{justifyContent: 'center'}}>
                             <IconButton aria-label="info" onClick={() => (this.props.history.push("/poosh/add-profile"))}> <Typography> Update </Typography>  </IconButton>
                        </CardActions>
                        
                        
                </Card>
                </Box>


                

            </React.Fragment>
        )
    }

}

const styles = StyleSheet.create({
    text: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textShadow: 'black',
        alignItems: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
    btn: {
        alignSelf: "flex-end",
        position: "absolute",
    },
});



export default withStyles(styles)(UserProfile);

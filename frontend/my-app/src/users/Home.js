import  React from "react"
import { Button, Typography, IconButton, Box, Grid, Link} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import Avatar from 'react-avatar';
import TextLoop from 'react-text-loop';
import axios from "axios";
import PageDesign  from '../auxiliar/PageDesign';
import AllProducts from '../products/AllProducts';
import CardActionArea from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fade from '@material-ui/core/Fade';
import BrushIcon from '@material-ui/icons/Brush';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddIcon from '@material-ui/icons/Add';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import HorizontalSplitOutlinedIcon from '@material-ui/icons/HorizontalSplitOutlined';
import PersonIcon from '@material-ui/icons/Person';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            id: null,
        
            firstName: null,
            lastName: null,
            password: null,
            profileCompleted: null,
            isSubscribed: null,

            clicked: 0,

            news: []
            
        }
    }

    componentDidMount() {
        this.connect();
        const idUser = localStorage.getItem("USER_ID");
        axiosInstance.get("/user/account-info?id=" + idUser)
            .then(res => {
                // console.log(res.data.profileCompleted)
                // console.log(res.data.isSubscribed)
                this.setState({firstName: res.data.firstName})
                this.setState({lastName: res.data.lastName})
                this.setState({password: res.data.password})
                this.setState({profileCompleted: res.data.profileCompleted})
                this.setState({isSubscribed: res.data.isSubscribed})
            })
            .catch(error => {
                console.log("id: " + idUser)
                
                console.log(error);
            });
        
        axiosInstance
            .get(
                "/administrator/findAllNews",
            )
            .then(res => {
                // console.log(res.data)
                this.setState({news: res.data});
            })
            .catch(error => {
                console.log(error);
            });

    };

    handleCompleteProfile = event => {
        event.preventDefault()
        const data = localStorage.getItem("USER_ID");
        this.setState({id: data})

        let credentilas = data

        axiosInstance.post("/profile/completedProfile", credentilas)
            .then(
                res => {
                    const val = res.data;
                    this.setState({
                        profileCompleted: val,
                        id: data
                    })

                })
            .catch(error => {
                console.log(error)
            });
        
            console.log("profil completat? " + this.state.profileCompleted)
    }

    checkCompletedProfile = () => {
       
        if (this.state.profileCompleted === 1) {
                // this.props.history.push("/poosh/my-profile")
                console.log("hey")
            }  
    }

    updateSubscribtion = (subscribed) => {
        const data = localStorage.getItem("USER_ID");

        

        let credentilas = {
            id: data,
            isSubscribed: subscribed
        }

        axiosInstance.post("/user/updateSubscription", credentilas)
            .then(
                res => {
                    this.setState({isSubscribed: subscribed})

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

    connect() {
        const URL = "http://localhost:8080/socket";
        const websocket = new SockJS(URL);
        const stompClient = Stomp.over(websocket);
        stompClient.connect({}, frame => {
            console.log("Conectat la " + frame);
            stompClient.subscribe("/topic/socket/notification", notification => {
                let message = notification.body;
                console.log(message);
                alert(message);

            })

            stompClient.subscribe("/topic/socket/notification2", notification => {
                let message = notification.body;
                console.log(message);
                alert(message);

            })

            stompClient.subscribe("/topic/socket/notification", notification => {
                let message = notification.body;
                console.log(message);
                alert(message);

            })

            stompClient.subscribe("/topic/socket/notification3", notification => {
                let message = notification.body;
                console.log(message);
                alert(message);

            })
        })
    }

    addLogOut = () => {
        const val = localStorage.getItem("USER_ID");

        var today = new Date(),
        logout = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();


        let dto = {
            id: val,
            loggedIn: "loggedIn",
            loggedOut: logout
        }

        axiosInstance
            .post(
                "/user/addLogOut", dto
            )
            .then(res => {
                console.log("")
            })
            .catch(error => {
                console.log(error);
            });

        this.logout()

        this.props.history.push("/poosh")
    }

    logout = () => {
        localStorage.removeItem("USER_ID")
        localStorage.removeItem("USER")
        localStorage.removeItem("token")

        this.props.history.push("/poosh")

    }

    render() {
        const bull = <span style={{display:'inline-block', margin:'0 2px', transform:'scale(0.8)'}} >•</span>;

        return (
            <React.Fragment>

                <View style = {styles.image}>
                    <CardActions style={{position:"relative", left:"1330px", top:"-10px"}}>
                        <IconButton aria-label="info" > <PersonIcon /> </IconButton>
                        

                        <IconButton aria-label="add to basket" onClick={() => this.addLogOut()}> <DeviceHubIcon /> </IconButton>
                    </CardActions>
                </View>

                <View style = {styles.text}>
                    <h4>POOSH YOUR LIFESTYLE</h4>
                </View>

                <View style = {styles.image3}></View>
                <View style = {styles.image2}></View>

                {this.customizeBackground()}

                    
                    <CardActions style={{justifyContent: "center"}}>
                        <IconButton aria-label="add to favorites" onClick={() => (this.props.history.push("/poosh/MyWishlist"))}> <FavoriteIcon /> </IconButton>
                        <IconButton aria-label="add to basket" onClick={() => (this.props.history.push("/poosh/MyBasket"))}> <AddShoppingCartIcon /> </IconButton>
                    </CardActions>

                <Box  top={230} bottom={10} left={50}  position="absolute" display="flex" >

                <Card square elevation ={20}  style={{backgroundColor: "oldlace ", height: "400px", width: "250px", }}  >
                            
                    <CardHeader 
                        title = {<Typography style={{textAlign:'center', fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}> {bull} My Dashboard {bull} </Typography>}
                        subheader = {
                            <Typography style={{fontSize: "18px", fontFamily:'"Apple Color Emoji"'}}> <br></br>{this.state.firstName + " " + this.state.lastName} 
                                {this.state.isSubscribed === 0?
                                    <IconButton onClick = {() => this.updateSubscribtion(1)}> <NotificationsOffIcon/> </IconButton>
                                : null}
                                {this.state.isSubscribed === 1?
                                <IconButton onClick = {() => this.updateSubscribtion(0)}> <NotificationsActiveIcon/> </IconButton>
                                : null}
                            
                            </Typography>
                        }
                        
                    />

                    {console.log(this.state.isSubscribed)}

                    
                            <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/allProducts"))} ><Typography>Go Shopping </Typography> < ShoppingBasketIcon /></IconButton> 
                            </CardActions>
                            <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/account-details"))}><Typography>Update Info</Typography><BrushIcon/></IconButton>
                            </CardActions>
                            <CardActions>
                                <IconButton onClick={()=>(this.setState({clicked: 1}))} ><Typography>My Nutrition Profile</Typography><EmojiPeopleIcon/></IconButton>
                            </CardActions>

                            <View>
                                {this.state.profileCompleted == 0 ? <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/add-profile"))}><Typography >Add </Typography><AddIcon/></IconButton>
                            </CardActions> : this.state.clicked=== 1? this.props.history.push("/poosh/my-profile") : null}
                            </View>

                        </Card>
                    </Box>

                    <Box width="50%"  top={240} left={430}  position="absolute" display="flex" >

                    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    
                       {this.state.news.map(freshNews => (

                        <Grid item xs sm md lg key={freshNews.id}>
                      
                            <Card  square elevation ={20} style={{backgroundColor: "e0e0e0", height: "150px", width: "750px"}} cardObject={freshNews.id} >
                            
                                <CardActionArea>
                                    
                                    <CardContent>
                                    <Typography style={{fontSize: "18px", fontFamily:'"Apple Color Emoji"'}}> {"News Topic: " + freshNews.topic} </Typography>
                                    <></>
                                    <Typography gutterBottom variant="h6" component="h1" style={{fontSize: "15px", fontFamily:'"Apple Color Emoji"'}}>
                                            {"Date: " + freshNews.date}<br></br>                                            
                                    </Typography>

                                    <Typography style={{fontSize: "15px", fontFamily:'"Apple Color Emoji"'}}> {freshNews.news} </Typography>
                                        
                                    </CardContent> 
                                    

                                </CardActionArea>

                                
                            </Card>
 
                        </Grid>

                       ))}
                       
                       </Grid>

                </Box>
                
                {/* {this.checkCompletedProfile()} */}

            </React.Fragment>
        )
    }

}

const styles = StyleSheet.create({
    image: {
        backgroundImage: 'url(https://i.pinimg.com/564x/6f/d0/6a/6fd06ab2466d3cec5148a43361d24351.jpg)',
        height: 50,
        position: 'center',
    },
    image3: {
        backgroundImage: 'url(https://i.pinimg.com/564x/6f/d0/6a/6fd06ab2466d3cec5148a43361d24351.jpg)',
        height: 4,
        width: "50%",
        left: "360px",
    },
    image2: {
        backgroundImage: 'url(https://i.pinimg.com/564x/b3/9a/b3/b39ab3fe49219db65d4336b86c3ffcb2.jpg)',
        height: "100%",
        width: "100%",
        position: "absolute",
    },
    text: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textShadow: 'black',
        alignItems: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
});



export default withStyles(styles)(Home);

import  React from "react"
import { Button, Typography, IconButton, TextField, Box, Grid, Link} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
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
import CardActionArea from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class Administrator extends React.Component {

    constructor() {
        super()
        this.state = {
            id: null,
            firstName: null,
            lastName: null,
            password: null,
            email: null,

            logs: [],
            showLogs: false,

            news: [],
            showNews: true,

            fNews: null,
            fTopic: null,
            

            totalUsers: 0,
            activeUsers: 0,
            notActiveUsers: 0
            
        }
    }

    componentDidMount() {
        const idUser = localStorage.getItem("USER_ID");
        console.log(idUser)
        axiosInstance.get("/user/account-info/adm?id=" + idUser)
            .then(res => {
                this.setState({id: res.data.id})
                this.setState({firstName: res.data.firstName})
                this.setState({lastName: res.data.lastName})
                this.setState({password: res.data.password})
                this.setState({email: res.data.email})
            })
            .catch(error => {
                console.log("id: " + idUser)
                console.log(error);
            });
        
        axiosInstance
            .get(
                "/user/findLogs",
            )
            .then(res => {
                // console.log(res.data)
                this.setState({logs: res.data});
            })
            .catch(error => {
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
        
        axiosInstance
        .get(
            "/user/userStatus",
        )
        .then(res => {
            this.setState({totalUsers: res.data.totalUsers});
            this.setState({activeUsers: res.data.activeUsers});
            this.setState({notActiveUsers: res.data.notActiveUsers});
        })
        .catch(error => {
            console.log(error);
        });
            
    };

    handleSubmit = event => {
        event.preventDefault()
        let freshNews = {
            topic: this.state.fTopic,
            news: this.state.fNews,
        }

        console.log(this.state.fTopic)

        
        axiosInstance.post("/administrator/addNews", freshNews)
            .then(res => {
            })
            .catch(error => {
                console.log(error)
            });
        
        window.location.reload(false);
        
    }

    handleInput = event => {
        const { value, name } = event.target;
        console.log(value);
        this.setState ({
            [name]:value
        })
    }

    showFormforAdding = () => {
        return (<>
            <form style={{alignSelf:'flex-end', position: "absolute",right: 100,top: 230}} onSubmit={this.handleSubmit}>
                        <Typography variant="h6" color="textPrimary" component="h6"> Fresh News       
                </Typography><br></br>
                        <div>
                            <div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Topic:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Topic"
                                    name="fTopic"
                                    placeholder="Topic"
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
                                    News:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="News"
                                    name="fNews"
                                    placeholder="News"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
    
                        <div id="buttons">
                            <Button
                                variant="contained"
                                id="create"
                                type="submit"
                            >
                                Add
                </Button>
                        </div>
                        <br></br><br></br>
                    </form>
        </>
        )
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

    changeState = () => {
        window.location.reload(false);
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

                        <IconButton aria-label="add to basket" onClick={() => this.logout()}> <DeviceHubIcon /> </IconButton>
                    </CardActions>
                </View>

                <View style = {styles.text}>
                    <h4>POOSH YOUR LIFESTYLE</h4>
                </View>

                <View style = {styles.image3}></View>
                <View style = {styles.image2}></View>

                {this.customizeBackground()}


                <View style={styles.button1} >
                    <IconButton onClick={ () => (this.setState({showLogs: !this.state.showLogs}))} > < AddIcon /> <Typography> User Activity </Typography> </IconButton> 
                </View><br></br>

                <View style={styles.button2} >
                    <IconButton onClick={ () => (this.setState({showLogs: !this.state.showLogs}))} > < AddIcon /> <Typography> Add News </Typography> </IconButton> 
                </View><br></br>

                {this.state.showLogs === true? 
                    <>
                        <Box width="50%"  top={240} left={430}  position="absolute" display="flex" >
                    
                    

                    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    
                       {this.state.logs.map(log => (

                        <Grid item xs sm md lg key={log.id}>
                      
                            <Card  style={{backgroundColor: "oldlace ", height: "100px", width: "450px"}} cardObject={log.id} >
                            
                                <CardActionArea>
                                    
                                    <CardContent>
                                    <Typography style={{fontSize: "18px", fontFamily:'"Apple Color Emoji"'}}> {"User Id: " + log.userId} </Typography>
                                    <Typography gutterBottom variant="h6" component="h1" style={{fontSize: "15px", fontFamily:'"Apple Color Emoji"'}}>
                                            {"LogIn: " + log.loggedIn}<br></br>
                                            {"LogOut: " + log.loggedOut}<br></br>
                                    </Typography>
                                        
                                    </CardContent> 
                                    

                                </CardActionArea>

                                
                            </Card>
 
                        </Grid>

                       ))}
                       
                       </Grid>

                </Box>

                <View style={styles.totalUsers} >
                    <IconButton>  <Typography> {"Total Users: "}  {this.state.totalUsers} </Typography> </IconButton> 
                    <IconButton>  <Typography> {"Active Users: "}  {this.state.activeUsers} </Typography> </IconButton>
                    <IconButton>  <Typography> {"Not Active Users: "}  {this.state.notActiveUsers} </Typography> </IconButton>
                </View><br></br>
                    </>

                : null}


                <Box width="50%"  top={240} left={430}  position="absolute" display="flex" >

                    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    
                       {this.state.news.map(freshNews => (

                        <Grid item xs sm md lg key={freshNews.id}>
                      
                            <Card  square elevation ={20} style={{backgroundColor: "e0e0e0", height: "150px", width: "650px"}} cardObject={freshNews.id} >
                            
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



                <Box  top={200} bottom={10} left={50}  position="absolute" display="flex" >

                <Card  square elevation ={20} style={{backgroundColor: "oldlace ", height: "500px", width: "250px", }}  >
                            
                    <CardHeader 
                        title = {<Typography style={{textAlign:'center', fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}> {bull} My Dashboard {bull} </Typography>}
                        subheader = {<Typography style={{fontSize: "18px", fontFamily:'"Apple Color Emoji"'}}> <br></br>{this.state.firstName + " " + this.state.lastName}  </Typography>}
                    />

                    
<CardActions>
                        <IconButton  ><Typography>My Profile</Typography><EmojiPeopleIcon/></IconButton>
                            </CardActions>
                            <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/manage-users"))} ><Typography>Manage Users </Typography> < ShoppingBasketIcon /></IconButton> 
                            </CardActions>
                            <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/create-account"))} ><Typography>Add User</Typography> < AddIcon /></IconButton> 
                            </CardActions>

                            <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/manage-products"))}><Typography>Manage Products</Typography><BrushIcon/></IconButton>
                            </CardActions>

                            <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/add-product"))} ><Typography>Add SkinCare</Typography> < AddIcon /></IconButton> 
                            </CardActions>

                            <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/add-supplement"))} ><Typography>Add Supplement</Typography> < AddIcon /></IconButton> 
                            </CardActions>
                            

                            <View>
                                {this.state.profileCompleted == 0 ? <CardActions>
                                <IconButton onClick={() => (this.props.history.push("/poosh/add-profile"))}><Typography >Add </Typography><AddIcon/></IconButton>
                            </CardActions> : null}
                            </View>

                        </Card>
                        <br></br><br></br>

                    </Box>

                    {this.state.showNews == true ? this.showFormforAdding() : null}

                    
                

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
    button1: {
        alignSelf: "flex-end",
        position: "absolute",
        right: 230,
        top: 125,
    },
    button2: {
        alignSelf: "flex-end",
        position: "absolute",
        right: 245,
        top: 155,
    },
    totalUsers: {
        alignSelf: "flex-end",
        position: "absolute",
        right: 230,
        top: 175,
    },
});

export default withStyles(styles)(Administrator);

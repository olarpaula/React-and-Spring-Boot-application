import  React from "react"
import { Button, Typography, IconButton, Box, Grid, Link} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import Avatar from 'react-avatar';
import CardActionArea from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import HorizontalSplitOutlinedIcon from '@material-ui/icons/HorizontalSplitOutlined';
import Fade from '@material-ui/core/Fade';
import PageDesign  from '../auxiliar/PageDesign';
import PersonIcon from '@material-ui/icons/Person';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SortIcon from '@material-ui/icons/Sort';
import DeleteIcon from '@material-ui/icons/Delete';
import { saveAs } from 'file-saver';

class Users extends React.Component {

    constructor() {
        super()
        this.state = {
            users: [],
            id: null
        }
    }
 
    componentDidMount() {
        axiosInstance
            .get(
                "/user",
            )
            .then(res => {
                this.setState({
                    users: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    deleteUser = (user_id) => {
                // axiosInstance.get("/user/account-info?id=" + idUser)

        axiosInstance.post("/user/deleteUser?id=" + user_id)
            .then(
                res => {
           })
            .catch(error => {
                console.log(error)
            })

            window.location.reload(false);

    }

    exportData(fileType, id) {
        axiosInstance.get("/user/export/" + id, { params: { fileType: fileType }, responseType: 'text' })
            .then(res => {
                let typeForBlob = fileType == 'txt' ? 'text/plain;charset=utf-8' : 'text/xml;charset=utf-8';
                let blob = new Blob([res.data], { type: typeForBlob });
                saveAs(blob, "user-data." + fileType);
                console.log(blob);

            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
           
            <React.Fragment>
                 <PageDesign></PageDesign>

                 <View >
                    <CardActions style={{position:"relative", left:"1330px", top:"-135px"}}>
                        <IconButton aria-label="info" onClick={() => (this.props.history.push("/poosh/administrator"))}> <PersonIcon /> </IconButton>

                        <IconButton aria-label="add to basket" onClick={() => (this.props.history.push("/poosh"))}> <DeviceHubIcon /> </IconButton>
                    </CardActions>

                    

                </View>

               
                <Box width="70%"  top={220} left={230}  position="absolute" display="flex" >
                    
                    

                    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    
                       {this.state.users.map(user => (

                        <Grid item xs sm md lg key={user.id}>
                        {/* {`/users/${product.id}`} */}
                        {/* <Link underline='none' component={RouterLink}to={{pathname: `/products/${product.id}`}}> */}
                        <Link underline='none' >
                            <Card  style={{backgroundColor: "oldlace ", height: "300px", width: "250px"}} cardObject={user.id} >
                            
                            <CardHeader
                                // title = {product.name}
                                // subheader={product.brand}
                                title = {<Typography style={{fontSize: "25px", fontFamily:'"Apple Color Emoji"'}}> User </Typography>}
                                subheader = {<Typography style={{fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}> {"ID: " + user.id} </Typography>}
                            
                            />

                                <CardActionArea>
                                    
                                    <CardContent>
                                    <Typography gutterBottom variant="h6" component="h1" style={{fontSize: "18px", fontFamily:'"Apple Color Emoji"'}}>
                                            {"First Name: " + user.firstName}<br></br>
                                            {"Last Name: " + user.lastName}<br></br>
                                            {"Email: " + user.email} 
                                    </Typography>
                                        
                                    </CardContent> 
                                    

                                </CardActionArea>
                                <CardActions style={{justifyContent: 'center'}}>
                                    {/* <IconButton > <HorizontalSplitOutlinedIcon /> </IconButton> */}
                                    <Button onClick={() => this.exportData("txt", user.id)}> Txt </Button>
                                    <Button onClick={() => this.exportData("xml", user.id)}> Xml </Button>
                                    <IconButton onClick = {() => this.deleteUser(user.id)} > <DeleteIcon /> </IconButton>                                    
                                </CardActions>
                            </Card>
                            </Link>
                        </Grid>

                       ))}
                       
                       </Grid>

                </Box>

                {/* {this.customizeBackground()} */}
            </React.Fragment>
        )
    }

}



const styles = theme => ({
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
    },
    newUser: {
        alignSelf: "flex-end",
        position: "absolute",
        left: 30,
        top: 230,
    },
    details: {
        alignSelf: "flex-end",
        position: "absolute",
        right: 30,
    }
});



export default withStyles(styles)(Users);

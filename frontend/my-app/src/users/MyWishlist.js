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
import ClearIcon from '@material-ui/icons/Clear';


class MyWishlist extends React.Component {

    constructor() {
        super()
        this.state = {
            products: [],
            id: null,

            user_id: null,
            product_id: null,

        }
    }
 
    componentDidMount() {
        const idUser = localStorage.getItem("USER_ID");
        // axiosInstance.get("/user/account-info?id=" + idUser)
        console.log(idUser)
        axiosInstance
            .get(
                "/user/myWishList?id=" + idUser,
            )
            .then(res => {
                this.setState({
                    products: res.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
        
        console.log(this.state.products)
    };

    deleteFromWishList = (product_id) => {
        const val = localStorage.getItem("USER_ID");

        let dto = {
            user_id: val,
            product_id: product_id}

        console.log(dto);

        axiosInstance.put("/user/deleteProductFromWishlist", dto)
            .then(
                res => {
                    const val = res.data;
                    console.log(val);        
            })
            .catch(error => {
                console.log(error)
            })
        
            window.location.reload(false);

    }

    addToBasket = (product_id) => {
        const val = localStorage.getItem("USER_ID");

        let dto = {
            user_id: val,
            product_id: product_id}

        console.log(dto);

        axiosInstance.post("/user/addProductToBasket", dto)
            .then(
                res => {
                    const val = res.data;
                    console.log(val);        
            })
            .catch(error => {
                console.log(error)
            })
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

                    <CardActions style={{position:"relative", left:"725px", top:"-55px"}}>
                        {/* <IconButton aria-label="add to favorites" onClick = {() => console.log("b")}> <FavoriteIcon /> </IconButton> */}
                        <IconButton aria-label="add to basket" onClick={() => (this.props.history.push("/poosh/myBasket"))}> <AddShoppingCartIcon /> </IconButton>
                    </CardActions>

                </View>

 
                <Box width="70%"  top={270} left={230}  position="absolute" display="flex" >
                    
                    

                    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    
                       {this.state.products.map(product => (

                        <Grid item xs sm md lg key={product.id}>
                        {/* {`/users/${product.id}`} */}
                        {/* <Link underline='none' component={RouterLink}to={{pathname: `/products/${product.id}`}}> */}
                        <Link underline='none' >
                            <Card  style={{backgroundColor: "oldlace ", height: "350px", width: "250px"}} cardObject={product.id} >
                            
                            <CardHeader
                                // title = {product.name}
                                // subheader={product.brand}
                                title = {<Typography style={{fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}> {product.name} </Typography>}
                                subheader = {<Typography style={{fontSize: "16px", fontFamily:'"Apple Color Emoji"'}}> {product.brand} </Typography>}
                            
                            />

                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="160px"
                                        width="300px"
                                        image= {product.url}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h6" component="h1" style={{fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}>
                                            {product.price + "€"} 
                                        </Typography>
                                        
                                    </CardContent> 
                                    

                                </CardActionArea>
                                <CardActions style={{justifyContent: 'center'}}>
                                    <IconButton aria-label="info" onClick = {() => console.log(product.id)}> <HorizontalSplitOutlinedIcon /> </IconButton>
                                    <IconButton aria-label="add to favorites" onClick = {() => this.deleteFromWishList(product.id)}> <ClearIcon /> </IconButton>
                                    {/* <IconButton aria-label="add to favorites" onClick = {() => console.log("kjh")}> <FavoriteIcon /> </IconButton> */}

                                    <IconButton aria-label="add to basket" onClick = {() => this.addToBasket(product.id)}> <ShoppingBasketIcon /> </IconButton>
                                    
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



export default withStyles(styles)(MyWishlist);

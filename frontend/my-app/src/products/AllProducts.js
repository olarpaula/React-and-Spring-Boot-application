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
import {Route, Link as RouterLink, useLocation } from 'react-router-dom'
import ProductDetails from "./ProductDetails";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ConnectableObservable } from "rxjs";
import { ContactlessOutlined } from "@material-ui/icons";

class AllProducts extends React.Component {

    constructor() {
        super()
        this.state = {
            products: [],
            id: null,

            user_id: null,
            product_id: null,

            sortBy: "recommended",
            showPriceOptions: false,

            productType: "/product/",
            showProductType: false,

            boxHeight: "200px"

        }
    }
 
    componentDidMount() {
        console.log(this.state.sortBy)
        console.log(this.state.productType)
        axiosInstance
            .get(  
                "/product/" + this.state.sortBy,
            )
            .then(res => {
                this.setState({
                    products: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });

    };

    addToWishList = (product_id) => {
        const val = localStorage.getItem("USER_ID");

        let dto = {
            user_id: val,
            product_id: product_id}

        console.log(dto);

        axiosInstance.post("/user/addProductToWishlist", dto)
            .then(
                res => {
                    const val = res.data;
                    console.log(val);        
            })
            .catch(error => {
                console.log(error)
            })
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


    

    setPriceSorting = (event) => {
        // console.log("event: " + event.target.value)

        this.state.sortBy = event.target.value
       
        console.log("stare: " + this.state.sortBy)
        console.log(this.state.productType)

        const type = this.state.productType
        console.log("type: " + type)


        axiosInstance
            .get(  
                type + this.state.sortBy,
            )
            .then(res => {
                this.setState({
                    products: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        
        
        
    }

    setProductTypes = event => {
        console.log("event: " + event.target.value)

        this.state.productType = event.target.value

        // "/product/" + this.state.sortBy + "/" + this.state.productType,

        const type = this.state.productType
        console.log("type: " + type)
        

        axiosInstance
            .get(  
                type + this.state.sortBy,
            )
            .then(res => {
                this.setState({
                    products: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
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

                    <CardActions style={{position:"relative", left:"700px", top:"-55px"}}>
                    <IconButton aria-label="add to favorites" onClick={() => (this.props.history.push("/poosh/MyWishlist"))}> <FavoriteIcon /> </IconButton>
                        <IconButton aria-label="add to basket" onClick={() => (this.props.history.push("/poosh/MyBasket"))}> <AddShoppingCartIcon /> </IconButton>
                    </CardActions>

                </View>

                <Box width="11%"  top={180} left={20}  position="absolute" display="flex" >
                    <Card  square elevation ={20} style={{backgroundColor: "oldlace ", height: this.state.box, width: "350px"}}  >
                        
                    <CardActions>
                            <IconButton> <SortIcon/> <Typography> Filters </Typography> </IconButton>                                    
                    </CardActions>
                    
                    {/* <CardActions style={{justifyContent: 'center'}}>
                         <IconButton aria-label="info" onClick={() => (this.props.history.push("/poosh/Supplements"))}> <Typography> Supplements </Typography>  </IconButton>
                    </CardActions>
            
                    <CardActions style={{justifyContent: 'center'}}>
                        <IconButton aria-label="add to favorites" onClick={() => (this.props.history.push("/poosh/Skincare"))}>  <Typography> Skincare </Typography> </IconButton>                                    
                    </CardActions> */}
            
                    <CardActions style={{justifyContent: 'center'}}>
                        <IconButton onClick={() => (this.setState ({showPriceOptions:!this.state.showPriceOptions}))}> <Typography> Price </Typography> </IconButton>     
                    </CardActions>   

                    {this.state.showPriceOptions === true? 
                    <>
                    {/* {this.state.boxHeight = "350px"} */}
                    <CardActions style={{justifyContent: 'center'}}>        

                        <RadioGroup defaultValue="recommended" onChange={(e) => {this.setState({sortBy:e.target.value}); this.setPriceSorting(e)}}>
                            {/* {console.log("aici " + this.state.sortBy)} */}
                            <FormControlLabel value="recommended" control={<Radio />} label="Recommended"/>
                            <FormControlLabel value="lowToHigh" control={<Radio />} label="Low to High"/>
                            <FormControlLabel  value="highToLow" control={<Radio />} label="High to Low"/>
                        </RadioGroup>    
                    </CardActions></>
                    : null }

                    <CardActions style={{justifyContent: 'center'}}>
                        <IconButton onClick={() => (this.setState ({showProductType:!this.state.showProductType}))}> <Typography> Type </Typography> </IconButton>     
                    </CardActions> 

                    {this.state.showProductType === true? 
                    <CardActions style={{justifyContent: 'center'}}>        

                        <RadioGroup defaultValue="/product/" onChange={(e) => this.setProductTypes(e)}>
                            <FormControlLabel value="/product/" control={<Radio />} label="All"/>
                            <FormControlLabel value="/skinproducts/" control={<Radio />} label="Skincare"/>
                            <FormControlLabel  value="/supplements/" control={<Radio />} label="Supplements"/>
                        </RadioGroup>    
                    </CardActions>
                    : null}

                        
                </Card>

                </Box>

 
                <Box width="70%"  top={270} left={230}  position="absolute" display="flex" >
                    
                    

                    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    
                       {this.state.products.map(product => (

                        <Grid item xs sm md lg key={product.id}>

                            <Card  square elevation ={20} style={{backgroundColor: "oldlace ", height: "350px", width: "250px"}} cardObject={product.id} >
                            
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

        
                                    <IconButton> <HorizontalSplitOutlinedIcon /> </IconButton>
                                                                        
                                    <IconButton aria-label="add to favorites" onClick = {() => this.addToWishList(product.id)}> <FavoriteIcon /> </IconButton>
                                    {/* <IconButton aria-label="add to favorites" onClick = {() => console.log("kjh")}> <FavoriteIcon /> </IconButton> */}

                                    <IconButton aria-label="add to basket" onClick = {() => this.addToBasket(product.id)}> <ShoppingBasketIcon /> </IconButton>
                                    
                                </CardActions>
                            </Card>
                        </Grid>

                       ))}
                       
                       </Grid>

                </Box>

                {/* {this.customizeBackground()} */}

                {/* {console.log("la sf " + this.state.sortBy)} */}

                
                

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



export default withStyles(styles)(AllProducts);

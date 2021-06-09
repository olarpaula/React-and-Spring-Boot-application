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
import PageDesign  from '../auxiliar/PageDesign';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SortIcon from '@material-ui/icons/Sort';
import PersonIcon from '@material-ui/icons/Person';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';



class Supplements extends React.Component {

    constructor() {
        super()
        this.state = {
            supplements: [],
            id: null
        }
    }
 
    componentDidMount() {
        axiosInstance
            .get(
                "/supplements",
            )
            .then(res => {
                this.setState({
                    supplements: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    };


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

                <Box width="10%"  top={180} left={20}  position="absolute" display="flex" >
                    <Card  style={{backgroundColor: "oldlace ", height: "180px", width: "250px"}}  >
                        
                    <CardActions>
                            <IconButton > <SortIcon/></IconButton>                                    
                        </CardActions>
                        <CardActions style={{justifyContent: 'center'}}>
                            <IconButton aria-label="add to favorites" onClick={() => (this.props.history.push("/poosh/AllProducts"))}>  <Typography> All </Typography> </IconButton>                                    
                        </CardActions>
                        <CardActions style={{justifyContent: 'center'}}>
                             <IconButton aria-label="info" onClick={() => (this.props.history.push("/poosh/SkinCare"))}> <Typography> Skincare </Typography>  </IconButton>
                        </CardActions>
                        
                </Card>
                </Box>

                <Box width="70%"  top={270} left={230}  position="absolute" display="flex" >
                    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    
                       {this.state.supplements.map(supplement => (

                        <Grid item xs sm md lg key={supplement.id}>
                        {/* {`/users/${product.id}`} */}
                        {/* <Link underline='none' component={RouterLink}to={{pathname: `/products/${product.id}`}}> */}
                        <Link underline='none' >
                            <Card  style={{backgroundColor: "oldlace ", height: "350px", width: "250px"}} cardObject={supplement.id} >
                            <CardHeader
                                title = {<Typography style={{fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}> {supplement.name} </Typography>}
                                subheader = {<Typography style={{fontSize: "16px", fontFamily:'"Apple Color Emoji"'}}> {supplement.brand} </Typography>}
                            />

                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="160px"
                                        width="300px"
                                        image= {supplement.url}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h1" style={{fontSize: "20px", fontFamily:'"Apple Color Emoji"'}}>
                                            {supplement.price + "€"} 
                                        </Typography>
                                        
                                    </CardContent> 
                                    

                                </CardActionArea>
                                <CardActions style={{justifyContent: 'center'}}>
                                    <IconButton aria-label="info" onClick = {() => console.log(supplement.id)}> <HorizontalSplitOutlinedIcon /> </IconButton>
                                    <IconButton aria-label="add to favorites" onClick = {() => console.log("favorite")}> <FavoriteIcon /> </IconButton>
                                    <IconButton aria-label="add to basket" onClick = {() => console.log("cos")}> <ShoppingBasketIcon /> </IconButton>
                                    
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
    }
});



export default withStyles(styles)(Supplements);

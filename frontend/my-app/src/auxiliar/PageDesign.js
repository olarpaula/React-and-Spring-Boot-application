import  React from "react"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextLoop from 'react-text-loop';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import HorizontalSplitOutlinedIcon from '@material-ui/icons/HorizontalSplitOutlined';
import {IconButton} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

class PageDesign extends React.Component {

    constructor() {
        super()
        this.state = {
        }
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

    loopInformation = () => {
        const bull = <span style={{display:'inline-block', margin:'0 2px', transform:'scale(0.8)'}} >•</span>;
        return (<> 
                <TextLoop>
                    <div>
                        {bull} Skin care is the range of practices that support skin integrity, enhance its appearance and relieve skin conditions. {bull} <br></br>
                        {bull} They can include nutrition, avoidance of excessive sun exposure and appropriate use of emollients. {bull}
                    </div><div>
                        {bull} Skin care is the range of practices that support skin integrity, enhance its appearance and relieve skin conditions. {bull} <br></br>
                        {bull} They can include nutrition, avoidance of excessive sun exposure and appropriate use of emollients. {bull}
                    </div>
                </TextLoop><br></br>
            </>
        );
    }


    render() {
        return (
            <React.Fragment>

                <View style = {styles.image}>
                    <CardActions style={{position:"relative", left:"1330px", top:"-10px"}}>
                        {/* <IconButton aria-label="info" onClick = {() => console.log("a")}> <PersonIcon /> </IconButton> */}
                        {/* <IconButton aria-label="info" onClick = {() => (this.props.history.push("/poosh/home"))}> <PersonIcon /> </IconButton> */}

                        {/* <IconButton aria-label="add to basket" onClick = {() => console.log("D")}> <DeviceHubIcon /> </IconButton> */}
                    </CardActions>
                </View>

                <View style = {styles.textDesign}>
                    <h4>POOSH YOUR LIFESTYLE</h4>
                </View>

                <View style = {styles.image3}></View>
                <View style = {styles.image2}></View>

                    
                    {/* <CardActions style={{justifyContent: "center"}}>
                        <IconButton aria-label="add to favorites" onClick = {() => console.log("b")}> <FavoriteIcon /> </IconButton>
                        <IconButton aria-label="add to basket" onClick = {() => console.log("c")}> <AddShoppingCartIcon /> </IconButton>
                    </CardActions> */}

                {this.customizeBackground()}
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
        height: "130%",
        width: "100%",
        position: "absolute",
    },
    textDesign: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto'
    },
        //'Sans-Serif'
    //     '-apple-system',
    //   'BlinkMacSystemFont',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    //},

    textInfo: {
        color: "lightslategrey",
        fontSize:12,
        textAlign: 'center',
        alignItems: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
});



export default withStyles(styles)(PageDesign);

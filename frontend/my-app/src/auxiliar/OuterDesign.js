import  React from "react"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextAnimation from "react-animate-text";

class OuterDesign extends React.Component {

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

    render() {
        return (
            <React.Fragment>

                <View style = {styles.image}>
                    
                </View>

                <View style = {styles.text}>
                    <h4><TextAnimation>POOSH YOUR LIFESTYLE</TextAnimation></h4>
                </View>

                <View style = {styles.image3}></View>
                <View style = {styles.image2}></View>


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
        height: "100%",
        width: "100%",
        position: "absolute",
    },
    text: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto'
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
    },

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



export default withStyles(styles)(OuterDesign);

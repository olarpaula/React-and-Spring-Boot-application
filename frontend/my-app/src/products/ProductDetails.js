import React from "react"
import { Button , TextField, Typography, NativeSelect} from "@material-ui/core";
import { render } from "react-dom";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextAnimation from 'react-animate-text';
import PageDesign  from '../auxiliar/PageDesign';


class ProductDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.match.params.id)
        this.state = {
            productName: null,
            productBrand: null,
            productIngredients: null,
            productUse: null,
            productBenefits: null,
            productPrice: null 

        }
    }
 
    handleInput = event => {
        const { value, name } = event.target;
        console.log(value);
        this.setState ({
            [name]:value
        })
    }

    componentDidMount() {
    
        const { match: { params } } = this.props;
        console.log(params)
            
    }

    handleSubmit = event => {
        event.preventDefault()
        let newProduct = {
            name: this.state.productName,
            brand: this.state.productBrand,
            ingredients: this.state.productIngredients,
            how_to_use: this.state.productUse,
            benefits: this.state.productBenefits,
            price: this.state.productPrice

        }
        axiosInstance.put("/skinproducts", newProduct)
            .then(res => {
                newProduct = res.data
                console.log(newProduct)
            })
            .catch(error => {
                console.log(error)
            });
        
            this.props.history.push("/poosh/administrator")

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

                {/* <PageDesign></PageDesign>

                {this.customizeBackground()}

                {this.showFormforAdding()} */}

                {/* <div>
                <h1>Product#{this.props.match.params.id}</h1>
                    </div>
                
                {console.log(this.props)}
                {console.log(this.props.match.params.id)}
                 */}
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
        height: 750,
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
        //chocolate
    },
});


export default withStyles(styles)(ProductDetails);


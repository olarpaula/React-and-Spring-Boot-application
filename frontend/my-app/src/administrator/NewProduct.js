import React from "react"
import { Button , TextField, Typography, NativeSelect} from "@material-ui/core";
import { render } from "react-dom";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextAnimation from 'react-animate-text';
import PageDesign  from '../auxiliar/PageDesign';


class NewProduct extends React.Component {

    constructor(props) {
        super(props)
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

    showFormforAdding = () => {
        return (<>
            <form style={{alignSelf:'flex-end', position: "absolute",left: 50,top: 160}} onSubmit={this.handleSubmit}>
                        <Typography variant="h6" color="textPrimary" component="h6"> Add New Product        
                </Typography><br></br>
                        <div>
                            <div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Product Name:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Name"
                                    name="productName"
                                    placeholder="Name"
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
                                    Product Brand:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Brand"
                                    name="productBrand"
                                    placeholder="Brand"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Product price:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Price"
                                    name="productPrice"
                                    placeholder="Price"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            <div>
                        </div>

                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Product Ingredients:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Ingredients"
                                    name="productIngredients"
                                    placeholder="Ingredients"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            <div>
                        </div>


                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    How to use:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="How to use"
                                    name="productUse"
                                    placeholder="How to use"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />

                            <div>
                        </div>
                                                                     
                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Product Benefits:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Benefits"
                                    name="productBenefits"
                                    placeholder="Benefits"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            <div>
                        </div>
                        <br></br>
    
                        <div id="buttons">
                            <Button
                                variant="contained"
                                id="create"
                                type="submit"
                            >
                                Add New Product
                </Button>
                        </div>
                        <br></br><br></br>
                    </form>
        </>
        )
    }

    render() {

        return (
            <React.Fragment>

                <PageDesign></PageDesign>

                {this.customizeBackground()}

                {this.showFormforAdding()}
                
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


export default withStyles(styles)(NewProduct);


import React from "react"
import { Button , TextField, Typography, NativeSelect} from "@material-ui/core";
import { render } from "react-dom";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import TextAnimation from 'react-animate-text';
import PageDesign  from '../auxiliar/PageDesign';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class NewSupplement extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            supplementBrand: null,
            supplementName: null,
            supplementDescription: null,
            supplementForm: "TABLET",
            supplementFlavour: 0 

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
        let newSupplement = {
            brand: this.state.supplementBrand,
            name: this.state.supplementName,
            price: this.state.supplementPrice,
            supplementForm: this.state.supplementForm,
            description: this.state.supplementDescription,
            supplementFlavour: this.state.supplementFlavour

        }
        axiosInstance.put("/supplements", newSupplement)
            .then(res => {
                newSupplement = res.data
                console.log(newSupplement)
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

    setForm = event => {
        this.setState({supplementForm:event.target.value})
    }

    showFormforAdding = () => {
        return (<>
            <form style={{alignSelf:'flex-end', position: "absolute",left: 50, top: 160}} onSubmit={this.handleSubmit}>
                        <Typography variant="h6" color="textPrimary" component="h6"> Add New Supplement         
                </Typography>
                        <div>
                            <div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                ><br></br>
                                    Supplement Name:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Name"
                                    name="supplementName"
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
                                    Supplement Brand:
                    </Typography>
                                <TextField
                                    required={true}
                                    id="required"
                                    label="Brand"
                                    name="supplementBrand"
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
                                    Supplement price:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Price"
                                    name="supplementPrice"
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
                                    Supplement Form:
                    </Typography>
                    <RadioGroup value={this.state.supplementForm} onChange={(e) => this.setForm(e)}>
                                <FormControlLabel value="TABLET" control={<Radio/>} label="Tablet"/>
                                <FormControlLabel value="POWDER" control={<Radio/>} label="Powder"/>
                                <FormControlLabel value="CAPSULE" control={<Radio/>} label="Capsule"/>
                                <FormControlLabel value="GUMMY" control={<Radio/>} label="Gummy"/>
                            </RadioGroup>
                            <div>
                        </div>


                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Supplement Flavour:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Flavour"
                                    name="supplementFlavour"
                                    placeholder="Flavour"
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
                                    Supplement Description:
                    </Typography>
                                 <TextField
                                    required={true}
                                    id="required"
                                    label="Description"
                                    name="supplementDescription"
                                    placeholder="Description"
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
                                Add New Supplement
                </Button><br></br><br></br>
                        </div>
                    </form>
        </>
        )
    }

    render() {
        return (
            <React.Fragment>

                <PageDesign></PageDesign>
                {this.customizeBackground()}

                <br></br>
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


export default withStyles(styles)(NewSupplement);
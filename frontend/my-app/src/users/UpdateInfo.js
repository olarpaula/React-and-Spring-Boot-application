import React from "react"
import { Button , TextField, Typography} from "@material-ui/core";
import axiosInstance from "../axios"
import {StyleSheet, View} from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import { first } from "rxjs/operators";
import PageDesign from '../auxiliar/PageDesign';
import {IconButton} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


class UpdateInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            firstName: null,
            lastName: null,
            password: null,
            
            id: null

        }
    }

    componentDidMount() {
        const idUser = localStorage.getItem("USER_ID");
        axiosInstance.get("/user/account-info?id=" + idUser)
            .then(res => {
                //console.log(res.data)
                this.setState({firstName: res.data.firstName})
                this.setState({lastName: res.data.lastName})
                this.setState({password: res.data.password})
                // console.log("aici" + this.state.firstName)
                // console.log("aici" + this.state.lastName)
                // console.log("aici" + this.state.password)

            })
            .catch(error => {
                console.log("id: " + idUser)
                console.log(error);
            });

    };
 
    handleInput = event => {
        const { value, name } = event.target;
        console.log(value);
        this.setState ({
            [name]:value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const data = localStorage.getItem("USER_ID");
        this.setState({id: data})

        // console.log("din submit" + this.state.firstName)
        // console.log("din submit" + this.state.lastName)
        // console.log("din submit" + this.state.password)

        let newInfo = {
            id: data,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }


        axiosInstance.put("/user/account-update", newInfo)
            .then(res => {
                console.log(res.data)
                this.props.history.push("/poosh/home")
            })
            .catch(error => {
                //this.setState({badCredentials: 1})
                console.log(error)
            });
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

    showFormforUpdating = () => {
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const password = this.state.password
        return (<>
            
            <form style={{alignSelf:'flex-end', position: "absolute",left: 120, top: 250}} onSubmit={this.handleSubmit}>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    First Name:
                    </Typography>
                                <TextField
                                    //required={true}
                                    //id="required"
                                    label= {firstName}
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                />
                           
                            <div></div>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Last Name:
                    </Typography>
                                <TextField
                                    //required={true}
                                    //id="required"
                                    label= {lastName}
                                    name="lastName"
                                    placeholder= "Last Name"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                />
                            <div>
                        </div>

                        <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="h2"
                                >
                                    Password:
                    </Typography>
                                 <TextField
                                    //required={true}
                                    //id="required"
                                    type="password"
                                    label="***"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.handleInput}
                                    margin="normal"
                                    variant="outlined"
                                />
                            <div>
                        </div><br></br>

                        <div id="buttons">
                            <View style={styles.saveBtn}>
                            <Button
                                variant="contained"
                                id="create"
                                type="submit"
                            >
                                Save
                </Button></View>
                <br></br><br></br>
                        </div>
                    </form>    
            </>
        
        )
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
                
                {this.showFormforUpdating()}

                {/* {this.state.badCredentials === 1 ? <View style = {styles.badCredentials}><>Bad Credentials!</></View> : null} */}


            </React.Fragment>
            
        )
    }

}

const styles = StyleSheet.create({
    
    text: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textShadow: 'black',
        alignItems: 'center',
        //chocolate
    },
    saveBtn: {
        alignSelf: "flex-end",
        position: "absolute",
        left: 260,
        bottom: 10,
    },
    badCredentials: {
        color: "lightslategrey",
        fontSize:20,
        textAlign: 'center',
        textShadow: 'black',
        alignItems: 'center',
        botom: '20'
        //chocolate
    },
});


export default withStyles(styles)(UpdateInfo);




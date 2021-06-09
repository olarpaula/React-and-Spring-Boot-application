import React from "react"
import { Avatar, Button, List, ListItemIcon, ListItem, ListItemText, Typography, TextField } from '@material-ui/core';
import axiosInstance from "./axios";

class First extends React.Component {

    constructor() {
        super();
        this.state = {
            cars: [],
            owner: {
                id: 0,
                name: "Nume_0"
            },
            idOwner: 0,
            idCar: 0
        }
    }

    componentDidMount() {
        axiosInstance.get("/car")
            .then(res => {
                const val = res.data;
                this.setState({
                    cars: val
                });
                console.log(val);
                console.log(this.state.cars);
            }
            )
            .catch(error => {
                console.log(error);
            })


        axiosInstance.get("/owner/" + this.state.owner.name)
            .then(res => {
                const val = res.data;
                this.setState({
                    owner: val
                });
                console.log(val);
                console.log(this.state.owner);
            }
            )
            .catch(error => {
                console.log(error);
            })
    }

    handleInput = event => {
        const { value, name } = event.target;
        console.log(value);
        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        let ownerCar = {
            carID: this.state.idCar,
            ownerID: this.state.idOwner
        }
        axiosInstance.put("/owner", ownerCar)
            .then(res => {
                console.log(res.data);
                ownerCar = res.data;
                console.log(res.data);
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <React.Fragment>
                <Button color="primary">Hello World</Button>

                <List>
                    {this.state.cars.map(car => (
                        <ListItem>
                            <ListItemIcon>
                                <Avatar>{"CAR"}</Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={car.id + "  " + car.maker}
                                secondary={"Componnets: " + car.components.map(comp => comp.type + "  ")} />
                        </ListItem>

                    ))}
                </List>

                <form onSubmit={this.handleSubmit}>
                    <Typography variant="h6" color="textPrimary" component="h6">
                        ADD CAR TO OWNER
            </Typography>
                    <div>
                        <div>
                            <Typography
                                variant="subtitle2"
                                color="textPrimary"
                                component="h2"
                            >
                                Owner ID:
                </Typography>
                            <TextField
                                required={true}
                                id="required"
                                label="Owner ID"
                                name="idOwner"
                                placeholder="Owner"
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
                                Car ID:
                </Typography>
                            <TextField
                                required={true}
                                id="required"
                                label="Car ID"
                                name="idCar"
                                placeholder="Car"
                                onChange={this.handleInput}
                                margin="normal"
                                variant="outlined"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div id="buttons">
                        <Button
                            variant="contained"
                            color="primary"
                            id="create"
                            type="submit"
                        >
                            Update Cars
              </Button>
                    </div>
                </form>


                <p> Un owner din lista {this.state.owner.id} si {this.state.owner.name} </p>
            </React.Fragment>
        )
    }




}

export default First;
import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { userContext } from './UserContext';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function HomePage() {
    const history = useHistory();
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const user = useContext(userContext);
    const [allTravels, setAllTravels] = useState([]);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        axios.get(`https://localhost:44351/api/travels/GetAllTravels`)
            .then((data) => {
                console.log(data.data);
                setAllTravels(data.data);
            })
    }, {});

    function handleClick() {
        history.push("/ShowDetailsTravel");
    }

    return (
        <div>
            <div>
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        {allTravels.map((travel, index) => (
                            <div>
                                <ListItem
                                    button
                                    selected={selectedIndex === 0}
                                    onClick={(event) => {
                                        handleListItemClick(event, 0)
                                        handleClick(travel);
                                    }
                                    }
                                >
                                    <ListItemIcon>
                                        <AddCircleOutlineOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="  " />
                                    <p>
                                        {travel.traveStartLocation}  -  {travel.travelDestinationLocation} <br />
                                        {travel.detailsOfTheApplication}
                                    </p>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

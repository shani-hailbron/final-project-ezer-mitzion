import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { userContext } from './UserContext';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function MyTravels() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const user = useContext(userContext);
    const [currentTravels, setCurrentTravels] = useState([]);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        axios.get(`https://localhost:44351/api/travels/GetTravelsByPerformingId/${user.userId}`)
            .then((data) => {
                console.log(data.data);
                setCurrentTravels(data.data);
            })
    }, {});


    return (
        <div>
            {/* MyTravels */}
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {currentTravels.map((travel) => (
                        <div>
                            <ListItem
                                button
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                    <EmojiPeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="   " />
                                <p>תאריך: {travel.travelPerformingDate} <br />
                                    {travel.traveStartLocation}  -  {travel.travelDestinationLocation}
                                </p>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </div>
        </div>
    );
}

export default MyTravels;
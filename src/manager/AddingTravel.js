import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../App.css';
import axios from 'axios';
import { userContext } from '../users/UserContext';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function AddingUser() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('');
  const user = useContext(userContext)

  const handleChange = (event) => {
    setRole(event.target.value);
  };


  const changedDetails = (event) => {
    event.preventDefault();
    console.log(event.target.askerName.value + "   " + event.target.phoneNumber.value + "    " + event.target.ask.value);
    debugger
    if (event.target.askerName.value != '' && event.target.phoneNumber.value != '' && event.target.ask.value != ''
      && event.target.startLocation.value != '' && event.target.destinationLocation.value != '') {
      console.log(user.userId);
      const newT = {
        AskerName: event.target.askerName.value,
        AskerPhonNumber: event.target.phoneNumber.value,
        DetailsOfTheApplication: event.target.ask.value,
        TraveStartLocation: event.target.startLocation.value,
        TravelDestinationLocation: event.target.destinationLocation.value,
        TravelIdCreator: user.userId,
      }

      axios.post("https://localhost:44351/api/travels/AddTravel/", newT)
        .then(data => {
        });

      event.target.askerName.value = '';
      event.target.phoneNumber.value = '';
      event.target.ask.value = '';
      event.target.startLocation.value = '';
      event.target.destinationLocation.value = '';
    }
    else {
      alert('עליך למלא את כל השדות')
    }
  }

  return (
    <div className="details" >
      <form className={classes.root} autoComplete="off" className="formEnter" onSubmit={changedDetails}>
        <TextField id="standard-secondary" type="text" label="שם" color="secondary" name="askerName" required="required" />
        <TextField id="standard-secondary" type="tel" label="טלפון" color="secondary" name="phoneNumber" required="required" pattern="^\+?[0-9]{3}-?[0-9]{6,12}$/" />
        <TextField id="standard-secondary" type="text" label="תיאור" color="secondary" name="ask" required="required" />
        <TextField id="standard-secondary" type="text" label="תחנת מוצא" color="secondary" name="startLocation" required="required" />
        <TextField id="standard-secondary" type="text" label="תחנת יעד" color="secondary" name="destinationLocation" required="required" />
        <br />
        <Button variant="outlined" color="secondary" type="submit"> הוסף  </Button>
      </form>
    </div>

  );
}
export default AddingUser;



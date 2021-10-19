import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import '../App.css';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function AddingUser() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const changedDetails = (event) => {
    event.preventDefault();
    if (event.target.userName.value != '' && event.target.password.value != '' && event.target.first.value != '' && event.target.last.value != '' && (event.target.role.value != '')) {
      const newU = {
        idAndUserName: event.target.userName.value,
        phonNumberAndPassword: event.target.password.value,
        firstName: event.target.first.value,
        lastName: event.target.last.value,
        carNumber: null,
        email: null,
        userRole: event.target.role.value,
        userCity: null,
        userStreet: null,
      }
      axios.post("https://localhost:44351/api/values/AddUser/", newU)
        .then(data => {
        });
      axios.get("https://localhost:44351/api/values/GetAllUsers")
        .then((data) => {
          console.log(data.data);
        }, []);

      event.target.userName.value = '';
      event.target.password.value = '';
      event.target.first.value = '';
      event.target.last.value = '';
    }
  }

  return (
    <div className="details" >
      <form className={classes.root} autoComplete="off" className="formEnter" onSubmit={changedDetails}>
        <TextField id="standard-secondary" label="ת.ז. - שם משתמש" color="secondary" name="userName" />
        <TextField id="standard-secondary" label="סיסמה - טלפון" color="secondary" name="password" />
        <TextField id="standard-secondary" label=" שם פרטי" color="secondary" name="first" pattern="[A-Za-z ]{2,}" />
        <TextField id="standard-secondary" label=" שם משפחה" color="secondary" name="last" />
        <FormControl className={classes.formControl} color="secondary">
          <InputLabel id="demo-simple-select-helper-label">תפקיד</InputLabel>
          <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={role} name="role" onChange={handleChange}>
            <MenuItem value={1}>מנהל</MenuItem>
            <MenuItem value={2}>מתנדב</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant="outlined" color="secondary" type="submit"> הוסף  </Button>
      </form>
    </div>

  );
}

export default AddingUser;
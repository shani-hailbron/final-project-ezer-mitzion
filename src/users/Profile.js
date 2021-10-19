import React, { useState, useEffect, useContext, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import './style.css';
import axios from 'axios';
import { userContext } from './UserContext';
import CurrentUserContext from './UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
  },
}));

function Profile(props) {
  const classes = useStyles();
  const user = useContext(userContext)
  const [changedUser, setChangedUser] = useState(user);
  const [name, setName] = useState(user.firstName);
  const [state, dispatch] = useReducer(CurrentUserContext.reduser, user);

  const changedDetails = (event) => {
    event.preventDefault();
    console.log(event.target.first.value);
    if (event.target.first.value != '' && event.target.last.value != '' && event.target.city.value != '' && event.target.street.value != '') {
      const newU = user;
      newU.firstName = event.target.first.value;
      newU.lastName = event.target.last.value;
      newU.carNumber = event.target.carNum.value;
      newU.email = event.target.mail.value;
      newU.userCity = event.target.city.value;
      newU.userStreet = event.target.street.value;
      let id = changedUser.userId;
      console.log(user)

      axios.put(`https://localhost:44351/api/values/UpdateUser/${id}`, newU)
        .then(data => {
          setChangedUser({ ...newU });
          setName(changedUser.firstName);
          console.log(user)

        });

      axios.get("https://localhost:44351/api/values/GetAllUsers")
        .then((data) => {
          console.log(data.data);
        }, []);
    }
  }

  return (
    <userContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="profil-details">
        <form className={classes.root} autoComplete="off" className="formEnter" onSubmit={changedDetails}>
          <TextField id="standard-secondary" label="ת.ז. - שם משתמש" color="secondary" value={changedUser.idAndUserName} disabled />
          <TextField id="standard-secondary" label="סיסמה" color="secondary" value={changedUser.phonNumberAndPassword} disabled />
          <TextField id="standard-secondary" label=" שם פרטי" color="secondary" name="first" defaultValue={changedUser.firstName} />
          <TextField id="standard-secondary" label=" שם משפחה" color="secondary" name="last" defaultValue={changedUser.lastName} />
          <TextField id="standard-secondary" label=" מספר רכב" color="secondary" name="carNum" defaultValue={changedUser.carNumber} />
          <TextField id="standard-secondary" label="מייל" color="secondary" name="mail" defaultValue={changedUser.email} />
          <TextField id="standard-secondary" label=" תפקיד" color="secondary" value={changedUser.userRole} disabled />
          <br />
          <lable>כתובת:</lable>
          <TextField id="standard-secondary" label="עיר" color="secondary" name="city" defaultValue={changedUser.userCity} />
          <TextField id="standard-secondary" label=" רחוב " color="secondary" name="street" defaultValue={changedUser.userStreet} /><br />
          <Button variant="outlined" color="secondary" type="submit" > שמור  </Button>
        </form>
      </div>
    </userContext.Provider>)
}

export default Profile;
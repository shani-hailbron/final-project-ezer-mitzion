import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Main from './Main';
import CurrentUserContext from './UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SingUp() {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showMain, setShowMain] = useState(JSON.parse(localStorage.getItem('currentUser')) != null);
  const [userId, setUserId] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const checkDetailsUser = (event) => {
    event.preventDefault();
    console.log(userName);
    console.log()

    if (userName === '' || password === '') {
      alert('הכנס שם משתמש וסיסמה');
    }
    else {
      axios.get(`https://localhost:44351/api/values/GetIdByUserNameAndPasswordAsync/${userName}/${password}`)
        .then((data) => {
          setUserId(data.data);
          console.log(data.data);
          if (data.data !== '') {

            setShowMain(true);
          }
          else
            alert('הנתונים שהוזנו שגויים');
        }, []);
    }
    setUserName('');
    setPassword('');
  }

  return (
    <div>
      {!showMain ?
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
        //! לשים את הלוגו של עזר מציון

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form} noValidate onSubmit={checkDetailsUser}>
              <TextField variant="outlined" margin="normal" fullWidth id="email" label="שם משתמש" name="email" autoComplete="email" autoFocus value={userName} onChange={e => setUserName(e.target.value)} required />
              <TextField variant="outlined" margin="normal" fullWidth name="password" label="סיסמה" type="password" id="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                Sign In
              </Button>
            </form>
          </div>
        </Container> :
        <CurrentUserContext id={userId} >
          <Router>
            <Switch>
              <Route path="/" component="Main">
                <Main id={userId} />
              </Route>
            </Switch>
          </Router>
        </CurrentUserContext>}
    </div>
  );
}

export default SingUp;
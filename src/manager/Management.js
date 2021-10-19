import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddingTravel from './AddingTravel';
import AddingUser from './AddingUser';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Management() {
  const classes = useStyles();

  return (
    <div>
     
      {/* פה יהיה כל ההגדרות של המנהל */}
     
      <Router>
        <div className={classes.root}>
          <Link to="/AddingTravel"> <Button>הוספת נסיעה</Button></Link>
          <Link to="/AddingUser"> <Button>הוספת משתמש</Button></Link>
        </div>
        <Switch>
          <Route path="/AddingTravel" exact >
            <AddingTravel />
          </Route>
          <Route path="/AddingUser" exact >
            <AddingUser />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default Management;
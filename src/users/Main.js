import React, { useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import MyTravels from './MyTravels';
import Profile from './Profile';
import HomePage from './HomePage';
import './style.css';
import { userContext } from './UserContext';
import AddingUser from './AddingUser';
import AddingTravel from './AddingTravel';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalCarWashOutlinedIcon from '@material-ui/icons/LocalCarWashOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';

import { Switch, Route, Link, BrowserRouter, Redirect } from 'react-router-dom';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },
  },

}));



function Main(props) {
  const history = useHistory();
  const user = useContext(userContext);
  const handleCallToRouter = (value) => { history.push(value) }
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleCallToRouter = (value) => { history.push(value) }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <span>ברוכים הבאים ל{user.firstName}</span>
      <BrowserRouter>
        <div >
          <Route
            path="/"
            render={({ location }) => (
              <>
                <Tabs value={location.pathname}>
                  <Tab title="דף הבית" icon={<EmojiTransportationIcon />} value="/" component={Link} to='/' />
                  <Tab icon={<LocalCarWashOutlinedIcon />} value="/myTravels" component={Link} to='/myTravels' />
                  <Tab icon={<PermIdentityOutlinedIcon />} value="/profil" component={Link} to='/profil' />
                  <Tab icon={<AddLocationOutlinedIcon />} value="/addNewTravel" component={Link} to='/addNewTravel' />
                  <Tab icon={<GroupAddOutlinedIcon />} value="/addNewUser" component={Link} to='/addNewUser' />

                </Tabs>

                <Switch>
                  <Route path='/myTravels' render={() => <div> <MyTravels /></div>} />
                  <Route path='/addNewTravel' render={() => <div> <AddingTravel /></div>} />
                  <Route path='/profil' render={() => <div><Profile /></div>} />
                  <Route path='/addNewUser' render={() => <div><AddingUser /></div>} />
                  <Route path='/' render={() => <div>  <HomePage /></div>} />
                </Switch>
              </>
            )}
          />
        </div>
      </BrowserRouter>
    </div>

  );
}

export default withRouter(Main);



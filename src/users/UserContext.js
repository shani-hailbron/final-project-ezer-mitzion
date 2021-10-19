
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const userContext = createContext({});

export default function CurrentUserContext(props) {
  const user = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : {};
  console.log(user + 'user');
  const [currentUser, setCurrentUser] = useState(user);

  const reduser = (state, action) => {
    localStorage.setItem('currentUser', JSON.stringify(action));
    setCurrentUser(action)
    return {
      ...state,
    };

  }

  useEffect(() => {
    axios.get(`https://localhost:44351/api/values/GetUserById/${props.id}`)
      .then((data) => {
        console.log(data.data);
        setCurrentUser(data.data);
        localStorage.setItem('currentUser', JSON.stringify(data.data));
      })
  }, {});


  return (
    <userContext.Provider value={currentUser}>
      {props.children}
    </userContext.Provider>
  );
}


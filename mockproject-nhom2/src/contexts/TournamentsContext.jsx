import React, { createContext, useState } from 'react';
import { realtimeDB } from '../firebase/firebaseConfig';

export const TournamentsContext = createContext();

const TournamentsContextProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState(null);
  const [players, setPlayers] = useState(null);
  const [match, setMatch] = useState(null);
  const [users, setUser] = useState(null);

  // gọi dữ liệu về và set các bảng dữ liệu vào các state tương ứng
  const getUser = () => {
    realtimeDB.ref('users').on('value', (snapshot) => {
      const state = snapshot.val();
      setUser(state);
    });
  };
  const getTournaments = () => {
    realtimeDB.ref('tournaments').on('value', (snapshot) => {
      const state = snapshot.val();
      setTournaments(state);
    });
  };
  const getPlayers = () => {
    realtimeDB.ref('players').on('value', (snapshot) => {
      const state = snapshot.val();
      setPlayers(state);
    });
  };
  const getMatch = () => {
    realtimeDB.ref('match').on('value', (snapshot) => {
      const state = snapshot.val();
      setMatch(state);
    });
  };

  // add || update dữ liệu vào 1 bảng
  const writeDataTable = (data, table_name) => {
    realtimeDB.ref(table_name).set(data);
  };

  const TournamentsContextData = {
    getUser,
    getTournaments,
    getPlayers,
    getMatch,
    writeDataTable,
    setUser,
    setTournaments,
    setPlayers,
    setMatch,
    tournaments,
    players,
    match,
    users,
  };

  return (
    <TournamentsContext.Provider value={TournamentsContextData}>
      {children}
    </TournamentsContext.Provider>
  );
};

export default TournamentsContextProvider;
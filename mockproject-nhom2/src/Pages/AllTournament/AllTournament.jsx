import React, { useContext, useEffect, useRef } from 'react';
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import TournamentThumb from '../../Component/TournamentThumb/TournamentThumb'
import { TournamentsContext } from '../../contexts/TournamentsContext';
import LazyLoad from 'react-lazyload'


import './AllTournament.css'
const AllTournament = () => {
    const { tournaments, getTournaments} = useContext(TournamentsContext);
    const Loading = () => (
        <div className="post-loading">
          <h5>Loading...</h5>
        </div>
      )
    let showListTournaments = tournaments?.map(item => {
        return (
            <LazyLoad key={item.id}>
                <TournamentThumb
                    id={item.id}
                    tournamentName={item.name}
                    playersCount={item.player_count}
                    createDate={item.created_at}
                    gameName={item.game_name}
                />
            </LazyLoad>

        )
    })

    useEffect(() => {
        getTournaments();
    }, []);
    return (
        <div>
            <Header />
            <div className="container-fluid  all-tournaments-list p-5">
                <div className="container">
                    <div className="row">
                        {showListTournaments}
                        {/* {tournaments?.map(item => (
                            <LazyLoad key={item.id} placeholder={<Loading/>} height={200} offset={100} >
                                <TournamentThumb 
                                    key={item.id} 
                                    tournamentName={item.name}
                                    playersCount={item.player_count}
                                    createDate={item.created_at}
                                    gameName={item.game_name} 
                                />
                            </LazyLoad>
                        ))} */}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AllTournament
import {IActivity} from "../models/Activity";

﻿﻿import React, {useState,useEffect, Fragment} from 'react';
import {Container, Header, Icon, List} from 'semantic-ui-react';
import axios from 'axios';
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";


const App = () => {
    
    //first argument is the state, second argument is the function call to set the state
    //initial state is an empty array
    const [activities, setActivities] = useState<IActivity[]>([])

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities').then(r =>
            {
                setActivities(r.data)
                //empty second param makes sure we only get the activities once
            })},[]);
    
        return (
            <Fragment>
               <NavBar/>
                <Container style={{ marginTop: '7em' }}>
                    <ActivityDashboard activities={activities}/>
                </Container>
            </Fragment>
        );
    };
    

export default App;

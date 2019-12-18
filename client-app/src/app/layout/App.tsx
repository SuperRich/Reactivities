import {IActivity} from "../models/Activity";

﻿﻿import React, {useState,useEffect} from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';


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
            <div>
                <Header as='h2'>
                    <Icon name='users' />
                    <Header.Content>Reactivities</Header.Content>
                </Header>
                <List>
                    {activities.map((activity) => (
                        <List.Item key={activity.id}>{activity.title}</List.Item>
                    ))}
                </List>
            </div>
        );
    }
    

export default App;

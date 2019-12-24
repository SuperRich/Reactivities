import { IActivity } from '../models/activity';
﻿﻿import React, {useState,useEffect, Fragment} from 'react';
import {Container} from 'semantic-ui-react';
import axios from 'axios';
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";


const App = () => {
    
    //first argument is the state, second argument is the function call to set the state
    //initial state is an empty array
    const [activities, setActivities] = useState<IActivity[]>([]);
    
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

    const [editMode, setEditMode] = useState(false);
    
    const handleSelectedActivity = (id:string) => {
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
        setEditMode(false)
    };
    
    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false)
    };

    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter(a => a.id !==activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false)
    };

    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(a => a.id !== id)])
    };
    
    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities').then(r =>
            {
                let activities: IActivity[] = [];
                r.data.forEach(activity => {
                    activity.date = activity.date.split('.')[0]
                    activities.push(activity);
                })
                setActivities(activities);
                //empty second param makes sure we only get the activities once
            })},[]);
    
        return (
            <Fragment>
               <NavBar openCreateForm={handleOpenCreateForm}/>
                <Container style={{ marginTop: '7em' }}>
                    <ActivityDashboard activities={activities} 
                                       selectActivity={handleSelectedActivity}
                                       selectedActivity={selectedActivity}
                                       editMode={editMode}
                                       setEditMode={setEditMode}
                                       setSelectedActivity={setSelectedActivity}
                                       createActivity={handleCreateActivity}
                                       editActivity={handleEditActivity}
                                       deleteActivity={handleDeleteActivity}
                    />
                </Container>
            </Fragment>
        );
    };
    

export default App;

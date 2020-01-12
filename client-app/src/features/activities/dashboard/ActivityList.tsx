import React, {SyntheticEvent} from 'react';
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {IActivity} from "../../../app/models/Activity";
//import {IActivity} from "../../../app/models/Activity";

interface IProps {
    activities: IActivity[];
    selectActivity: (id:string) => void;
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement> ,id: string) => void;
    submitting: boolean;
    target: string;
}

const ActivityList : React.FC<IProps> = 
       ({activities, 
         selectActivity, 
         deleteActivity, 
         submitting, 
            target
    }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} 
                                        floated={"right"} 
                                        content={"view"} 
                                        color={"blue"}
                                />
                                <Button name={activity.id} 
                                        loading={target === activity.id && submitting} 
                                        onClick={(e) => deleteActivity(e,activity.id)} 
                                        floated={"right"} 
                                        content={"delete"} 
                                        color={"red"}
                                />
                                <Label basic content={'Category'} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
                
            </Item.Group>
        </Segment>
    );
};



export default ActivityList;
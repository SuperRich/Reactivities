import React from 'react';
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {IActivity} from "../../../app/models/Activity";

interface IProps {
    activities: IActivity[]
}

const ActivityList : React.FC<IProps> = ({activities}) => {
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
                                <Button floated={"right"} content={"view"} color={"blue"}/>
                                <Label basic content={'Category'} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
               
                <Item>
                    <Item.Content>
                        <Item.Header as='a'>Title</Item.Header>
                        <Item.Meta>Date</Item.Meta>
                        <Item.Description>
                            <div>Description</div>
                            <div>City, venue</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated={"right"} content={"view"} color={"blue"}/>
                            <Label basic content={'Category'} />
                        </Item.Extra>
                    </Item.Content>
                </Item>

            </Item.Group>
        </Segment>
    );
};



export default ActivityList;
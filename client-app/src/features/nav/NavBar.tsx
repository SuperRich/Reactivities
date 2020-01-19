﻿import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";


const NavBar:React.FC = () =>{
    return (
        <Menu fixed={"top"} inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to= '/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} exact to= '/activities'
                    name='Activities'
                />
                <Menu.Item>
                    <Button as ={NavLink} to= '/createActivity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
};

export default observer(NavBar);


//rscp react snippet command
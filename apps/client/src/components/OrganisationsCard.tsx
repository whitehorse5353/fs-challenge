import {Avatar, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader} from "@mui/material";
import React from "react";

export interface Organisation {
    login: string;
    description: string;
    url: string;
    avatar_url: string;
}
interface OrganisationProps {
    orgData: Organisation[]
}

const OrganisationsCard: React.FC<OrganisationProps> = ({orgData}) => {
    return <><CardContent>
        <List subheader={
            <ListSubheader component="div" style={{textAlign: 'left'}}>
                Organisations
            </ListSubheader>
        }>
            {orgData && orgData.map(org => {
                return <div key={org.login}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar aria-label="recipe" alt={org.login} src={org.avatar_url}/>
                        </ListItemAvatar>
                        <ListItemText><b>{org.login}</b> {`${org.login && org.description ? `-` : ''}`} {org.description}</ListItemText>
                    </ListItem>
                    <Divider/>
                </div>
            })}</List>
    </CardContent></>
}

export default OrganisationsCard;
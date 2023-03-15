import {Avatar, CardHeader, Divider} from "@mui/material";
import React from "react";

export interface User {
    name: string;
    company: string;
    location: string;
    email: string;
    avatar_url: string;
    id: number;
}
interface ProfileData {
    profileData: User
}

const UserCard: React.FC<ProfileData>= ({profileData}) => {
    return (<>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" alt={profileData?.name} src={profileData?.avatar_url}/>
            }
            title={profileData?.name}
            style={{textAlign: 'left'}}
            subheader={`${profileData?.company ? profileData?.company : ''} ${profileData?.company && profileData?.location ? `-` : ''} ${profileData?.location ? profileData?.location : ''}`}
        />
        <Divider/>
    </>)
}

export default UserCard;
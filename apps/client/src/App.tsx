import { useState} from 'react'
import { Typography, Box, Button, AppBar, Toolbar, Input, Card, CardHeader, Avatar, CardContent, CircularProgress, List, ListItem, Divider, ListItemText, ListItemAvatar, ListSubheader, Link} from '@mui/material'
import './App.css'

interface User {
    name: string;
    company: string;
    location: string;
    email: string;
    avatar_url: string;
    id: number;
}

 interface Organisation {
    login: string;
    description: string;
    url: string;
    avatar_url: string;
}

interface Gists {
    id: number;
    files: Files[];
    html_url: string;
}

interface Files {
    filename: string;
    language: string | null;
    type: string;
    raw_url: string;
    size: number;
}

function App() {
  const [profileTitle, setProfileTitle] = useState<string>();
  const [isOrgLoading, setIsOrgLoading] = useState<boolean>();
  const [isGistsLoading, setIsGistsLoading] = useState<boolean>();
  const [profileData, setProfileData] = useState<User | undefined>();
  const [orgData, setOrgData] = useState<Organisation[] | undefined>();
  const [gistsData, setGistsData] = useState<Gists[] | undefined>();
    const fetchUserData = async () => {
        if (profileTitle && profileTitle !== '') {
            const user = await fetch(`api/vcs/user/${profileTitle}`);
            const userData: User = await user.json();
            setProfileData(userData);

            setIsOrgLoading(true);
            const organisation = await fetch(`api/vcs/user/${profileTitle}/orgs`);
            const organisationData: Organisation[] = await organisation.json();
            setOrgData(organisationData);
            setIsOrgLoading(false);
            console.log(organisationData)
            setIsGistsLoading(true);
            const gists = await fetch(`api/vcs/user/${profileTitle}/gists`);
            const gistsData: Gists[] = await gists.json();
            setGistsData(gistsData);
            setIsGistsLoading(false);

            // console.log(gistsData)
        }
    }

    return (<>
            <Box sx={{my: 4}}>
                <AppBar sx={{backgroundColor: '#333'}}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Github profile app
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" sx={{marginLeft: 20}}>
                            <Input sx={{color: 'white',}} type="search" placeholder="search"
                                   onChange={(evt) => setProfileTitle(evt.target.value)}></Input>
                            <Button sx={{ml: 5, color: 'white', border: 'solid 1px white'}} variant="outlined"
                                    onClick={async () => await fetchUserData()}>Submit</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                {profileData &&
                    <div style={{ display:'flex', justifyContent:'center' }}><Card sx={{maxWidth: 345}}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" alt={profileData?.name} src={profileData?.avatar_url}/>
                            }
                            title={profileData?.name}
                            style={{textAlign: 'left'}}
                            subheader={`${profileData?.company ? profileData?.company : ''} ${profileData?.company && profileData?.location ? `-` : ''} ${profileData?.location ? profileData?.location : ''}`}
                        />
                        <Divider/>
                        {!isOrgLoading ? (orgData && orgData.length) ?
                            <CardContent>
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
                            </CardContent> : ''
                            : <CircularProgress color="inherit"/>}
                        {!isGistsLoading ? (gistsData && gistsData.length) ?
                            <CardContent>
                                <List subheader={
                                    <ListSubheader component="div" style={{textAlign: 'left'}}>
                                        Gists
                                    </ListSubheader>
                                }>
                                {gistsData && gistsData.map(gist => {
                                    return <div key={gist.id}><ListItem>
                                        <Link href={gist.html_url} underline="none" target="_blank">{gist.id}</Link>
                                    </ListItem>
                                        <Divider/>
                                    </div>
                                })}
                                </List>
                            </CardContent> : ''
                            : <CircularProgress color="inherit"/>}
                    </Card></div>}

            </Box>
        </>
    )
}

export default App;

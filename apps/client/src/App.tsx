import { useState} from 'react'
import {  Box, Card, CircularProgress } from '@mui/material'
import './App.css'
import SearchWrapper from './components/SearchWrapper';
import UserCard, {User} from './components/UserCard';
import OrganisationsCard, {Organisation} from './components/OrganisationsCard';
import GistsCard, {Gists} from './components/GistsCard';

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
                <SearchWrapper setProfileTitle={setProfileTitle} fetchUserData={fetchUserData}/>
                {profileData &&
                    <div style={{ display:'flex', justifyContent:'center' }}><Card sx={{maxWidth: 345}}>
                        <UserCard profileData={profileData} />
                        {!isOrgLoading ? (orgData && orgData.length) ?
                            <OrganisationsCard orgData={orgData} /> : ''
                            : <CircularProgress color="inherit"/>}
                        {!isGistsLoading ? (gistsData && gistsData.length) ?
                            <GistsCard gistsData={gistsData} /> : ''
                            : <CircularProgress color="inherit"/>}
                    </Card></div>}

            </Box>
        </>
    )
}

export default App;

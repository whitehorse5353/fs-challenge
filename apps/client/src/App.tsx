import { useState} from 'react'
import {  Box, Card, CircularProgress } from '@mui/material'
import './App.css'
import SearchWrapper from './components/SearchWrapper';
import UserCard, {User} from './components/UserCard';
import OrganisationsCard, {Organisation} from './components/OrganisationsCard';
import GistsCard, {Gists} from './components/GistsCard';

function App() {
  const [profileTitle, setProfileTitle] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<User | undefined>();
  const [orgData, setOrgData] = useState<Organisation[] | undefined>();
  const [gistsData, setGistsData] = useState<Gists[] | undefined>();

    const fetchData = async () => {
        if (profileTitle && profileTitle !== '') {
            setIsLoading(true);
            const user = await fetch(`api/vcs/user/${profileTitle}`);
            const userData: User = await user.json();
            setProfileData(userData);
            setIsLoading(false);

            const organisation = await fetch(`api/vcs/user/${profileTitle}/orgs`);
            const organisationData: Organisation[] = await organisation.json();
            setOrgData(organisationData);

            const gists = await fetch(`api/vcs/user/${profileTitle}/gists`);
            const gistsData: Gists[] = await gists.json();
            setGistsData(gistsData);
        }
    }

    return (<>
            <Box sx={{my: 4}}>
                <SearchWrapper setProfileTitle={setProfileTitle} fetchData={fetchData}/>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Card sx={{maxWidth: 345}}>
                        {!isLoading ? <>
                                {profileData && <UserCard profileData={profileData} />}
                                {(orgData && orgData.length) ? <OrganisationsCard orgData={orgData} /> : ''}
                                {(gistsData && gistsData.length) ? <GistsCard gistsData={gistsData} /> : ''}
                                    </>:<><CircularProgress color="inherit"/> </>
                        }
                    </Card>
                </div>
            </Box>
        </>
    )
}

export default App;

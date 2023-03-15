import {AppBar, Box, Button, Input, Toolbar, Typography} from "@mui/material";
import React from "react";

type SearchWrapperProps = {
    setProfileTitle: (val: string) => void;
    fetchData: () => Promise<void>;
}

const SearchWrapper:React.FC<SearchWrapperProps> = ({setProfileTitle, fetchData}) => {
    return (<AppBar sx={{backgroundColor: '#333'}}>
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
                Github profile app
            </Typography>
            <Box display="flex" justifyContent="flex-end" sx={{marginLeft: 20}}>
                <Input sx={{color: 'white',}} type="search" placeholder="search"
                       onChange={(evt) => setProfileTitle(evt.target.value)}></Input>
                <Button sx={{ml: 5, color: 'white', border: 'solid 1px white'}} variant="outlined"
                        onClick={async () => await fetchData()}>Submit</Button>
            </Box>
        </Toolbar>
    </AppBar>)
};

export default SearchWrapper;

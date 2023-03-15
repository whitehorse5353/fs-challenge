import {CardContent, Divider, Link, List, ListItem, ListSubheader} from "@mui/material";
import React from "react";

export interface Gists {
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
interface GistsDataProps {
    gistsData: Gists[]
}
const GistsCard: React.FC<GistsDataProps> = ({gistsData}) => {
    return <><CardContent>
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
    </CardContent></>
}

export default GistsCard;
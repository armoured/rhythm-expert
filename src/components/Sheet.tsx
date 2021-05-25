import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


import quarternote from '../img/notes/quarter-note-15x42.svg';
import halfnote from '../img/notes/half-note-15x42.svg';

export type SheetProps = {

}

const Sheet = (props: SheetProps) => {

    return (
        <Box height="500px" style={{"borderStyle": "solid", "borderColor": "green"}} m={1}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{"borderStyle": "solid", "borderColor": "purple", "height": "300px"}}
            >
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item>
                            <img src={quarternote} alt="quarter note"></img>
                        </Grid>
                        <Grid item>
                            <img src={quarternote} alt="quarter note"></img>
                        </Grid>
                        <Grid item>
                            <img src={quarternote} alt="quarter note"></img>
                        </Grid>
                        <Grid item>
                            <img src={quarternote} alt="quarter note"></img>
                        </Grid>
                    </Grid>
                </Grid>   
            </Grid>
        </Box>
    )
}

export default Sheet;
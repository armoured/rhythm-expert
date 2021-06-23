import React from 'react';
import Grid from '@material-ui/core/Grid';

import Measure from './Measure';

export type SheetRowProps = {
    notesRow: string[][];
    rowId: number;
};

const SheetRow = ({notesRow, rowId}: SheetRowProps) => {

    return (
        <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{"borderStyle": "solid", "borderColor": "purple", "height": "200px"}}
        >
            <Grid xs={8} style={{"borderStyle": "solid", "borderColor": "blue"}}>
                <Grid container spacing={1} justify="center" style={{"borderStyle": "solid", "borderColor": "orange"}}>

                    {notesRow.map((measure, idx) => {
                        return <Measure measure={measure} rowId={rowId} measureId={idx} key={`${rowId}-${idx}`} />
                    })}
                </Grid>
            </Grid>   
        </Grid>
    );
}

export default SheetRow;
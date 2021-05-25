import React from 'react';
import Box from '@material-ui/core/Box';
import SheetRow from './SheetRow';

export type SheetProps = {
   notes: string[][][];
}

const Sheet = ({notes}: SheetProps) => {

    console.log("got notes", notes);

    console.log("len", notes.length);

    return (
        <Box height="500px" style={{"borderStyle": "solid", "borderColor": "green"}} m={1}>
            {notes.map((notesRow, idx) => {
                return <SheetRow notesRow={notesRow} rowId={idx} key={idx} />
            })}
        </Box>
    )
}

export default Sheet;
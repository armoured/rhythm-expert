import React from 'react';
import Grid from '@material-ui/core/Grid';

import quarternote from '../img/notes/quarter-note-15x42.svg';
import halfnote from '../img/notes/half-note-15x42.svg';

import verticalbar from '../img/notes/vertical-bar-30x50.svg';

export type MeasureProps = {
    measure: string[];
    rowId: number;
    measureId: number;
};

const noteMappings = {
    'qn': {
        'img': quarternote,
        'alt': 'quarter note'
    },
    'hn': {
        'img': halfnote,
        'alt': 'half note'
    }
}

const Measure = ({measure, rowId, measureId}: MeasureProps) => {

    return (
        <>
            {measureId === 0 && 
            <Grid item style={{"paddingRight": "0px", "paddingLeft": "0px"}}>
                <img src={verticalbar} alt="vertical bar"></img>
            </Grid>}
            {measure.map((note, idx) => {
                return (
                    <Grid item key={`${rowId}-${measureId}-${idx}`}>
                        <img src={noteMappings[note].img} alt={noteMappings[note].alt}></img>
                    </Grid>
                );
            })}
            <Grid item style={{"paddingRight": "0px", "paddingLeft": "0px"}}>
                <img src={verticalbar} alt="vertical bar"></img>
            </Grid>
        </>
    );

}

export default Measure;

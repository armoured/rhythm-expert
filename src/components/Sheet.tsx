import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import SheetRow from './SheetRow';
import Vex from 'vexflow';

export type SheetProps = {
   notes: string[][][];
}

const Sheet = ({notes}: SheetProps) => {

    console.log("got notes", notes);

    console.log("len", notes.length);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        var VF = Vex.Flow;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        var div = document.getElementById("boo")
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Size our SVG:
        renderer.resize(1600, 1200);

        // And get a drawing context:
        var context = renderer.getContext();

        let visibleLine = [false, false, true, false, false];

        let numMeasures = 5;

        let staveY = 0;

        let staveLength = 300;

        //set opacity to 0

        let prevStaveMeasure; 
        for (let i = 0; i < numMeasures; i++) {
            let staveMeasure;
            if (!prevStaveMeasure) {
                staveMeasure = new Vex.Flow.Stave(10, staveY, staveLength);
                // staveMeasure.addTimeSignature('4/4');
            } else {
                console.log("prev x", prevStaveMeasure.x);
                let nextStaveX = prevStaveMeasure.width + prevStaveMeasure.x;
                if (nextStaveX > 1200) {
                    staveY += 100;
                    nextStaveX = 10;
                }
                staveMeasure = new Vex.Flow.Stave(
                    nextStaveX,
                    staveY,
                    staveLength
                );
            }

            visibleLine.forEach((visible, lineNumber) => {
                staveMeasure.setConfigForLine(lineNumber, { visible });
            });
            staveMeasure.setContext(context).draw();

            var notesMeasure = [
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
            ];
    
            // console.log("style", notesMeasure[0].attrs);
            // console.log("style 2", notesMeasure[0].attrs.el)

            // Helper function to justify and draw a 4/4 voice
            Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure, notesMeasure);

            // notesMeasure[0].attrs.el.opacity = 0;
            console.log("stave", staveMeasure);
            console.log("style", notesMeasure[0].attrs);
            console.log("style 2", notesMeasure[0].attrs.el);

            notesMeasure[0].attrs.el.style.opacity = 0;

            // console.log("el", document.getElementById(notesMeasure[0].attrs.el));

            prevStaveMeasure = staveMeasure;
        }

    });

    // useEffect(() => {
    //     console.log("after");
    //     console.log("doc", document.getElementById("auto1291"))
    // });

    return (
        <Box height="500px" style={{"borderStyle": "solid", "borderColor": "green"}} m={1}>

            <div id="boo"></div>


            {/* {notes.map((notesRow, idx) => {
                return <SheetRow notesRow={notesRow} rowId={idx} key={idx} />
            })} */}
        </Box>
    )
}

export default Sheet;
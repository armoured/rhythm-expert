import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import SheetRow from './SheetRow';
import Vex from 'vexflow';
// typical import
import gsap from "gsap";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(Draggable); 

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

            // Helper function to justify and draw a 4/4 voice
            Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure, notesMeasure);

            // notesMeasure[0].attrs.el.opacity = 0;
            console.log("stave", staveMeasure);
            console.log("style 0", notesMeasure[0]);
            console.log("style", notesMeasure[0].attrs);
            console.log("style 2", notesMeasure[0].attrs.el);

            notesMeasure.forEach((note) => {
                
                // note.attrs.el.draggable();
            })
            // notesMeasure[0].attrs.el.style.opacity = 0;

            prevStaveMeasure = staveMeasure;
        }

        let droppables = document.getElementsByClassName("vf-stavenote");

        let startPos = {
            x: 0,
            y: 0
        }

        Draggable.create(droppables, {
            bounds: "svg",
            lockAxis: true,
            onDrag: function() {
                
            },
            onDragEnd: function() {
                console.log("drag end");
                let i = droppables.length;
                let hit = false;
                while (--i > -1) {
                    if (this.hitTest(droppables[i])) {
                        hit = true;
                        console.log("hit", droppables[i])

                        let droppableRect = droppables[i].getBoundingClientRect();
                        console.log("droppable rect", droppableRect);

                        let nextX = startPos.x - droppableRect.left; 

                        // get position of droppable[i]

                        // move droppable[i] to this starting position

                        // move this to the droppable[i] starting position
                        // gsap.fromTo(droppables[i], {x: droppableRect.x, y: droppableRect.y}, {x: startPos.x, y: startPos.y, duration: 1});
                        gsap.to(droppables[i], {x: nextX, duration: 1});

                        gsap.to(this.target, {x: -nextX});

                    }
                }

                if (!hit) {
                    let targetRect = this.target.getBoundingClientRect();
                    console.log("startPos.x, targetRect.x", startPos.x, targetRect.x)
                    let moveBackX = startPos.x - targetRect.x;
                    console.log("moveBackX", moveBackX);
                    gsap.to(this.target, {x: -40, duration: 1});
                }
            },
            // onDragStart: function() {
            //     console.log("drag start");
            // }
            onPress: function() {
                console.log("on press");
                let rect = this.target.getBoundingClientRect();
                console.log(rect);
                // let [x, y] = this.target.getAttribute("data-svg-origin").split(" ");
                startPos.x = rect.left;
                startPos.y = rect.bottom;
                // console.log(x, y);
            }
            
        });

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
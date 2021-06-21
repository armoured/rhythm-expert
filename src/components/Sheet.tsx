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

        let positionNumber = 0;
        

        let prevStaveMeasure; 
        for (let i = 0; i < numMeasures; i++) {
            let staveMeasure;
            if (!prevStaveMeasure) {
                staveMeasure = new Vex.Flow.Stave(10, staveY, staveLength);
                // staveMeasure.addTimeSignature('4/4');
            } else {
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
            // console.log("stave", staveMeasure);
            // console.log("style 0", notesMeasure[0]);
            // console.log("style", notesMeasure[0].attrs);
            // console.log("style 2", notesMeasure[0].attrs.el);


            notesMeasure[0].attrs.el.setAttribute("data-position", positionNumber);
            notesMeasure[0].attrs.el.setAttribute("data-origposition", positionNumber);
            positionNumber += 1;
            notesMeasure[1].attrs.el.setAttribute("data-position", positionNumber);
            notesMeasure[1].attrs.el.setAttribute("data-origposition", positionNumber);
            positionNumber += 1;
            notesMeasure[2].attrs.el.setAttribute("data-position", positionNumber);
            notesMeasure[2].attrs.el.setAttribute("data-origposition", positionNumber);
            positionNumber += 1
            notesMeasure[3].attrs.el.setAttribute("data-position", positionNumber);
            notesMeasure[3].attrs.el.setAttribute("data-origposition", positionNumber);
            positionNumber += 1;

            // notesMeasure[0].attrs.el.style.opacity = 0;

            prevStaveMeasure = staveMeasure;
        }

        let droppables = document.getElementsByClassName("vf-stavenote");


        Draggable.create(droppables, {
            bounds: "svg",
            lockAxis: true,
            onDrag: function() {
                
            },
            onDragEnd: function() {
            
                let i = droppables.length;
                let hit = false;
                while (--i > -1) {
                    if (this.hitTest(droppables[i])) {
                        hit = true;
                    

                        let targetPos = this.target.dataset.position;
                        let droppablePos = (droppables[i] as any).dataset.position;

                        let targetBBox = this.target.getBBox();
                        let targetBBoxPos = (droppables[targetPos] as any).getBBox();

                        let droppableBBox = (droppables[i] as any).getBBox();
                        let droppableBBoxPos = (droppables[droppablePos] as any).getBBox();


                        let nextTargetX;
                        let nextDroppableX;

                        if (targetPos > droppablePos) {
                            // going right to left
                            nextTargetX = droppableBBoxPos.x - targetBBox.x;
                            nextDroppableX = targetBBoxPos.x - droppableBBox.x;
                        } else {
                            // going left to right
                            nextTargetX = droppableBBoxPos.x - targetBBox.x;
                            nextDroppableX = targetBBoxPos.x - droppableBBox.x;
                        }



                        
                        this.target.setAttribute("data-position", droppablePos);
                        droppables[i].setAttribute("data-position", targetPos);

                        
                        gsap.to(droppables[i], {x: nextDroppableX, duration: 1});
                        gsap.to(this.target, {x: nextTargetX, duration: 1});

                    }
                }

                if (!hit) {

                    let targetPos = this.target.dataset.position;
                    let targetOrigPos = this.target.dataset.origposition;
                    let targetBBox = this.target.getBBox();
                    let targetBBoxPos = (droppables[targetPos] as any).getBBox();

                    let moveBackToX;

                    if (targetPos < targetOrigPos) {
                        moveBackToX = targetBBoxPos.x -  targetBBox.x; 


                    } else {
                        moveBackToX = targetBBoxPos.x - targetBBox.x

                    }

                    gsap.to(this.target, {x: moveBackToX, duration: 1});
                    
                }
            },
            
            onPress: function() {
              
            }
            
        });

    });

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
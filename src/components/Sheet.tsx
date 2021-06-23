import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import SheetRow from './SheetRow';
import Vex from 'vexflow';

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

        let numMeasures = 21;

        let staveY = 0;
        let stavePadding = 100;

        let staveLength = 300;

        let positionNumber = 0;

        let nextLineNumber = 0;

        let prevStaveMeasure; 
        for (let i = 0; i < numMeasures; i++) {
            let staveMeasure;
            if (!prevStaveMeasure) {
                staveMeasure = new Vex.Flow.Stave(10, staveY, staveLength);
                // staveMeasure.addTimeSignature('4/4');
            } else {
                let nextStaveX = prevStaveMeasure.width + prevStaveMeasure.x;
                if (nextStaveX > 1200) {
                    staveY += stavePadding;
                    nextStaveX = 10;
                    nextLineNumber += 1
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
                // new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16" }),

            ];

            var beams = VF.Beam.generateBeams([notesMeasure[3], notesMeasure[4], notesMeasure[5], notesMeasure[6]]);

            // console.log("beams", beams);


            // Helper function to justify and draw a 4/4 voice
            Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure, notesMeasure);

            beams.forEach(function(b) {b.setContext(context).draw()})

            console.log("notesmeasure", notesMeasure);


            // notesMeasure[0].attrs.el.opacity = 0;
            // console.log("stave", staveMeasure);
            // console.log("style 0", notesMeasure[0]);
            // console.log("style", notesMeasure[0].attrs);
            // console.log("style 2", notesMeasure[0].attrs.el);

            for (let i = 0; i < notesMeasure.length; i++) {
                notesMeasure[i].attrs.el.setAttribute("data-position", positionNumber);
                notesMeasure[i].attrs.el.setAttribute("data-origposition", positionNumber);
                notesMeasure[i].attrs.el.setAttribute("data-line", nextLineNumber);
                notesMeasure[i].attrs.el.setAttribute("data-origline", nextLineNumber);
                positionNumber += 1;
            }



            // notesMeasure[0].attrs.el.setAttribute("data-position", positionNumber);
            // notesMeasure[0].attrs.el.setAttribute("data-origposition", positionNumber);
            // positionNumber += 1;
            // notesMeasure[1].attrs.el.setAttribute("data-position", positionNumber);
            // notesMeasure[1].attrs.el.setAttribute("data-origposition", positionNumber);
            // positionNumber += 1;
            // notesMeasure[2].attrs.el.setAttribute("data-position", positionNumber);
            // notesMeasure[2].attrs.el.setAttribute("data-origposition", positionNumber);
            // positionNumber += 1
            // notesMeasure[3].attrs.el.setAttribute("data-position", positionNumber);
            // notesMeasure[3].attrs.el.setAttribute("data-origposition", positionNumber);
            // positionNumber += 1;

            // notesMeasure[0].attrs.el.style.opacity = 0;

            prevStaveMeasure = staveMeasure;
        }

        let svgEl = document.getElementsByTagName("svg")[0];
        let firstBeamedNote = document.getElementById("vf-auto1021");
        let lastBeamedNote = document.getElementById("vf-auto1028");

        // check if beam property is null or not
        // access beam.notes to get each note in beam
        // then figure out paths in between each note 
        // (should be a consistent number between each)
        // then update positions and remove from droppables.

        console.log("svg", svgEl);
        console.log("firstBeamedNote", firstBeamedNote);
        console.log("lastBeamedNote", lastBeamedNote);
        if (lastBeamedNote) {
            let path1 = lastBeamedNote.nextSibling;
            console.log("path1", path1)
            let path2 = path1?.nextSibling;
            console.log("path2", path2)
            let path3 = path2?.nextSibling;
            console.log("path3", path3)
            let path4 = path3?.nextSibling;
            console.log("path4", path4)

            let group=document.createElementNS("http://www.w3.org/2000/svg","g");
            group.setAttribute("class", "beamed-note");
            group.setAttribute("pointer-events", "bounding-box");
            let beamedNoteLine = lastBeamedNote.dataset.line || "";
            let beamedNoteOrigLine = lastBeamedNote.dataset.origline || "";


            group.setAttribute("data-line", beamedNoteLine);
            group.setAttribute("data-origline", beamedNoteOrigLine);
            svgEl.insertBefore(group, firstBeamedNote);
            group.appendChild((firstBeamedNote as Node));
            group.appendChild((lastBeamedNote as Node));
            group.appendChild((path1 as Node));
            group.appendChild((path2 as Node));
            group.appendChild((path3 as Node));
            group.appendChild((path4 as Node));

            
            
        }


        let beamedDroppables = document.getElementsByClassName("beamed-note");
        let droppables = Array.from(document.getElementsByClassName("vf-stavenote"));
        droppables.splice(3, 0, beamedDroppables[0]);
        droppables.splice(4, 2);

        let newPositionNumber = 0;
        for (let i = 0; i < droppables.length; i++) {
            droppables[i].setAttribute("data-position", newPositionNumber.toString());
            droppables[i].setAttribute("data-origposition", newPositionNumber.toString());
            newPositionNumber += 1;
        }

        console.log(droppables);




        Draggable.create(droppables, {
            bounds: "svg",
            // lockAxis: true,
            onDrag: function() {
                
            },
            onDragEnd: function() {
            
                let i = droppables.length;
                let hit = false;
                while (--i > -1) {
                    if (this.hitTest(droppables[i])) {
                        hit = true;
                    
                        let targetPos = parseInt(this.target.dataset.position);
                        let droppablePos = parseInt((droppables[i] as any).dataset.position);

                        let targetOrigPos = parseInt(this.target.dataset.origposition);
                        let droppableOrigPos = parseInt((droppables[i] as any).dataset.origposition);


                        let targetBBox = this.target.getBBox();
                        let targetBBoxPos = (droppables[targetPos] as any).getBBox();

                        let droppableBBox = (droppables[i] as any).getBBox();
                        let droppableBBoxPos = (droppables[droppablePos] as any).getBBox();


                        let nextTargetX;
                        let nextDroppableX;
                        let nextTargetY;
                        let nextDroppableY;


                        // let targLine = Math.floor(targetPos / 16);
                        // let targOrigLine = Math.floor(targetOrigPos / 16);
                        // let dropLine = Math.floor(droppablePos / 16);
                        // let dropOrigLine = Math.floor(droppableOrigPos / 16); 

                        // let targLine = Math.floor(targetPos / 20);
                        // let targOrigLine = Math.floor(targetOrigPos / 20);
                        // let dropLine = Math.floor(droppablePos / 20);
                        // let dropOrigLine = Math.floor(droppableOrigPos / 20); 

                        let targLine = parseInt(this.target.dataset.line);
                        let dropLine = parseInt((droppables[i] as any).dataset.line);

                        let targOrigLine = parseInt(this.target.dataset.origline);
                        let dropOrigLine = parseInt((droppables[i] as any).dataset.origline);

                        let diffLineTargOrigDrop = Math.abs(targOrigLine - dropLine);
                        let diffLineDropOrigTarg = Math.abs(dropOrigLine - targLine);

                        nextTargetY = diffLineTargOrigDrop * stavePadding;
                        nextDroppableY = diffLineDropOrigTarg * stavePadding;

                        if (targetPos > droppablePos) {
                            // going right to left
                            nextTargetX = droppableBBoxPos.x - targetBBox.x;
                            nextDroppableX = targetBBoxPos.x - droppableBBox.x;
                        } else {
                            // going left to right
                            nextTargetX = droppableBBoxPos.x - targetBBox.x;
                            nextDroppableX = targetBBoxPos.x - droppableBBox.x;
                        }

                        if (targOrigLine > dropLine) {
                            // target going up so negative
                            nextTargetY = -nextTargetY;
                        } 

                        if (dropOrigLine > targLine) {
                            // droppable going up so negative
                            nextDroppableY = -nextDroppableY;
                        } 

                        this.target.setAttribute("data-position", droppablePos.toString());
                        droppables[i].setAttribute("data-position", targetPos.toString());

                        this.target.setAttribute("data-line", dropLine.toString());
                        droppables[i].setAttribute("data-line", targLine.toString());
                        
                        gsap.to(droppables[i], {x: nextDroppableX, y: nextDroppableY, duration: 1});
                        gsap.to(this.target, {x: nextTargetX, y: nextTargetY, duration: 1});

                        break;
                    }
                }

                if (!hit) {

                    let targetPos = this.target.dataset.position;
                    let targetOrigPos = this.target.dataset.origposition;
                    let targetBBox = this.target.getBBox();
                    let targetBBoxPos = (droppables[targetPos] as any).getBBox();

                    let moveBackToX;
                    let moveBackToY;

                    if (targetPos < targetOrigPos) {
                        moveBackToX = targetBBoxPos.x -  targetBBox.x; 
                    } else {
                        moveBackToX = targetBBoxPos.x - targetBBox.x
                    }

                    // let targLine = Math.floor(targetPos / 16);
                    // let targOrigLine = Math.floor(targetOrigPos / 16);

                    let targLine = Math.floor(targetPos / 20);
                    let targOrigLine = Math.floor(targetOrigPos / 20);
                    let diffLineTargOrig = Math.abs(targLine - targOrigLine);

                    moveBackToY = diffLineTargOrig * stavePadding;

                    if (targLine < targOrigLine) {
                        // needs to be negative
                        moveBackToY = -moveBackToY;
                    } 

                    gsap.to(this.target, {x: moveBackToX, y: moveBackToY, duration: 1});
                    
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
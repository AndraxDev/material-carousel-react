/**
 * Material Design 3 Carousel
 * Copyright (c) 2024 Dmytro Ostapenko. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * */

import './App.css';
import {useEffect, useState} from "react";
import MaskableFragment from "./MaskableFragment";
import {MobileView} from "react-device-detect";

/* Contained centered multi browser strategy, scroll params adjustments are required before using this render formula */
const f = (x) => {
    // Adjust this rendering formula
    return (4*Math.exp(-8*x))/Math.pow(1+Math.exp(-8*x), 2)
}

/* Contained multi browser strategy */
const f2 = (x) => {
    return (16*Math.exp(4*x))/Math.pow(1+Math.exp(16*x), 2)
}

const widthFunction = (w) => {
    return Math.floor(f2((w/400)-2.4)*400);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}

let startX = 0;

function Carousel(props) {
    const urls = props.urls;
    const minScroll = 900;
    const maxScroll = urls.length * 110 + 750;

    const [scroll, setScroll] = useState(minScroll);
    const [heroElement, setHeroElement] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [currentSnapPosition, setCurrentSnapPosition] = useState(minScroll);
    const [isSnapping, setIsSnapping] = useState(true);

    const [wData, setWData] = useState(urls.map(() => 0));
    const [mouseDown, setMouseDown] = useState(false);
    const [direction, setDirection] = useState(0);

    const updateScroll = (s) => {
        if (s < minScroll) {
            setScroll(minScroll);
        } else if (scroll > maxScroll) {
            setScroll(maxScroll);
        } else {
            setScroll(s);
        }
    }

    const onWheelListener = (e) => {
        setIsScrolling(true);
        if (e.deltaY < 0) {
            updateScroll(scroll-5);
        } else {
            updateScroll(scroll+5);
        }

        releaseScrollState();
    }

    const onScrollListener = (e) => {
        if (!mouseDown) return;

        setIsScrolling(true);

        let directionX = e.movementX || 0;

        if (directionX > 0) {
            updateScroll(scroll-1);
        } else {
            updateScroll(scroll+1);
        }
    }

    const onTouchListener = (e) => {
        setIsScrolling(true);
        const touch = e.touches[0];
        const x = touch.clientX;
        const deltaX = x - startX;

        if (deltaX > 0) {
            updateScroll(scroll-2);
        } else {
            updateScroll(scroll+2);
        }

        releaseScrollState();
    }

    const snapToPosition = (deltaX, force) => {
        if (((isSnapping || isScrolling || deltaX === 0) && props.supportSnap) && !force) return;
        setIsSnapping(true);

        let posDelta = Math.abs(deltaX);
        new Promise((resolve) => {
            let snap = setInterval(() => {
                if (deltaX > 0) {
                    updateScroll(scroll - (Math.abs(deltaX) - posDelta));
                } else {
                    updateScroll(scroll + (Math.abs(deltaX) - posDelta));
                }

                posDelta = posDelta - 1;

                if (posDelta === 0 || isScrolling) {
                    clearInterval(snap);
                    resolve();
                }
            }, 1);
        }).then(() => {
            setIsSnapping(false);
            setDirection(0);
        });
    }

    const getHeroElement = () => {
        let hero = 0;
        let min = 0;

        for (let i = 0; i < wData.length; i++) {
            if (min < wData[i]) {
                min = wData[i];
                hero = i;
            }
        }

        setCurrentSnapPosition(hero * 111 + minScroll);

        return hero;
    }

    const releaseScrollState = () => {
        setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    }

    useEffect(() => {
        if (!isScrolling && props.supportSnap) {
            snapToPosition(scroll - currentSnapPosition);
        } else {
            setIsSnapping(false);
        }
    }, [isScrolling, scroll, currentSnapPosition]);

    useEffect(() => {
    }, [heroElement, scroll, currentSnapPosition]);

    useEffect(() => {
        setHeroElement(getHeroElement());
    }, [wData]);

    const getSafePosition = (pos) => {
        if (pos < 0) {
            return 0;
        } else if (pos > urls.length - 1) {
            return urls.length - 1;
        } else {
            return pos;
        }
    }

    const handleKeyPress = e => {
        if (e.key === 'ArrowLeft') {
            setDirection(-1)
        } else if (e.key === 'ArrowRight') {
            setDirection(1)
        }
    };

    useEffect(() => {
        if (direction === 1) {
            if (heroElement >= urls.length - 2) return;
            setHeroElement(getSafePosition(heroElement + 1));
            let csp = currentSnapPosition + 111
            setCurrentSnapPosition(csp);
            snapToPosition(scroll - csp, true);
        } else if (direction === -1) {
            if (heroElement <= 0) return;
            setHeroElement(getSafePosition(heroElement - 1));
            let csp = currentSnapPosition - 111
            setCurrentSnapPosition(csp);
            snapToPosition(scroll - csp, true);
        }
    }, [direction]);

    useEffect(() => {
        if (scroll < maxScroll) {
            let scrollArray = [];

            for (let i = 0; i < wData.length; i++) {
                scrollArray.push(widthFunction(scroll - (i * 110)));
            }

            setWData(scrollArray);
        }
    }, [maxScroll, scroll, wData.length]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return function () {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className={"carousel-container"}>
            <MobileView>
                <div style={{
                    width: "800px",
                    height: "500px",
                    position: "absolute",
                    zIndex: 100,
                }} onTouchStartCapture={(e) => {
                    startX = e.touches[0].clientX;
                }}
                     onTouchMoveCapture={onTouchListener}/>
            </MobileView>

            <div id={"carousel"}
                 className={"carousel"}
                 onMouseUp={() => {
                     setMouseDown(false)
                     releaseScrollState()
                 }}
                 onMouseDown={() => {
                     setMouseDown(true)
                     setIsScrolling(true)
                 }}
                 onMouseMove={onScrollListener}
                 onWheel={onWheelListener}>
                {
                    wData.map((w, i) => {
                        return (
                            <MaskableFragment key={uuidv4()} width={w} url={urls[i]}/>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Carousel;

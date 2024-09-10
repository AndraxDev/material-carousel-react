import './App.css';
import {useEffect, useState} from "react";
import MaskableFragment from "./MaskableFragment";
import {MobileView} from "react-device-detect";

const f = (x) => {
    // Adjust this rendering formula
    return (4*Math.exp(-8*x))/Math.pow(1+Math.exp(-8*x), 2)
}

const widthFunction = (w) => {
    return f((w/400)-2)*400;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}

let startX = 0;

function Carousel(props) {
    const [scroll, setScroll] = useState(850);

    const urls = props.urls;
    const [wData, setWData] = useState(urls.map(() => 0));
    const [mouseDown, setMouseDown] = useState(false);

    const minScroll = 850;
    const maxScroll = urls.length * 100 + 655;

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
        if (e.deltaY < 0) {
            updateScroll(scroll-5);
        } else {
            updateScroll(scroll+5);
        }
    }

    const onScrollListener = (e) => {
        if (!mouseDown) return;

        let directionX = e.movementX || 0;

        if (directionX > 0) {
            updateScroll(scroll-1);
        } else {
            updateScroll(scroll+1);
        }
    }

    const onTouchListener = (e) => {

        const touch = e.touches[0];
        const x = touch.clientX;
        const deltaX = x - startX;

        if (deltaX > 0) {
            updateScroll(scroll-4);
        } else {
            updateScroll(scroll+4);
        }
    }

    useEffect(() => {
        if (scroll < maxScroll) {
            let scrollArray = [];

            for (let i = 0; i < wData.length; i++) {
                scrollArray.push(widthFunction(scroll - (i * 100)));
            }

            setWData(scrollArray);
        }
    }, [maxScroll, scroll, wData.length]);

    return (
        <div className={"carousel-container"}>
            <MobileView>
                <div style={{
                    width: "720px",
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
                 onMouseUp={() => setMouseDown(false)}
                 onMouseDown={() => setMouseDown(true)}
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

import { useEffect, useRef, useState } from "react";
import { useMovieContext } from "../context/MovieContext";

interface TooLongTextProps {
    text: string,
    bgColor: string,
    headingSize: 1 | 2 | 3 | 4 | 5 | 6
}

function TooLongText(props: TooLongTextProps) {
    const [scrolling, setScrolling] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const intervalRef = useRef<number | null>(null);
    const headingRefWidth = useRef<number | null>(null);
    const divRefWidth = useRef<number | null>(null);

    function startInterval() {
        if (intervalRef.current == null && headingRef.current != null && headingRefWidth.current != null && divRefWidth.current != null && divRef.current != null) {
            intervalRef.current = window.setInterval(() => {
                if (headingRef.current != null && headingRefWidth.current != null && divRefWidth.current != null && divRef.current != null) {
                    let currentRight = parseInt(headingRef.current.style.right);
                    let newNumber = currentRight + 1;
                    //console.log(headingRefWidth.current - currentRight);
                    //console.log("Deve essere maggiore di ");
                    //console.log(divRefWidth.current);
                    if (headingRefWidth.current - currentRight > divRefWidth.current) {
                        headingRef.current.style.right = newNumber + "px";
                    }
                    setScrolling(true);
                }
            }, 50);
            return;
        }
        setTimeout(startInterval,10);
    }

    function stopInterval() {
        if (intervalRef.current != null && headingRef.current != null) {
            clearInterval(intervalRef.current);
            headingRef.current.style.right = "0";
            intervalRef.current = null;
            setScrolling(false);
        }
    }

    useEffect(saveWidths, []);

    function saveWidths() {
        if (headingRef.current !== null && divRef.current !== null) {
            headingRefWidth.current = headingRef.current.scrollWidth;
            divRefWidth.current = divRef.current.offsetWidth;
            return;
        }
        setTimeout(saveWidths, 10);
    }

    return (
        <div onMouseEnter={startInterval} onMouseLeave={stopInterval} ref={divRef} style={{ backgroundColor: props.bgColor, width: "100%", overflowX: "hidden", WebkitMaskImage: `linear-gradient(to left, transparent, ${props.bgColor} ${scrolling ? "0%" : "30%"})`, maskImage: `linear-gradient(to left, transparent, ${props.bgColor} ${scrolling ? "0%" : "30%"})` }} className="right-gradient-transparent">
            {props.headingSize == 6 && <h6 ref={headingRef} className="too-long-text">{props.text}</h6>}
            {props.headingSize == 5 && <h5 ref={headingRef} className="too-long-text">{props.text}</h5>}
            {props.headingSize == 4 && <h4 ref={headingRef} className="too-long-text">{props.text}</h4>}
            {props.headingSize == 3 && <h3 ref={headingRef} className="too-long-text">{props.text}</h3>}
            {props.headingSize == 2 && <h2 ref={headingRef} className="too-long-text">{props.text}</h2>}
            {props.headingSize == 1 && <h1 ref={headingRef} className="too-long-text">{props.text}</h1>}
        </div>
    );
}

export default TooLongText;
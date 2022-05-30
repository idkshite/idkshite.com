import {useVideo} from "react-use";
import {useEffect, useState} from "react";

export function Video({src}:{src:string}){
    const [video, state, controls, ref] = useVideo(<video playsInline autoPlay muted loop>
        <source src={src} />
    </video>)

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(getVideoProgressInPercent(ref?.current?.duration, state.time))
    },[state])

    return (
        <div className={"rich-content"}>
            {video}
            <div className="w-full bg-gray-300">
                <div className="bg-gray-600 h-[4px]" style={{
                    width: `${progress}%`,
                    transition: "width 300ms",
                }}/>
            </div>
        </div>

    )
}

function getVideoProgressInPercent(duration, time) {
    console.log(duration, time);
    if (duration === 0 || time === 0) return 0;
    return (Math.floor(time) / Math.floor(duration)) * 100
}
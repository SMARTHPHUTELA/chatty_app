import { useEffect, useState } from "react";
import { useThemeStore } from "../store/useThemeStore";

const AuthImagePattern = (props) => {
    const { theme } = useThemeStore();
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < props.text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + props.text[index]);
                setIndex(index + 1);
            }, 45);

            return () => clearTimeout(timeout);
        }
    }, [index, props.text]);
    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
            <div className="max-w-md text-center">

                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""
                                }`}
                        />
                    ))}
                </div>

                <h2 className="text-2xl font-bold mb-4">{props.title}</h2>
                <p className="text-base-content/60">{props.subtitle}</p>

                <div className="mt-6 relative rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/10 shadow-lg px-6 py-4">

                    <div className="overflow-x-auto scrollbar-hide">
                        {
                            theme === "wireframe" || theme === "retro" || theme==="cyberpunk" ?
                                <p className="text-lg font-classyMono text-black tracking-wide whitespace-nowrap">
                                    {displayText}
                                    <span className="ml-1 animate-pulse text-primary">|</span>
                                </p> :
                                <p className="text-lg font-classyMono text-white tracking-wide whitespace-nowrap">
                                    {displayText}
                                    <span className="ml-1 animate-pulse text-primary">|</span>
                                </p>

                        }

                    </div>

                </div>
            </div>
        </div>
    );
};


export default AuthImagePattern;
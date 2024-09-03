import React from "react";
import { Link } from "react-router-dom";
import zoroHome from "../assets/original/zoroHomePage.jpeg";

const Home = ({ setTab, darkMode }) => {
    return (
        <div
            className={`flex flex-col items-center w-full  justify-center text-xl md:text-2xl lg:text-3xl ${
                darkMode ? "text-white" : "text-black"
            } animate-scaleUp mb-16 md:mb-20 `}
        >
            <div className="border-2 border-pink-500 p-2 md:p-5 lg:p-10 rounded-3xl flex flex-col items-center gap-2 md:gap-5 lg:gap-10">
                <h1 className="text-2xl md:text-3xl lg:text-5xl uppercase underline">
                    Welcome
                </h1>
                <img
                    src={zoroHome}
                    alt="zoroHome"
                    className="rounded-3xl h-100 w-100 md:h-200 md:w-200 lg:h-300 lg:w-300"
                />
                <nav>
                    <ul className="flex gap-2 md:gap-5 lg:gap-10 flex-wrap justify-center">
                        <li>
                            <Link
                                to="/besties"
                                onClick={() => setTab("Besties")}
                            >
                                Besties
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/albuterol-boys"
                                onClick={() => setTab("Albuterol Boys")}
                            >
                                Albuterol Boys
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/youtube-clips"
                                onClick={() => setTab("Youtube Clips")}
                            >
                                YouTube Clips
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;

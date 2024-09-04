import React from "react";
import bestieLogo from "../assets/Besties-pink-logo.png";
import albuterolBoysLogo from "../assets/ABlogo.jpg";
import youtubeLogo from "../assets/youtube.jpg";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar = ({ tab, setTab, darkMode, toggleDarkMode }) => {
    const bestiesHandler = () => {
        setTab("Besties");
    };

    const albuterolBoysHandler = () => {
        setTab("Albuterol Boys");
    };

    const youtubeClipsHandler = () => {
        setTab("Youtube Clips");
    };

    const homeHandler = () => {
        setTab("Home");
    };

    return (
        <div
            className={`w-10/12  mx-auto flex sm:justify-between justify-center items-center my-2`}
        >
            <div className="hidden sm:block ">
                <motion.div
                    drag
                    dragConstraints={{
                        top: -50,
                        left: -50,
                        right: 50,
                        bottom: 50,
                    }}
                >
                    <img
                        src={
                            tab === "Besties"
                                ? bestieLogo
                                : tab === "Albuterol Boys"
                                ? albuterolBoysLogo
                                : tab === "Youtube Clips"
                                ? youtubeLogo
                                : bestieLogo
                        }
                        alt="BestiesLogo"
                        // height={100}
                        // width={100}
                        className="rounded-full h-16"
                        loading="lazy"
                    />
                </motion.div>
            </div>

            <div className="flex gap-2 md:gap-5 lg:gap-10 items-center ">
                <div
                    className={`flex gap-0 sm:gap-2 md:gap-4 rounded-xl bg-pink-500 text-white p-1 sm:p-2 md:p-3 h-fit items-center text-base md:text-xl`}
                >
                    <Link to="/">
                        <button
                            className={`${
                                tab === "Home"
                                    ? "bg-pink-300 scale-110 text-darkgrey-500"
                                    : ""
                            }  rounded-xl p-2 transition-all duration-200} hover:bg-pink-300 font-semibold `}
                            onClick={homeHandler}
                        >
                            Home
                        </button>
                    </Link>
                    <Link to="/besties">
                        <button
                            className={`${
                                tab === "Besties"
                                    ? "bg-pink-300 scale-110 text-darkgrey-500"
                                    : ""
                            }  rounded-xl p-2 transition-all duration-200} hover:bg-pink-300 font-semibold `}
                            onClick={bestiesHandler}
                        >
                            Besties
                        </button>
                    </Link>
                    <Link to="/albuterol-boys">
                        <button
                            className={`${
                                tab === "Albuterol Boys"
                                    ? "bg-pink-300 scale-110 text-darkgrey-500"
                                    : ""
                            }  rounded-xl p-2 transition-all duration-200} hover:bg-pink-300 font-semibold`}
                            onClick={albuterolBoysHandler}
                        >
                            Albuterol Boys
                        </button>
                    </Link>
                    <Link to="/youtube-clips">
                        <button
                            className={`${
                                tab === "Youtube Clips"
                                    ? "bg-pink-300 scale-110 text-darkgrey-500"
                                    : ""
                            }  rounded-xl p-2 transition-all duration-200} hover:bg-pink-300 font-semibold `}
                            onClick={youtubeClipsHandler}
                        >
                            Youtube Clips
                        </button>
                    </Link>
                </div>

                {/* Dark Mode */}
                <div
                    onClick={() => toggleDarkMode()}
                    className="cursor-pointer"
                >
                    {darkMode ? (
                        <MdLightMode size={30} color="#fff" />
                    ) : (
                        <MdDarkMode size={30} />
                    )}
                </div>
            </div>
        </div>
    );
};

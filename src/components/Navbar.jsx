import React from "react";
import bestieLogo from "../assets/Besties-pink-logo.jpg";
import albuterolBoysLogo from "../assets/ABlogo.jpg";
import youtubeLogo from "../assets/youtube.jpg";
import { MdLightMode, MdDarkMode } from "react-icons/md";

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

    return (
        <div
            className={`w-10/12 h-[12%] mx-auto flex sm:justify-between justify-center items-center my-2`}
        >
            <div className="hidden sm:block">
                <img
                    src={
                        tab === "Besties"
                            ? bestieLogo
                            : tab === "Albuterol Boys"
                            ? albuterolBoysLogo
                            : youtubeLogo
                    }
                    alt="BestiesLogo"
                    // height={100}
                    // width={100}
                    className="rounded-full h-16"
                    loading="lazy"
                />
            </div>

            <div className="flex gap-10 items-center ">
                <div
                    className={`flex gap-4 rounded-xl bg-pink-500 text-white p-1 sm:p-2 md:p-3 h-fit`}
                >
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

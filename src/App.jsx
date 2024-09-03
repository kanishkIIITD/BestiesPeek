import "./App.css";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
// import bestieImage from "./assets/besties.jpg";
// import albuterolBoysImage from "./assets/Albuterol Boys.png";
import { Cards } from "./components/Cards";
// import YoutubeClips from "./components/YoutubeClips";

// const LazyImageAndDescription = lazy(() =>
//     import("./components/LazyImageAndDescription")
// );

function App() {
    const besties = {
        leaders: ["4head", "ming", "nidas"],
        ogs: ["fanfan", "travpiper", "caramel"],
        members: [
            "julian",
            "TheDoubles",
            "zuck",
            "jack",
            "razzy",
            "SlightlyPoetic",
            "kyle",
            "harmless_",
            "mdrakoo",
            "SimplessR6",
            "manax321",
        ],
        pet: ["ThatGuyGP"],
        hangarounds: ["dripp", "ChopoNZ", "Stuply", "RissahBear", "Kameu"],
    };

    const Albuterol_Boys = {
        leaders: ["omie"],
        ogs: ["ripoozi", "ZayTyree"],
        members: [
            // "713Stew",
            "TylerTR",
            "mfWarlock",
            "hazan_n",
            "xDavidoh",
            "Either",
            "Baddy",
            "tjnv_",
            "NapoleonsLive",
        ],
    };

    const darkModeStorageKey = "darkMode";

    const saveDarkModeToLocalStorage = (darkMode) => {
        localStorage.setItem(darkModeStorageKey, darkMode.toString());
    };

    const getDarkModeFromLocalStorage = () => {
        const storedDarkMode = localStorage.getItem(darkModeStorageKey);
        return storedDarkMode === "true";
    };

    const [tab, setTab] = useState("Besties"); // Besties, Albuterol Boys, Youtube Clips
    const [darkMode, setDarkMode] = useState(getDarkModeFromLocalStorage());

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        saveDarkModeToLocalStorage(newDarkMode);
    };

    useEffect(() => {
        const storedDarkMode = getDarkModeFromLocalStorage();
        setDarkMode(storedDarkMode);
    }, []);

    return (
        <div className={`w-full bg-pink-500 flex justify-center items-center `}>
            <div
                className={`${
                    darkMode ? "bg-darkBlackMode" : "bg-white"
                } w-[95%] h-[95%] rounded-md my-2 flex flex-col items-center`}
            >
                <Navbar
                    tab={tab}
                    setTab={setTab}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <div className={`border-2 border-pink-500 mb-4 w-full`}></div>

                {tab === "Besties" || tab === "Albuterol Boys" ? (
                    <div className="flex flex-col items-center w-full">
                        {/* <div>
                            <img
                                src={
                                    tab === "Besties"
                                        ? bestieImage
                                        : tab === "Albuterol Boys"
                                        ? albuterolBoysImage
                                        : ""
                                }
                                alt=""
                                height={700}
                                width={700}
                                className="rounded-xl"
                                loading="lazy"
                            />
                        </div>

                        <div className="py-10 mb-10 text-center ">
                            <h1
                                className={`text-2xl md:text-3xl font-bold ${
                                    darkMode
                                        ? "text-lightgrey"
                                        : "text-darkgrey-500"
                                } mx-10`}
                            >
                                {tab === "Besties"
                                    ? "The Besties is a criminal gang founded on December 15th, 2023 by Fanny, Ming, and 4Head."
                                    : tab === "Albuterol Boys"
                                    ? "The Albuterol Boys are a sub-crew of Cypress lead by Cypress Captain Marty Banks."
                                    : ""}
                            </h1>
                        </div> */}

                        {/* <Suspense fallback={<div className="spinner"></div>}>
                            <LazyImageAndDescription
                                tab={tab}
                                darkMode={darkMode}
                            />
                        </Suspense> */}

                        <div
                            className={`border-2 border-pink-500 mb-4 w-full`}
                        ></div>

                        {/* className="bg-gradient-to-r from-[#D8115B] to-[#D2B48C]" */}
                        <div className={`relative w-full `}>
                            <Cards
                                streamers={
                                    tab === "Besties" ? besties : Albuterol_Boys
                                }
                                tab={tab}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
                ) : null}
                {/* {tab === "Youtube Clips" ? (
                    <YoutubeClips darkMode={darkMode} />
                ) : null} */}
            </div>
        </div>
    );
}

export default App;

import "./App.css";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import YoutubeClips from "./components/YoutubeClips";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Besties from "./components/Besties";
import AlbuterolBoys from "./components/AlbuterolBoys";

function App() {
    const darkModeStorageKey = "darkMode";
    const tabStorageKey = "selectedTab";

    const saveDarkModeToLocalStorage = (darkMode) => {
        localStorage.setItem(darkModeStorageKey, darkMode.toString());
    };

    const getDarkModeFromLocalStorage = () => {
        const storedDarkMode = localStorage.getItem(darkModeStorageKey);
        return storedDarkMode === "true";
    };

    const saveTabToLocalStorage = (tab) => {
        sessionStorage.setItem(tabStorageKey, tab);
    };

    const getTabFromLocalStorage = () => {
        const storedTab = sessionStorage.getItem(tabStorageKey);
        return storedTab || "Home";
    };

    const [tab, setTab] = useState(getTabFromLocalStorage()); // Home, Besties, Albuterol Boys, Youtube Clips
    const [darkMode, setDarkMode] = useState(getDarkModeFromLocalStorage());

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        saveDarkModeToLocalStorage(newDarkMode);
    };

    useEffect(() => {
        const storedDarkMode = getDarkModeFromLocalStorage();
        setDarkMode(storedDarkMode);

        const storedTab = getTabFromLocalStorage();
        setTab(storedTab);
    }, []);

    useEffect(() => {
        saveTabToLocalStorage(tab);
    }, [tab]);

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

                <Routes>
                    <Route
                        path="/"
                        element={<Home setTab={setTab} darkMode={darkMode} />}
                    />
                    <Route
                        path="/besties"
                        element={<Besties tab={tab} darkMode={darkMode} />}
                    />
                    <Route
                        path="/albuterol-boys"
                        element={
                            <AlbuterolBoys tab={tab} darkMode={darkMode} />
                        }
                    />
                    <Route
                        path="/youtube-clips"
                        element={<YoutubeClips darkMode={darkMode} />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;

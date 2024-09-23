import "./App.css";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import YoutubeClips from "./components/YoutubeClips";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Besties from "./components/Besties";
import AlbuterolBoys from "./components/AlbuterolBoys";
import bestieLogo from "./assets/Besties-pink-logo.png";
import { motion } from "framer-motion";

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

  //   Intro Animation
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay showing content after animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000); // Adjust duration to match the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {showContent ? (
        <div className="w-full flex justify-center items-center">
          <div
            className={`w-full bg-pink-500 flex justify-center items-center `}
          >
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
                  element={<AlbuterolBoys tab={tab} darkMode={darkMode} />}
                />
                <Route
                  path="/youtube-clips"
                  element={<YoutubeClips darkMode={darkMode} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            darkMode ? "bg-darkBlackMode text-white" : "bg-white"
          } w-full flex justify-center items-center h-screen perspective-container relative`}
        >
          <div class="circle circle1"></div>
          <div class="circle circle2"></div>

          <motion.div
            initial={{ scale: 0.1, y: 100, opacity: 0 }} // Start small, move down, and invisible
            animate={{
              scale: [0.1, 1, 2],
              y: [100, 0, -200],
              opacity: [0, 1, 0.5],
            }} // Zoom, move up, fade in and out
            transition={{
              duration: 2, // Total animation time
              times: [0, 0.6, 1], // Timing for each part of the animation
              ease: "easeOut",
            }}
            className="z-animation"
          >
            <div className="flex items-center gap-2">
              <img src={bestieLogo} alt="bestieLogo" width={75} />
              <p className="text-3xl">
                BESTIES <span className="text-gradient">PEEK</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;

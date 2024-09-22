import React from "react";
import { Link } from "react-router-dom";
import zoroHome from "../assets/original/zoroHomePage.jpeg";
import fiddy from "../assets/fiddy.jpg";
import { motion } from "framer-motion";

const Home = ({ setTab, darkMode }) => {
  return (
    <div
      className={`flex flex-col items-center w-11/12  justify-evenly text-xl md:text-2xl lg:text-3xl ${
        darkMode ? "text-white" : "text-black"
      } animate-scaleUp md:h-screen `}
    >
      <div className=" p-2 md:p-5 lg:p-10 h-fit flex flex-col items-center gap-2 md:gap-5 lg:gap-10 relative">
        <nav>
          <ul className="flex gap-2 md:gap-5 lg:gap-10 flex-wrap justify-center">
            <li>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/besties" onClick={() => setTab("Besties")}>
                  <p className="border border-pink-500 rounded-xl p-2 transition duration-200">
                    Besties
                  </p>
                </Link>
              </motion.button>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to="/albuterol-boys"
                  onClick={() => setTab("Albuterol Boys")}
                >
                  <p className="border border-pink-500 rounded-xl p-2 transition duration-200">
                    Albuterol Boys
                  </p>
                </Link>
              </motion.button>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to="/youtube-clips"
                  onClick={() => setTab("Youtube Clips")}
                >
                  <p className="border border-pink-500 rounded-xl p-2  transition duration-200">
                    YouTube Clips
                  </p>
                </Link>
              </motion.button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Credits */}
      <div className="flex gap-10 mb-4">
        {/* Credits for the art */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="poppins-medium text-2xl">Credits</h2>
          <div>
            <p className="flex flex-col items-center sm:flex-row sm:gap-2 text-base sm:text-xl">
              <strong>Artwork by:</strong>{" "}
              <a
                href="https://x.com/jupinova"
                target="_blank"
                rel="noreferrer"
                className="underline text-pink-400 poppins-extralight-italic"
              >
                Jansie
              </a>
            </p>
            <p className="flex flex-col items-center sm:flex-row sm:gap-2 text-base sm:text-xl">
              <strong>Artwork by:</strong>{" "}
              {/* <a
                                href="https://x.com/ABC"
                                target="_blank"
                                rel="noreferrer"
                                className="underline text-pink-400 poppins-extralight-italic"
                            >
                                Veyina
                            </a> */}
              <p className="underline text-pink-400 poppins-extralight-italic">
                Veyina
              </p>
            </p>
          </div>
        </div>
        {/* Credits for the youtube clips */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-center poppins-medium text-2xl">
            Youtube Clip Credits
          </h2>
          <div className="flex flex-col text-base sm:text-xl">
            <a
              href="https://www.youtube.com/@GG_EZ-"
              target="_blank"
              rel="noreferrer"
              className="underline text-red-600"
            >
              <strong>GG EZ</strong>
            </a>

            <a
              href="https://www.youtube.com/@NoPixelClipsz"
              target="_blank"
              rel="noreferrer"
              className="underline text-red-600"
            >
              <strong>NoPixel Clips</strong>
            </a>
          </div>
        </div>
      </div>

      {/* One Piece */}
      <div className="relative flex items-center justify-center flex-col md:flex-row">
        <motion.div
          drag
          dragConstraints={{
            top: -200,
            left: -200,
            right: 100,
            bottom: 100,
          }}
        >
          <img
            src={zoroHome}
            alt="zoroHome"
            className="rounded-full h-200 w-200 md:h-200 md:w-200 lg:h-300 lg:w-300"
          />
        </motion.div>
        <img
          src={fiddy}
          alt="fiddy"
          className="rounded-3xl absolute -z-10 top-20 left-20 md:left-16 lg:left-20"
          width={150}
        />
        <p className="text-center w-1/2 poppins-extralight">
          Don't like One Piece? Just move it.
        </p>
      </div>
    </div>
  );
};

export default Home;

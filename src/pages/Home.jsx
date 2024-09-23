import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import zoroHome from "../assets/original/zoroHomePage.jpeg";
import fiddy from "../assets/fiddy.jpg";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const Home = ({ setTab, darkMode }) => {
  return (
    <div className="realative w-full">
      <div
        className={`${
          darkMode ? " circle-home-dark" : "circle-home-light"
        } circle-home `}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full flex justify-center relative"
      >
        <div
          className={`flex flex-col items-center w-11/12 h-screen sm:h-fit justify-evenly text-xl md:text-2xl lg:text-3xl ${
            darkMode ? "text-white" : "text-black"
          } md:h-screen relative`}
        >
          {/* Tabs */}
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
          <div className="flex gap-4 md:gap-6 lg:gap-10 mb-4 justify-center">
            {/* Credits for the art */}
            <div className="flex flex-col items-center gap-3 w-[50%]">
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
                                Vyeina
                            </a> */}
                  <p className="underline text-pink-400 poppins-extralight-italic">
                    Vyeina
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
          <div className="relative hidden sm:flex items-center justify-center flex-col md:flex-row">
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
      </motion.div>
    </div>
  );
};

export default Home;

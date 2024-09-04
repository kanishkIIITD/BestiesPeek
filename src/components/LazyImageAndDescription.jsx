import React from "react";
import bestieImage from "../assets/besties.jpg";
import albuterolBoysImage from "../assets/Albuterol Boys.png";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const LazyImageAndDescription = ({ tab, darkMode }) => {
    return (
        <div className="flex flex-col items-center w-11/12">
            <motion.div
                animate={{
                    scale: [1, 0.8, 1],
                }}
                transition={{ duration: 1 }}
            >
                <div>
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
            </motion.div>

            <div className="py-10 mb-10 text-center min-w-11/12">
                <h1
                    className={`text-2xl md:text-3xl font-bold ${
                        darkMode ? "text-lightgrey" : "text-darkgrey-500"
                    } mx-10`}
                >
                    <TypeAnimation
                        sequence={[
                            tab === "Besties"
                                ? "The Besties is a criminal gang founded on December 15th, 2023 by Fanny, Ming, and 4Head."
                                : tab === "Albuterol Boys"
                                ? "The Albuterol Boys are a sub-crew of Cypress lead by Cypress Captain Marty Banks."
                                : "",
                            1000,
                            tab === "Besties"
                                ? "Truth be told, the actual leader is The Great Future Hendrix. Keeping this gang together."
                                : tab === "Albuterol Boys"
                                ? "The Albuterol Boys are a sub-crew of Cypress lead by Cypress Captain Marty Banks."
                                : "",
                            1000,
                        ]}
                        wrapper="span"
                        speed={25}
                        style={{ display: "inline-block" }}
                        repeat={Infinity}
                    />
                </h1>
            </div>
        </div>
    );
};

export default LazyImageAndDescription;

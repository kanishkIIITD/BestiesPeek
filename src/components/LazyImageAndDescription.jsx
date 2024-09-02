import React from "react";
import bestieImage from "../assets/besties.jpg";
import albuterolBoysImage from "../assets/Albuterol Boys.png";

const LazyImageAndDescription = ({ tab, darkMode }) => {
    return (
        <div className="flex flex-col items-center w-full">
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

            <div className="py-10 mb-10 text-center ">
                <h1
                    className={`text-2xl md:text-3xl font-bold ${
                        darkMode ? "text-lightgrey" : "text-darkgrey-500"
                    } mx-10`}
                >
                    {tab === "Besties"
                        ? "The Besties is a criminal gang founded on December 15th, 2023 by Fanny, Ming, and 4Head."
                        : tab === "Albuterol Boys"
                        ? "The Albuterol Boys are a sub-crew of Cypress lead by Cypress Captain Marty Banks."
                        : ""}
                </h1>
            </div>
        </div>
    );
};

export default LazyImageAndDescription;

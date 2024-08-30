import "./App.css";
import { Navbar } from "./components/Navbar";
import { useState } from "react";
import bestieImage from "./assets/besties.jpg";
import albuterolBoysImage from "./assets/Albuterol Boys.png";
import { Cards } from "./components/Cards";

// import fetchStreamerData from "./api/fetchStreamerData";

function App() {
    const [tab, setTab] = useState("Besties"); // Besties, Albuterol Boys, Youtube Clips

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

    return (
        <div className={`w-full bg-pink-500 flex justify-center items-center `}>
            <div className="bg-white w-[95%] h-[95%] rounded-md my-2 flex flex-col items-center">
                <Navbar tab={tab} setTab={setTab} />

                <div className={`border-2 border-pink-500 mb-4 w-full`}></div>

                {tab === "Besties" || tab === "Albuterol Boys" ? (
                    <div className="flex flex-col items-center">
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
                            />
                        </div>

                        <div className="mb-10 text-center">
                            <h1 className="text-3xl font-bold text-darkgrey-500">
                                {tab === "Besties"
                                    ? "The Besties is a criminal gang founded on December 15th, 2023 by Fanny, Ming, and 4Head."
                                    : tab === "Albuterol Boys"
                                    ? "The Albuterol Boys are a sub-crew of Cypress lead by Cypress Captain Marty Banks."
                                    : ""}
                            </h1>
                        </div>

                        <div
                            className={`border-2 border-pink-500 mb-4 w-full`}
                        ></div>

                        <div>
                            <Cards
                                streamers={
                                    tab === "Besties" ? besties : Albuterol_Boys
                                }
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;

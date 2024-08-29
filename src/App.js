import "./App.css";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import bestieImage from "./assets/besties.jpg";
import albuterolBoysImage from "./assets/Albuterol Boys.png";
import { Cards } from "./components/Cards";
import axios from "axios";

function App() {
    const [tab, setTab] = useState("Besties"); // Besties, Albuterol Boys, Youtube Clips
    const [streamers, setStreamers] = useState([]);

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
            "713Stew",
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

    const fetchStreamerData = async (streamers) => {
        if (!streamers || streamers.length === 0) {
            console.log("Provided streamers array is empty");
            return;
        }

        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const response = await axios.post(
                `${baseUrl}/getStreamerData`,
                streamers
            );
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log("Error while fetching:", error);
        }
    };

    useEffect(() => {
        const bestiesStreamers = [
            ...besties.leaders,
            ...besties.ogs,
            ...besties.members,
            ...besties.pet,
            ...besties.hangarounds,
        ];
        const albuterolBoysStreamers = [
            ...Albuterol_Boys.leaders,
            ...Albuterol_Boys.ogs,
            ...Albuterol_Boys.members,
        ];

        const loadStreamers = async () => {
            const streamers =
                tab === "Besties" ? bestiesStreamers : albuterolBoysStreamers;
            const data = await fetchStreamerData(streamers);
            setStreamers(data);
            console.log(data);
        };

        loadStreamers();
    }, [tab]);

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

                        <div className="mb-10 ">
                            <h1 className="text-3xl font-bold text-darkgrey-500">
                                {tab === "Besties"
                                    ? "The Besties is a criminal gang founded on December 15th, 2023 by Fanny, Ming, and 4Head."
                                    : tab === "Albuterol Boys"
                                    ? "The Albuterol Boys are a sub-crew of Cypress lead by Cypress Captain Marty Banks."
                                    : ""}
                            </h1>
                        </div>

                        <div>
                            <h2>Leaders</h2>
                            <Cards
                                leaders={
                                    tab === "Besties"
                                        ? besties.leaders
                                        : Albuterol_Boys.leaders
                                }
                            />
                        </div>

                        <div>
                            <h2>OG Members</h2>
                            <Cards
                                ogs={
                                    tab === "Besties"
                                        ? besties.ogs
                                        : Albuterol_Boys.ogs
                                }
                            />
                        </div>

                        <div>
                            <h2>Members</h2>
                            <Cards
                                members={
                                    tab === "Besties"
                                        ? besties.members
                                        : Albuterol_Boys.members
                                }
                            />
                        </div>

                        {tab === "Besties" ? (
                            <div>
                                <div>
                                    <h2>Pets</h2>
                                    <Cards pet={besties.pet} />
                                </div>
                                <div>
                                    <h2>HangArounds</h2>
                                    <Cards hangarounds={besties.hangarounds} />
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;

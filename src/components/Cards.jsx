import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import fetchStreamerData from "../api/fetchStreamerData";
import OfflineCard from "./OfflineCard";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import kittensImg from "../assets/kittens.jpg";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

const kittens = [
    "caramel",
    "kyle",
    "razzy",
    "slightlypoetic",
    "harmless_",
    "thatguygp",
    "dripp",
];

export const Cards = ({ streamers, tab, darkMode }) => {
    const [liveStreamers, setLiveStreamers] = useState({});
    const [offlineStreamers, setOfflineStreamers] = useState({});
    const [sort, setSort] = useState("All");
    const [viewerCountSortOrder, setViewerCountSortOrder] = useState("desc");
    const [showSortingButtons, setShowSortingButtons] = useState(false);

    useEffect(() => {
        setSort("All");

        setShowSortingButtons(false);

        const streamersArray = Object.values(streamers).flat();
        // console.log("streamersArray", streamersArray);
        fetchStreamerData(streamersArray).then((data) => {
            // console.log("data", data);
            const live = {};
            const offline = {};

            // Group streamers by their roles and status
            Object.keys(streamers).forEach((role) => {
                live[role] = [];
                offline[role] = [];

                streamers[role].forEach((streamerName) => {
                    const streamerData = data.find(
                        (s) =>
                            s.user_name.toUpperCase() ===
                            streamerName.toUpperCase()
                    );
                    if (streamerData && streamerData.is_live) {
                        live[role].push(streamerData);
                    } else {
                        offline[role].push({
                            user_name: streamerName.toUpperCase(),
                            user_login: streamerName.toLowerCase(),
                        });
                    }
                });
            });
            setLiveStreamers(live);
            setOfflineStreamers(offline);
        });
    }, [streamers, tab]);

    useEffect(() => {});

    return (
        <div className="w-full">
            <div className="flex items-center gap-5 ml-10 mb-5 h-fit">
                <button
                    className={`text-black font-bold transition-all duration-300 p-[10px] h-fit ${
                        darkMode ? "text-white" : "text-black"
                    }`}
                    onClick={() => {
                        setShowSortingButtons(!showSortingButtons);
                    }}
                >
                    {showSortingButtons ? (
                        <AiOutlineClose size={30} />
                    ) : (
                        <MdMenuOpen size={30} />
                    )}
                </button>
                <div
                    className={` ${
                        showSortingButtons
                            ? "visible  opacity-100 !important"
                            : "invisible  opacity-0 !important"
                    } flex flex-wrap justify-center gap-5  transition-all duration-300`}
                >
                    <button
                        onClick={() => setSort("All")}
                        className={`sorting-buttons ${
                            darkMode &&
                            "bg-buttonGrey text-white sorting-buttons-dark"
                        } ${
                            sort === "All" && "active bg-pink-600 border-white"
                        } `}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSort("Live")}
                        className={`sorting-buttons ${
                            sort === "Live" && "active bg-pink-600 border-white"
                        } ${
                            darkMode &&
                            "bg-buttonGrey text-white sorting-buttons-dark"
                        }`}
                    >
                        Live
                    </button>
                    <button
                        onClick={() => setSort("Offline")}
                        className={`sorting-buttons ${
                            sort === "Offline" &&
                            "active bg-pink-600 border-white"
                        } ${
                            darkMode &&
                            "bg-buttonGrey text-white sorting-buttons-dark"
                        }`}
                    >
                        Offline
                    </button>
                    <button
                        onClick={() => {
                            if (sort === "Viewer Count") {
                                setViewerCountSortOrder(
                                    viewerCountSortOrder === "desc"
                                        ? "asc"
                                        : "desc"
                                );
                            }
                            setSort("Viewer Count");
                        }}
                        className={`sorting-buttons ${
                            sort === "Viewer Count" &&
                            "active bg-pink-600 border-white"
                        } ${
                            darkMode &&
                            "bg-buttonGrey text-white sorting-buttons-dark"
                        }`}
                    >
                        Viewers{" "}
                        {viewerCountSortOrder === "desc" ? (
                            <FaArrowDownLong />
                        ) : (
                            <FaArrowUpLong />
                        )}
                    </button>
                    <button
                        onClick={() => setSort("Leaders")}
                        className={`sorting-buttons ${
                            sort === "Leaders" &&
                            "active bg-pink-600 border-white"
                        } ${
                            darkMode &&
                            "bg-buttonGrey text-white sorting-buttons-dark"
                        }`}
                    >
                        Leaders
                    </button>
                    <button
                        onClick={() => setSort("OGs")}
                        className={`sorting-buttons ${
                            sort === "OGs" && "active bg-pink-600 border-white"
                        } ${
                            darkMode &&
                            "bg-buttonGrey text-white sorting-buttons-dark"
                        }`}
                    >
                        OGs
                    </button>
                    <button
                        onClick={() => setSort("Members")}
                        className={`sorting-buttons ${
                            sort === "Members" &&
                            "active bg-pink-600 border-white"
                        } ${
                            darkMode &&
                            "bg-buttonGrey text-white sorting-buttons-dark"
                        }`}
                    >
                        Members
                    </button>
                    {tab === "Besties" && (
                        <>
                            <button
                                onClick={() => setSort("Pet")}
                                className={`sorting-buttons ${
                                    sort === "Pet" &&
                                    "active bg-pink-600 border-white"
                                } ${
                                    darkMode &&
                                    "bg-buttonGrey text-white sorting-buttons-dark"
                                }`}
                            >
                                Pet
                            </button>
                            <button
                                onClick={() => setSort("Hangarounds")}
                                className={`sorting-buttons ${
                                    sort === "Hangarounds" &&
                                    "active bg-pink-600 border-white"
                                } ${
                                    darkMode &&
                                    "bg-buttonGrey text-white sorting-buttons-dark"
                                }`}
                            >
                                Hangarounds
                            </button>
                            <button
                                onClick={() => setSort("Kittens")}
                                className={`sorting-buttons ${
                                    sort === "Kittens" &&
                                    "active bg-pink-600 border-white"
                                } ${
                                    darkMode &&
                                    "bg-buttonGrey text-white sorting-buttons-dark"
                                }`}
                            >
                                Kittens
                            </button>
                        </>
                    )}
                </div>
            </div>

            {sort === "All" &&
                Object.keys(streamers).map((role) => (
                    <div
                        key={role}
                        className="role-section flex flex-col items-center"
                    >
                        <h2
                            className={`text-3xl font-bold underline ${
                                darkMode ? "text-white" : ""
                            }`}
                        >
                            {role.toUpperCase()}
                        </h2>
                        <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                            {liveStreamers[role]?.map((streamerData) => (
                                <Card
                                    key={streamerData.streamer_id}
                                    streamerData={streamerData}
                                    darkMode={darkMode}
                                />
                            ))}
                            {offlineStreamers[role]?.map((streamerData) => (
                                <OfflineCard
                                    key={streamerData.user_name}
                                    streamerData={streamerData}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>
                    </div>
                ))}

            {sort === "Live" &&
                Object.keys(streamers).map((role) => (
                    <div
                        key={role}
                        className="role-section flex flex-col items-center"
                    >
                        {liveStreamers[role]?.length > 0 && (
                            <>
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}

            {sort === "Offline" &&
                Object.keys(streamers).map((role) => (
                    <div
                        key={role}
                        className="role-section flex flex-col items-center"
                    >
                        {offlineStreamers[role]?.length > 0 && (
                            <>
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}

            {sort === "Leaders" &&
                Object.keys(streamers).map(
                    (role) =>
                        role === "leaders" && (
                            <div
                                key={role}
                                className="role-section flex flex-col items-center"
                            >
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )
                )}

            {sort === "OGs" &&
                Object.keys(streamers).map(
                    (role) =>
                        role === "ogs" && (
                            <div
                                key={role}
                                className="role-section flex flex-col items-center"
                            >
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )
                )}

            {sort === "Members" &&
                Object.keys(streamers).map(
                    (role) =>
                        role === "members" && (
                            <div
                                key={role}
                                className="role-section flex flex-col items-center"
                            >
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )
                )}

            {sort === "Pet" &&
                Object.keys(streamers).map(
                    (role) =>
                        role === "pet" && (
                            <div
                                key={role}
                                className="role-section flex flex-col items-center"
                            >
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )
                )}

            {sort === "Hangarounds" &&
                Object.keys(streamers).map(
                    (role) =>
                        role === "hangarounds" && (
                            <div
                                key={role}
                                className="role-section flex flex-col items-center"
                            >
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )
                )}

            {sort === "Viewer Count" &&
                Object.keys(streamers).map((role) => (
                    <div
                        key={role}
                        className="role-section flex flex-col items-center"
                    >
                        {liveStreamers[role]?.length > 0 && (
                            <>
                                <h2
                                    className={`text-3xl font-bold underline ${
                                        darkMode ? "text-white" : ""
                                    }`}
                                >
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]
                                        ?.sort((a, b) => {
                                            return viewerCountSortOrder ===
                                                "desc"
                                                ? b.stream_info.viewer_count -
                                                      a.stream_info.viewer_count
                                                : a.stream_info.viewer_count -
                                                      b.stream_info
                                                          .viewer_count;
                                        })
                                        ?.map((streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                                darkMode={darkMode}
                                            />
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}

            <div className="flex flex-col items-center ">
                {sort === "Kittens" && tab === "Besties" && (
                    <div
                        // style={{ "--image-url": `url(${kittensImg})` }}
                        className="flex flex-col lg:flex-row items-center gap-4 mt-10 mx-10"
                    >
                        <img
                            src={kittensImg}
                            alt="kittens"
                            className="rounded-full w-2/3"
                            loading="lazy"
                        />
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-pink-500 opacity-75 italic">
                            Kitten maintenance fees paid in full. Treats and
                            snuggles forthcoming. 🐱
                        </p>
                    </div>
                )}

                {sort === "Kittens" && (
                    <div className="flex flex-wrap justify-center gap-10 px-20 mt-10">
                        {Object.values(liveStreamers)
                            .flat()
                            .filter((streamerData) =>
                                kittens.includes(streamerData.user_login)
                            )
                            .map((streamerData) => (
                                <div
                                    className="flex justify-center w-fit"
                                    key={streamerData.streamer_id}
                                >
                                    <Card
                                        streamerData={streamerData}
                                        darkMode={darkMode}
                                    />
                                </div>
                            ))}
                    </div>
                )}

                {sort === "Kittens" && (
                    <div className="flex flex-wrap justify-center gap-10 px-20 my-10">
                        {Object.values(offlineStreamers)
                            .flat()
                            .filter((streamerData) =>
                                kittens.includes(streamerData.user_login)
                            )
                            .map((streamerData) => (
                                <div
                                    className="flex justify-center w-fit"
                                    key={streamerData.streamer_id}
                                >
                                    <OfflineCard
                                        streamerData={streamerData}
                                        darkMode={darkMode}
                                    />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

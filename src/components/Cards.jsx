import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import fetchStreamerData from "../api/fetchStreamerData";
import OfflineCard from "./OfflineCard";

const kittens = [
    "caramel",
    "kyle",
    "razzy",
    "slightlypoetic",
    "harmless_",
    "thatguygp",
    "dripp",
];

export const Cards = ({ streamers, tab }) => {
    const [liveStreamers, setLiveStreamers] = useState({});
    const [offlineStreamers, setOfflineStreamers] = useState({});
    const [sort, setSort] = useState("All");
    const [viewerCountSortOrder, setViewerCountSortOrder] = useState("desc");

    useEffect(() => {
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
    }, [streamers]);

    return (
        <div className="w-full relative">
            <div className="flex gap-5 absolute top-0 left-0 flex-col">
                <button onClick={() => setSort("All")}>All</button>
                <button onClick={() => setSort("Live")}>Live</button>
                <button onClick={() => setSort("Offline")}>Offline</button>
                <button
                    onClick={() => {
                        if (sort === "Viewer Count") {
                            setViewerCountSortOrder(
                                viewerCountSortOrder === "desc" ? "asc" : "desc"
                            );
                        }
                        setSort("Viewer Count");
                    }}
                >
                    Viewer Count
                </button>
                <button onClick={() => setSort("Leaders")}>Leaders</button>
                <button onClick={() => setSort("OGs")}>OGs</button>
                <button onClick={() => setSort("Members")}>Members</button>
                {tab === "Besties" && (
                    <>
                        <button onClick={() => setSort("Pet")}>Pet</button>
                        <button onClick={() => setSort("Hangarounds")}>
                            Hangarounds
                        </button>
                        <button onClick={() => setSort("Kittens")}>
                            Kittens
                        </button>
                    </>
                )}
            </div>

            {sort === "All" &&
                Object.keys(streamers).map((role) => (
                    <div
                        key={role}
                        className="role-section flex flex-col items-center"
                    >
                        <h2 className="text-3xl font-bold underline">
                            {role.toUpperCase()}
                        </h2>
                        <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                            {liveStreamers[role]?.map((streamerData) => (
                                <Card
                                    key={streamerData.streamer_id}
                                    streamerData={streamerData}
                                />
                            ))}
                            {offlineStreamers[role]?.map((streamerData) => (
                                <OfflineCard
                                    key={streamerData.user_name}
                                    streamerData={streamerData}
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
                        {liveStreamers[role].length > 0 && (
                            <>
                                <h2 className="text-3xl font-bold underline">
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
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
                        {offlineStreamers[role].length > 0 && (
                            <>
                                <h2 className="text-3xl font-bold underline">
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
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
                                <h2 className="text-3xl font-bold underline">
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
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
                                <h2 className="text-3xl font-bold underline">
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
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
                                <h2 className="text-3xl font-bold underline">
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
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
                                <h2 className="text-3xl font-bold underline">
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
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
                                <h2 className="text-3xl font-bold underline">
                                    {role.toUpperCase()}
                                </h2>
                                <div className="streamer-cards flex flex-wrap gap-10 my-10 justify-center">
                                    {liveStreamers[role]?.map(
                                        (streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                            />
                                        )
                                    )}
                                    {offlineStreamers[role]?.map(
                                        (streamerData) => (
                                            <OfflineCard
                                                key={streamerData.user_name}
                                                streamerData={streamerData}
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
                        {liveStreamers[role].length > 0 && (
                            <>
                                <h2 className="text-3xl font-bold underline">
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
                                        .map((streamerData) => (
                                            <Card
                                                key={streamerData.streamer_id}
                                                streamerData={streamerData}
                                            />
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}

            <div className="flex flex-col items-center">
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
                                    <Card streamerData={streamerData} />
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
                                    <OfflineCard streamerData={streamerData} />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

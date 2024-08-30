import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import fetchStreamerData from "../api/fetchStreamerData";
import OfflineCard from "./OfflineCard";

export const Cards = ({ streamers }) => {
    const [liveStreamers, setLiveStreamers] = useState({});
    const [offlineStreamers, setOfflineStreamers] = useState({});

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
        <div>
            {Object.keys(streamers).map((role) => (
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
        </div>
    );
};

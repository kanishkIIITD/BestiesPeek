import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";

async function fetchApiData(user_login) {
    let baseURL = "https://api.twitch.tv/helix/streams/";

    // const queryString = qs.stringify(
    //     {
    //         user_login: user_login,
    //     },
    //     {
    //         indices: false,
    //     }
    // );
    // console.log(queryString)

    // const url = `${baseURL}?${queryString}`;

    const url = `${baseURL}?user_login=${user_login}`;

    const response = await axios.get(url, {
        headers: {
            "Client-ID": process.env.REACT_APP_CLIENT_ID,
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
    });
    console.log("Request sent to Twitch API");
    return response;
}

async function getStreams(streamers) {
    let result;

    try {
        result = await fetchApiData(streamers);
        if (!result) throw new Error("No data found");
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
    return result;
}

export const Card = ({ streamer }) => {
    let result;
    setTimeout(() => {
        result = getStreams(streamer);
    }, 2000);

    console.log(result);
    return (
        <div className="border border-red-500 w-10 h-10">
            <div>
                <img src="" alt="" />
            </div>

            <div>
                {/* name */}
                {/* isLive */}
            </div>

            <div>{/* <p>{result.game_name}</p> */}</div>

            <div>{/* Title */}</div>
        </div>
    );
};

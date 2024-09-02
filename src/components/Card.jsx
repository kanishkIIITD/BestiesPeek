import React from "react";

export const Card = ({ streamerData, darkMode }) => {
    // console.log(streamerData);

    const width = 300; // desired width
    const height = 200; // desired height

    const thumbnailUrl = streamerData?.stream_info?.thumbnail_url
        ? streamerData.stream_info.thumbnail_url
              .replace("{width}", width)
              .replace("{height}", height)
        : "";

    return (
        <div className="">
            <a href={streamerData.channel_url} target="_blank" rel="noreferrer">
                <div
                    className={`shadow-md shadow-gray-500 shadow-blur-md card h-[330px] w-[240px] md:h-[360px] md:w-[300px] flex flex-col justify-between p-2 border ${
                        darkMode
                            ? "border-cardDark1 bg-cardDark2"
                            : "border-cardLight1 bg-cardLight2"
                    } rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:scale-105 hover:shadow-2xl hover:shadow-gray-500 hover:shadow-blur transition-all duration-200`}
                >
                    <img
                        src={thumbnailUrl}
                        alt={streamerData.user_name || "Streamer"}
                        className="w-full h-[135px] md:h-[170px] object-cover"
                        loading="lazy"
                    />
                    <div className="card-body flex flex-col p-2">
                        <h3
                            className={`${
                                darkMode ? "text-lightblue1" : "text-darkBlue"
                            } font-semibold whitespace-nowrap overflow-hidden font-500 my-2 mt-4 mb-1 leading-tight`}
                        >
                            {streamerData.user_name || "Unknown Streamer"}
                        </h3>
                        <p
                            className={`${
                                darkMode ? "text-lightblue2" : "text-darkBlue1"
                            } text-sm`}
                        >
                            {streamerData?.stream_info?.stream_title ||
                                "No Title Available"}
                        </p>
                        <div className="viewer-count font-bold text-red-700 text-sm">
                            {streamerData?.stream_info?.viewer_count ?? 0}{" "}
                        </div>
                    </div>
                    <div
                        className={`game-name ${
                            darkMode ? "text-lightgrey" : "text-darkgrey2"
                        }`}
                    >
                        {streamerData?.stream_info?.game_name || "Unknown Game"}
                    </div>
                </div>
            </a>
        </div>
    );
};

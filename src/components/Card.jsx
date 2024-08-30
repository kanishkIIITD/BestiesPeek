import React from "react";

export const Card = ({ streamerData }) => {
    // console.log(streamerData);

    const width = 1920; // desired width
    const height = 1080; // desired height
    return (
        <div className="">
            <a href={streamerData.channel_url} target="_blank" rel="noreferrer">
                <div className="shadow-md shadow-gray-500 shadow-blur-md card h-[330px] w-[240px] md:h-[360px] md:w-[300px] flex flex-col justify-between p-2 border border-[#ccc] bg-[#f2f2f2] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:scale-105 hover:shadow-2xl hover:shadow-gray-500 hover:shadow-blur transition-all duration-200">
                    <img
                        src={streamerData?.stream_info?.thumbnail_url
                            .replace("{width}", width)
                            .replace("{height}", height)}
                        alt={streamerData.user_name}
                        className="w-full h-[135px] md:h-[170px] object-cover"
                    />
                    <div className="card-body flex flex-col p-2">
                        <h3 className="text-[#000080] font-semibold whitespace-nowrap overflow-hidden font-500 my-2 mt-4 mb-1 leading-tight">
                            {streamerData.user_name}
                        </h3>
                        <p className="text-[#0000ff] text-sm">
                            {streamerData?.stream_info?.stream_title}
                        </p>
                        <div className="viewer-count font-bold text-[#ff0000] text-sm">
                            {streamerData?.stream_info?.viewer_count}
                        </div>
                    </div>
                    <div className="game-name text-[#555555] ">
                        {streamerData?.stream_info?.game_name}
                    </div>
                </div>
            </a>
        </div>
    );
};

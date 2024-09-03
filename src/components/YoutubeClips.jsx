import React, { useEffect, useState } from "react";
import axios from "axios";

const YoutubeClips = ({ darkMode }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [channelId, setChannelId] = useState("UCYQU03gx1mhSVWqjx00xZ-A");
    // const [nextPageToken, setNextPageToken] = useState("");
    // const [prevPageToken, setPrevPageToken] = useState("");

    const fetchVideos = async () => {
        setIsLoading(true);

        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const response = await axios.get(
                `${baseUrl}/youtube/channel/${channelId}/videos`
            );

            // console.log(response);
            // setVideos(response.data.data.videos.items);
            setVideos(response.data.data.videos.items);
            // setNextPageToken(response.data.data.videos.nextPageToken);
            // setPrevPageToken(response.data.data.videos.prevPageToken);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchVideos();
    }, [channelId]);

    // console.log("videos", videos);
    // console.log("pageToken", nextPageToken);
    // console.log("prevPageToken", prevPageToken);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            {isLoading ? (
                <div className="spinner "></div>
            ) : (
                <>
                    <div
                        className={`flex gap-4 rounded-xl bg-pink-500 text-white p-1 sm:p-2 md:p-3 h-fit mb-5`}
                    >
                        <button
                            onClick={() =>
                                setChannelId("UCYQU03gx1mhSVWqjx00xZ-A")
                            }
                            className={`${
                                channelId === "UCYQU03gx1mhSVWqjx00xZ-A"
                                    ? "bg-pink-300 scale-110 text-darkgrey-500"
                                    : ""
                            }  rounded-xl p-2  hover:bg-pink-300 font-semibold transition-all duration-200`}
                        >
                            GG EZ
                        </button>
                        <button
                            onClick={() =>
                                setChannelId("UCb50IsUzv66KZZsPO4TeEZw")
                            }
                            className={`${
                                channelId === "UCb50IsUzv66KZZsPO4TeEZw"
                                    ? "bg-pink-300 scale-110 text-darkgrey-500"
                                    : ""
                            }  rounded-xl p-2  hover:bg-pink-300 font-semibold transition-all duration-200`}
                        >
                            NoPixel Clips
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {videos &&
                            videos?.map((video) => (
                                <div
                                    key={video.videoId}
                                    className="flex flex-col items-center border-2 border-pink-500 rounded-xl p-5 lg:mx-5 xl:mx-10"
                                >
                                    <h3
                                        dangerouslySetInnerHTML={{
                                            __html: video.videoTitle,
                                        }}
                                        className={`w-2/3 md:text-base xl:text-xl font-bold text-center ${
                                            darkMode
                                                ? "text-white"
                                                : "text-black"
                                        } mb-4`}
                                    ></h3>
                                    <img
                                        src={video.thumbnailUrl}
                                        alt={video.videoTitle}
                                        height={480}
                                        width={360}
                                        className="rounded-xl mb-3"
                                        loading="lazy"
                                    />
                                    <a
                                        href={video.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-center border rounded-xl p-2  mt-2 hover:scale-110 font-semibold transition-all duration-200 ${
                                            darkMode
                                                ? "text-white border-white"
                                                : "text-black border-black"
                                        }`}
                                    >
                                        Watch Video
                                    </a>
                                </div>
                            ))}
                    </div>

                    {/* <div>
                        {nextPageToken && (
                            <button
                                className={`text-center border rounded-xl p-2  mt-2 hover:scale-110 font-semibold transition-all duration-200 ${
                                    darkMode
                                        ? "text-white border-white"
                                        : "text-black border-black"
                                }`}
                                onClick={() => {
                                    // setNextPageToken(
                                    //     videos?.videos?.nextPageToken
                                    // );
                                    console.log(videos);
                                }}
                            >
                                Next
                            </button>
                        )}
                        {prevPageToken && (
                            <button
                                className={`text-center border rounded-xl p-2  mt-2 hover:scale-110 font-semibold transition-all duration-200 ${
                                    darkMode
                                        ? "text-white border-white"
                                        : "text-black border-black"
                                }`}
                                onClick={() => {
                                    setPrevPageToken(
                                        videos?.videos?.prevPageToken
                                    );
                                    console.log(videos?.videos?.prevPageToken);
                                }}
                            >
                                Prev
                            </button>
                        )}
                    </div> */}
                </>
            )}
        </div>
    );
};

export default YoutubeClips;

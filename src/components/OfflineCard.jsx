import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchUserData = async (streamerName) => {
    try {
        const baseUrl = "https://api.twitch.tv/helix/users";
        const result = await axios.get(`${baseUrl}?login=${streamerName}`, {
            headers: {
                "Client-ID": process.env.REACT_APP_CLIENT_ID,
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        });
        // console.log(result.data.data[0]);
        return result.data.data[0];
    } catch (error) {
        console.log("Error while fetching:", error);
    }
};

const OfflineCard = ({ streamerData }) => {
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (streamerData) {
            setLoading(true);
            fetchUserData(streamerData.user_name).then((data) => {
                setResult(data);
                // console.log(data);
            });
            setLoading(false);
        }
    }, [streamerData]);
    // console.log(result);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="shadow-md shadow-gray-500 shadow-blur-md card h-[330px] w-[240px] md:h-[360px] md:w-[300px] flex flex-col p-2 border border-[#aaa] bg-[#e5e5e5] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:scale-105 hover:shadow-2xl hover:shadow-gray-500 hover:shadow-blur transition-all duration-200">
            {loading ? (
                <div class="spinner"></div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full gap-10">
                    <div>
                        <img
                            src={result?.profile_image_url}
                            alt={result?.display_name}
                            className="rounded-full w-[150px] h-[150px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-[#000080] font-bold">
                            {result?.display_name}
                        </h3>
                        <p className="font-semibold">Offline</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfflineCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const fetchUserData = async (streamerName) => {
    try {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        const result = await axios.post(`${baseUrl}/users`, { streamerName });
        return result.data.data;
    } catch (error) {
        console.log("Error while fetching:", error);
        return null;
    }
};

const OfflineCard = ({ streamerData, darkMode }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (streamerData) {
            setLoading(true);
            fetchUserData(streamerData.user_name).then((data) => {
                setResult(data);
                // console.log(data);
                setLoading(false);
            });
        }
    }, [streamerData]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <div
                className={`shadow-md shadow-gray-500 shadow-blur-md card h-[330px] w-[240px] md:h-[360px] md:w-[300px] flex flex-col p-2 border ${
                    darkMode
                        ? "border-cardDark1 bg-cardDark2"
                        : "border-cardLight1 bg-cardLight2"
                } rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:scale-105 hover:shadow-2xl hover:shadow-gray-500 hover:shadow-blur transition-all duration-200`}
            >
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-10">
                        <div>
                            <img
                                src={result?.profile_image_url || ""}
                                alt={result?.user_name || "Streamer"}
                                className="rounded-full w-[150px] h-[150px] object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <h3
                                className={`${
                                    darkMode ? "text-white" : "text-darkBlue"
                                } font-bold`}
                            >
                                {result?.user_name || "Unknown Streamer"}
                            </h3>
                            <p
                                className={`font-semibold ${
                                    darkMode ? "text-lightgrey" : ""
                                }`}
                            >
                                Offline
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default OfflineCard;

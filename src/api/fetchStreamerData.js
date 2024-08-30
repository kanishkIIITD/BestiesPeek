import axios from "axios";

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
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log("Error while fetching:", error);
    }
};

export default fetchStreamerData;

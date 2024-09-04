import React, { lazy, Suspense } from "react";
import { Cards } from "./Cards";

const LazyImageAndDescription = lazy(() => import("./LazyImageAndDescription"));

const AlbuterolBoys = ({ tab, darkMode }) => {
    const Albuterol_Boys = {
        leaders: ["omie"],
        ogs: ["ripoozi", "ZayTyree"],
        members: [
            // "713Stew",
            "TylerTR",
            "mfWarlock",
            "hazan_n",
            "xDavidoh",
            "Either",
            "Baddy",
            "tjnv_",
            "NapoleonsLive",
        ],
    };
    return (
        <div className="w-full">
            <div className="flex flex-col items-center w-full">
                <Suspense fallback={<div className="spinner"></div>}>
                    <LazyImageAndDescription tab={tab} darkMode={darkMode} />
                </Suspense>

                <div className={`border-2 border-pink-500 mb-4 w-full`}></div>

                <div className={`relative w-full `}>
                    <Cards
                        streamers={Albuterol_Boys}
                        tab={tab}
                        darkMode={darkMode}
                    />
                </div>
            </div>
        </div>
    );
};

export default AlbuterolBoys;

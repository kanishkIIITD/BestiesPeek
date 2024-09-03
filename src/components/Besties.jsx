import React, { lazy, Suspense } from "react";
import { Cards } from "./Cards";

const LazyImageAndDescription = lazy(() => import("./LazyImageAndDescription"));

const Besties = ({ tab, darkMode }) => {
    const besties = {
        leaders: ["4head", "ming", "nidas"],
        ogs: ["fanfan", "travpiper", "caramel"],
        members: [
            "julian",
            "TheDoubles",
            "zuck",
            "jack",
            "razzy",
            "SlightlyPoetic",
            "kyle",
            "harmless_",
            "mdrakoo",
            "SimplessR6",
            "manax321",
        ],
        pet: ["ThatGuyGP"],
        hangarounds: ["dripp", "ChopoNZ", "Stuply", "RissahBear", "Kameu"],
    };
    return (
        <div>
            <div className="flex flex-col items-center w-full">
                <Suspense fallback={<div className="spinner"></div>}>
                    <LazyImageAndDescription tab={tab} darkMode={darkMode} />
                </Suspense>

                <div className={`border-2 border-pink-500 mb-4 w-full`}></div>

                <div className={`relative w-full `}>
                    <Cards streamers={besties} tab={tab} darkMode={darkMode} />
                </div>
            </div>
        </div>
    );
};

export default Besties;

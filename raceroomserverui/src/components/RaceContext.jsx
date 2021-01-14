import React, {createContext, useState} from "react";

export const RaceContext = createContext({
    region: 1,
    races: []
});

export const RaceProvider = props => {
    const [data, setData] = useState({
        region: 1,
        races: []
    });

    return (
        <RaceContext.Provider value={[data, setData]}>
            {props.children}
        </RaceContext.Provider>
    )
};

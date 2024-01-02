//context <API></>
// usecontext hooks

// context(wirehouse)
// provider (delivery boy role)
// consumer / (usecontext())
import React, { useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=6c74bf10`;

const AppContext = React.createContext();

// we need to create a provider func

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setisError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState("titanic");


    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false);
                setisError({ show: "false", msg:"" });
                setMovie(data.Search);
            } else {
                setisError({ show: "true", msg: data.Error });
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 500);

        return () => clearTimeout(timerOut);

    }, [query]);

    return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
        {children}
    </AppContext.Provider>
};

// global context hooks

const useGlobalContext = () => {
    return useContext(AppContext);
}


export { AppContext, AppProvider, useGlobalContext };
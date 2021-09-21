import {useEffect, useState} from "react";

function useFetch (url) {

    const [state, setState] = useState({data: null, loading: true});

    useEffect(() => {
        // this way is fine but when the url changed and the data reseted here (line 13) and then changed (line 18)
        // this process wasnt instanteneous, we could see a lag, it wasnt smooth
        // setState({data: null, loading:  true});
        // this way below is always the best way, because we guarantee to getthe latest updated state
        // after this it got smooth
        setState(state => ({data: state.data, loading:  true}));
        fetch(url)
            // it is usually .json because we reive a json, but in this case its a text file
            .then(x => x.text())
            .then(y => {
                setState({data: y, loading: false});
            });
    }, [url, setState]);

    return state 
}

export default useFetch
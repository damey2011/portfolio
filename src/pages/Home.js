import React from 'react';
import {MenuContext} from "../contexts";

const Home = (props) => {
    const {setMenuTitle} = React.useContext(MenuContext);

    React.useEffect(() => {
        setMenuTitle('Home')
    })

    return (
        <>

        </>
    );
};

export default Home;
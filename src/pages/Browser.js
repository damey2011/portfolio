import React from 'react';
import Window from "../components/Window";

const Browser = (props) => {
    let parsedParams = new URLSearchParams(props.location.search);
    let page = parsedParams.get('page') ? parsedParams.get('page') : 'https://google.com';
    let title = parsedParams.get('title') ? parsedParams.get('title') : 'View Page';

    return (
        <Window title={title} menuTitle="Resume">
            <iframe width="100%" height="100%" className="min-h-1/2 h-full" src={page} frameBorder="0" title={title}/>
        </Window>
    );
};

export default Browser;
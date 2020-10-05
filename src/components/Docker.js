import React from 'react';
import {Link} from "react-router-dom";

function Docker(props) {
    return (
        <div className="absolute bottom-0 docker left-1/2 transform -translate-x-1/2 bg-back-secondary rounded-t-md border-black mx-auto border border-writing-secondary">
            <ul className="list-none flex">
                <Link to="/" className="fas fa-home text-2xl p-5 text-writing-secondary hover:text-writing-primary" data-tip="Home"> </Link>
                <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/nifemi" className="fab fa-linkedin text-2xl p-5 text-writing-secondary hover:text-writing-primary" data-tip="LinkedIn"> </a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/damey2011" className="fab fa-github text-2xl p-5 text-writing-secondary hover:text-writing-primary" data-tip="Github"> </a>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/theoluwanifemi" className="fab fa-twitter text-2xl p-5 text-writing-secondary hover:text-writing-primary" data-tip="Twitter"> </a>
            </ul>
        </div>
    );
}

export default Docker;
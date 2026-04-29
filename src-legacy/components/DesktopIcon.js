import React from 'react';
import {Link} from "react-router-dom";

function A (props) {
    return (
        <a {...{...props, href: props.to, target: "_blank"}} rel="noopener noreferrer">{props.children}</a>
    )
}

function DesktopIcon(props) {
    const LinkComponent = props.as === 'external' ? A : Link;
    return (
        <LinkComponent to={props.link} className="p-3 md:p-5 text-writing-primary text-center hover:bg-back-secondary hover:border-2 border-black rounded-md focus:bg-back-primary" tabIndex={1}>
            <div className={`text-gray-200 shadow-sm fa-5x ${props.icon || `fas fa-folder`}`}/>
            <div className="text-sm text-gray-400">{props.name}</div>
        </LinkComponent>
    );
}

export default DesktopIcon;
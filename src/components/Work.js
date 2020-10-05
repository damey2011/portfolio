import React from 'react';
import Tag from "./Tag";

const Work = ({place, designation, time, description, color, tags, icon}) => {
    return (
        <li className="shadow-sm p-8 border-gray-100 mb-5 flex">
            <div className="mr-8">
                <span className={`fas fa-${icon || 'toolbox'} fa-3x text-${color}-400`}/>
            </div>
            <div className="flex-1">
                <div className="font-extrabold my-1 text-lg">{place}</div>
                <div className="tracking-wider uppercase text-xs mb-1 text-gray-500">{designation}</div>
                <div className="my-1 text-xs text-writing-secondary">{time}</div>
                <div dangerouslySetInnerHTML={{__html: description}} className="my-1"/>
                <div className="flex flex-wrap">
                    {
                        tags.map((tag, index) => (
                            <Tag title={tag} key={index}/>
                        ))
                    }
                </div>
            </div>
        </li>
    );
};

export default Work;
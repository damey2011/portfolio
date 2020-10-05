import React from 'react';

const SkillItem = (props) => {
    return (
        <div className="flex items-center justify-center flex-col skill m-5">
            <div className="flex justify-center items-center h-24 w-24">
                <img src={props.imgSrc} alt={`${props.title} Developer`} className="w-100 h-auto"/>
            </div>
            <div className="text-sm text-center mt-4">{props.title}</div>
        </div>
    );
};

export default SkillItem;
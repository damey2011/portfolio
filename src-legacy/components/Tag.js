import React from 'react';

const Tag = ({title}) => {
    return (
        <div className="border-2 border-writing-secondary text-writing-secondary py-1 mt-1 px-2 rounded-md mr-1">
            {title}
        </div>
    );
};

export default Tag;
import React from 'react';
import Window from "../components/Window";
import Work from "../components/Work";

const Education = () => {
    const educations = [
        {
            place: 'Federal University of Lagos',
            designation: 'M.Sc Computer Science',
            time: 'March 2019 - December 2020',
            color: 'orange',
            icon: 'graduation-cap',
            description: `
                <div>Thesis based on the application of reinforcement learning in the financial market.</div>             
            `,
            tags: ['reinforcement learning', 'machine learning', 'deep learning']
        },
        {
            place: 'Federal University of Agriculture, Abeokuta',
            designation: 'B.Sc Computer Science',
            time: 'August 2012 - December 2016',
            color: 'blue',
            icon: 'graduation-cap',
            description: `
                <div>Mobile agents for interbank cheque clearing.</div>             
            `,
            tags: ['mobile agents', 'karibooga', 'java']
        },
    ]

    return (
        <Window menuTitle="Education" title="Education">
            <div className="flex justify-center items-center">
                <div className="w-full lg:w-1/2vw p-5">
                    <div className="text-lg font-extrabold my-5">Education</div>
                    <hr className="border-gray-200"/>
                    <ul className="list-none p-0 mt-5">
                        {
                            educations.map((exp, index) => (
                                <Work {...exp} key={index}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Window>
    );
};

export default Education;
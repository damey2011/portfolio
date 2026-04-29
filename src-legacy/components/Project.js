import React from 'react';
import DEFAULT from '../img/project-default.jpg'

const Project = ({title, description, github, images, link, toggleExploreModal}) => {

    const openExploreModal = (e) => {
        e.preventDefault()
        toggleExploreModal(true, images, title)
    }

    return (
        <div className="w-full p-5 mb-5">
            <div className="shadow-sm rounded-md flex overflow-hidden">
                <div
                    onClick={(e) => openExploreModal(e)}
                    className="bg-center bg-no-repeat bg-cover"
                    style={{backgroundImage: `url(${images && images.length ? images[0] : DEFAULT})`, width: '30%'}}
                />
                <div className="p-4 flex-1">
                    <div className="text-lg font-extrabold">{title}</div>
                    <div className="text-xs tracking-wide mt-1" dangerouslySetInnerHTML={{__html: description}}/>
                    <div className="flex mt-1">
                        {(images && images.length) ? <a href="/" onClick={(e) => openExploreModal(e)} className="fas fa-images p-2" data-tip="Explore Screenshots"> </a> : ''}
                        {github && <a href={github} target="_blank" rel="noopener noreferrer" className="fab fa-github p-2" data-tip="Github Repo"> </a>}
                        {link && <a href={link} target="_blank" rel="noreferrer noopener" className="fas fa-external-link-alt p-2" data-tip="Live Link"> </a>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;
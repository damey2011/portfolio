import React from 'react';
import {Carousel, Modal} from "antd";

const ExploreProject = ({showModal, toggleExploreModalState, title, images}) => {
    return (
        <Modal
            title={title}
            centered
            visible={showModal}
            width={800}
            onCancel={() => toggleExploreModalState(false)}
            footer={null}
        >
            <Carousel
                effect="fade"
                autoplay
                arrows
                autoplaySpeed={1500}
                dots
                prevArrow={<span className="fas fa-caret-left fa-2x text-back-primary bg-writing-primary"/>}
                nextArrow={<span className="fas fa-caret-right fa-2x text-back-primary bg-writing-primary"/>}>
                {
                    images && images.length && images.map((image, index) => (
                            <div>
                                <img src={image} alt={`project ${index}`} className="w-full max-w-full h-auto"/>
                            </div>
                        )
                    )
                }
            </Carousel>
        </Modal>
    );
};

export default ExploreProject;
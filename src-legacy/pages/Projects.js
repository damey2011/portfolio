import React from 'react';
import Window from "../components/Window";
import Project from "../components/Project";
import ExploreProject from "../components/ExploreProject";

const Projects = () => {
    const [showExploreModal, setShowExploreModal] = React.useState(false)
    const [exploreModalData, setExploreModalData] = React.useState({})

    const toggleExploreModal = (visible, images, title) => {
        setShowExploreModal(visible)
        setExploreModalData({images, title})
    }

    const projects = [
        {
            title: 'VirtualFusions',
            description: 'Virtual Meetings and Events application that allows users to organize and host virtual meetings in 2D and 3D environments, \n' +
                'manage landing pages, and sell tickets.',
            github: '',
            images: [
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.17.35%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.13.00%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.16.24%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.06.27%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.15.51%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.06.57%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.18.03%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847569_Screenshot%202020-09-04%20at%2012.09.13%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599219847570_Screenshot%202020-09-04%20at%2012.21.12%20PM.png'
            ],
            link: 'https://virtualfusions.com'
        },
        {
            title: 'Django Google Cloud Tasks',
            description: 'A simplified package to integrate Google cloud tasks into your django application within minutes.',
            github: 'https://github.com/damey2011/django-gcloud-tasks',
            images: []
        },
        {
            title: 'LinkFusions',
            description: 'CRM and Communication Tools product that provides 6-marketing channels including, SMS, MMS, Voice, and Email',
            github: '',
            images: [
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.46.56%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817054_Screenshot%202020-09-04%20at%2012.45.12%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.48.37%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.51.05%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.50.14%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.46.07%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817054_screencapture-localhost-8000-user-digital-business-card-2019-02-09-16_36_13.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.48.27%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.49.07%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220817055_Screenshot%202020-09-04%20at%2012.45.21%20PM.png'
            ],
            link: 'https://linkfusions.com'
        },
        {
            title: 'DQN Forex',
            description: 'An implementation of Deep Q-Networks using prioritized experience replay to trade the Foreign exchange market',
            github: 'https://github.com/damey2011/dqn-forex'
        },
        {
            title: 'Motionmovers',
            description: 'A logistics application that handles both customer and admin requirements of quote requests and order fufilments',
            github: '',
            images: [
                require('../img/mm/1.png'),
                require('../img/mm/2.png'),
                require('../img/mm/3.png'),
                require('../img/mm/4.png'),
                require('../img/mm/5.png'),
                require('../img/mm/6.png'),
            ],
            link: 'https://motionmovers.com.ng'
        },
        {
            title: 'Nowlater',
            description: 'The application lends customers funds allowing them to purchase through the platform, and merchant accounts are settled through the application for their products and services.',
            github: '',
            images: [
                'https://storage.googleapis.com/turing_developers/portfolio/1599220547569_Screenshot%202020-09-04%20at%2012.52.35%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220547573_screencapture-localhost-8000-pay-2020-05-26-18_32_01.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220547571_Screenshot%202020-09-04%20at%2012.52.43%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220547571_Screenshot%202020-09-04%20at%2012.53.07%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599220547573_Screenshot%202020-09-04%20at%2012.53.15%20PM.png'
            ],
            link: 'https://nowlater.co'
        },
        {
            title: 'DJ Bloxby',
            description: 'An add-on to the Bloxby Builder that lets templates built accessible and possible to render ' +
                'as static sites from within a Django application.',
            github: 'https://github.com/damey2011/django-bloxby'
        },
        {
            title: 'Safebart',
            description: 'Platform for exchanging goods, cash and services',
            images: [
                'https://storage.googleapis.com/turing_developers/portfolio/1599222221476_Screenshot%202020-09-04%20at%201.05.07%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599222221476_Screenshot%202020-09-04%20at%201.12.08%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599222221476_Screenshot%202020-09-04%20at%201.06.39%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599222221476_Screenshot%202020-09-04%20at%201.11.47%20PM.png',
                'https://storage.googleapis.com/turing_developers/portfolio/1599222221476_Screenshot%202020-09-04%20at%201.11.59%20PM.png'
            ],
            link: 'https://safebart.com'
        }
    ]

    return (
        <Window title="Major Projects" menuTitle="Major Projects">
            <div className="flex justify-center items-center">
                <div className="w-full lg:w-1/2vw p-5">
                    <div className="text-lg font-extrabold my-5">Projects</div>
                    <hr className="border-gray-200"/>
                    <div className="flex flex-col">
                        {
                            projects.map((project, index) => (
                                <Project toggleExploreModal={toggleExploreModal} {...project}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="text-center mb-8">
                <a href="https://github.com/damey2011" target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 bg-back-secondary hover:bg-back-primary hover:border-back-secondary border-2 hover:text-gray-300">
                    <span className="mr-2 fab fa-github"/>
                    Check me on Github
                </a>
            </div>
            <ExploreProject
                showModal={showExploreModal}
                toggleExploreModalState={setShowExploreModal}
                {...exploreModalData}
            />
        </Window>
    );
};

export default Projects;
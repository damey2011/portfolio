import React from 'react';
import Window from "../components/Window";
import IMG from '../img/LinkedIn.jpg';

function About(props) {
    return (
        <Window title="About Damilola Adeyemi" menuTitle="About">
            <div className="flex justify-center items-center">
                <div className="w-full lg:w-1/2vw p-5">
                    <div className="flex p-5 flex-col md:flex-row">
                        <div className="md:w-1/3 flex justify-center mb-6 md:mb-auto">
                            <div
                                className="rounded-full overflow-hidden border-4 border-writing-primary
                                flex items-center justify-center"
                            >
                                <img src={IMG} alt="Damilola Adeyemi" className="w-full h-auto"/>
                            </div>
                        </div>
                        <div className="md:ml-12 flex-1 text-center md:text-left">
                            <h2 className="text-2xl text-writing-primary">Damilola Nifemi
                                Adeyemi</h2>
                            <div className="tracking-wide uppercase text-writing-secondary mt-2">
                                Senior Backend Developer
                            </div>
                            <div className="mt-2">
                                <p className="pb-3">
                                    I'm a software developer who is passionate about building
                                    maintainable and scalable systems.
                                </p>
                                <div className="text-sm border-t-2 border-gray-300 pt-3">
                                    <p className="mb-3">I have more over 7-years of software development
                                        experience working on usable,
                                        scalable, and maintainable software applications in both
                                        fast-paced and steady-paced environments.
                                    </p>
                                    <p className="mb-3">Well vast in building systems in microservice
                                        architecture.
                                    </p>
                                    <p className="mb-3">Having also worked remotely for over 5 years
                                        in distributed teams, I have great abipty to
                                        communicate and work in a distributed team.
                                    </p>
                                    <p className="mb-3">AWS x Terraform for managing cloud infrastructure.</p>
                                    <p className="mb-3">Passion for solving complex problems and depvering
                                        timely solutions.
                                    </p>
                                </div>
                                <p className="my-5">
                                    <a href="https://github.com/damey2011" target="_blank"
                                       rel="noopener noreferrer"
                                       className="px-4 py-2 bg-back-secondary hover:bg-back-primary hover:border-back-secondary border-2 hover:text-gray-300">
                                        <span className="mr-2 fab fa-github"/>
                                        Check me on Github
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
}

export default About;
import React from 'react';
import Window from "../components/Window";
import IMG from '../img/personal.png';

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
                            <h2 className="text-2xl text-writing-primary">Damilola Adeyemi</h2>
                            <div className="tracking-wide uppercase text-writing-secondary mt-2">Software Developer
                            </div>
                            <div className="mt-2">
                                <p className="pb-3">
                                    I'm a software developer who is passionate about writing tested and DRY code.
                                </p>
                                <p className="text-sm border-t-2 border-gray-300 pt-3">
                                    I have more than 5-years of software development experience working on usable,
                                    scalable, and
                                    maintainable software applications in startup environments. My strongest skills are
                                    in
                                    Python (Django) and Javascript (React/VueJS). I can work on projects with unclear
                                    specifications
                                    and make them marketable.
                                </p>
                                <p className="my-5">
                                    <a href="https://github.com/damey2011" target="_blank" rel="noopener noreferrer"
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
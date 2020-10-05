import React from 'react';
import Window from "../components/Window";
import ME from '../img/personal.png'

const Contact = () => {
    return (
        <Window title="Contact Me" menuTitle="Contact">
            <div className="flex justify-center items-center">
                <div className="w-full lg:w-1/2vw p-5">
                    <div className="w-full font-sans flex flex-col mt-8">
                        <div className="relative bg-blue-500">
                            <div className="absolute bottom-0 w-1/3 ml-8 -mb-12 flex">
                                <div className="flex flex-col">
                                    <img src={ME} alt={'Dami'}/>
                                </div>
                            </div>
                            <div className="w-full p-4 flex items-center justify-end">
                                <div className="w-1/2 text- white">
                                    <p className="text-3xl font-bold">Damilola Adeyemi</p>
                                    <p className="py-2">
                                        <i className="fas fa-map-marker-alt mr-2"/>
                                        Lagos, Nigeria (NG)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-back-primary w-full p-4 flex justify-end rounded-bl rounded-br">
                            <div className="flex flex-col w-1/2 h-full">
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold">
                                        <a href="tel:+2348132998236" className="text-sm">
                                            +2348132998236
                                        </a>
                                    </p>
                                    <p className="text-xs text-gray-600 text-xs">
                                        <span className="mr-2 fas fa-phone text-orange-600"/>
                                        <span>Phone</span>
                                    </p>
                                </div>
                                <div className="flex flex-col mt-6">
                                    <p className="text-xl font-bold text-xs">
                                        <a href="mailto:adeyemidamilola3@gmail.com" className="text-sm">
                                            adeyemidamilola3@gmail.com
                                        </a>
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        <span className="mr-2 fas fa-envelope text-purple-600"/>
                                        <span>Email</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Contact;
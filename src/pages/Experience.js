import React from 'react';
import Window from "../components/Window";
import Work from "../components/Work";

const Experience = () => {
    const experiences = [
        {
            place: 'Sennder GmBh',
            designation: 'Senior Backend Engineer',
            time: 'January 2021 - Present',
            color: 'purple',
            description: `
                <ul class="list-disc pl-8">
                    <li>Migrate monolith application to event based microservice architecture using Kafka.</li>
                    <li>Migrating Authentication/Authorization to dedicated identity service provider.</li>
                    <li>Designing and architecting new solutions to business problems/ requirements.</li>
                    <li>Conduct interviews for potential new colleagues.</li>
                    <li>Mentoring to junior engineers.</li>
                    <li>Driving small to large size epics to successful completion.</li>
                </ul>
            `,
            tags: [
                'python', 'django', 'fastapi', 'AWS', 'docker', 'node', 'javascript', 'vuejs',
                'fastify', 'kafka', 'datadog', 'terraform'
            ]
        },
        {
            place: 'Cloud Custom Solutions',
            designation: 'Software Developer',
            time: 'May 2018 - August 2020',
            color: 'orange',
            description: `
                <ul class="list-disc pl-8">
                    <li>Improved page latencies by up to 100% by optimizing database queries on the backend.</li>
                    <li>Helped the team speed up development by writing reusable base codes on the backends and optimal 
                    components on the frontend</li>
                    <li>Managed infrastructures and system scaling on the Google Cloud Platform for the applications.</li>
                </ul>                
            `,
            tags: ['python', 'django', 'google cloud platform', 'app engine', 'docker', 'node', 'javascript', 'vuejs',
                'nginx', 'SAAS', 'testing', 'postgres', 'git', 'beautiful soup', 'selenium']
        },
        {
            place: 'Javelin Nigeria',
            designation: 'Software Developer',
            time: 'March 2019 - July 2020',
            color: 'green',
            description: `
                <ul class="list-disc pl-8">
                    <li>Modified the software systems to enhance performance</li>
                    <li>Grew customer base from 0 users to over 290.</li>
                    <li>Improved the app's usability by improving the application flow.</li>
                </ul>
            `,
            tags: ['nginx', 'python', 'django', 'git', 'linux', 'celery', 'javascript', 'jquery', 'postgres']
        },
        {
            place: 'Senseandserve Ilorin',
            designation: 'Full Stack Developer',
            time: 'August 2017 - May 2018',
            color: 'yellow',
            description: `
                <ul class="list-disc pl-8">
                    <li>Worked on prototypes of applications for pitching.</li>
                    <li>Integrated tools and services such as the United States Postal service and Paypal into products.</li>
                    <li>Oversaw deployment, configuration, and documentation procedures of a Trading Application, 
                    Prototype Banking Software, and Facial Recognition Based Authentication System.</li>
                </ul>
            `,
            tags: ['face recognition', 'python', 'django', 'jquery', 'javascript', 'nginx', 'mysql', 'postgres']
        },
        {
            place: 'Freelance',
            designation: 'Full Stack Developer',
            time: 'January 2016 - July 2017',
            color: 'blue',
            description: `
                <ul class="list-disc pl-8">
                    <li>Consulted for clients to provide best technical advises and support on building their 
                    applications.</li>
                    <li>Worked in various capacities ranging from backend development to infrastructures, desktop 
                    applications etc.</li>
                    <li>Communicated with customers about progress updates, gathered feedback, and worked to 
                    resolve specific issues.</li>
                </ul>
            `,
            tags: ['Java', 'flask', 'nginx', 'supervisor', 'pm2', 'celery', 'django', 'jsf', 'angular', 'JavaFX',
                'PHP', 'jquery', 'maven', 'redis', 'cassandra', 'rabbit mq', 'XML', 'beautiful soup', 'selenium']
        },
        {
            place: 'Adeyemi College of Education',
            designation: 'Software Development Intern',
            time: 'July 2015 - December 2015',
            color: 'red',
            description: `
                <ul class="list-disc pl-8">
                    <li>Worked alongside a team of developers to build to scale a school portal incorporating result 
                    processing, fees payment, and payment verification, amongst many other features.</li>
                    <li>Built a desktop software solution for managing departmental records using Java, as a result of 
                    this improving efficiency.</li>
                </ul>
            `,
            tags: ['Java', 'JSF', 'Spring Boot', 'JavaFX', 'Maven', 'XML']
        }
    ]

    return (
        <Window menuTitle="Work Experience" title="Work Experience">
            <div className="flex justify-center items-center">
                <div className="w-full lg:w-1/2vw p-5">
                    <div className="text-lg font-extrabold my-5">Work Experience</div>
                    <hr className="border-gray-200"/>
                    <ul className="list-none p-0 mt-5">
                        {
                            experiences.map((exp, index) => (
                                <Work {...exp} key={index}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Window>
    );
};

export default Experience;
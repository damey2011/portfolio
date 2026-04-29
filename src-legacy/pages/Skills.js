import React from 'react';
import Window from "../components/Window";
import SkillItem from "../components/SkillItem";
import Python from "../img/skills/python.png"
import Django from "../img/skills/django.png"
import Docker from "../img/skills/docker.png"
import EC2 from "../img/skills/ec2.png"
import ECS from "../img/skills/ecs.png"
import Elastic from "../img/skills/elastic.png"
import Selenium from "../img/skills/selenium.png"
import Celery from "../img/skills/celery.png"
import Unittest from "../img/skills/unittest.png"
import Numpy from "../img/skills/numpy.png"
import FastAPI from "../img/skills/fastapi.png"
import GCP from "../img/skills/gcp.png"
import git from "../img/skills/git.png"
import gitlab from "../img/skills/gitlab.png"
import HTML from "../img/skills/html.png"
import JS from "../img/skills/javascript.png"
import Jira from "../img/skills/jira.png"
import Linux from "../img/skills/linux.png"
import Nginx from "../img/skills/nginx.png"
import Postgres from "../img/skills/postgres.png"
import ReactIm from "../img/skills/react.png"
import Node from "../img/skills/node.png"
import Redis from "../img/skills/redis.png"
import SQL from "../img/skills/sql.png"
import Vue from "../img/skills/vue.png"

const Skills = () => {
    const skills = [
        [Python, 'Python'],
        [Django, 'Django'],
        [Docker, 'Docker'],
        [EC2, 'AWS EC2'],
        [ECS, 'AWS ECS'],
        [Elastic, 'Elastic'],
        [Selenium, 'Selenium'],
        [Celery, 'Celery'],
        [Unittest, 'Unittest'],
        [Numpy, 'Numpy'],
        [FastAPI, 'Fast API'],
        [GCP, 'Google Cloud Platform'],
        [git, 'Git'],
        [gitlab, 'Gitlab CI'],
        [HTML, 'HTML'],
        [JS, 'Javascript'],
        [Jira, 'Jira'],
        [Linux, 'Linux'],
        [Nginx, 'Nginx'],
        [Node, 'Node'],
        [Postgres, 'Postgres'],
        [ReactIm, 'React'],
        [Redis, 'Redis'],
        [SQL, 'SQL'],
        [Vue, 'Vue'],
    ]

    let [filteredSkills, setFilteredSkills] = React.useState([...skills])

    const searchSkill = (e) => {
        e.preventDefault()
        const {value} = e.target
        if (value) {
            setFilteredSkills(skills.filter(skill => skill[1].toLowerCase().includes(value.toLowerCase())))
        }
        else {
            setFilteredSkills([...skills])
        }
    }

    return (
        <Window title="Skills" menuTitle="Skills">
            <div className="flex justify-end p-4 mt-8 md:mt-1">
                <input
                    type="text"
                    onKeyUp={e => searchSkill(e)}
                    className="focus:border-writing-secondary border-writing-secondary border-2 px-3 py-1 rounded-md bg-transparent"
                    placeholder="Search Skill ..."
                />
            </div>
            <div className="flex flex-wrap justify-around">
                {
                    filteredSkills.map((skill, index) => (
                        <SkillItem imgSrc={skill[0]} title={skill[1]} key={index}/>
                    ))
                }
            </div>

            <div className="text-center mt-4 mb-4 text-2xl">
                ... and more
            </div>

        </Window>
    );
};

export default Skills;
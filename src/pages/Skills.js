import React from 'react';
import Window from "../components/Window";
import SkillItem from "../components/SkillItem";

const Skills = () => {
    const skills = [
        [require('../img/skills/python.png'), 'Python'],
        [require('../img/skills/django.png'), 'Django'],
        [require('../img/skills/docker.png'), 'Docker'],
        [require('../img/skills/ec2.png'), 'AWS EC2'],
        [require('../img/skills/ecs.png'), 'AWS ECS'],
        [require('../img/skills/elastic.png'), 'Elastic'],
        [require('../img/skills/selenium.png'), 'Selenium'],
        [require('../img/skills/celery.png'), 'Celery'],
        [require('../img/skills/unittest.png'), 'Unittest'],
        [require('../img/skills/numpy.png'), 'Numpy'],
        [require('../img/skills/fastapi.png'), 'Fast API'],
        [require('../img/skills/gcp.png'), 'Google Cloud Platform'],
        [require('../img/skills/git.png'), 'Git'],
        [require('../img/skills/gitlab.png'), 'Gitlab CI'],
        [require('../img/skills/html.png'), 'HTML'],
        [require('../img/skills/java.png'), 'Java'],
        [require('../img/skills/javascript.png'), 'Javascript'],
        [require('../img/skills/jira.png'), 'Jira'],
        [require('../img/skills/linux.png'), 'Linux'],
        [require('../img/skills/nginx.png'), 'Nginx'],
        [require('../img/skills/node.png'), 'Node'],
        [require('../img/skills/postgres.png'), 'Postgres'],
        [require('../img/skills/react.png'), 'React'],
        [require('../img/skills/redis.png'), 'Redis'],
        [require('../img/skills/sql.png'), 'SQL'],
        [require('../img/skills/vue.png'), 'Vue'],
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
            <div className="flex justify-end p-4">
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
        </Window>
    );
};

export default Skills;
import Home from "../pages/Home";
import About from "../pages/About";
import Browser from "../pages/Browser";
import Skills from "../pages/Skills";
import Education from "../pages/Education";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

export const routes = [
    {path: '/', name: 'Home', Component: Home, exact: true},
    {path: '/about', name: 'About', Component: About, exact: true},
    {path: '/view', name: 'View', Component: Browser, exact: true},
    {path: '/skills', name: 'Skills', Component: Skills, exact: true},
    {path: '/education', name: 'Skills', Component: Education, exact: true},
    {path: '/experience', name: 'Skills', Component: Experience, exact: true},
    {path: '/projects', name: 'Skills', Component: Projects, exact: true},
    {path: '/contact', name: 'Skills', Component: Contact, exact: true},
]
import React from 'react';
import 'antd/dist/antd.min.css';
import './base.scss';
import './App.scss';
import BG from './img/bg1.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MenuHeader from "./components/MenuHeader";
import OSBody from "./components/OSBody";
import Docker from "./components/Docker";
import ReactTooltip from 'react-tooltip';
import {Route, Switch, useLocation} from 'react-router-dom';
import {MenuProvider, ThemeProvider} from "./contexts";
import {routes} from "./routes";
import {animated, useTransition} from "react-spring";
import {Helmet} from "react-helmet";

const defaultColors = {
    'dark': {
        'text-color': '#FFF',
        'text-color-secondary': 'gray',
        'background-color': 'black',
        'background-color-secondary': '#333333'
    },
    'light': {
        'text-color': 'black',
        'text-color-secondary': 'gray',
        'background-color': 'silver',
        'background-color-secondary': 'white'
    }
}

function App() {
    const [menuTitle, setMenuTitle] = React.useState('Home');
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

    const applyTheme = (tme) => {
        let root = document.documentElement;
        let newStyles = defaultColors[tme];
        for (let key in newStyles) {
            if (newStyles.hasOwnProperty(key)) {
                root.style.setProperty(`--${key}`, newStyles[key]);
            }
        }
        localStorage.setItem('theme', tme);
        setTheme(tme);
    }

    React.useEffect(() => {
        applyTheme(theme)
    })

    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: {opacity: 0, transform: 'translate3d(-50%,0,0)'},
    });

    return (
        <div className="relative min-h-screen">
            <ThemeProvider value={[theme, applyTheme]}>
                <MenuProvider value={{menuTitle, setMenuTitle}}>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>{menuTitle === 'Home' ? 'Damilola Adeyemi' : menuTitle}</title>
                        <link rel="apple-touch-icon" sizes="180x180"
                              href={require('./favicons/apple-touch-icon.png')}/>
                        <link rel="icon" type="image/png" sizes="32x32"
                              href={require('./favicons/favicon-32x32.png')}/>
                        <link rel="icon" type="image/png" sizes="16x16"
                              href={require('./favicons/favicon-16x16.png')}/>
                        <link rel="manifest" href={require('./favicons/site.webmanifest')}/>
                    </Helmet>
                    <MenuHeader/>
                    <OSBody background={BG}>
                        {
                            transitions.map(({item: location, props, key}) => (
                                <animated.div key={key} style={props}>
                                    <Switch location={location}>
                                        {
                                            routes.map(({path, Component, exact}) => (
                                                <Route path={path} exact={exact} key={path} component={Component}/>
                                            ))
                                        }
                                    </Switch>
                                </animated.div>
                            ))
                        }
                    </OSBody>
                    <Docker/>
                    <ReactTooltip effect="solid"/>
                </MenuProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;

import React from 'react';
import dayjs from 'dayjs';
import {Link} from "react-router-dom";
import {MenuContext, ThemeContext} from "../contexts";
import {Dropdown, Menu} from 'antd';

const MenuHeader = () => {
    const {menuTitle} = React.useContext(MenuContext);
    const [theme, setTheme] = React.useContext(ThemeContext);
    const desktopMenus = [
        {title: 'About', link: '/about'},
        {title: 'Skills', link: '/skills'},
        {title: 'Projects', link: '/projects'},
        {title: 'Education', link: '/education'},
        {title: 'Experience', link: '/experience'},
        {title: 'Contact', link: '/contact'}
    ]
    const menus = [
        {
            title: 'Menu',
            link: '',
            isMobile: true,
            children: desktopMenus
        },
        ...desktopMenus
    ]

    const makeMenu = (menuList) => {
        return (<Menu>
            {
                menuList.map((menu, index) => (
                    <Menu.Item key={index}>
                        <Link to={menu.link}>{menu.title}</Link>
                    </Menu.Item>
                ))
            }
        </Menu>)
    }

    const switchTheme = (e) => {
        e.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="h-6 fixed top-0 bg-back-primary w-full flex justify-between text-writing-primary z-10">
            <div className="flex items-center">
                <span className="fas fa-terminal mx-5 text-lg"/>
                <span className="current-program font-bold text-sm">{menuTitle}</span>
                <div className="program-menu ml-4">
                    <ul className="list-none p-0 flex items-center">
                        {
                            menus.map((menu, index) => (
                                <li className={`mx-2 ${menu.isMobile ? `md:hidden` : `hidden md:block`}`} key={index}>
                                    <span className="text-sm">
                                        {
                                            menu.children ? (
                                                <Dropdown overlay={makeMenu(menu.children)} trigger={['click']}
                                                          overlayClassName="dropdown-menu">
                                                    <a className="ant-dropdown-link" href="/"
                                                       onClick={e => e.preventDefault()}>
                                                        {menu.title}
                                                    </a>
                                                </Dropdown>
                                            ) : (
                                                <Link to={menu.link}>{menu.title}</Link>
                                            )
                                        }

                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="flex items-center">
                <ul className="flex p-0 list-none h-full items-center hidden md:flex">
                    <li className="mx-2">
                        <span className="flex text-sm fas fa-wifi"/>
                    </li>
                    <li className="mx-2">
                        <span className="flex text-sm fas fa-battery-full"/>
                    </li>
                </ul>
                <span className="text-sm mx-2 hidden md:flex">
                    {dayjs().format('HH:mm A')}
                </span>
                <span className="text-sm mx-2 it">
                    Damilola Nifemi Adeyemi
                </span>
                <ul className="flex p-0 list-none h-full items-center hidden md:flex">
                    <li className="mx-2 flex justify-center items-center">
                        <a className={`flex text-sm fas fa-2x mr-3 fa-toggle-${theme === 'dark' ? 'on' : 'off'}`} href="/" onClick={switchTheme}> </a>
                        <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    </li>
                    <li className="mx-2">
                        <span className="flex text-sm fas fa-align-left"/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MenuHeader;
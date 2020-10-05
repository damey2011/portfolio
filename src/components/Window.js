import React from 'react';
import {Link} from "react-router-dom";
import {MenuContext} from "../contexts";

function Window(props) {
    const {setMenuTitle} = React.useContext(MenuContext);
    const [isFullScreen, setIsFullScreen] = React.useState(() => {
        let stored = localStorage.getItem('isWindowFull')
        if (stored !== null) {
            return stored
        }
        return '0'
    });

    React.useEffect(() => {
        setMenuTitle(props.menuTitle)
    })

    const toggleFullScreen = (e, isFull) => {
        e.preventDefault();
        localStorage.setItem('isWindowFull', isFull)
        setIsFullScreen(isFull);
    }

    return (
        <div className={`md:w-3/4 md:h-3/4 w-screen relative md:min-h-1/2 h-3/4vh bg-back-secondary
                 text-writing-primary rounded-md m-auto overflow-hidden window ${isFullScreen === '1' ? 'full' : null} 
                 border-writing-secondary`}>
            <div className="bg-back-primary h-10 md:h-5 w-100 flex justify-between absolute w-full top-0 left-0"
                 onDoubleClick={e => toggleFullScreen(e, isFullScreen === '1' ? '0' : '1')}>
                <div className="flex items-center window-top handle">
                    <Link to="/" className="ml-3 hover:bg-red-400 w-6 h-6 md:w-3 md:h-3 bg-red-500 rounded-full fas"/>
                    <a href='/' onClick={(e) => toggleFullScreen(e, '0')}
                       className="ml-2 hover:bg-yellow-400 w-6 h-6 md:w-3 md:h-3 bg-yellow-500 rounded-full"> </a>
                    <a href="/" onClick={(e) => toggleFullScreen(e, '1')}
                       className="ml-2 hover:bg-green-400 w-6 h-6 md:w-3 md:h-3 bg-green-500 rounded-full fas"> </a>
                </div>
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex items-center text-xs">
                    {props.title || 'Window Title'}
                </div>
            </div>
            <div className="overflow-auto h-full">
                <div className="mt-5 h-full">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Window;
import React from 'react';
import DesktopIcon from "./DesktopIcon";

function OsBody(props) {
    let embed_google_doc_resume = 'https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2Fe%2F2PACX-1vT-GXRBX' +
        'IJFq5kQexMN4j7mnZMOndCbrStqDDWmf_4LNINN9_uiTH4ZgSGCrOzJ676vGfo1hgOpRPsw%2Fpub%3Fembedded%3Dtrue';
    let browse_resume = 'https://docs.google.com/document/d/e/2PACX-1vT-GXRBXIJFq5kQexMN4j7mnZMOndCbrStqDDWmf_4LNI' +
        'NN9_uiTH4ZgSGCrOzJ676vGfo1hgOpRPsw/pub';

    return (
        <div className="pt-12 md:pt-6 h-screen w-screen fixed"
             style={{backgroundImage: `url(${props.background})`}}>
            <div className="absolute top-0 right-0 mt-16 md:mt-8 w-screen flex-wrap flex md:justify-end">
                <DesktopIcon name="About Me" link="/about" icon="fas fa-user"/>
                <DesktopIcon name="Experience" link="/experience" icon="fas fa-toolbox"/>
                <DesktopIcon name="Projects" link="/projects" icon="fab fa-buffer"/>
                <DesktopIcon name="View Resume" link={`/view?page=${embed_google_doc_resume}&title=Resume`} icon="fas fa-file-pdf"/>
                <DesktopIcon name="Resume External" link={browse_resume} as="external" icon="fas fa-download"/>
                <DesktopIcon name="Contact" link="/contact" icon="fas fa-address-card"/>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    );
}

export default OsBody;
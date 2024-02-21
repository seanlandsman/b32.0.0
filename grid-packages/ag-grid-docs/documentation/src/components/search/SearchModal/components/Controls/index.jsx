import React from 'react';
import LogoSvg from './icons/logo.svg';
import EnterSvg from './icons/enter-key.svg';
import UpSvg from './icons/up-key.svg';
import DownSvg from './icons/down-key.svg';
import EscSvg from './icons/esc-key.svg';
import styles from './Controls.module.scss';

export default () => (
    <div className={styles.keyboardSection}>
        <img style={{paddingTop: '7.5px'}} src={LogoSvg} alt="AG Grid"></img>
        <div>
            <img src={EnterSvg} alt="Enter Key"></img>
            to select
        </div>
        <div>
            <img src={DownSvg} alt="Down Key"></img>
            <img src={UpSvg} alt="Up Key"></img>
            to navigate
        </div>
        <div>
            <img src={EscSvg} alt="Escape Key"></img>
            to close
        </div>
    </div>
);
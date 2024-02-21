import React from 'react';
import styles from './Modal.module.scss';
import LogoSvg from './icons/logo.svg';
import EnterSvg from './icons/enter-key.svg';
import UpSvg from './icons/up-key.svg';
import DownSvg from './icons/down-key.svg';
import EscSvg from './icons/esc-key.svg';

export default ({ closeModal, children }) => {
    return (
        <div className={styles.backdrop} onClick={closeModal}>
            <div className={styles.container} onClick={evt => evt.stopPropagation()}>
                {children}

                <div className={styles.keyboardSection}>
                    <img style={{paddingTop: '7.5px'}} src={LogoSvg}></img>
                    <div>
                        <img src={EnterSvg}></img>
                        to select
                    </div>
                    <div>
                        <img src={DownSvg}></img>
                        <img src={UpSvg}></img>
                        to navigate
                    </div>
                    <div>
                        <img src={EscSvg}></img>
                        to close
                    </div>
                </div>
            </div>
        </div>
    );
}
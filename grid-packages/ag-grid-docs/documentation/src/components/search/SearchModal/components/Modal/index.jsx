import React from 'react';
import styles from './Modal.module.scss';

export default ({ closeModal, children }) => {
    return (
        <div className={styles.backdrop} onClick={closeModal}>
            <div className={styles.container} onClick={evt => evt.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
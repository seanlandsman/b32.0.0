import React from 'react';
import styles from '@design-system/modules/SearchControls.module.scss';
import { Icon } from '../../../../Icon';

export default () => (
    <div className={styles.keyboardSection}>
        <div>
            <Icon name="return" />
            to select
        </div>
        <div>
            <Icon name="arrowUp" />
            <Icon name="arrowDown" />
            to navigate
        </div>
        <div>
            <Icon name="escape" />
            to close
        </div>
    </div>
);
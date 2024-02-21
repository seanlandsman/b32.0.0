import React, { useRef, useEffect } from 'react';
import styles from './SearchBox.module.scss';
import { useSearchBox, useHits } from 'react-instantsearch';
import SearchSvg from './icons/search.svg';

let timeout;
export default () => {
    const {
        refine,
    } = useSearchBox();

    const { hits } = useHits();

    const inputRef = useRef();

    // capture the click of anything above the separator and redirect to the input
    const onContainerClick = () => inputRef.current?.focus();
    // also capture focus to the input as soon as the modal opens
    useEffect(onContainerClick, []);

    // 300ms debounce before updating algolia, not sure if this should be higher
    const onInputChanged = (evt) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            timeout = null;
            refine(evt.target.value);
        }, 300);
    };

    return (
        <div className={styles.container} onClick={onContainerClick}>
            <img src={SearchSvg} alt="Search Icon" />
            {/* below is a hack to prevent the text box styles applying, probs a better way but for this spike... */}
            <input ref={inputRef} type="search" className={`ag ${styles.inputEle}`} onChange={onInputChanged} /> 
            {/* <div className={styles.resultCount}>Results: {hits.length}</div> */}
        </div>
    );
}
import React, { useEffect, useRef } from 'react';
import styles from './Hits.module.scss';
import { navigate } from 'gatsby-link';
import PageResultSvg from './icons/page-result.svg';
import { useHits } from 'react-instantsearch';

export default ({ closeModal, structuredHits, selectedHit, setSelectedHit }) => {
    const { sendEvent } = useHits(); 
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current) {
            // when the hits change, scroll to the top of the container
            containerRef.current.scrollTop = 0;
        }
    }, [structuredHits]);

    if (structuredHits.length === 0) {
        return <div>No Results</div>;
    }

    // Used for when hovered or focused (tab)
    const selectThisHit = (idx) => {
        setSelectedHit(idx);
    }

    // easy way of capturing the displayed index of each record, for highlighting
    let hitIndex = 0;
    return (
        <div className={styles.results} ref={containerRef}>
            {
                structuredHits.map(({ breadcrumb, children }) => (
                    <div key={breadcrumb}>
                        <div className={styles.crumbContainer}>
                            {
                                breadcrumb.split(' > ').map((crumb, index) => (
                                    <>
                                        { index > 0 && <span className={styles.gt}> &gt; </span> }
                                        <span className={styles.crumb}>{crumb}</span>
                                    </>
                                ))
                            }
                        </div>
                        {
                            children.map((hit) => {
                                const idx = hitIndex++;
                                return (
                                    <article
                                        data-selected={selectedHit === idx}
                                        tabIndex={0}
                                        data-hit-index={idx}
                                        key={hit.objectID}
                                        className={styles.hit}
                                        onMouseMove={(e) => selectThisHit(idx)}
                                        onFocus={(e) => selectThisHit(idx)}
                                        onClick={() => {
                                            sendEvent('click', hit, 'Hit Clicked');
                                            navigate(hit.path);
                                            closeModal();
                                        }}
                                    >
                                        <img src={PageResultSvg} className={styles.img} />
                                        <p className={styles.titleSection}>
                                            <span className={styles.title}>{hit.title}</span>
                                            <span className={styles.heading}>{hit.heading && <> - {hit.heading}</>}</span>
                                        </p>
                                        <p className={styles.text}>{hit.text}</p>
                                    </article>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
};

import React, { useEffect, useRef } from 'react';
import styles from './Hits.module.scss';
import { Link } from 'gatsby-link';
import PageResultSvg from './icons/page-result.svg';

export default ({ closeModal, structuredHits, selectedHit, setSelectedHit }) => {
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
                                    <Link to={hit.path} style={{ all: 'unset' }} key={hit.path}>
                                        <article
                                            data-selected={selectedHit === idx}
                                            data-hit-index={idx}
                                            key={hit.objectID}
                                            className={styles.hit}
                                            tabIndex={1}
                                            onMouseMove={(e) => selectThisHit(idx)}
                                            onFocus={(e) => selectThisHit(idx)}
                                            onClick={() => {
                                                sendEvent('click', hit, 'Hit Clicked');
                                                closeModal();
                                            }}
                                        >
                                            <img src={PageResultSvg} className={styles.img} />
                                            <p className={styles.title}>{hit.title}</p>
                                            <p className={styles.text}>{hit.text}</p>
                                        </article>
                                    </Link>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
};

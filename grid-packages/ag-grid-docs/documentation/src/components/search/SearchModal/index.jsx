import React, { useEffect, useState, useMemo } from 'react';
import isDevelopment from 'utils/is-development';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import SearchBox from './components/SearchBox';
import Modal from './components/Modal';
import Hits from './components/Hits';
import { useHits } from 'react-instantsearch';
import { navigate } from 'gatsby-link';

const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY);

export default ({ currentFramework, closeModal }) => {
    const index = `ag-grid${isDevelopment() ? '-dev' : ''}_${currentFramework}`;

    /**
     * When the modal is open, we want to prevent scrolling on the rest of the page.
     */
    useEffect(() => {
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.style.overflow = 'hidden';
        return () => htmlElement.style.overflow = 'unset';
    }, []);

    return (
        <Modal closeModal={closeModal}>
            <InstantSearch searchClient={searchClient} indexName={index}>
                <SearchComponent closeModal={closeModal} />
            </InstantSearch>
        </Modal>
    );
}

const SearchComponent = ({ closeModal }) => {
    const {hits} = useHits();
    const structuredHits = useMemo(() => getAllCrumbs(hits), [hits]);
    const flattenedHits = useMemo(() => flattenStructure(structuredHits), [structuredHits]);

    useEffect(() => {
        // when hits change, also reset the selected hit
        setSelectedHit(0);
    }, [hits]);

    const [selectedHit, setSelectedHit] = useState(0);
    const onKeyDown = (evt) => {
        switch (evt.key) {
            case 'ArrowDown':
                const aboveIdx = (selectedHit + 1) % hits.length;
                setSelectedHit(aboveIdx);
                // small hack, if index === 0, we force scroll to go a bit further by specifying end, allowing the breadcrumb to scroll in too
                document.querySelector(`[data-hit-index="${aboveIdx}"]`)?.scrollIntoView({ behavior: 'smooth', block: aboveIdx === 0 ? 'end' : 'nearest' });
                break;
            case 'ArrowUp':
                const belowIdx = selectedHit - 1 >= 0 ? selectedHit - 1 : hits.length - 1;
                setSelectedHit(belowIdx);
                // small hack, if index === 0, we force scroll to go a bit further by specifying end, allowing the breadcrumb to scroll in too
                document.querySelector(`[data-hit-index="${belowIdx}"]`)?.scrollIntoView({ behavior: 'smooth', block: belowIdx === 0 ? 'end' : 'nearest' });
                break;
            case 'Enter':
                navigate(flattenedHits[selectedHit].path);
                closeModal();
        }
    }

    return (
        <div onKeyDown={onKeyDown}>
            <SearchBox />
            <Hits
                structuredHits={structuredHits}
                selectedHit={selectedHit}
                setSelectedHit={setSelectedHit}
                closeModal={closeModal}
            />
        </div>
    );
}

const flattenStructure = (structuredHits) => {
    const result = [];
    structuredHits.forEach(({children}) => {
        children.forEach(child => result.push(child));
    });
    return result;
}

/**
 * This function takes an array of crumbs and returns an array of crumbs which are the highest level shared crumbs.
 */
const getAllCrumbs = (crumbArray) => {
    const result = [];
    let allCrumbs = crumbArray.slice();
    while (allCrumbs.length) {
        const nextCrumb = getNextBreadCrumb(allCrumbs);
        result.push(nextCrumb);
    
        // remove all crumbs which share the same path
        allCrumbs = allCrumbs.filter(crumb => !crumb.breadcrumb.startsWith(nextCrumb.breadcrumb));
    }
    return result;
}

const getNextBreadCrumb = (crumbArray) => {
    const firstBreadCrumb = crumbArray[0].breadcrumb.split(' > ');
    const firstCrumb = firstBreadCrumb[0];

    const allSiblings = crumbArray.filter(crumb => crumb.breadcrumb.startsWith(firstCrumb));
    // only crumb, return it alone as a full breadcrumb
    if (allSiblings.length === 1) {
        return { breadcrumb: crumbArray[0].breadcrumb, children: allSiblings };
    }

    for (let i = 1; i < firstBreadCrumb.length; i++) {
        const breadcrumb = firstBreadCrumb.slice(0, i + 1).join(' > ');
        for (let b = 0; b < allSiblings.length; b++) {
            // find the first sibling which doesn't share the full path
            if (!allSiblings[b].breadcrumb.startsWith(breadcrumb)) {
                // return full crumb up to (and not including) this last unmatched chunk.
                return { breadcrumb: firstBreadCrumb.slice(0, i).join(' > '), children: allSiblings };
            }
        }
    }
    // all crumbs are the same, return the full crumb
    return {breadcrumb: crumbArray[0].breadcrumb, children: allSiblings};
}

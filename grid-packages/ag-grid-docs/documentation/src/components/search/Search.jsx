import React, { useEffect, useState } from 'react';
import SearchModal from './SearchModal';

/**
 * The website uses Algolia to power its search functionality. This component builds on components provided by Algolia
 * to render the search box and results.
 */
const Search = ({ currentFramework }) => {
    const [isOpen, setOpen] = useState(false);

    /**
     * When search is mounted, add global listeners to open/close the search
     */
    useEffect(() => { 
        const onKeyDownAnywhere = (e) => {
            const isMetaK = e.key === 'k' && (e.metaKey || e.ctrlKey);
            const isEsc = e.key === 'Escape';
            if (isMetaK || isEsc) {
                // use the callback so we don't need to update the func ref,
                // and start removing/adding the callback, which would be messy
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', onKeyDownAnywhere);
        return () => document.removeEventListener('keydown', onKeyDownAnywhere);
    }, []);

    return <>
        <div onClick={() => setOpen(true)}>Open Me</div>
        { isOpen && <SearchModal currentFramework={currentFramework} closeModal={() => setOpen(false)} /> }
    </>;
}

export default Search;

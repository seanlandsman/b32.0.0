import { UserComponentRegistry } from '../components/framework/userComponentRegistry';

export async function useFilters() {
    const FilterManager = (await import('../filter/filterManager')).FilterManager;
    const QuickFilterService = (await import('../filter/quickFilterService')).QuickFilterService;
    const TextFloatingFilter = (await import('../filter/provided/text/textFloatingFilter')).TextFloatingFilter;
    const TextFilter = (await import('../filter/provided/text/textFilter')).TextFilter;

    const NumberFloatingFilter = (await import('../filter/provided/number/numberFloatingFilter')).NumberFloatingFilter;
    const NumberFilter = (await import('../filter/provided/number/numberFilter')).NumberFilter;
    const DateFloatingFilter = (await import('../filter/provided/date/dateFloatingFilter')).DateFloatingFilter;
    const DateFilter = (await import('../filter/provided/date/dateFilter')).DateFilter;
    const ReadOnlyFloatingFilter = (await import('../filter/floating/provided/readOnlyFloatingFilter')).ReadOnlyFloatingFilter;
    const filterBeans:any[] = [FilterManager, QuickFilterService];

    UserComponentRegistry.featureComps = {

        //filter
        agTextColumnFilter: TextFilter,
        agNumberColumnFilter: NumberFilter,
        agDateColumnFilter: DateFilter,

        //floating filters
        agTextColumnFloatingFilter: TextFloatingFilter,
        agNumberColumnFloatingFilter: NumberFloatingFilter,
        agDateColumnFloatingFilter: DateFloatingFilter,
        agReadOnlyFloatingFilter: ReadOnlyFloatingFilter,
        ...UserComponentRegistry.featureComps
    }

    return filterBeans;
}
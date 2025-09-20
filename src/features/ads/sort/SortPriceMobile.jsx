const SortPriceMobile = ({ sort, onFilterPrice }) => {
    return (
        <select className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-1/2 mx-auto mb-5 p-2.5 focus:ring-0 focus:outline-none focus:border-gray-300 bg-left sm:hidden" value={sort}
            onChange={onFilterPrice}>
            <option value=''>مرتب سازی</option>
            <option value="desc">بالاترین قیمت</option>
            <option value="asc">کمترین قیمت</option>
        </select>
    );
}

export default SortPriceMobile;
export const setCategory= (setSearchParams, title) => {
    setSearchParams((prev) => {
        prev.set("category", title)
        prev.set("page", 1)
        return prev;
    }, { replace: true });
};
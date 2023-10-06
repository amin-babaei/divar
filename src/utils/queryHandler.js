export const sortQuery = (setSearchParams, value) => {
    setSearchParams((prev) => {
        prev.set("sort", value);
        prev.set("page", 1);
        return prev;
    }, { replace: true });
};

export const setCategory= (setSearchParams, title) => {
    setSearchParams((prev) => {
        prev.set("category", title)
        prev.set("page", 1)
        return prev;
    }, { replace: true });
};
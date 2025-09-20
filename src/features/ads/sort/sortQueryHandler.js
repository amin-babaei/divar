export const sortQuery = (setSearchParams, value) => {
    setSearchParams((prev) => {
        prev.set("sort", value);
        prev.set("page", 1);
        return prev;
    }, { replace: true });
};

import { Link, createSearchParams, useNavigate } from "react-router-dom";

const Breadcrumb = ({postCategory,title}) => {
    const navigate = useNavigate()

    const categoryHandler = title => {
        navigate({
            pathname: "/",
            search: createSearchParams({
                category: title,
                page: 1
            }).toString()
        });
    }

    return (
        <nav className="rounded-md py-5 px-2">
            <ol className="list-reset flex text-xs">
                <li className="text-gray-500 hover:text-xred whitespace-nowrap">
                    <Link to="/">صفحه اصلی</Link>
                </li>
                <li>
                    <span className="text-gray-400 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500 hover:text-xred cursor-pointer whitespace-nowrap" 
                onClick={()=> categoryHandler(postCategory?.englishTitle)}>
                    <p>{postCategory.title}</p>
                </li>
                <li>
                    <span className="text-gray-400 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500 font-medium">{title}</li>
            </ol>
        </nav>
    );
}

export default Breadcrumb;
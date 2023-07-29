import { useCallback, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import QueryContext from "../../context/QueryContext";

const Breadcrumb = ({postCategory,title}) => {
    const [, setSearchParams] = useSearchParams();
    const { setCurrentPage, category, setCategory} = useContext(QueryContext)
    const navigate = useNavigate()

    const sortCategory = useCallback(title => {
        setCategory(title)
        setSearchParams({category})
        setCurrentPage(1)
        navigate(`/?category=${category}`)
    }, [setCategory, setSearchParams, category, setCurrentPage, navigate])

    return (
        <nav className="rounded-md py-5 px-2">
            <ol className="list-reset flex text-xs">
                <li className="text-gray-500 hover:text-xred whitespace-nowrap">
                    <Link to="/">صفحه اصلی</Link>
                </li>
                <li>
                    <span className="text-gray-400 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500 hover:text-xred cursor-pointer whitespace-nowrap" onClick={()=> sortCategory(postCategory?.englishTitle)}>
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
import { Link } from "react-router-dom";

const Breadcrumb = ({data}) => {
    return (
        <nav className="rounded-md py-5 px-2">
            <ol className="list-reset flex text-xs">
                <li className="text-gray-500 hover:text-xred">
                    <Link to="/">صفحه اصلی</Link>
                </li>
                <li>
                    <span className="text-gray-400 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500 hover:text-xred">
                    <p>{data.category.title}</p>
                </li>
                <li>
                    <span className="text-gray-400 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500">{data.title}</li>
            </ol>
        </nav>
    );
}

export default Breadcrumb;
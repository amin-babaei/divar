import { Component } from "react";
import { Helmet } from "react-helmet";
import notfound from '../assets/404.png'
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className='flex flex-col items-center font-Ilight'>
                    <Helmet>
                        <title>دیوار</title>
                    </Helmet>
                    <img src={notfound} alt="not found" className='w-48 h-full' />
                    <h1 className='text-3xl py-8 text-gray-500'>به نظر مشکلی پیش آمده</h1>
                    <p className='text-lg text-gray-500'>برای رفع مشکل سری به
                        {" "}
                        <Link to={'/'} className='text-red-700' onClick={()=>this.setState({hasError:false})}>صفحهٔ اول دیوار</Link>
                        {" "}
                        بزنید</p>
                </section>
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary
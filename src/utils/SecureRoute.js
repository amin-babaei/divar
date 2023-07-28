import { Link, Outlet } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export const SecureRoute = () => {
    const { user,loading  } = useAuth()
    if(loading) return <Loading/>
    if (!user) {
        return (
            <section className="flex flex-col items-center min-h-screen mt-20">
                <img src="/login_state.svg" alt="" />
                <h3 className='text-center px-2'>برای ادامه کار لازم است که وارد حساب کاربری خود شوید</h3>
                <Link to='/signin'>
                    <Button color='failure' className="mt-5">
                        <h4>ورود / ثبت نام</h4>
                    </Button>
                </Link>
            </section>
        )
    }

    return <Outlet/>;
}
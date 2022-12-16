import { Button } from "flowbite-react"
import { Link } from "react-router-dom"

const Authorized = () => {
  return (
    <section className="flex flex-col items-center min-h-screen mt-20">
        <img src="/login_state.svg" alt="" />
        <h3>برای ادامه کار لازم است که وارد حساب کاربری خود شوید</h3>
        <Link to='/signin'>
          <Button color='failure' className="mt-5">
              <h4>ورود / ثبت نام</h4>
          </Button>
        </Link>
    </section>
  )
}

export default Authorized
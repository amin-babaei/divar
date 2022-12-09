import { Button, Sidebar } from 'flowbite-react'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import SidebarCategory from '../sidebar/Category'
import SidebarSort from '../sidebar/Sort'
function Drawer() {
    const [show,setShow] = useState(false)
    return (
            <div className="text-center z-20">
                <GiHamburgerMenu className='sm:hidden' onClick={()=>setShow(true)}/>
                    <div className={`w-fit  min-h-screen shadow-xl duration-300 top-0 absolute p-0 sm:hidden ${show ? 'right-0' : '-right-full'}`}>
                        <Sidebar aria-label="Default sidebar example" className='relative p-0'>
                            <Sidebar.Items className='h-screen p-6 leading-10 w-64'>
                               <SidebarCategory/>
                               <SidebarSort/>
                            <Button color="dark" size="sm" className='absolute top-1 left-3' onClick={()=>setShow(false)}>X</Button>
                            </Sidebar.Items>
                        </Sidebar>
                    </div>
            </div>
    )
}

export default Drawer
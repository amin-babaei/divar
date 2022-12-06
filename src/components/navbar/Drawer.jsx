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
                {show && (
                    <div className="w-fit min-h-screen top-0 absolute right-0 p-0 sm:hidden">
                        <Sidebar aria-label="Default sidebar example" className='relative p-0'>
                            <Sidebar.Items className='h-screen p-6 leading-10 w-64'>
                               <SidebarCategory/>
                               <SidebarSort/>
                            <Button color="failure" size="sm" className='absolute top-1 left-3' onClick={()=>setShow(false)}>X</Button>
                            </Sidebar.Items>
                        </Sidebar>
                    </div>
                )}
            </div>
    )
}

export default Drawer
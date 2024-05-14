import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux' // to display the logout button based on login or not
import { useNavigate } from 'react-router-dom' // to make navigation to url on clicking button link, can use Link tag also fo this

//now in header we are doing3 things-
//1-) storing the nav heading in object form and show using map function, so that we can add other lins easily just in object
//2-)showing only the particular nav heading based on user logged in or not, using active status property navItems based on authStatus
//3-) showing the logout button based on login or not at last

function Header() {
  
  //fetching status of user login, as we always update everything in store, thus we can fetch the real time update from it also.
  const authStatus = useSelector((state) => state.auth.status)  //for this firat make the redux store that stores the login status as variable
  const navigate = useNavigate()

  //storing the nav links names in object form with active property(useful in conditional rendering to show on basis of user login or not)
  //also if want more links just add the names with property in the object simple 
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-gray-500'>
        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'><Logo width='70px'/></Link>
          </div>

          {/* now showing each navlinks using map fucntion object */}
          <ul className='flex ml-auto'>
            {navItems.map((item) => 

            //showing only the particular nav heading based on user logged in or not
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Header
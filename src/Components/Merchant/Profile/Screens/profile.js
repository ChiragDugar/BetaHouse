import React from 'react'
import Navbar from '../../../Navbars/darkMerchantNavbar'
import Profile from '../Component/profile'

export default function profile({history}) {
    return (
        <div>
            <Navbar history = {history} />
            <Profile />
        </div>
    )
}

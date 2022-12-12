import {useState, useEffect} from 'react'

const RegLog = () => {
  // ======================================
  //                 HOOK
  // ======================================

  const [newLoginView, setLoginView] = useState(false)

    return (
        <>
            <div className='login-container'>
                <div className='login-text'>
                    <button className='cta'></button>
                    <div className='text'>
                        <a href='#'>Login</a>
                        <br />
                        <input type='text' placeholder='Username'/>
                        <br />
                        <input type='password' placeholder='Password' />
                        <button className='login-btn'>Log In</button>
                        <button className='signup-btn'>Sign up</button>
                    </div>
                </div>
            </div>
        </>
    )
}
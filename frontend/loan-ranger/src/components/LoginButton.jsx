import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  // If user is already logged in, don’t show this button
  if (isAuthenticated) {
    return null
  }

  return (
    <button onClick={() => loginWithRedirect()}>
      Log In
    </button>
  )
}

export default LoginButton

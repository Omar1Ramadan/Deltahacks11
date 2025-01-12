import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0()

  if (!isAuthenticated) {
    return null
  }

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  )
}

export default LogoutButton

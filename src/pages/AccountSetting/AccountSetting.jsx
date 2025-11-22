import React from 'react'
import "./account.css"
import { AuthProvider } from '../../context/AuthContext'
import Dashboard from '../Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
const AccountSetting = () => {
  return (
    <>
    <AuthProvider>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: 'white',
              border: '1px solid #374151',
            },
          }}
        />
        <Dashboard />
      </div>
    </AuthProvider>
    </>
  )
}

export default AccountSetting
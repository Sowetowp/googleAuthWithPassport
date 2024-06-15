import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import P2 from './P2'
export default function LoginScreen() {
    
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/pp' element={<P2 />} />
                </Routes>
            </Router>
        </>
    )
}
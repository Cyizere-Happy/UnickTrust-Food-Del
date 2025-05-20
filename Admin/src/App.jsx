import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/AddFood/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonTheme } from 'react-loading-skeleton'
import AddStock from './pages/AddStock/AddStock'
import StockChart from './components/Stock-Chart/StockChart'
import StockTrendChart from './components/StockTrendChart/StockTrendChart'
import ListStock from './pages/ListStock/ListStockPage'

const App = () => {
  return (
    <div>
      <SkeletonTheme>
        <ToastContainer />
        <div className="app-content">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <div className="page-content">
              <Routes>
                <Route path="/add" element={<Add/>}/>
                <Route path="/list" element={<List/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path='/add-items' element={<AddStock/>}></Route>
                <Route path='/list-items' element={<ListStock/>}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default App
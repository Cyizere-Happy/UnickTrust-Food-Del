import React from 'react'
import StockTrendChart from '../../components/StockTrendChart/StockTrendChart'
import SimpleStockCategoryChart from '../../components/Stock-Chart/StockChart'
import ListStock from '../../components/ListStock/ListStock'
import './ListStockPage.css'

const ListStockPage = () => {
  return (
    <>
    <div className='charts-flexBox'>
      <SimpleStockCategoryChart />
      <StockTrendChart />
    </div>
      <ListStock />
      </>
  )
}

export default ListStockPage

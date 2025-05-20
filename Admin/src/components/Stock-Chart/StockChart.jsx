import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './StockChart.css';

export default function SimpleStockCategoryChart() {
  const [categoryData, setCategoryData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch and process API data
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('http://localhost:5790/api/stock/list-items');
        const result = await response.json();

        if (result.success && result.data) {
          // Aggregate data by category
          const aggregatedData = result.data.reduce((acc, item) => {
            const category = item.category.toLowerCase();
            const value = item.quantity || 1;

            const existing = acc.find((entry) => entry.category === category);
            if (existing) {
              existing.value += value;
            } else {
              acc.push({
                name: item.category,
                value,
                category,
              });
            }
            return acc;
          }, []);

          // Calculate total and percentages
          const total = aggregatedData.reduce((sum, item) => sum + item.value, 0);

          const processedData = aggregatedData.map(item => ({
            ...item,
            percentage: Math.round((item.value / total) * 100),
          }));

          setCategoryData(processedData);
          setTotalItems(total);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  // Define colors matching the website's theme
  const CATEGORY_COLORS = {
    mass: '#175784',
    volume: '#178060',
    units: '#E76F51',
  };

  return (
    <div className="stock-chart-container">
      <div className="header">
        <h2 className="title">Stock by Category</h2>
        <div className="subtitle">Current Inventory</div>
      </div>

      <div className="total-section">
        <div className="total-label">Total Items</div>
        <div className="total-value">{totalItems.toLocaleString()}</div>
      </div>

      <div className="chart-legend-wrapper">
        <div className="chart" style={{ height: '95px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={22}
                outerRadius={38}
                startAngle={90}
                endAngle={-270}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[entry.category] || '#8884d8'}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="legend">
          {categoryData.map((entry, index) => (
            <div key={index} className={`legend-item legend-item-${entry.category}`}>
              <div className="legend-color"></div>
              <div className="legend-text">
                {entry.name} <span className="legend-percentage">({entry.percentage}%)</span>
              </div>
              <div className="legend-value">{entry.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
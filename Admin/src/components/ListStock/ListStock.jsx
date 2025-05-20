import React, { useEffect, useState } from 'react';
import './ListStock.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { assets } from '../../assets/assets';

const ListStock = () => {
  const url = 'http://localhost:5790';
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsPerPage, setPostsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indices for pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = list.slice(firstPostIndex, lastPostIndex);

  // Total number of pages
  const totalPages = Math.ceil(list.length / postsPerPage);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/stock/list-items`);
      console.log("Fetched:", response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setList(response.data.data);
      } else {
        toast.error('Unexpected data format');
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeStockItem = async (stockId) => {
    try {
      console.log("Deleting stock item with ID:", stockId);
      const response = await axios.post(`${url}/api/stock/remove-item`, { id: stockId });

      if (response.data.success) {
        toast.success('Stock item removed successfully');
        fetchList();
      } else {
        toast.error('Failed to remove stock item');
      }
    } catch (error) {
      console.error('Error removing stock item:', error);
      toast.error('Error occurred while removing stock item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Reset currentPage when list length changes
  useEffect(() => {
    if (list.length > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [list.length, currentPage, totalPages]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="stock-list">
      <h2>All Stock Items</h2>
      <div className="stock-list-table">
        <div className="stock-list-table-format stock-list-title">
          <b>Image</b>
          <b>Product Name</b>
          <b>Category</b>
          <b>Quantity</b>
          <b>Description</b>
          <b>Action</b>
        </div>

        {/* Skeleton Loading or Content */}
        {loading ? (
          <>
            {[...Array(postsPerPage)].map((_, index) => (
              <div key={index} className="stock-list-table-format">
                <Skeleton width={45} height={40} borderRadius={10} />
                <Skeleton width={80} height={14} />
                <Skeleton width={60} height={14} />
                <Skeleton width={40} height={14} />
                <Skeleton width={100} height={14} />
                <Skeleton width={20} height={14} />
              </div>
            ))}
          </>
        ) : currentPosts.length === 0 && list.length === 0 ? (
          <>
            <div className="stock-list-error">
              <div>
                <img src={assets.warning} alt="Warning" className="stock-list-error-image" />
                <h3 className="stock-list-error-title">No Stock Items Found</h3>
                <p className="stock-list-error-message">
                  It looks like there are no stock items available right now.<br />
                  This could be because no items have been added yet or there may be a temporary connection issue with our server.
                </p>
              </div>
              {/* Contact info card */}
              <div className="stock-list-contact-card">
                <h4>Need Help?</h4>
                <p>If this problem continues, please contact us:</p>
                <p className="stock-list-contact-info">
                  📧 <a href="mailto:happycyizere69@gmail.com">Email Us</a><br />
                  📞 <a href="tel:+250788507076">Contact Us</a>
                </p>
              </div>
            </div>
          </>
        ) : (
          currentPosts.map((item) => (
            <div key={item.id} className="stock-list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.quantity || 1}</p>
              <p className="stock-list-description-wrapper">
                {item.description}
                <span className="stock-list-tooltip">{item.description}</span>
              </p>
              <p onClick={() => removeStockItem(item.id)} className="stock-list-cursor">x</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="stock-list-pagination">
          <button
            className="stock-list-pagination-nav"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>

          <div className="stock-list-pagination-pages">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`stock-list-pagination-button ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            className="stock-list-pagination-nav"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default ListStock;
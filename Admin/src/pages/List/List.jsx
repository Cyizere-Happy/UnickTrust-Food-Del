import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { assets } from '../../assets/assets';

const List = () => {
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
      const response = await axios.get(`${url}/api/food/list`);
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

  const removeFood = async (foodId) => {
    try {
      console.log("Deleting food with ID:", foodId);
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

      if (response.data.success) {
        toast.success('Food item removed successfully');
        fetchList();
      } else {
        toast.error('Failed to remove food item');
      }
    } catch (error) {
      console.error('Error removing food item:', error);
      toast.error('Error occurred while removing food');
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
    <div className="list flex-col">
      <h2>All Foods List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image ▼</b>
          <b>Product name ▼</b>
          <b>Product Category ▼</b>
          <b>Price ▼</b>
          <b>Action ▼</b>
        </div>

        {/* Skeleton Loading or Content */}
        {loading ? (
        <>
        {[...Array(postsPerPage)].map((_, index) => (
          <div key={index} className="list-table-format">
            <Skeleton width={45} height={40} borderRadius={10} />
            <Skeleton width={120} height={14} />
            <Skeleton width={100} height={14} />
            <Skeleton width={60} height={14} />
            <Skeleton width={20} height={14} />
          </div>
        ))}
      </>
        ) : currentPosts.length === 0 && list.length === 0 ? (
          <>
  <div className="something-went-wrong">
    <div>
    <img src={assets.warning} alt="Warning" className="error-image" />
    <h3 className="error-title">No Food Items Found</h3>
    <p className="error-message">
      It looks like there are no food items available right now.<br />
      This could be because no items have been added yet or there may be a temporary connection issue with our server.
    </p>
    </div>
    {/* New small card for contact info */}
    <div className="contact-card">
      <h4>Need Help?</h4>
      <p>
        If this problem continues, please contact us:
      </p>
      <p className="contact-info">
        📧 <a href="mailto:happycyizere69@gmail.com">Email Us</a><br />
        📞 <a href="tel:+250788507076">Contact Us</a>
      </p>
    </div>
  </div>
</>   
        ) : (
          currentPosts.map((item) => (
            <div key={item._id} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">x</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-nav"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>

          <div className="pagination-pages">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`pagination-button ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            className="pagination-nav"
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

export default List;

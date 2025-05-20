import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const url = "http://localhost:5790";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", Number(data.price))
      formData.append("category", data.category)
      formData.append("image", image)
      
      const response = await axios.post(`${url}/api/food/add`, formData)

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        })
        setImage(false)
        toast.success(response.data.message)
      } else {
        console.log("Something went wrong", response.data.message)
        toast.error(response.data.error)
      }
    } catch (error) {
      console.log(error)
      toast.error(
        error?.response?.data?.error ||
        "Could not connect to the server. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='add-container'>
      <div className="add">
        <h2>Add New Dish</h2>
        <form action="" className='flex-col' onSubmit={onSubmitHandler}>
          <div className='flex-displaying'>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id='image' hidden required />
          </div>
          <div className='block-element'>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
          </div>
          <div className="add-product-description flex-col">
            <p className='up'>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="4" placeholder='Write content here' required></textarea>
          </div>
          </div>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} name="category" value={data.category}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' required />
            </div>
          </div>
          <button type='submit' className='add-btn' disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Dish'}
          </button>
        </form>
      </div>
      <div className="left-add">
        <img src={assets.add_img} alt="Food illustration" />
        <p>Can't wait to taste the delicacy you bring on the table</p>
        
        <div className="celebration">
          <h3>Delightful Addition!</h3>
          <p>Your new creation will be a wonderful addition to our menu selection.</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{Math.floor(Math.random() * 20) + 80}%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Math.floor(Math.random() * 50) + 150}</span>
              <span className="stat-label">Dishes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
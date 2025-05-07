import { useEffect, useState, useContext } from "react";
import { Home, UtensilsCrossed, BedDouble } from "lucide-react";
import "./PlaceOrder.css";
import { StoreContext } from "../../content/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [location, setLocation] = useState("");
  const [returnedLocations, setReturnedLocations] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [serviceType, setServiceType] = useState("room");
  const [roomNumber, setRoomNumber] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { getTotalCartAmount, cartItems, food_list, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Debounce location search
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearch(locationQuery);
    }, 500);

    return () => clearTimeout(debounce);
  }, [locationQuery]);

  // Fetch location suggestions
  useEffect(() => {
    const fetchLocation = async () => {
      if (!debouncedSearch) {
        setReturnedLocations([]);
        return;
      }
      try {
        const response = await axios.get("https://us1.locationiq.com/v1/search.php", {
          params: {
            key: "pk.b13c3a5882ef4167ddab02f600af41b0",
            q: debouncedSearch,
            format: "json",
            countrycodes: "RW",
            limit: 5,
          },
        });
        setReturnedLocations(response.data);
      } catch (error) {
        console.error("Location fetch error:", error);
      }
    };
    fetchLocation();
  }, [debouncedSearch]);

  const handleSelectedLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setLocationQuery(selectedLocation);
    setReturnedLocations([]);
  };

  const getServiceTypeTitle = () => {
    switch (serviceType) {
      case "room":
        return "Room Service";
      case "table":
        return "Restaurant Table";
      case "delivery":
        return "Home Delivery";
      default:
        return "Order";
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate token
    if (!token) {
      toast.error("Please log in to place an order");
      navigate("/login");
      setIsLoading(false);
      return;
    }

    // Validate inputs
    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty");
      setIsLoading(false);
      return;
    }
    if (serviceType === "room" && !roomNumber) {
      toast.error("Please enter a room number");
      setIsLoading(false);
      return;
    }
    if (serviceType === "table" && !tableNumber) {
      toast.error("Please enter a table number");
      setIsLoading(false);
      return;
    }
    if (serviceType === "delivery" && (!address || !formData.firstName || !formData.lastName || !formData.email)) {
      toast.error("Please complete all delivery details");
      setIsLoading(false);
      return;
    }

    // Debug food_list and cartItems
    console.log("food_list:", JSON.stringify(food_list, null, 2));
    console.log("cartItems:", JSON.stringify(cartItems, null, 2));

    // Build orderItems
    let orderItems = [];
    food_list.forEach((item, index) => {
      const itemId = item._id || item.id; // Fallback to item.id if _id is missing
      console.log(`Item ${index} ID: ${itemId}, Quantity: ${cartItems[itemId] || 0}`);
      if (itemId && cartItems[itemId] > 0) {
        let itemInfo = { ...item, quantity: cartItems[itemId] };
        orderItems.push(itemInfo);
      } else {
        console.warn(`Item ${index} skipped: ID=${itemId}, Quantity=${cartItems[itemId] || 0}`);
      }
    });

    // Validate orderItems
    if (orderItems.length === 0) {
      toast.error("No valid items in cart. Please check your cart and try again.");
      console.error("orderItems is empty. Check food_list and cartItems for ID mismatches.");
      setIsLoading(false);
      return;
    }


    // Create orderData
    const orderData = {
      serviceType,
      userId,
      items: orderItems,
      totalAmount: getTotalCartAmount() + 2,
      details:
        serviceType === "room"
          ? { roomNumber }
          : serviceType === "table"
          ? { tableNumber }
          : { address, ...formData },
    };

    console.log("Token:", token);
    console.log("orderData:", JSON.stringify(orderData, null, 2));

    try {
      const response = await axios.post(`${url}/api/order/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        throw new Error(response.data.error || "Order placement failed");
      }
    } catch (error) {
      console.error("Failed to place order:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        if (error.response.data.message === "Not Authorized Login Again") {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          alert(`Failed to place order: ${error.response.data.error || error.message}`);
        }
      } else {
        alert("Failed to place order: Network error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderLocationInput = () => {
    return (
      <form onSubmit={placeOrder} className="form-group">
        {serviceType === "room" && (
          <>
            <label className="form-label">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="form-input"
              placeholder="Enter your room number"
            />
          </>
        )}
        {serviceType === "table" && (
          <>
            <label className="form-label">Table Number</label>
            <input
              type="text"
              name="tableNumber"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="form-input"
              placeholder="Enter your table number"
            />
          </>
        )}
        {serviceType === "delivery" && (
          <>
            <label className="form-label">Delivery Address</label>
            <div className="multi-fields">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={onChangeHandler}
                className="form-input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={onChangeHandler}
                className="form-input"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={onChangeHandler}
              className="form-input"
            />
            <div className="icon-location">
              <input
                type="text"
                name="location"
                placeholder="Location"
                onChange={(e) => setLocationQuery(e.target.value)}
                value={locationQuery}
                className="form-input"
              />
              {returnedLocations.length > 0 && (
                <ul className="location-dropdown">
                  {returnedLocations.map((loc, index) => (
                    <li key={index} onClick={() => handleSelectedLocation(loc.display_name)}>
                      {loc.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-textarea"
              placeholder="Detailed address"
              rows={3}
            />
          </>
        )}
        {(serviceType === "room" || serviceType === "table") && (
          <>
            <label className="form-label">Special Request</label>
            <textarea
              name="specialRequest"
              className="form-textarea"
              placeholder="Enter any special requests"
              onChange={onChangeHandler}
              rows={3}
            />
          </>
        )}
      </form>
    );
  };

  return (
    <div className="main-container">
      <div className="service-container">
        <div className="service-header">
          <div className="step-indicator">
            <div className="step" onClick={() => setServiceType("room")}>
              <div className={`step-circle ${serviceType === "room" ? "active-step-circle" : ""}`}>
                <BedDouble size={20} />
              </div>
              <span className={`step-text ${serviceType === "room" ? "active-step-text" : ""}`}>
                Room Service
              </span>
            </div>
            <div className="step" onClick={() => setServiceType("table")}>
              <div className={`step-circle ${serviceType === "table" ? "active-step-circle" : ""}`}>
                <UtensilsCrossed size={20} />
              </div>
              <span className={`step-text ${serviceType === "table" ? "active-step-text" : ""}`}>
                Table Service
              </span>
            </div>
            <div className="step" onClick={() => setServiceType("delivery")}>
              <div className={`step-circle ${serviceType === "delivery" ? "active-step-circle" : ""}`}>
                <Home size={20} />
              </div>
              <span className={`step-text ${serviceType === "delivery" ? "active-step-text" : ""}`}>
                Home Delivery
              </span>
            </div>
          </div>
        </div>

        <div className="service-title">{getServiceTypeTitle()}</div>

        {renderLocationInput()}
      </div>

      <div className="cart-total-2">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details-2">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details-2">
            <p>Delivery Fee</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="cart-total-details-2">
            <b>Total</b>
            <b>${getTotalCartAmount() + 2}</b>
          </div>
        </div>
        <button type="submit" onClick={placeOrder} disabled={isLoading}>
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
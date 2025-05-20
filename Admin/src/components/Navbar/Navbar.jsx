import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import { Smile, Award, TrendingUp, Coffee } from 'lucide-react';
import { assets } from "../../assets/assets";

const Dashboard_intro = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const cards = [
    {
      title: "Today's Deliveries",
      value: "32",
      change: "+12%",
      positive: true,
      message: "Amazing job! Your team's delivery rate is faster than yesterday.",
      icon: <TrendingUp className="icon green" />
    },
    {
      title: "Customer Satisfaction",
      value: "4.8",
      change: "+0.3",
      positive: true,
      message: "Your customers love your service! Keep up the great work.",
      icon: <Smile className="icon yellow" />
    },
    {
      title: "New Orders",
      value: "47",
      change: "+8",
      positive: true,
      message: "Orders are flowing in! Your restaurant partners are thriving.",
      icon: <Coffee className="icon blue" />
    },
    {
      title: "Delivery Heroes",
      value: "16",
      change: "+2",
      positive: true,
      message: "Your delivery team is growing. You're building something special!",
      icon: <Award className="icon purple" />
    }
  ];

  return (
    <>
    <div className="dashboard-header">
    <h1>Dashboard</h1> {/* <<< Changed here */}
    <p>{getFormattedDate()}</p> {/* Keep date below */}
  </div>
    <div className="dashboard-intro">
      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-top">
              <div className="card-icon">{card.icon}</div>
              <span className={`card-change ${card.positive ? 'positive' : 'negative'}`}>
                {card.change}
              </span>
            </div>
            <h2 className="card-title">{card.title}</h2>
            <div className="card-value">{card.value}</div>
            <p className="card-message">{card.message}</p>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default Dashboard_intro;

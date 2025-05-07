import React, { useState, useEffect, useContext } from 'react';
import Joyride, {STATUS} from 'react-joyride';

const TourGuide = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);
  const [tourKey, setTourKey] = useState("initial");

  const TourStyle = {
    tooltip: {
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      color: '#333',
      fontSize: '16px',
      padding: '15px',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    },
    tooltipContainer: {
      textAlign: 'left',
    },
    tooltipTitle: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0 0 10px 0',
    },
    buttonNext: {
      backgroundColor: '#175784',
      color: '#fff',
      fontSize: '12px',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
    },
    buttonBack: {
      color: '#636e72',
      fontSize: '14px',
      marginRight: '10px',
    },
    buttonSkip: {
      color: '#636e72',
      fontSize: '14px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    spotlight: {
      backgroundColor: 'transparent',
      border: '2px solid #7AC7FF',
    },
    floaterStyles: {
      filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2))',
    }
  };

  useEffect(() => {
    // Set appropriate steps based on authentication status
    if (isAuthenticated) {
      const authSteps = [
        {
          target: "body",
          placement: "center",
          content: "🌸 Hi there... just a little tour to help you get comfy here.",
          disableBeacon: true,
        },
        {
          target: ".view-menu-button",
          content: "🫖 When you're ready, you can gently tap here to view the menu.",
          placement: "bottom",
        },
        {
          target: ".explore-menu",
          content: "🍰 Feel free to explore—desserts, rolls, and more await you. Just a soft click on any category 💫",
          placement: "bottom",
        },
        {
          target: ".food-display-list",
          content: "Here is the food menu where you'll be able to choose a variety of food but remember for simplicity you can filter by category of your choice",
          placement: "top",
        },
        {
          target: ".add",
          content: "click here to add this item in your shopping chart ",
          offset: {
            top: 50
          }
        },
        {
          target: ".remove-icon",
          content: "Click here to remove the item from your shopping cart",
          placement: "bottom",
        },
        {
          target: ".cart-img",
          content: "Click here to view your shopped items",
          placement: "bottom"
        }
      ];
      
      setSteps(authSteps);
      const authCompleted = localStorage.getItem("authHasCompletedTour") === "true";
      setRun(!authCompleted);
    } else {
      const nonAuthSteps = [
        {
          target: "body",
          placement: "center",
          content: "🌸 Hi there... just a little tour to help you get comfy here.",
          disableBeacon: true,
        },
        {
          target: ".view-menu-button",
          content: "🫖 When you're ready, you can gently tap here to view the menu.",
          placement: "bottom",
        },
        {
          target: ".explore-menu",
          content: "🍰 Feel free to explore—desserts, rolls, and more await you. Just a soft click on any category 💫",
          placement: "bottom",
        },
        {
          target: ".left-button",
          content: "🔐 Oh! You'll need to log in or sign up first. Don't worry—it's quick and smooth. ✨",
          placement: "bottom",
          offset: {
            top: 50,
          }
        },
      ];
      
      setSteps(nonAuthSteps);
      const nonAuthCompleted = localStorage.getItem("nonAuthHasCompletedTour") === "true";
      setRun(!nonAuthCompleted);
    }
    
    // Set unique key for proper re-rendering
    setTourKey(isAuthenticated ? "auth-" + Date.now() : "nonauth-" + Date.now());
  }, [isAuthenticated]);

  // Handle tour completion
  const handleTourGuide = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      
      // Mark the appropriate tour as completed
      if (isAuthenticated) {
        localStorage.setItem("authHasCompletedTour", "true");
      } else {
        localStorage.setItem("nonAuthHasCompletedTour", "true");
      }
    }
  };

  return (
    <Joyride 
      steps={steps}
      key={tourKey}
      continuous 
      showProgress 
      showSkipButton 
      scrollOffset={100} 
      styles={TourStyle}
      locale={{
        back: "← Previous",
        skip: "Skip tour",
        last: "Finish"
      }}
      callback={handleTourGuide}
      run={run}
    />
  );
};

export default TourGuide;
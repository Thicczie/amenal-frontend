import { useRef } from "react";
import { IonNav } from "@ionic/react";

const useNav = () => {
  // Create a ref to hold the IonNav component instance
  const navRef = useRef();

  // Create a function to push a new component onto the navigation stack
  const pushPage = (component, componentProps, opts, done) => {
    // Ensure that the IonNav component instance exists
    if (!navRef.current) {
      console.error("IonNav component instance not found.");
      return;
    }

    // Call the push method of the IonNav component instance
    return navRef.current.push(component, componentProps, opts, done);
  };

  // Return the IonNav component along with the pushPage function
  return { IonNav: <IonNav ref={navRef} />, pushPage };
};

export default useNav;

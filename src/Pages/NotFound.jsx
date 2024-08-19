import React, { useEffect } from "react";
import Icon from "../Components/Icon";

function NotFound() {
  useEffect(() => {
    // Use setTimeout to delay the execution of the code
    const delay = 2000; // 2 seconds

    const timeoutId = setTimeout(() => {
      // Your code to be executed after 2 seconds
      window.location.replace("/");

      // Add your logic here...
    }, delay);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      <div
        className="nonSelectable notfound"
        style={{ width: "60%", height: "auto", margin: "5% auto" }}
      >
        <Icon />
      </div>
    </>
  );
}

export default NotFound;

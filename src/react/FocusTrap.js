import React from "react";
function FocusTrap({ children }) {
  const focusLastElement = function () {
    if (lastFocusElement.current) {
      lastFocusElement.current.focus();
    } else {
      const focusList = getFocusElements(modalElement);
      if (focusList.length > 0) {
        lastFocusElement.current = focusList[focusList.length - 1];
        lastFocusElement.current.focus();
      } else {
        // @todo no focusable element
      }
    }
  };

  const focusFirstElement = function () {
    if (firstFocusElement.current) {
      firstFocusElement.current.focus();
    } else {
      const focusList = getFocusElements(modalElement);
      if (focusList.length > 0) {
        firstFocusElement.current = focusList[0];
        firstFocusElement.current.focus();
      } else {
        // @todo no focusable element
      }
    }
  };
  // handle initial focus
  useEffect(() => {
    // handle focus ref props
    const initialRef = initialFocusRef;
    if (initialRef && initialRef.current) {
      initialRef.current.focus();
      return;
    }

    // handle focus id props
    const initialID = props["aria-describedby"];
    if (initialID) {
      const initialFocusElement = modalElement.current.querySelectorAll(
        "#" + initialID
      )[0];
      if (initialFocusElement) {
        initialFocusElement.focus();
      }
    } else {
      focusFirstElement();
    }
  }, []);

  return (
    <>
      <div
        tabIndex={0}
        onFocus={focusLastElement}
        aria-hidden
      ></div>
      {children}
      <div
        tabIndex={0}
        onFocus={focusFirstElement}
        aria-hidden
      ></div>
    </>
  );
}

// helper function
function getFocusElements(element) {
  return element.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );    
}

export default FocusTrap;

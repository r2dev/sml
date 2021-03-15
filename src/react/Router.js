import React, { useEffect, useState, useContext, createContext } from 'react'

const RouterStateContext = createContext();
const RouterDispatchContext = createContext();

function useRouterDispatch() {
    const context = useContext(RouterDispatchContext);
    if (context === undefined) {
        throw new Error('useRouterDispatch must be used within Router')
    }
    return context;
}
function useRouterState() {
    const context = useContext(RouterStateContext);
    if (context === undefined) {
        throw new Error('useRouterState must be used within Router')
    }
    return context;
}

const history = window.history;

function Router({children}) {
  const [state, setState] = useState({pathname: document.location.pathname});
  function handlePushStateEvent(location) {
    setState(location);
  }
  function handlePopStateEvent(event) {
    setState({pathname: document.location.pathname});
  }
  useEffect(() => {
    window.addEventListener('popstate', handlePopStateEvent);
    return () => {
      window.removeEventListener('popstate', handlePopStateEvent);
    }
  })
  return (
    <RouterStateContext.Provider value={state}>
      <RouterDispatchContext.Provider value={[handlePushStateEvent]}>
        {children}
      </RouterDispatchContext.Provider>
    </RouterStateContext.Provider>
  );
}

function Route({path, children, ...props}) {
  const location = useRouterState();
  return (path === location.pathname) ? children: null
}

function Link({to, replace=false, ...props}) {
  const [handlePushStateEvent] = useRouterDispatch();
  function handleClick(event) {
    event.preventDefault();
    handlePushStateEvent({pathname: to})
    if (replace) {
      history.replaceState({}, '', to)
    } else {
      history.pushState({}, '', to)
    }
    return false;
  }
  return <a onClick={handleClick} href={to} {...props} />
}

export {Router, Route, Link}
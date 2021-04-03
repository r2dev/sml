import React, { useEffect, useState, useContext, createContext, useMemo } from 'react'

const RouterStateContext = createContext();
const RouterDispatchContext = createContext();
const RouterNestStateContext = createContext();

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
function useRouterNestState() {
  const context = useContext(RouterNestStateContext);
  return context;
}

const history = window.history;

function Router({children}) {
  const [state, setState] = useState({pathname: document.location.pathname});
  
  function handlePushStateEvent(location) {
    setState({pathname: location.pathname});
  }
  function handlePopStateEvent() {
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
  const parentPath = useRouterNestState();
  const pathname = useMemo(() => {
    let result = '';
    if (path?.[0] === '/') {
      result = path;
    } else {
      result = parentPath + '/' + path;
    }
    if (result.length > 0 && result[result.length - 1] === '/') {
      result = result.slice(0, -1);
    }
    return result;
  }, [path, parentPath])
  
  const isShowing = useMemo(() => {
    let result = false
    if ((pathname === '' && window.location.pathname === '/') || (pathname !== '' && location.pathname.startsWith(pathname))) {
      result = true;
    }
    return result;
  }, [pathname, window.location.pathname, location.pathname])

  return <RouterNestStateContext.Provider value={pathname}>
      {(isShowing) ? children: null}
    </RouterNestStateContext.Provider>
}

function Link({to, replace=false, ...props}) {
  const [handlePushStateEvent] = useRouterDispatch();
  function handleClick(event) {
    event.preventDefault();
    let pathname = '';
    if (to?.[0] === '/') {
      pathname = to;
    } else {
      pathname = document.location.pathname + '/' + to;
    }
    handlePushStateEvent({pathname: pathname})
    if (replace) {
      history.replaceState({}, '', pathname)
    } else {
      history.pushState({}, '', pathname)
    }
    return false;
  }
  return <a onClick={handleClick} href={to} {...props} />
}

export {Router, Route, Link}
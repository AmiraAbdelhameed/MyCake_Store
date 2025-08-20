
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./Routes/Routes"; 
import { ThemeProvider } from "@emotion/react";
import { Theme } from "./Theme";
function renderRoutes(routes) {
  return routes.map(({ id, path, element, children, index }) => (
    <Route key={id} path={path} element={element} index={index}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

function App() {
  return (
    <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </Suspense>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
function Shop() {
  return <h1>I am the shop page</h1>;
}
function App() {
  return (
    <Routes>
      //only renders when URL is pointing to home. Need to wrap anything
      routable inside this Routes cmpt
      <Route path="/" element={<Navigation />}>
        //only renders when matches the specific route path "/". If matches,
        then render following element cmpt
        <Route index element={<Home />} /> //Index routes render into their
        parent's Outlet at their parent's URL (like a default child route).
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;

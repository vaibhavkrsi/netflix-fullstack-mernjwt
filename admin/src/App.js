import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import { Redirect } from "react-router-dom";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        {user ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/" component={Home} />
              <Route path="/users" component={UserList} />
              <Route path="/user/:userId" component={User} />
              <Route path="/newUser" component={NewUser} />
              <Route path="/movies" component={ProductList} />
              <Route path="/product/:productId" component={Product} />
              <Route path="/newproduct" component={NewProduct} />
              <Route path="/lists" component={ListList} />
              <Route path="/list/:listId" component={List} />
              <Route path="/newList" component={NewList} />
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;

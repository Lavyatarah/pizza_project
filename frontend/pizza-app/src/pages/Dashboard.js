import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Dashboard.css";
import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";

const Dashboard = () => {
  const restaurant = localStorage.getItem("user");
  const restaurantName = JSON.parse(restaurant).name;
  return (
    <ProtectedRoute>
    <div className="Dashboard">
      <Header />
      <div className="dashboard">Dashboard</div>
      <div className="restaurants-name-parent">
        <b className="restaurants-name">{`${restaurantName} >`}</b>
        <b className="my-pizzas">My Pizzas</b>
      </div>
      <Button variant="outline-dark" size="lg" href="/create_pizza">
        create pizza item
      </Button>
      <div className="rectangle-parent">
        <div className="frame-child" />
        <img
          className="frame-item"
          alt="pizza picture"
          src="/rectangle-4@2x.png"
        />
        <div className="name">name</div>
        <div className="price">Price</div>
        <Button className="buttonoutlined" variant="outline-dark" size="lg">
          edit
        </Button>
        <Button className="buttonoutlined1" variant="outline-dark" size="lg">
          Delete
        </Button>
      </div>
      <div className="rectangle-parent">
        <div className="frame-child" />
        <img
          className="frame-item"
          alt="pizza picture"
          src="/rectangle-4@2x.png"
        />
        <div className="name">name</div>
        <div className="price">Price</div>
        <Button className="buttonoutlined" variant="outline-dark" size="lg">
          edit
        </Button>
        <Button className="buttonoutlined1" variant="outline-dark" size="lg">
          Delete
        </Button>
      </div>
      <div className="rectangle-parent">
        <div className="frame-child" />
        <img
          className="frame-item"
          alt="pizza picture"
          src="/rectangle-4@2x.png"
        />
        <div className="name">name</div>
        <div className="price">Price</div>
        <Button className="buttonoutlined" variant="outline-dark" size="lg">
          edit
        </Button>
        <Button className="buttonoutlined1" variant="outline-dark" size="lg">
          Delete
        </Button>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

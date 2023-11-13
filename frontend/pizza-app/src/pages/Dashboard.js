import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Dashboard.css";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Header />
      <div className="dashboard">Dashboard</div>
      <div className="restaurants-name-parent">
        <b className="restaurants-name">{`Restaurant’s name >`}</b>
        <b className="my-pizzas">My Pizzas</b>
      </div>
      <Button variant="outline-dark" size="lg">
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
  );
};

export default Dashboard;

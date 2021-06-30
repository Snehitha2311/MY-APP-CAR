import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from 'react';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';

const { Provider, Consumer } = React.createContext("details");

const Cars = ({ carName, carPrice }) => (
  <Consumer>{
    ({ carInfo, update }) => (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name"
                  name="name"
                  onChange={(e) => update({ 'carName': e.target.value })} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Enter price"
                  name="price"
                  onChange={(e) => update({ 'carPrice': e.target.value })} />
              </Form.Group>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    )}
  </Consumer>
)
const CarList = () => (
  <main>
    <section>
      <Cars />
    </section>
  </main>
)
class App extends Component {
  constructor(props) {
    super(props);
    this.carDetails = [
      {
        id: "1",
        name: "Honda",
        price: "$100"
      },
      {
        id: "2",
        name: "BMW",
        price: "$200"
      },
      {
        id: "3",
        name: "Mercedes",
        price: "$300"
      },
      {
        id: "4",
        name: "Ferrari",
        price: "$400"
      },
      {
        id: "5",
        name: "Innova",
        price: "$250"
      }
    ];
    this.car = [];
    this.state = {
      carDetails: this.carDetails,
      carName: '',
      carPrice: '',
    }
  }

  onClick = () => {
    const { carName, carPrice, carDetails } = this.state;
    const newCar = {
      name: carName, price: carPrice, id: carDetails.length + 1
    }
    const updatedCar = carDetails.concat(newCar);
    this.setState({ carDetails: updatedCar })
  }
  update = (details) => this.setState(details);
  
  render() {
    const carInfo = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <center>
          <Provider value={{ carInfo: carInfo, update: this.update }}>
            <ListGroup style={{ width: "250px" }}>
              <ListGroup.Item>
                {this.state.carDetails.map(list =>
                  <div key={list.id} eventKey={list.price}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                      <p>{list.name}</p>
                      <p>{list.price}</p>
                    </div>
                  </div>)}
              </ListGroup.Item>
            </ListGroup>

            <h4>Product List</h4>
            <CarList />
            <Button variant="secondary" onClick={this.onClick}>Submit</Button>
          </Provider>
        </center>
      </Fragment>
    )
  }
}
export default App;

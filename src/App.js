import React, { Component } from "react";
import Header from "./Header.js";
import Filter from "./Filter.js";
import Listings from "./Listings.js";
import listingsData from "./data/listingsData.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Marie",
      listingsData,
      city: "All",
      homeType: "All",
      bedrooms: 0,
      min_price: 0,
      max_price: 10000000,
      min_floor_space: 0,
      max_floor_space: 5000,
      basement: false,
      elevator: false,
      gym: false,
      swimming_pool: false,
      filteredData: listingsData,
      populateFormsData: "",
      sortby: "price-asc",
      view: "box",
      search: ""
    };
    this.change = this.change.bind(this);
    this.filteredData = this.filteredData.bind(this);
    this.populateForm = this.populateForm.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  componentWillMount() {
    var listingsData = this.state.listingsData.sort((a, b) => {
      return a.price - b.price;
    });

    this.setState({
      listingsData
    });
  }

  change(event) {
    var name = event.target.name;
    var value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
        this.filteredData();
      }
    );
  }

  changeView(viewName) {
    this.setState({
      view: viewName
    });
  }

  filteredData() {
    var newData = this.state.listingsData.filter((item, index) => {
      console.log(item.extras[index] != this.state.elevator);
      return (
        item.price >= this.state.min_price &&
        item.price <= this.state.max_price &&
        item.floorSpace >= this.state.min_floor_space &&
        item.floorSpace <= this.state.max_floor_space &&
        item.rooms >= this.state.bedrooms &&
        item.elevator != this.state.elevator
      );
    });

    if (this.state.city != "All") {
      newData = newData.filter(item => {
        return item.city === this.state.city;
      });
    }

    if (this.state.homeType != "All") {
      newData = newData.filter(item => {
        return item.homeType === this.state.homeType;
      });
    }

    if (this.state.sortby === "price-dsc") {
      newData = newData.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (this.state.sortby === "price-asc") {
      newData = newData.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (this.state.search !== "") {
      newData = newData.filter(item => {
        var city = item.city.toLowerCase();
        var searchText = this.state.search.toLowerCase();
        var n = city.match(searchText);

        if (n != null) {
          return true;
        }
      });
    }

    if (this.state.swimming_pool != false) {
      newData = newData.filter(item => {
        return (
          item.extras.includes("swimming_pool") == this.state.swimming_pool
        );
      });
      console.log(newData);
    }

    if (this.state.elevator != false) {
      newData = newData.filter(item => {
        return item.extras.includes("elevator") == this.state.elevator;
      });
      console.log(newData);
    }

    if (this.state.gym != false) {
      newData = newData.filter(item => {
        return item.extras.includes("gym") == this.state.gym;
      });
      console.log(newData);
    }

    if (this.state.basement != false) {
      newData = newData.filter(item => {
        return item.extras.includes("basement") == this.state.basement;
      });
      console.log(newData);
    }

    this.setState({
      filteredData: newData
    });
  }

  populateForm() {
    // city
    var cities = this.state.listingsData.map(item => {
      return item.city;
    });
    // remove everything wich repeats , keeps the one which not repeat
    cities = new Set(cities);
    cities = [...cities];

    cities = cities.sort();

    // Home homeType
    var homeTypes = this.state.listingsData.map(item => {
      return item.homeType;
    });
    homeTypes = new Set(homeTypes);
    homeTypes = [...homeTypes];
    homeTypes = homeTypes.sort();

    // bedrooms
    var bedrooms = this.state.listingsData.map(item => {
      return item.rooms;
    });
    bedrooms = new Set(bedrooms);
    bedrooms = [...bedrooms];
    bedrooms = bedrooms.sort();

    this.setState(
      {
        populateFormsData: {
          homeTypes,
          bedrooms,
          cities
        }
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    //console.log(this.state.listingsData)
    return (
      <div>
        <Header />
        <section id="content-area">
          <Filter
            change={this.change}
            globalState={this.state}
            populateAction={this.populateForm}
          />
          <Listings
            change={this.change}
            globalState={this.state}
            listingsData={this.state.filteredData}
            changeView={this.changeView}
          />
        </section>
      </div>
    );
  }
}

export default App;

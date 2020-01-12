import React, { Component } from "react";
import "./app.scss";

export default class Filter extends Component {
  constructor() {
    super();
    this.state = {
      name: "Merry"
    };
    this.cities = this.cities.bind(this);
    this.homeTypes = this.homeTypes.bind(this);
    this.bedrooms = this.bedrooms.bind(this);
  }

  componentWillMount() {
    this.props.populateAction();
  }

  cities() {
    if (this.props.globalState.populateFormsData.cities != undefined) {
      var { cities } = this.props.globalState.populateFormsData;
      return cities.map((item, i) => {
        return (
          <option value={item} key={i}>
            {item}
          </option>
        );
      });
    }
  }

  homeTypes() {
    var { homeTypes } = this.props.globalState.populateFormsData;
    if (homeTypes !== undefined) {
      console.log(homeTypes);
      return homeTypes.map(item => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      });
    }
  }
  bedrooms() {
    var { bedrooms } = this.props.globalState.populateFormsData;
    if (bedrooms !== undefined) {
      return bedrooms.map(item => {
        return (
          <option key={item} value={item}>
            {item}+ BR
          </option>
        );
      });
    }
  }

  render() {
    return (
      <section id="filter">
        <div className="ins">
          <h4>Filter</h4>
          <select
            name="city"
            className="neighbourhood"
            onChange={this.props.change}
          >
            <option value="All">All</option>
            {this.cities()}
          </select>

          <select
            name="homeType"
            className="homeType"
            onChange={this.props.change}
          >
            <option value="All">All Homes</option>
            {this.homeTypes()}
          </select>

          <select name="bedrooms" onChange={this.props.change}>
            {this.bedrooms()}
          </select>
          <div className="filter price">
            <span className="title">Price</span>
            <input
              type="text"
              name="min_price"
              className="min_price"
              onChange={this.props.change}
              value={this.props.globalState.min_price}
            />
            <input
              type="text"
              name="max_price"
              className=" min-floor-space"
              onChange={this.props.change}
              value={this.props.globalState.max_price}
            />
          </div>
          <div className="filter floor-space">
            <span className="title">Floor space</span>
            <input
              type="text"
              name="min_floor_space"
              className=" min-floor-space"
              onChange={this.props.change}
              value={this.props.globalState.min_floor_space}
            />
            <input
              type="text"
              name="max_floor_space"
              className=" min-floor-space"
              onChange={this.props.change}
              value={this.props.globalState.max_floor_space}
            />
          </div>
          <div className="filter extras">
            <span className="title">Extras</span>
            <label htmlFor="extras" className="">
              <span>Elevators</span>
              <input
                type="checkbox"
                name="elevator"
                value="elevator"
                className=""
                onChange={this.props.change}
              />
            </label>

            <label htmlFor="extras" className="">
              <span>Swimming Poop</span>
              <input
                type="checkbox"
                name="swimming_pool"
                value="swimming_pool"
                className=""
                onChange={this.props.change}
              />
            </label>

            <label htmlFor="extras" className="">
              <span>Finished Basement</span>
              <input
                type="checkbox"
                name="basement"
                value="basement"
                className=""
                onChange={this.props.change}
              />
            </label>

            <label htmlFor="extras" className="">
              <span>Gym</span>
              <input
                type="checkbox"
                name="gym"
                value="gym"
                className=""
                onChange={this.props.change}
              />
            </label>
          </div>
        </div>
      </section>
    );
  }
}

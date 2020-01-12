import React, { Component } from "react";
import "./app.scss";
import "./reset.scss";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {};
    this.loopListings = this.loopListings.bind(this);
  }

  loopListings() {
    var { listingsData } = this.props;
    // var data= this.props.listingsData
    if (listingsData == undefined || listingsData.length == 0) {
      return "Sorry your filter did not mach any listings!";
    }
    return listingsData.map((listing, index) => {
      if (this.props.globalState.view === "box") {
        // THIS IS BOX VIEW
        return (
          <div className="col-md-3" key={index}>
            <div className="listing">
              <div
                className="listing-img"
                style={{
                  background: `url("${listing.image}") no-repeat center center`
                }}
              >
                <span className="address">{listing.address}</span>
                <div className="details">
                  <div className="col-md-3"></div>
                  <div className="col-md-9">
                    <div className="user-details">
                      <span className="user-name">Nina Smith</span>
                      <span className="post-date">05.08.2016</span>
                    </div>
                    <div className="listing-details">
                      <div className="floor-space">
                        <i className="fas fa-square" />{" "}
                        <span> {listing.floorSpace} ft&sup2; </span>
                      </div>
                      <div className="bedrooms">
                        <i className="fas fa-bed" />
                        <span>{listing.rooms} bedrooms </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-info">
                <span className="location"> ${listing.price}</span>
                <span className="city">
                  <i className="fas fa-map-marker" /> {listing.city} ,{" "}
                  {listing.state}
                </span>
              </div>
            </div>
          </div>
        );
      } else {
        // THIS IS LONG View
        return (
          <div className="col-md-12 col-lg-6" key={index}>
            <div className="listing">
              <div
                className="listing-img"
                style={{
                  background: `url("${listing.image}") no-repeat center center`
                }}
              >
                <span className="address">{listing.address}</span>
                <div className="details">
                  <div className="col-md-9">
                    <div className="user-details">
                      <span className="user-name">Nina Smith</span>
                      <span className="post-date">05.08.2016</span>
                    </div>
                    <div className="listing-details">
                      <div className="floor-space">
                        {" "}
                        <i className="fas fa-square" />{" "}
                        <span> {listing.floorSpace} ft&sup2; </span>
                      </div>
                      <div className="bedrooms">
                        <i className="fas fa-bed" />
                        <span>{listing.rooms} bedrooms </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-info">
                <span className="location"> ${listing.price}</span>
                <span className="city">
                  <i className="fas fa-map-marker" /> {listing.city} ,{" "}
                  {listing.state}
                </span>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <section id="listings">
        <section className="search-area">
          <input type="text" name="search" onChange={this.props.change} />
        </section>

        <section className="sortby-area">
          <div className="results">
            {this.props.globalState.filteredData.length} results found
          </div>
          <div className="sort-options">
            <select
              name="sortby"
              className="sortby"
              onChange={this.props.change}
            >
              <option value="price-dsc"> Lowest Price</option>
              <option value="price-asc"> Highest Price</option>
            </select>
            <div className="view">
              <i
                className="fas fa-list"
                onClick={this.props.changeView.bind(null, "long")}
              />
              <i
                className="fas fa-th"
                onClick={this.props.changeView.bind(null, "box")}
              />
            </div>
          </div>
        </section>

        <div className="row">
          <section className="listing-results">{this.loopListings()}</section>
        </div>

        <section id="pagination">
          <ul className="pages">
            <li> Prev</li>
            <li className="active"> 1</li>
            <li> 2</li>
            <li> 3</li>
            <li> 4</li>
            <li> Next</li>
          </ul>
        </section>
      </section>
    );
  }
}

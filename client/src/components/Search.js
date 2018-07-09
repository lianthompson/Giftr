import React from 'react';
import Auth from '../Auth/Auth';
import './search.css';

const auth = new Auth();

class Search extends React.Component {
  state = {
    searchText: "",
    products: [],
    itemsChecked: [],
    searchLimit: "",
    occasion: "",
    recipient: "",
    
};

  onTextChange = (e) => {
    e.preventDefault();
    let keyword = e.target.searchText.value;
    let limit = e.target.searchLimit.value;

    fetch('/etsy', {
      method: 'POST',
      body: JSON.stringify({
        keywords: keyword,
        amount: limit
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res =>res.json())
      // .then(data => data.products)
      .then(results => this.setState({ products: results }))
      .catch(err => console.log(err))
  };

//TODO: Consider removing items from itemChecked when unchecked (rather than setting to false).
checkItem(product, e) {
    this.state.itemsChecked.push(product);
} 

  onClick = (e) => {
    e.preventDefault();
    const { isAuthenticated, userProfile, getProfile } = auth;

    if(!isAuthenticated()) {
        alert("Oops! You'll need to log in to save that!")
    }

    if (isAuthenticated()) {
        if (!userProfile) {
            getProfile((err, profile) => {
                for (var index in this.state.itemsChecked) {
                    console.log("hello here is key in for loop");
                    let item = this.state.itemsChecked[index]
                    fetch('/added', {
                        method: "POST",
                        body: JSON.stringify({
                            listing_id: item.listing_id,
                            title: item.title,
                            user_email: profile.email
                        }),
                        headers: {
                            "content-type": "application/json"
                        },
                    }).then(res => res.json())
                        .then(res => console.log(res))
                }
            })
        }
        else {
            for (var index in this.state.itemsChecked) {
                console.log("hello here is key in for loop");
                let item = this.state.itemsChecked[index]
                fetch('/added', {
                    method: "POST",
                    body: JSON.stringify({
                        listing_id: item.listing_id,
                        title: item.title,
                        user_email: userProfile.email
                    }),
                    headers: {
                        "content-type": "application/json"
                    },
                }).then(res => res.json())
                    .then(res => console.log(res))
            }

        }
    alert("Saved!")
    // let itemChecked = this.state.itemChecked;
  }
   
} 
  

  render() {

    let saveButton = "";

    if((this.state.products).length){
        saveButton = <button className="saveButton" onClick={this.onClick} method="post" action='/added'>Save</button>
      };

    // console.log("this.state.products:",this.state.products)
    // console.log("this.state.products first index:",this.state.products[0])
    // console.log("this.state.products listing_id:",this.state.products[0].listing_id)
    // console.log("this.state.products title:",this.state.products[0].title)
    // // var product = this.state.products[0];
    // // console.log(product.listing_id);
    // console.log("this.state.itemChecked:", this.state.itemChecked)
    // //console.log("this.state.listing_id:", this.state.listing_id)


    return (                       
      <div className="search-form">
        <form onSubmit={this.onTextChange}>
        <span className="prompt">
          <label htmlFor="recipient">Who is this gift for?</label>
            <input id="recipient" name="recipient" type="text" />
            <br />
          <label htmlFor="searchText">What do they like?</label>
            <input id="searchText" name="searchText" type="text" />
            <br />
          <label htmlFor="occasion">What's the occasion?</label>
            <input id="occasion" name="occasion" type="text" />
            <br />
          <label htmlFor="searchLimit">Search Limit:</label>
            <input id="searchLimit" name="searchLimit" type="text" />
            <br />
          <button className="submitButton">Submit</button>
        </span>
        </form>
        <br />
        <form className="list">
          <ul className='results-list'>
            {this.state.products.map(
              product=> (
              <li key={product}>
                <input type="checkbox" onChange={(e) => this.checkItem(product, e) }/>{" "}{product.title}
              </li>
              )
              )
            }
          </ul>
          {saveButton}
        </form>
        <br />
      </div>
    );
  }
}

export default Search;
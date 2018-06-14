import React from 'react';
import './search.css';

class Search extends React.Component {
  state = {
    searchText: "",
    products: [],
    itemsChecked: []
};

  onTextChange = (e) => {
    e.preventDefault();
    let keyword = e.target.searchText.value;

    fetch('/etsy', {
      method: 'POST',
      body: JSON.stringify({
        keywords: keyword
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
    console.log("hiiii product", product);
    console.log(this.state.itemsChecked);
    // itemChecked[product.listing_id] = product;
    // this.setState({ itemChecked });
    // console.log("hi i'm here", itemsChecked[product.listing_id]);
} 

  onClick = (e) => {
    e.preventDefault();
    console.log("on click is clicked")
    // let itemChecked = this.state.itemChecked;
    for (var index in this.state.itemsChecked) {
        console.log("hello here is key in for loop");
        let item = this.state.itemsChecked[index]
        fetch('/added', {
          method: "POST",
          body: JSON.stringify({
        listing_id: item.listing_id,
        title: item.title,
          }),
          headers: {
            "content-type": "application/json"
          },
        }).then(res => res.json())
          .then(res => console.log(res))
    }
  }
  


  render() {
    if((this.state.products).length){
    console.log("this.state.products:",this.state.products)
    console.log("this.state.products first index:",this.state.products[0])
    console.log("this.state.products listing_id:",this.state.products[0].listing_id)
    console.log("this.state.products title:",this.state.products[0].title)
    // var product = this.state.products[0];
    // console.log(product.listing_id);
    console.log("this.state.itemChecked:", this.state.itemChecked)
    //console.log("this.state.listing_id:", this.state.listing_id)
    };

    return (                       
      <div className="search-form">
        <form onSubmit={this.onTextChange}>
        <span className="prompt">
          <label htmlFor="searchText">What does your friend like?</label><br />
        </span>
          <input id="searchText" name="searchText" type="text"/>
          <button className="button">Submit</button>
        </form>
        <br />
        <form>
          <ul>
            {this.state.products.map(
              product=> (
              <li key={product}>
                <input type="checkbox" onChange={(e) => this.checkItem(product, e) }/>{product.title}
              </li>
              )
              )
            }
          </ul>
            <button className="button" onClick={this.onClick} method="post" action='/added'>Save</button>
        </form>
        <br />
      </div>
    );
  }
}

export default Search;
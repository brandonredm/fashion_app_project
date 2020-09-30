
class App extends React.Component {
  state = {
    color: '',
    brand: '',
    line: '',
    img: '',
    price: '',
    quantity: '',
    fashion: []
  }
  componentDidMount = () => {
    axios
      .get('/fashion')
      .then((response) => {
        this.setState({
          fashion: response.data
        })
      })
  }
  deleteFashion = (event) => {
    axios
      .delete('/fashion/' + event.target.value)
      .then(response => this.setState({fashion: response.data}))
  }
  handleChange = event => {
  this.setState({ [event.target.id]: event.target.value })
}
  handleSubmit = event => {
    event.preventDefault()
    axios.post('/fashion', this.state)
    .then(response => this.setState(
      { color: '',
        brand: '',
        line: '',
        img: '',
        price: '',
        quantity: '',
        fashion: response.data
      })
    )
  }
  updateFashion = event => {
  event.preventDefault()
  const id = event.target.id
  axios.put('/fashion/' + id, this.state).then(response => {
    this.setState({
      fashion: response.data,
      color: '',
      brand: '',
      img: '',
      price: '',
      quantity: ''
    })
  })
}
cancelCourse = (event) => {
  document.getElementByID("clear-form").reset();
}
  render = () => {
    return (
      <div>
        <h2>Wishlist</h2>
        <ul>
        {this.state.fashion.map(fashion => { return(
          <li key={fashion._id}>
          <p className="brand">{fashion.brand} {fashion.line}</p>
          Price: ${fashion.price}.00<br />
          Stock: {fashion.quantity}<br />
          Color: {fashion.color}<br />
          <img src={fashion.img}/>
          <button
          value={fashion._id}
          onClick={this.deleteFashion}
          >Buy Item!</button>
          <details>
              <summary>Edit item</summary>
              <form id={fashion._id} className="clear-form" onSubmit={this.updateFashion}>
                <label htmlFor="color">Color</label>
                <br />
                <input
                  type="text"
                  id="color"
                  onChange={this.handleChange}
                  value={this.state.color}
                />
                <br />
                <label htmlFor="img">Image</label>
                <br />
                <input
                  type="text"
                  id="img"
                  onChange={this.handleChange}
                  value={this.state.img}
                />
                <br />
                <label htmlFor="line">Line</label>
                <br />
                <input
                  type="text"
                  id="line"
                  onChange={this.handleChange}
                  value={this.state.line}
                />
                <br />
                <label htmlFor="brand">Brand</label>
                <br />
                <input
                  type="text"
                  id="brand"
                  onChange={this.handleChange}
                  value={this.state.brand}
                />
                <br />
                <label htmlFor="price">Price</label>
                <br />
                <input
                  type="number"
                  id="price"
                  onChange={this.handleChange}
                  value={this.state.price}
                />
                <br />
                <label htmlFor="quantity">Quantity</label>
                <br />
                <input
                  type="number"
                  id="quantity"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                />
                <br />
                <input type="submit" value="Update Item" />
              </form>
            </details>
          </li>
        )})}
        </ul>
        <h2>Add Item</h2>
        <form id="clear-form" onSubmit={this.handleSubmit}>
          <label htmlFor="color">Color</label>
          <input type="text" id="color" onChange={this.handleChange} placeholder="Color"/>
          <br />
          <label htmlFor="img">Image</label>
          <input type="text" id="img" onChange={this.handleChange} placeholder="http://"/>
          <br />
          <label htmlFor="brand">Brand</label>
          <input type="text" id="brand"
          onChange={this.handleChange}
          placeholder="Brand"/>
          <br />
          <label htmlFor="line">Line</label>
          <input type="text" id="line"
          onChange={this.handleChange}
          placeholder="Pants, Shirt, etc."/>
          <br />
          <label htmlFor="price">Price</label>
          <input type="number" id="price"
          onChange={this.handleChange}
          placeholder="$0.00"
          />
          <br />
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity"
          placeholder="00"
          onChange={this.handleChange}/>
          <br />
          <input type="submit" value="Add Item" />
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

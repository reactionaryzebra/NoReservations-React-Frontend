import React, {Component} from 'react'
import {Modal, Icon, Image, Button, Form} from 'semantic-ui-react'

class EditReservationModal extends Component {

  state ={
    open: false,
    price: 0,
    partySize: 0,
    time: "",
    imageURL: "",
    restaurantName: ""
  }

  fetchReservation = async () => {
    const data = await fetch(`http://localhost:9000/api/v1/reservations/${this.props.reservationId}`)
    const parsedData = await data.json()
    this.setState({
      price: parsedData.price,
      partySize: parsedData.party_size,
      time: parsedData.time,
      imageURL: parsedData.restaurant_id.image_url,
      restaurantName: parsedData.restaurant_id.name
    })
  }

  deleteReservation = async () => {
    const data = await fetch(`http://localhost:9000/api/v1/reservations/${this.props.reservationId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsed_data = await data.json()
  }

  handleChange = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  handleSubmit = async e => {
    e.preventDefault()
    const data = await fetch(`http://localhost:9000/api/v1/reservations/${this.props.reservationId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: this.state.price,
        time: this.state.time,
        party_size: this.state.partySize
      })
    })
    this.props.setEditingReservation(false)
    this.setState({open: false})
  }

  componentDidMount(){
    this.fetchReservation()
  }

  render(){
    return (
      <Modal open={this.state.open} trigger={<Button onClick={() => this.setState({open: true})}>Edit</Button>}>
        <Modal.Header>Edit your reservation at {this.state.restaurantName}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src={this.state.imageURL} />
          <Form style={{marginLeft: '1vw'}} onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Price</label>
              <input value={this.state.price} onChange={this.handleChange} name="price"></input>
            </Form.Field>
            <Form.Field>
              <label>Party Size</label>
              <input value={this.state.partySize} onChange={this.handleChange} name="partySize"></input>
            </Form.Field>
            <Form.Field>
              <label>Time</label>
              <input value={this.state.time} onChange={this.handleChange} name="time"></input>
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default EditReservationModal

import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { USERS_API_URL } from '../constants';
class RegistrationForm extends React.Component {
    state = {
        Id: 0,
        product_name: '',
        product_image: '',
        product_description: '',
        product_price: '',
        category: ''
    }
    componentDidMount() {
        if (this.props.user) {
            const { Id, product_name, product_image, product_description, product_price, category } = this.props.user
            this.setState({ Id, product_name, product_image, product_description, product_price, category });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name: this.state.product_name,
                product_image: this.state.product_image,
                product_description: this.state.product_description,
                product_price: this.state.product_price,
                category: this.state.category
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.addUserToState(user);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.Id,
                product_name: this.state.product_name,
                product_image: this.state.product_image,
                product_description: this.state.product_description,
                product_price: this.state.product_price,
                category: this.state.category
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="product_name">product_name:</Label>
                <Input type="text" name="product_name" onChange={this.onChange} value={this.state.product_name === '' ? '' : this.state.product_name} />
            </FormGroup>
            <FormGroup>
                <Label for="product_image">product_image:</Label>
                <Input type="text" name="product_image" onChange={this.onChange} value={this.state.product_image === null ? '' : this.state.product_image} />
            </FormGroup>
            <FormGroup>
                <Label for="product_description">product_description:</Label>
                <Input type="text" name="product_description" onChange={this.onChange} value={this.state.product_description === null ? '' : this.state.product_description} />
            </FormGroup>
            <FormGroup>
                <Label for="product_price">product_price:</Label>
                <Input type="text" name="product_price" onChange={this.onChange} value={this.state.product_price === null ? '' : this.state.product_price} />
            </FormGroup>
            <FormGroup>
                <Label for="category">category:</Label>
                <Input type="text" name="category" onChange={this.onChange} value={this.state.category === null ? '' : this.state.category} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default RegistrationForm;








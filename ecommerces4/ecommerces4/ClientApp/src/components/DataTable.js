import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import RegistrationModal from './RegistrationModal';
import { USERS_API_URL } from '../constants';

class DataTable extends Component {
    deleteItem = id => {
        let confirmDeletion = window.confirm('Do you really wish to delete it?');
        if (confirmDeletion) {
            fetch(`${USERS_API_URL}/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    this.props.deleteItemFromState(id);
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        const items = this.props.items;
        return <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>product_name</th>
                    <th>product_image</th>
                    <th>product_description</th>
                    <th>product_price</th>
                    <th>category</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!items || items.length <= 0 ?
                    <tr>
                        <td colSpan="6" align="center"><b>No Products yet</b></td>
                    </tr>
                    : items.map(item => (
                        <tr key={item.id}>
                            <th scope="row">
                                {item.id}
                            </th>
                            <td>
                                {item.product_name}
                            </td>
                            <td>
                                {item.product_image}
                            </td>
                            <td>
                                {item.product_desription}
                            </td>
                            <td>
                                {item.product_price}
                            </td>
                            <td>
                                {item.category}
                            </td>
                            <td align="center">
                                <div>
                                    <RegistrationModal
                                        isNew={false}
                                        user={item}
                                        updateUserIntoState={this.props.updateState} />
                                    &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>;
    }
}
export default DataTable;
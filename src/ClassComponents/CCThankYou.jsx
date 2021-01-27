import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CCLoginPage from './CCLoginPage'
import '../mystyle.css';





class CCThankYou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentShopList: undefined,
            products: ''
        }
    }

    async componentDidMount() {
        debugger
        if (this.props.id == undefined) {
            alert("Something went wrong")
            this.props.history.push('/');
        }
        else {
            //fetch
            // debugger
            {
                debugger
                var id = this.state.inputId;
                const apiUrlGetShoppingListOfStudent = 'https://localhost:44389//api/purchase/';
                try {
                    var res = await fetch(apiUrlGetShoppingListOfStudent + this.props.id,
                        {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json; charset=UTF-8',
                                'Accept': 'application/json; charset=UTF-8',
                            })
                        });
                        res = await res.json();
                    
                        var tempArr = [];
                        res.forEach(singleBuy => {
                            tempArr.push({
                                SerialNumber: singleBuy.SerialNumber,
                                Date: singleBuy.Date,
                                Amount: singleBuy.Amount
                            })
                        })
                        this.setState({
                            studentShopList: tempArr
                        })
                    
                }
                catch (e) {
                    console.log(e)
                }
            }
        }

    }
    handleSubmit = () => {
        alert("Thank You for Shopping, have a nice day ! =)");
        this.props.history.push('/');
    }

    render() {

        let rows = null;
        const headers = <tr>
            <th>#</th>
            <th> Serial Number</th>
            <th> Amount </th>
            <th> Date </th>
            <th> TotalPrice </th>
        </tr>


        if (this.state.studentShopList !== undefined) {
            rows = this.state.studentShopList.map((singleBuy, index) => {
                return <tr>
                    <td> {index + 1}</td>
                    <td> {this.props.products.map(p => {
                        if (singleBuy.SerialNumber == p.SerialNumber)
                            return p.Name
                    })}</td>
                    <td> {singleBuy.Amount}</td>
                    <td> {singleBuy.Date}</td>
                    <td> {this.props.products.map(p => {
                        if (singleBuy.SerialNumber == p.SerialNumber)
                            return p.Price * singleBuy.Amount
                    })}</td>
                </tr>
            })
        }
        return (
            <div>
                <h1 className="headerTable"> {this.props.Name}  Shopping List History </h1>
                <Table striped bordered hover variant="dark" className="listPurchaseTable" >
                    <thead>{headers}</thead>
                    <tbody>{rows}</tbody>
                </Table>
                <Button className="btnTY" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Thank You And Log Out
                </Button>
            </div>
        )
    }
}
export default withRouter(CCThankYou);

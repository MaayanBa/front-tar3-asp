import React, { Component } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../mystyle.css';


class CCShopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: '',
            students: '',
            inputName: '',
            inputId: '',
            want2Buy: []
            //amount2Check: []
        }
    }


    async componentDidMount() {
        //debugger
        if (this.props.data == undefined) {
            alert("You haven't logged in")
            this.props.history.push('/');
        }
        else {
            this.setState({
                students: this.props.data.students,
                inputName: this.props.data.inputName,
                inputId: this.props.data.inputId
            });

            //fetch
            {
                const apiUrlGetProducts = 'https://localhost:44389//api/product';
                const requestOptions = {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                };
                try {
                    var res = await fetch(apiUrlGetProducts, requestOptions);
                    res = await res.json()
                    var tempArr = [];
                    res.forEach(product => {
                        tempArr.push({
                            Name: product.Name,
                            SerialNumber: product.SerialNumber,
                            Price: product.Price,
                            Cost: product.Cost,
                            Inventory: product.Inventory,
                            SupplierId: product.SupplierId,
                        })
                    })
                    this.setState({
                        products: tempArr
                    })
                }
                catch (e) {
                    console.log(e)
                }
            }
        }
    }

    updateWant2Buy = (oldWant2Buy, serial, amount) => {
        debugger
        return oldWant2Buy.map(purchase => {
            if (purchase.SerialNumber === serial) {
                if (amount > 0)
                    return { ...purchase, Amount: amount }
                return null;
            }
            return { ...purchase }
        })
    }
    handleChange = async (e, serialNumber) => {
        debugger
        let flag = this.state.want2Buy.filter((purchase) => purchase.SerialNumber === serialNumber).length != 0;
        this.setState(prevState => {
            var newWantToBuy = this.updateWant2Buy(prevState.want2Buy, serialNumber, e.target.value)
            console.log(newWantToBuy)
            var want2Buy_withoutNulls = newWantToBuy.filter(x=> x != null); 
            return {
                
                want2Buy: want2Buy_withoutNulls
            }
        });

        if (!flag) {
            var singleBuy = {
                studentId: this.state.inputId,
                SerialNumber: serialNumber,
                Amount: parseInt(e.target.value)
            }
            //await this.setState({ want2Buy: [...this.state.want2Buy, singleBuy] } );
            await this.setStateAsinc({ want2Buy: [...this.state.want2Buy, singleBuy] });
            console.log("daniel im here", this.state.want2Buy);
        }
    }
    setStateAsinc = (state) =>{
        return new Promise((resolve) => {
            this.setState(state,resolve);

        })
    }

    handleSubmit = async () => {
        try {
            //debugger
            let flag = true;
            var apiUrlPost_Buy = 'https://localhost:44389/api/purchase';
            var res = await fetch(apiUrlPost_Buy,
                {
                    method: 'Post',
                    body: JSON.stringify(this.state.want2Buy),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                });
            if (res.status === 400) {
                throw await res.json();
                //    return Promise.reject(res);
            }



            this.props.sendData2Parent(this.state.inputId, this.state.products);
            if (this.state.want2Buy.length == 0)
                alert("Please chose your products");
            else {
                alert(await res.json())
                this.props.history.push({
                    pathname: '/CCThankYou/'
                });
            }
        }
        catch (e) {
            console.log(e)
            alert(e)
        }


    }

    render() {
        let rows = null;
        if (this.state.products !== '') {
            rows = this.state.products.map((p, index) => {
                return <tr>
                    <td>{index + 1}</td>
                    <td>{p.Name}</td>
                    <td>{p.SerialNumber}</td>
                    <td>{p.Price}</td>
                    <td>{p.Cost}</td>
                    <td>{p.Inventory}</td>
                    <td>{p.SupplierId}</td>
                    <td>
                        <Form.Control name="amount_Buy" onChange={(e) => this.handleChange(e, p.SerialNumber, p.Amount)} type="number" />
                    </td>
                </tr>
            })
        }

        return (
            <div className="containerTable">
                <h1 className="headerTable"> Product List </h1>
                <Table striped bordered hover variant="dark" className="cartTable" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Name</th>
                            <th> Serial Number</th>
                            <th> Price </th>
                            <th> Cost </th>
                            <th> Inventory </th>
                            <th> SupplierId </th>
                            <th> Amount To Buy </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                        <tr> <td colSpan="8"><Button variant="primary" type="submit" onClick={this.handleSubmit}>Buy</Button></td></tr>
                    </tbody>

                    {/* <div col className="divBuy">
                        
                    </div> */}
                </Table>

            </div>
        )
    }
}
export default withRouter(CCShopPage);
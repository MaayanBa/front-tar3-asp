import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../mystyle.css';
//import CCShopPage from './CCShopPage';

class CCLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: {
                StudentId: '',
                Name: '',
                IsActive: '',
                AvgGrade: ''
            },
            inputName: '',
            inputId: ''
        }
    }

    async componentDidMount() {
        //debugger
        const apiUrlGetStudnets = 'https://localhost:44389//api/student';

        try {
            var res = await fetch(apiUrlGetStudnets,
                {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                });
            res = await res.json()
            var tempArr = [];
            res.forEach(student => {
                tempArr.push({
                    StudentId: student.StudentId,
                    Name: student.Name,
                    IsActive: student.IsActive,
                    AvgGrade: student.AvgGrade
                })
            })
            //console.log("fetch GetStudents= ", tempArr);
            this.setState({ students: tempArr }, /*() => console.log("after setSatate = ", this.state.students))*/);
        }
        catch (e) {
            console.log(e)
        }

    }

    handleChange = (event) => {
        var val = event.target.name;
        if (val == "inputId")
            this.setState({ [val]: parseInt(event.target.value) });
        else
            this.setState({ [val]: event.target.value });
        console.log(event.target.value);
    }


    handleSubmit = (e) => {
        //debugger
        //console.log(this.state)
        if (this.state.inputName === '' || this.state.inputId === '') {
            alert("some values are missing, please fill the entire form.");
        }
        else {
            var flag = false;
            this.state.students.map(s => {
                if (s.StudentId === this.state.inputId && s.Name === this.state.inputName && !flag) {
                    flag = true;
                    alert("Login Successful");
                }
            })
            {
                if (!flag)
                    alert("some values are not correct, please fill the form again");
                else {
                    //let changePage = <CCShopPage students={this.state.students} inputName={this.state.inputName} inputId={this.state.inputId} />
                    // this.props.history.push({
                    //     pathname: '/CCShopPage',
                    //     data: this.state
                    //   })
                    this.props.sendData2Parent(this.state);
                    this.props.history.push({
                        pathname: '/CCShopPage/'
                    });

                }

            }
        }
    }


    render() {
        return (
            <div className="form">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="inputName" onChange={this.handleChange} type="text" placeholder="Enter User Name" />
                    </Form.Group>
                    <Form.Group controlId="formGroupId">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="inputId" onChange={this.handleChange} type="number" placeholder="Student Id" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
               
            </div>
        )
    }
}
export default withRouter(CCLoginPage);

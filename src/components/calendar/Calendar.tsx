import React, { Component } from 'react';
import { Table, Row, Col, Container, Button } from 'reactstrap';
import "./Calendar.css";
import { tsExpressionWithTypeArguments } from '@babel/types';

interface ICalendarState {
    date: Date;
}

export class Calendar extends Component<{}, ICalendarState> {

    constructor() {
        super({});

        this.state = {
            date: new Date(),
        }
    }

    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    componentDidMount() {
        this.renderTableBodyElements();
    }

    renderTableBodyElements() {
        var tableBody = document.getElementById("Calendar-Table-Body");

        if (!tableBody) {
            console.log("Table body is null.");
            return;
        }

        this.clearTableBody();
        let startOfMonth = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1).getDay();
        let daysInMonth = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 0).getDate();

        var month = document.getElementById("month");
        if (month) {
            month.innerText = this.state.date.getMonth().toString();
        }

        var year = document.getElementById("year");
        if (year) {
            year.innerText = this.state.date.getFullYear().toString();
        }

        let currentDate = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startOfMonth) {
                    let td = document.createElement('td');
                    row.append(td);
                } else if (currentDate > daysInMonth) {
                    break;
                } else {
                    let td = document.createElement('td');
                    if (td) {
                        td.textContent = currentDate.toString();
                        row.append(td);
                    }
                    currentDate++;
                }
            }

            tableBody.append(row);
        }
    }

    clearTableBody() {
        var myNode = document.getElementById("Calendar-Table-Body");
        if (myNode) {
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }
    }

    incrementMonth = () => {
        var date = this.state.date;
        date.setMonth(date.getMonth() + 1);
        this.setState({ date: date });
        this.renderTableBodyElements();
    }

    decrementMonth = () => {
        var date = this.state.date;
        date.setMonth(date.getMonth() - 1);
        this.setState({ date: date });
        this.renderTableBodyElements();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Calendar</h1>
                    </Col>
                </Row>
                <Row className="Calendar-Date-Display-Row">
                    <Col>
                        <Button id="previousMonth" onClick={this.decrementMonth}>&lt;</Button>
                        <span className="Spacer" />
                        <span id="month">{this.monthNames[this.state.date.getMonth()]}</span>
                        <span className="Spacer" />
                        <span id="year">{this.state.date.getFullYear()}</span>
                        <span className="Spacer" />
                        <Button id="nextMonth" onClick={this.incrementMonth}>&gt;</Button>
                    </Col>
                </Row>
                <Table className="Calendar-Table">
                    <thead>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </thead>
                    <tbody id="Calendar-Table-Body">
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Calendar;

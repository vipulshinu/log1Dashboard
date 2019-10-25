import React from 'react';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle} from '@coreui/coreui/dist/js/coreui-utilities';
import {Bar, Line} from 'react-chartjs-2';
import "../Dashboard.css";
import {
    ButtonDropdown,
    ButtonGroup,
    Card,
    CardBody,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
} from 'reactstrap';

const brandPrimary = getStyle('--primary')

// const cardChartData1 = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//     datasets: [
//         {
//             label: 'My First dataset',
//             backgroundColor: brandPrimary,
//             borderColor: 'rgba(255,255,255,.55)',
//             data: this.state.submissions,
//         },
//     ],
// };


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: new Array(19).fill(false),
            consultants:[],
            submissions:[],
            status:false,
            consultantSelected:"",
        };

        this.cardChartData1 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: brandPrimary,
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [65, 59, 84, 75, 51, 55, 40, 23, 65, 54, 80, 12],
                },
            ],
        };

        this.cardChartOpts1 = {
            tooltips: {
                enabled: false,
                custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent',
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent',
                        },

                    }],
                yAxes: [
                    {
                        display: false,
                        ticks: {
                            display: false,
                            min: Math.min.apply(Math, this.cardChartData1.datasets[0].data) - 5,
                            max: Math.max.apply(Math, this.cardChartData1.datasets[0].data) + 5,
                        },
                    }],
            },
            elements: {
                line: {
                    borderWidth: 1,
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            }
        }
    }

    toggle(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => {
            return (index === i ? !element : false);
        });
        this.setState({
            dropdownOpen: newArray,
        });
    }


    componentDidMount() {
        fetch("http://5mv75.mocklab.io/consultants")
            .then(response=> response.json())
            .then(d=>d.consultants)
            .then(data=>this.setState({consultants: data}));

        // fetch("http://demo2144736.mockable.io/submissiondata")
        //     .then(res=>res.json())
        //     .then(r=>r.submissions)
        //     .then(data=>{
        //         this.cardChartData1.datasets[0].data = data;
        //         this.setState({submissions:data,status:true})});

    }


    render() {
        console.log("Chart data: - ",this.cardChartData1)
        console.log("Submissions: -",this.state.submissions)
        var _this = this;
        return (

            <div className={"animated fadeIn"}>
                <div className="row consDrop">
                    <div className="col-md-4">
                        <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[0]} toggle={() => {
                            this.toggle(0);
                        }}
                        >
                            {console.log("Value =>", this.state.consultantSelected)}
                            <DropdownToggle
                                caret color="primary">
                                Consultant
                                <DropdownMenu>
                                    {this.state.consultants.map(e=>{return <DropdownItem>{e}</DropdownItem>})}
                                </DropdownMenu>
                            </DropdownToggle>
                        </ButtonDropdown>
                    </div>
                    <div className="col-md-4">
                        <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[1]} toggle={() => {
                            this.toggle(1);
                        }}>
                            <DropdownToggle caret color="primary">
                                Team
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Action</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    <div className="col-md-4">
                        <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[2]} toggle={() => {
                            this.toggle(2);
                        }}>
                            <DropdownToggle caret color="primary">
                                Marketer
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Action</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                </div>
                <div className="cardDiv">
                    <Row>
                        <Col xs="12" sm="6" md="4">
                            <Card className="text-white bg-primary">
                                <CardBody className="pb-0">
                                    <ButtonGroup className="float-right">
                                        <Dropdown id='card2' isOpen={this.state.dropdownOpen[3]} toggle={() => {
                                            this.toggle(3);
                                        }}>
                                            <DropdownToggle className="p-0" color="transparent">
                                                <i className="icon-settings"></i>
                                            </DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>Weekly</DropdownItem>
                                                <DropdownItem>Monthly</DropdownItem>
                                                <DropdownItem>Yearly</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </ButtonGroup>
                                    <div className="text-value" id="headText">Submission</div>
                                </CardBody>
                                <div className="chart-wrapper mx-3" id="subGraph">
                                    <Line data={this.cardChartData1} options={this.cardChartOpts1}/>
                                </div>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="4">
                            <Card className="text-white bg-primary">
                                <CardBody className="pb-0">
                                    <ButtonGroup className="float-right">
                                        <Dropdown id='card2' isOpen={this.state.dropdownOpen[4]} toggle={() => {
                                            this.toggle(4);
                                        }}>
                                            <DropdownToggle className="p-0" color="transparent">
                                                <i className="icon-settings"></i>
                                            </DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>Weekly</DropdownItem>
                                                <DropdownItem>Monthly</DropdownItem>
                                                <DropdownItem>Yearly</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </ButtonGroup>
                                    <div className="text-value" id="headText">Interviews</div>
                                </CardBody>
                                <div className="chart-wrapper mx-3" id="subGraph">
                                    <Line data={this.cardChartData1} options={this.cardChartOpts1}/>
                                </div>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="4">
                            <Card className="text-white bg-primary">
                                <CardBody className="pb-0">
                                    <ButtonGroup className="float-right">
                                        <Dropdown id='card2' isOpen={this.state.dropdownOpen[5]} toggle={() => {
                                            this.toggle(5);
                                        }}>
                                            <DropdownToggle className="p-0" color="transparent">
                                                <i className="icon-settings"></i>
                                            </DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>Weekly</DropdownItem>
                                                <DropdownItem>Monthly</DropdownItem>
                                                <DropdownItem>Yearly</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </ButtonGroup>
                                    <div className="text-value" id="headText">PO</div>
                                </CardBody>
                                <div className="chart-wrapper mx-3" id="subGraph">
                                    <Line data={this.cardChartData1} options={this.cardChartOpts1}/>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>


            </div>

        );
    }

}
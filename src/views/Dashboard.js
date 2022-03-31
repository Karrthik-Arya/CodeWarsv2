/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chart1_2_options
} from "variables/charts.js";
import react from "react";
import { func } from "prop-types";


var init = true;
function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [activeTeam, setActiveTeam] = React.useState('532');
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

 const [results,setResults] = react.useState(null);

  react.useEffect(()=>{
    fetch('https://codewars-server.herokuapp.com/results')
  .then(response => response.json().then(data=> setResults(data)))
  console.log(results)
    if(results && init){
    setActiveTeam(results[0].team_id)
    init = false
    }
  },[results])

  return (
    <>
      <div className="content">
        <Row>

          <Col lg="6">
            <Card style = {{"overflow-y":'scroll',height:'500px'}}>
              <CardHeader>
                <CardTitle tag="h4">Leaderboard</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>Rank</th>
                      <th>Team Name</th>
                      <th className="text-center">Rounds</th>
                      <th className="text-center">Score</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {results && results.map(function(result,i){

                      return (
                        <tr style = {{cursor:'pointer'}}onClick={()=>setActiveTeam(result.team_id)}>
                      <td>{i+1}</td>
                      <td>{result.name}</td>
                      <td className="text-center">{result.round}</td>
                      <td className="text-center">{result.profit}</td>
                    </tr>
                      )
                    })}
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col lg = "6">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">{results && results.find(({team_id})=> team_id == activeTeam).name}</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Profits
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1(activeTeam, results)}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                      },
                      tooltips: {
                        backgroundColor: "#f5f5f5",
                        titleFontColor: "#333",
                        bodyFontColor: "#666",
                        bodySpacing: 4,
                        xPadding: 12,
                        mode: "nearest",
                        intersect: 0,
                        position: "nearest",
                      },
                      responsive: true,
                      scales: {
                        yAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: false,
                              color: "rgba(29,140,248,0.0)",
                              zeroLineColor: "transparent",
                            },
                            ticks: {
                              suggestedMin: 0,
                              suggestedMax: 60,
                              padding: 20,
                              fontColor: "#9a9a9a",
                            },
                          },
                        ],
                        xAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: false,
                              color: "rgba(29,140,248,0.1)",
                              zeroLineColor: "transparent",
                            },
                            ticks: {
                              padding: 20,
                              fontColor: "#9a9a9a",
                            },
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      
      </div>
    </>
  );
}

export default Dashboard;

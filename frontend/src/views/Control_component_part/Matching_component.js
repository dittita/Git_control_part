import React, { Component } from "react";
import { server } from "constants";
import { httpClient } from "utils/HttpClient.js";
// reactstrap components
import {
  CardBody,
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
// import { data } from "jquery";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moNumber: "",
      model: "",
      iqcNumber: "",
      itemNumber: "",
      qty: "",
      vendor: "",
      mold: "",
      scannedValue: "", // State for the input value
      partname: "",
      Issue_part_KitupF4: "",
      counter: 0, // State for the counter
    };
  }
  handleScan = async (event) => {
    const scannedData = event.target.value;
    const dataParts = scannedData.split("|");

    this.setState({
      moNumber: dataParts[1] || "",
      model: dataParts[0] || "",
      iqcNumber: dataParts[4] || "",
      itemNumber: dataParts[2] || "",
      qty: dataParts[5] || "",
      partname: dataParts[3] || "",
      scannedValue: scannedData,
    });
  };

  handleTextChange = async (event) => {
    // console.log(this.state.moNumber);
    if (event.key === "Enter") {
      // Check if the Enter key is pressed
      try {
        const result = await httpClient.get(
          server.COMPONENT_URL +
            "/component_data/" +
            this.state.moNumber +
            "/" +
            this.state.iqcNumber +
            "/" +
            this.state.partname +
            "/" +
            this.state.itemNumber
        );
        // console.log(result);

        this.setState((prevState) => ({
          counter: prevState.counter + 1, // Increment the counter
          model: result.data.result[0].Model || "",
          vendor: result.data.result[0].Supplier || "",
          mold: result.data.result[0].Mold || "",
          Issue_part_KitupF4: result.data.result[0].DateTime_KutupF4,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  clearInput = () => {
    this.setState({
      moNumber: "",
      model: "",
      iqcNumber: "",
      itemNumber: "",
      qty: "",
      vendor: "",
      mold: "",
      scannedValue: "", // Clear the input value
      partname: "",
      Issue_part_KitupF4: "",
    });
  };

  // report with select model,date,type
  doGetDataReport = async () => {
    //  try {
    //     const result = await httpClient.get(server.COMPONENT_URL+"/component_data/"+ this.state.moNumber+"/"+ this.state.iqcNumber+"/"+ this.state.partname+"/"+ this.state.itemNumber);
    //     console.log(result);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
  };
  // report with select model,date,type
  doGetDatatextbox = async () => {
    // try {
    //   const result = await httpClient.get(server.TEST_PART_URL);
    //   console.log(result);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };

  componentDidMount() {
    // Define an async function and call it
    //  (async () => {
    //   await this.doGetDataReport();
    // })();
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
  }

  render() {
    const {
      moNumber,
      model,
      iqcNumber,
      itemNumber,
      qty,
      vendor,
      mold,
      scannedValue,
      partname,
      counter,
      Issue_part_KitupF4,
    } = this.state;

    return (
      <>
        <DemoNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/hard-disk.png")}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      {/* <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Connect
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Message
                        </Button>
                      </div> */}
                    </Col>

                    {/* Alart  */}
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">0</span>
                          <span className="description">Daily</span>
                        </div>
                        <div>
                          <span className="heading">0</span>
                          <span className="description">Part</span>
                        </div>
                        <div>
                          <span className="heading">0</span>
                          <span className="description">QTY</span>
                        </div>
                        <div>
                          <span className="heading">{counter}</span>
                          <span className="description"> Page</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      Matching rack and component part
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    <div
                      className="h6 font-weight-300"
                      style={{ fontSize: "18px" }}
                    >
                      <i className="ni location_pin mr-2" />
                      Please scan the QR code for the MO number.
                    </div>

                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="Please scan the QR code"
                        type="text"
                        onKeyDown={this.handleTextChange} // Change from onChange to onKeyDown
                        onChange={this.handleScan}
                        value={scannedValue} // Bind the input value to the state
                        style={{ fontSize: "20px" }} // Set the font size here
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="Model"
                        type="text"
                        style={{ fontSize: "19px" }} // Set the font size here
                        value={model}
                      />
                    </FormGroup>
                    <FormGroup
                      style={{ display: "inline-block", marginRight: "50px" }}
                    >
                      <Input
                        className="form-control-alternative"
                        placeholder="MO number"
                        type="text"
                        value={moNumber}
                        style={{ fontSize: "19px", width: "450px" }} // Set the font size here
                      />
                    </FormGroup>

                    <FormGroup style={{ display: "inline-block" }}>
                      <Input
                        className="form-control-alternative"
                        placeholder="IQC number"
                        type="text"
                        value={iqcNumber}
                        style={{ fontSize: "19px", width: "450px" }} // Set the font size here
                      />
                    </FormGroup>

                    <FormGroup
                      style={{ display: "inline-block", marginRight: "50px" }}
                    >
                      <Input
                        className="form-control-alternative"
                        placeholder="Item number"
                        type="text"
                        value={itemNumber}
                        style={{ fontSize: "19px", width: "450px" }} // Set the font size here
                      />
                    </FormGroup>

                    <FormGroup style={{ display: "inline-block" }}>
                      <Input
                        className="form-control-alternative"
                        placeholder="Part name"
                        type="text"
                        value={partname}
                        style={{ fontSize: "19px", width: "450px" }} // Set the font size here
                      />
                    </FormGroup>

                    <FormGroup
                      style={{ display: "inline-block", marginRight: "50px" }}
                    >
                      <Input
                        className="form-control-alternative"
                        placeholder="QTY"
                        type="text"
                        value={qty}
                        style={{ fontSize: "19px", width: "450px" }}
                      />
                    </FormGroup>

                    <FormGroup style={{ display: "inline-block" }}>
                      <Input
                        className="form-control-alternative"
                        placeholder="Vendor"
                        type="text"
                        style={{ fontSize: "19px", width: "450px" }}
                        value={vendor}
                      />
                    </FormGroup>

                    <FormGroup
                      style={{ display: "inline-block", marginRight: "50px" }}
                    >
                      <Input
                        className="form-control-alternative"
                        placeholder="Mold"
                        type="text"
                        style={{ fontSize: "19px", width: "450px" }}
                        value={mold}
                      />
                    </FormGroup>

                    <FormGroup style={{ display: "inline-block" }}>
                      <Input
                        className="form-control-alternative"
                        placeholder="Timestamp F4"
                        type="text"
                        value={Issue_part_KitupF4}
                        style={{ fontSize: "19px", width: "450px" }}
                      />
                    </FormGroup>
                    <br></br>
                    <br></br>
                    <Row className="row-grid justify-content-center">
                      <Col lg="8" md="10" xs="12">
                        {" "}
                        {/* Adjusted column sizes for responsiveness */}
                        <Card className="card-lift--hover shadow border-0 w-100">
                          <CardBody className="py-5 text-center">
                            {" "}
                            {/* Added text-center to center text inside the card */}
                            <div className="icon icon-shape icon-shape-primary rounded-circle mb-4 mx-auto">
                              <i className="ni ni-check-bold" />
                            </div>
                            <h6 className="text-primary text-uppercase">
                              Download Argon
                            </h6>
                            <p className="description mt-3">
                              Argon is a great free UI package based on
                              Bootstrap 4 that includes the most important
                              components and features.
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <br></br>
                    <br></br>

                    <Button
                      className="btn-1 ml-1"
                      color="success"
                      outline
                      type="button"
                    >
                      Submit
                    </Button>

                    <Button
                      className="btn-1 ml-1"
                      color="warning"
                      outline
                      type="button"
                      onClick={this.clearInput}
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          An artist of considerable range, Ryan — the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy —
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Show more
                        </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;

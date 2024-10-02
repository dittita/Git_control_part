import React, { Component } from "react";
import { server } from "constants";
import { httpClient } from "utils/HttpClient.js";
import Checkbox from '@mui/material/Checkbox'; // After installing MUI

// import axios from 'axios';

// reactstrap components
import {
  Modal,
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
      Rack_number: "",
      ESL_number: "",
      counter: 0, // State for the counter
      isModalOpen: false, // Example modal state
      dataEntries: [], // Array to store objects of each entry
      Raw_Dat: [],
      searchQuery: "", // State for the search query
    };
  }
  toggleModal = (stateKey) => {
    this.setState((prevState) => ({
      [stateKey]: !prevState[stateKey],
    }));
  };
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
    if (event.key === "Enter") {
      // Check for duplicates in moNumber and iqcNumber
      const { moNumber, iqcNumber, dataEntries } = this.state;
      const isDuplicate = dataEntries.some(
        (entry) => entry.moNumber === moNumber && entry.iqcNumber === iqcNumber
      );

      if (isDuplicate) {
        alert("Duplicate MO Number and IQC Number detected!");
        return; // Stop execution if duplicates are found
      }

      try {
        // Fetch the initial data based on the current state values
        const result = await httpClient.get(
          `${server.COMPONENT_URL}/component_data/${moNumber}/${iqcNumber}/${this.state.partname}/${this.state.itemNumber}`
        );

        // Update the state with the fetched data
        this.setState(
          {
            model: result.data.result[0].Model || "",
            vendor: result.data.result[0].Supplier || "",
            mold: result.data.result[0].Mold || "",
            Issue_part_KitupF4: result.data.result[0].DateTime_KutupF4 || "",
            scannedValue: "", // Clear the input value immediately
          },
          async () => {
            // This callback is called after the state has been updated
            try {
              // Sanitize model for URL
              const sanitizedModel = this.state.model.replace(/\//g, "-");

              // Fetch additional data based on the updated state
              const result2 = await httpClient.get(
                `${server.COMPONENT_URL}/rack_number/${sanitizedModel}/${this.state.vendor}/${this.state.partname}/${this.state.itemNumber}/${this.state.mold}`
              );

              // Update the state with the fetched data and log the updated state
              this.setState(
                {
                  Rack_number: result2.data.result[0].Rack_number || "",
                  ESL_number: result2.data.result[0].ESL_number || "",
                },
                () => {
                  // Log the updated state after it has been set
                  // console.log("Updated Rack_number:", this.state.Rack_number);
                  // console.log("Updated ESL_number:", this.state.ESL_number);
                  // console.log("Result2 Data:", result2);

                  // Call save data method
                  this.handleSaveData();
                }
              );
            } catch (error) {
              alert(
                "No data for master number rack. Please input it into the master! \n(ไม่มีข้อมูลในการบันทึกเลขชั้นวาง กรุณาทำการตั้งหมายเลขชั้นวางก่อน!)"
              );
            }
          }
        );
      } catch (error) {
        alert("No data Kitup F4! \n(ไม่มีข้อมูลในการบันทึกของ F4!)");
      }
    }
  };

  handleSaveData = () => {
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
      Issue_part_KitupF4,
      Rack_number,
      ESL_number,
    } = this.state;

    const newDataEntry = {
      moNumber,
      model,
      iqcNumber,
      itemNumber,
      qty,
      vendor,
      mold,
      scannedValue,
      partname,
      Issue_part_KitupF4,
      Rack_number,
      ESL_number,
    };

    this.setState((prevState) => ({
      dataEntries: [...prevState.dataEntries, newDataEntry],
      counter: prevState.counter + 1,
    }));
  };
  clearDataEntries = () => {
    this.setState({
      dataEntries: [], // Reset the array to an empty array
      counter: 0, // Optionally reset the counter if needed
    });
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
      counter: 0,
    });
    this.clearDataEntries();
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

  componentDidMount() {
    this.fetchData();
  }

  handleInputChange = (index, event) => {
    const { value } = event.target;

    // Log the updated value and index
    console.log(`Updated entry ${index}: ${value}`);

    // Update the state with the new value
    this.setState((prevState) => {
      const updatedEntries = prevState.dataEntries.map((entry, i) => {
        if (i === index) {
          // Update the model property for the correct entry
          return { ...entry, model: value };
        }
        return entry;
      });

      // Log the updated array
      console.log("Updated dataEntries:", updatedEntries);

      return { dataEntries: updatedEntries };
    });
  };
  handleKeyDown = async (index, event, entry, num) => {
    const { inputValues } = this.state;
    const newInputValues = {
      ...inputValues,
      [`${index}-${num}`]: event.target.value,
    };
    this.setState({ inputValues: newInputValues });

    if (event.key === "Enter") {
      const value = event.target.value;
      // console.log(`Entry ${index + 1} text ${num}:`, value, num);
      // console.log("Entry details:", entry);
      // console.log(entry);

      try {
        if (num === 1) {
          // Scan label part
          const sanitizedModel = entry.model.replace(/\//g, "-");
          const result = await httpClient.get(
            `${server.COMPONENT_URL}/label_tray/${sanitizedModel}/${entry.vendor}/${entry.partname}/${entry.itemNumber}/${entry.mold}/${value}`
          );
          console.log(result);
          if (result.data.result[0].Model !== "") {
            this.setState((prevState) => {
              const updatedEntries = [...prevState.dataEntries];
              updatedEntries[index] = { ...entry, labelPartStatus: "success" }; // Update label part status
              return { dataEntries: updatedEntries };
            });
          } else {
            this.setState((prevState) => {
              const updatedEntries = [...prevState.dataEntries];
              updatedEntries[index] = { ...entry, labelPartStatus: "error" }; // Update label part status
              return { dataEntries: updatedEntries };
            });
          }
        } else if (num === 2) {
          // Scan ESL Tag
          // Add your logic for ESL Tag check
          if (value === entry.ESL_number) {
            this.setState((prevState) => {
              const updatedEntries = [...prevState.dataEntries];
              updatedEntries[index] = { ...entry, eslTagStatus: "success" }; // Update ESL tag status
              return { dataEntries: updatedEntries };
            });
          } else {
            this.setState((prevState) => {
              const updatedEntries = [...prevState.dataEntries];
              updatedEntries[index] = { ...entry, eslTagStatus: "error" }; // Update label part status
              return { dataEntries: updatedEntries };
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.setState((prevState) => {
          const updatedEntries = [...prevState.dataEntries];
          updatedEntries[index] = {
            ...entry,
            [num === 1 ? "labelPartStatus" : "eslTagStatus"]: "error",
          }; // Set status on error
          return { dataEntries: updatedEntries };
        });
      }
    }
  };

  renderDataEntries = () => {
    return (
      <div>
        {this.state.dataEntries.length > 0 ? (
          this.state.dataEntries
            .sort((a, b) =>
              a.moNumber < b.moNumber ? -1 : a.moNumber > b.moNumber ? 1 : 0
            )
            .map((entry, index) => {
              const labelPartStyle = {
                fontSize: "19px",
                textAlign: "center",
                borderColor:
                  entry.labelPartStatus === "success"
                    ? "#28a745"
                    : entry.labelPartStatus === "error"
                    ? "#dc3545"
                    : "#ced4da",
                backgroundColor:
                  entry.labelPartStatus === "success"
                    ? "#d4edda"
                    : entry.labelPartStatus === "error"
                    ? "#f8d7da"
                    : "white",
              };

              const eslTagStyle = {
                fontSize: "19px",
                textAlign: "center",
                borderColor:
                  entry.eslTagStatus === "success"
                    ? "#28a745"
                    : entry.eslTagStatus === "error"
                    ? "#dc3545"
                    : "#ced4da",
                backgroundColor:
                  entry.eslTagStatus === "success"
                    ? "#d4edda"
                    : entry.eslTagStatus === "error"
                    ? "#f8d7da"
                    : "white",
              };

              return (
                <div key={index}>
                  <h5 style={{ color: "white" }}>
                    {index + 1} : Mo : {entry.moNumber || "No Model Data"} /
                    IQC: {entry.iqcNumber || "No Model Data"} / Model:{" "}
                    {entry.model || "No Model Data"} /
                    {entry.vendor || "No Model Data"} /<span>&nbsp;&nbsp;</span>
                    <Button variant="warning" size="s">
                      {entry.Rack_number || "No Rack number Data"}
                    </Button>
                  </h5>
                  <FormGroup>
                    <Input
                      className="form-control-alternative-center"
                      placeholder="Scan label part"
                      type="text"
                      style={labelPartStyle}
                      onKeyDown={(event) =>
                        this.handleKeyDown(index, event, entry, 1)
                      }
                    />

                    <Input
                      className="form-control-alternative-center"
                      placeholder="Scan ESL Tag"
                      type="text"
                      style={eslTagStyle}
                      onKeyDown={(event) =>
                        this.handleKeyDown(index, event, entry, 2)
                      }
                    />
                  </FormGroup>
                </div>
              );
            })
        ) : (
          <p>No data available.</p>
        )}
      </div>
    );
  };

  fetchData = async () => {
    try {
      const result = await httpClient.get(
        server.ISUUEPART_URL + "/Data_racknumber"
      );
      // console.log(result);
      this.setState({ Raw_Dat: result.data.result }); // result.data should be an array
      //  console.log(result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  handleDelete = (id) => {
    // Add logic to delete an item by its ID from the database
    console.log("Delete item with ID:", id);
  };
  renderTable = () => {
    const { Raw_Dat, searchQuery } = this.state;

    // Filter Raw_Dat based on the search query
    const filteredData = Raw_Dat.filter((item) =>
      item.Part_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!Array.isArray(filteredData) || filteredData.length === 0) {
      return <p>No data available</p>;
    }

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="row"></div>
            <div className="col-12">
              <div
                className="card-body table-responsive p-0"
                style={{ height: "100%" }}
              >
                <table
                  className="table table-head-fixed text-nowrap table-hover"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr align="center">
                      <th style={styles.headerCell}>Actions</th>{" "}
                      <th style={styles.headerCell}>Rack_number</th>
                      <th style={styles.headerCell}>Mo_number</th>
                      <th style={styles.headerCell}>IQC_number</th>
                      <th style={styles.headerCell}>Part_number</th>
                      <th style={styles.headerCell}>Model</th>
                      <th style={styles.headerCell}>Part_name</th>
                      <th style={styles.headerCell}>Vendor</th>
                      <th style={styles.headerCell}>Mold</th>
                      <th style={styles.headerCell}>Updater</th>
                      <th style={styles.headerCell}>QTY</th>
                      <th style={styles.headerCell}>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index}>
                        // In your JSX
                        <Checkbox
                          checked={selectedItems.includes(item.ID)}
                          onChange={() => toggleSelect(item.ID)}
                        />
                        <td style={styles.cell}>{item.Rack_number}</td>
                        <td style={styles.cell}>{item.Mo_number}</td>
                        <td style={styles.cell}>{item.IQC_number}</td>
                        <td style={styles.cell}>{item.Part_number}</td>
                        <td style={styles.cell}>{item.Model}</td>
                        <td style={styles.cell}>{item.Part_name}</td>
                        <td style={styles.cell}>{item.Vendor}</td>
                        <td style={styles.cell}>{item.Mold}</td>
                        <td style={styles.cell}>{item.Updater}</td>
                        <td style={styles.cell}>{item.QTY}</td>
                        <td style={styles.cell}>{item.ID}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      // moNumber,
      // model,
      // iqcNumber,
      // itemNumber,
      // qty,
      // vendor,
      // mold,
      // scannedValue,
      // partname,
      counter,
      // Issue_part_KitupF4,
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
                            src={require("assets/img/theme/delivery-box.png")}
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
                    <h3>Issue component part</h3>
                    <div
                      className="h6 font-weight-300"
                      style={{ fontSize: "18px" }}
                    >
                      Please scan the QR code for the MO number.
                      <div className="mt-5 py-5 border-top text-center">
                        <Row className="justify-content-center">
                          <Col lg="9"></Col>
                        </Row>
                        <FormGroup
                          style={{
                            display: "inline-block",
                            marginRight: "50px",
                            width: "100%",
                          }}
                        >
                          <Input
                            className="form-control-alternative"
                            placeholder="Search"
                            type="text"
                          />
                        </FormGroup>
                        <div> {this.renderTable()} </div>
                      </div>
                    </div>

                    <br></br>
                    <Row>
                      <Col md="4">
                        <Button
                          block
                          className="mb-3"
                          color="success"
                          type="button"
                          onClick={() => {
                            this.toggleModal("notificationModal");
                          }}
                        >
                          Submit
                        </Button>
                        <Modal
                          className="modal-dialog-centered modal-primary modal-lg" // modal-lg makes the modal large
                          contentClassName="bg-gradient-primary"
                          isOpen={this.state.notificationModal}
                          toggle={() => this.toggleModal("notificationModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-notification"
                            >
                              List matching
                            </h6>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() =>
                                this.toggleModal("notificationModal")
                              }
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="py-3 text-center">
                              <i
                                className="fa fa-tasks fa-3x"
                                aria-hidden="true"
                              ></i>
                              <h4 className="heading mt-4">
                                Rack and numbers!
                              </h4>
                              {this.renderDataEntries()}
                            </div>
                          </div>
                          <div className="modal-footer">
                            <Button
                              className="btn-white"
                              color="default"
                              type="button"
                              onClick={this.handleClick_els}
                            >
                              Ok, Got it
                            </Button>
                            <Button
                              className="text-white ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={() =>
                                this.toggleModal("notificationModal")
                              }
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>
                      </Col>
                      <Col md="4">
                        <Button
                          block
                          className="mb-3"
                          color="warning"
                          type="button"
                          onClick={this.clearInput}
                        >
                          Clear
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <ul>
                    {this.state.dataEntries.map((entry, index) => (
                      <li key={index}>
                        <div>
                          <strong>MO Number:</strong> {entry.moNumber}
                        </div>
                        <div>
                          <strong>Model:</strong> {entry.model}
                        </div>
                        <div>
                          <strong>IQC Number:</strong> {entry.iqcNumber}
                        </div>
                        <div>
                          <strong>Item Number:</strong> {entry.itemNumber}
                        </div>
                        <div>
                          <strong>Quantity:</strong> {entry.qty}
                        </div>
                        <div>
                          <strong>Vendor:</strong> {entry.vendor}
                        </div>
                        <div>
                          <strong>Mold:</strong> {entry.mold}
                        </div>
                        {/* <div>
                          <strong>Scanned Value:</strong> {entry.scannedValue}
                        </div> */}
                        <div>
                          <strong>Part Name:</strong> {entry.partname}
                        </div>
                        <div>
                          <strong>Issue Part Kitup F4:</strong>{" "}
                          {entry.Issue_part_KitupF4}
                        </div>
                        <hr />
                      </li>
                    ))}
                  </ul>
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

const styles = {
  headerCell: {
    borderBottom: "2px solid black",
    textAlign: "left",
    padding: "9px",
    backgroundColor: "#f2f2f2",
  },
  cell: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
  },
};
export default Profile;

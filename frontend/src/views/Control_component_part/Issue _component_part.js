import React, { Component } from "react";
import { server } from "constants";
import { httpClient } from "utils/HttpClient.js";
import Checkbox from "@mui/material/Checkbox"; // After installing MUI

import {
  Modal,
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Badge,
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
      dataEntries2: [], // Array to store objects of each entry
      Raw_Dat: [],
      searchQuery: "", // State for the search query
      selectedItems: [], // State to track selected checkboxes
      notificationModal: false,
      inputValues: {},
      dataEntries3: [], // Array to store objects of each entry
    };
  }
  toggleModal = (modal) => {
    this.setState((prevState) => ({ [modal]: !prevState[modal] }));
  };
  handleSubmit = () => {
    // Filter Raw_Dat to get entries based on selected IDs
    const selectedEntries = this.state.Raw_Dat.filter(
      (item) => this.state.selectedItems.includes(item.ID) // Adjust ID to your data structure
    );
    this.setState({ dataEntries: selectedEntries, notificationModal: true }); // Show modal with selected entries
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
  // Method to toggle selection of an item
  toggleSelect = (id) => {
    this.setState((prevState) => {
      const selectedItems = prevState.selectedItems.includes(id)
        ? prevState.selectedItems.filter((item) => item !== id) // Deselect if already selected
        : [...prevState.selectedItems, id]; // Select the item
      // Log the updated selected items
      // console.log("Updated selectedRack_number:", selectedItems);
      // console.log("Updated selectedItems:", selectedItems);

      return { selectedItems };
    });
  };
  // Method to toggle selection for all items
  toggleSelectAll = () => {
    this.setState((prevState) => {
      const { Raw_Dat, selectedItems } = prevState;
      let updatedSelectedItems;

      if (selectedItems.length === Raw_Dat.length) {
        // If all are selected, deselect all
        updatedSelectedItems = [];
      } else {
        // Otherwise, select all
        updatedSelectedItems = Raw_Dat.map((item) => item.ID);
      }

      // Log the updated selected items
      // console.log("Updated selectedItems:", updatedSelectedItems);

      // Return the new state
      return { selectedItems: updatedSelectedItems };
    });
  };
  componentDidMount() {
    this.fetchData();
  }

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

  // Method to check if an item matches the search query across all columns
  isMatch = (item, searchQuery) => {
    const searchValue = searchQuery.toLowerCase();
    return Object.values(item).some((value) => {
      // Ensure value is not null or undefined before converting to string
      if (value !== null && value !== undefined) {
        // console.log(value);
        return value.toString().toLowerCase().includes(searchValue);
      }
      return false; // If value is null/undefined, it won't match the search query
    });
  };
  renderTable = () => {
    const { Raw_Dat, searchQuery, selectedItems } = this.state;
    // Filter Raw_Dat based on the search query across all columns
    const filteredData = Raw_Dat.filter((item) =>
      this.isMatch(item, searchQuery)
    );

    if (!Array.isArray(filteredData) || filteredData.length === 0) {
      // return <p>No data available</p>;
    }

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="row">
              <div className="col-12">
                {/* Textbox for filtering */}
                <input
                  type="text"
                  placeholder="Search all columns"
                  value={searchQuery}
                  onChange={(e) =>
                    this.setState({ searchQuery: e.target.value })
                  } // Update state on input change
                  style={{
                    marginBottom: "10px",
                    padding: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
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
                      <th style={styles.headerCell}>
                        <Checkbox
                          checked={
                            selectedItems.length === filteredData.length &&
                            filteredData.length > 0
                          }
                          onChange={this.toggleSelectAll}
                        />
                      </th>

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
                        <td>
                          <Checkbox
                            checked={selectedItems.includes(item.ID)}
                            onChange={() => this.toggleSelect(item.ID)}
                          />
                        </td>
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
  fetchDatalabel = async (data,Index) => {
    console.log(data);
    try {
      const response = await httpClient.get(
        `${server.ISUUEPART_URL}/label_tray_QTY/${data.Model}/${data.Vendor}/${data.Part_name}/${data.Part_number}/${data.Mold}`
      );
      console.log(response);

      // return {response};
      try {
        this.setState((prevState) => {
          const updatedEntries = [...prevState.dataEntries2];
          updatedEntries[Index] = {
            ...data,
            Pack: 1,
          };
          return { dataEntries2: updatedEntries };
        });
      } catch (error) {
        console.error("Error updating state: ", error); // Log the error for debugging
      }
    } catch {}
  };
  renderDataEntries = () => {
    const { selectedItems, Raw_Dat, dataEntries2 } = this.state;

    const entriesToRender = selectedItems.map((id) => {
      return Raw_Dat.find((item) => item.ID === id);
    });

    return (
      <div>
        {entriesToRender.length > 0 ? (
          entriesToRender
            .sort((a, b) =>
              a.Mo_number < b.Mo_number ? -1 : a.Mo_number > b.Mo_number ? 1 : 0
            )
            .map((entry, index) => {
              // Check the status from dataEntries2 instead of entry
              const updatedEntry = dataEntries2[index] || entry;

              let labelPartStyle = {
                fontSize: "19px",
                textAlign: "center",
                borderColor: "#ced4da", // Default grey
                backgroundColor: "white", // Default white
              };

              let eslTagStyle = {
                fontSize: "19px",
                textAlign: "center",
                borderColor: "#ced4da", // Default grey
                backgroundColor: "white", // Default white
              };
              let MOTagStyle = {
                fontSize: "19px",
                textAlign: "center",
                borderColor: "#ced4da", // Default grey
                backgroundColor: "white", // Default white
              };
              console.log(updatedEntry);
              // Check if `updatedEntry.num` equals "1"
              if (updatedEntry.num === 1) {
                labelPartStyle = {
                  ...labelPartStyle, // Keep existing properties
                  borderColor:
                    updatedEntry.labelPartStatus === "success"
                      ? "#28a745" // Green for success
                      : updatedEntry.labelPartStatus === "error"
                      ? "#dc3545" // Red for error
                      : "#ced4da", // Grey for neutral
                  backgroundColor:
                    updatedEntry.labelPartStatus === "success"
                      ? "#d4edda" // Light green for success
                      : updatedEntry.labelPartStatus === "error"
                      ? "#f8d7da" // Light red for error
                      : "white", // White for neutral
                };
              } else if (updatedEntry.num === 2) {
                console.log(updatedEntry.eslTagStyleStatus);
                eslTagStyle = {
                  ...eslTagStyle, // Keep existing properties
                  borderColor:
                    updatedEntry.eslTagStyleStatus === "success"
                      ? "#28a745" // Green for success
                      : updatedEntry.eslTagStyleStatus === "error"
                      ? "#dc3545" // Red for error
                      : "#ced4da", // Grey for neutral
                  backgroundColor:
                    updatedEntry.eslTagStyleStatus === "success"
                      ? "#d4edda" // Light green for success
                      : updatedEntry.eslTagStyleStatus === "error"
                      ? "#f8d7da" // Light red for error
                      : "white", // White for neutral
                };
              } else if (updatedEntry.num === 3) {
                MOTagStyle = {
                  ...eslTagStyle, // Keep existing properties
                  borderColor:
                    updatedEntry.labelPartStatus === "success"
                      ? "#28a745" // Green for success
                      : updatedEntry.labelPartStatus === "error"
                      ? "#dc3545" // Red for error
                      : "#ced4da", // Grey for neutral
                  backgroundColor:
                    updatedEntry.labelPartStatus === "success"
                      ? "#d4edda" // Light green for success
                      : updatedEntry.labelPartStatus === "error"
                      ? "#f8d7da" // Light red for error
                      : "white", // White for neutral
                };
              }

              // console.log('labelPartStyle:', labelPartStyle);
              // console.log('eslTagStyle:', eslTagStyle);

              return (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <h5 style={{ color: "white" }}>
                    <Badge className="text-uppercase" color="warning" pill>
                      {updatedEntry.Rack_number || "No Rack number Data"}
                    </Badge>{" "}
                    / Mo: {updatedEntry.Mo_number || "No Model Data"} / IQC:{" "}
                    {updatedEntry.IQC_number || "No IQC Data"} / Model:{" "}
                    {updatedEntry.Model || "No Model Data"} / Vendor:{" "}
                    {updatedEntry.Vendor || "No Vendor Data"} / QTY:{" "}
                    {updatedEntry.QTY || "No Data"} / Pack:
                  </h5>

                  <FormGroup>
                    <Input
                      className="form-control-alternative-center"
                      placeholder="Scan ESL Tag"
                      type="text"
                      style={eslTagStyle}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" ) { // Check if the Enter key is pressed
                          this.handleKeyDown(index, event, updatedEntry, 2);
          
                        }
                      }}
                    />
                    {/* ESL Tag Input (similar style as above) */}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      className="form-control-alternative-center"
                      placeholder="Scan label part"
                      type="text"
                      style={labelPartStyle}
                      onKeyDown={(event) =>
                        this.handleKeyDown(index, event, updatedEntry, 1)
                      }
                    />
                    {/* ESL Tag Input (similar style as above) */}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      className="form-control-alternative-center"
                      placeholder="Scan MO Tag"
                      type="text"
                      style={MOTagStyle}
                      onKeyDown={(event) =>
                        this.handleKeyDown(index, event, updatedEntry, 3)
                      }
                    />
                    {/* ESL Tag Input (similar style as above) */}
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

  handleKeyDown = async (index, event, entry, num) => {
    const { inputValues } = this.state;
    console.log(num);
    // Update the state with the new input values
    const newInputValues = {
      ...inputValues,
      [`${index}-${num}`]: event.target.value,
    };
    this.setState({ inputValues: newInputValues });

    const value = event.target.value;

    if (event.key === "Enter") {
      try {
        let result = "";

        if (num === 1) {
          // Scan label part
          let sanitizedModel;
          try {
            sanitizedModel = entry.Model ? entry.Model.replace(/\//g, "-") : "";
          } catch {
            sanitizedModel = entry.Model;
          }

          for (let i = 9; i <= 15; i++) {
            const substringValue = value.substring(0, i); // Extract substring from 0 to `i`

            try {
              // Make the HTTP request using the substring
              result = await httpClient.get(
                `${server.COMPONENT_URL}/label_tray/${sanitizedModel}/${entry.Vendor}/${entry.Part_name}/${entry.Part_number}/${entry.Mold}/${substringValue}`
              );
              //console.log(result);
              // Check the result's Model property
              if (result.data.result[0].Model) {
                console.log("Model found, breaking the loop");
                break; // Exit the loop if a valid Model is found
              }
            } catch (error) {
              console.error(
                `Error occurred for substring "${substringValue}":`,
                error
              );
            }
          }
          try {
            this.setState((prevState) => {
              const updatedEntries = [...prevState.dataEntries2];
              const modelExists = result?.data?.result?.[0]?.Model; // Check if Model exists
              updatedEntries[index] = {
                ...entry,
                num: 1,
                labelPartStatus: modelExists ? "success" : "error", // Update label part status based on Model existence
              };
              return { dataEntries2: updatedEntries };
            });
          } catch (error) {
            console.error("Error updating state: ", error); // Log the error for debugging
          }
        } else if (num == "2") {

          // Scan label esl
 
          let sanitizedModel = entry.Model;
          try {
            sanitizedModel = entry.Model ? entry.Model.replace(/\//g, "-") : "";
          } catch {
            sanitizedModel = entry.Model;
          }

          // Example usage: logging or setting state
          try {
            // Make the HTTP request using the substring
            const result = await httpClient.get(
              `${server.ISUUEPART_URL}/label_tray_QTY/${sanitizedModel}/${entry.Vendor}/${entry.Part_name}/${entry.Part_number}/${entry.Mold}`
            );
            console.log(result);
            // Check the result's Model property
            if (result.data.result[0].Qty_per_bundle !== "") {
             
           
            }else {
              // const starttt = result.data.result[0].Qty_per_pack ;
            }
          } catch (error) {
           
          }

          try {
            // console.log(entry);
            if (value === entry.ESL_number) {
              this.setState((prevState) => {
                const updatedEntries = [...prevState.dataEntries2];
                // const modelExists = result?.data?.result?.[0]?.Model; // Check if Model exists
                updatedEntries[index] = {
                  ...entry,
                  num: 2,
                  eslTagStyleStatus: "success", // Update label part status based on Model existence
                };
                console.log(updatedEntries);
                return { dataEntries2: updatedEntries };
              });
            } else {
              this.setState((prevState) => {
                const updatedEntries = [...prevState.dataEntries2];
                // const modelExists = result?.data?.result?.[0]?.Model; // Check if Model exists
                updatedEntries[index] = {
                  ...entry,
                  num: 2,
                  eslTagStyleStatus: "error", // Update label part status based on Model existence
                };
                console.log(updatedEntries);
                return { dataEntries2: updatedEntries };
              });
            }
          } catch (error) {
            console.error("Error updating state: ", error); // Log the error for debugging
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.setState((prevState) => {
          const updatedEntries = [...prevState.dataEntries2];
          updatedEntries[index] = {
            ...entry,
            [num === 1 ? "labelPartStatus" : "eslTagStatus"]: "error", // Set status on error
          };
          return { dataEntries2: updatedEntries };
        });
      }
    }
  };

  render() {
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
                <div className="px-2">
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
                    ></Col>
                    {/* Alart  */}
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div></div>
                        <div></div>
                      </div>
                    </Col>
                  </Row>
                  <br></br>
                  <div className="text-center mt-5">
                    <h3>Issue component part</h3>
                    <div
                      className="h6 font-weight-300"
                      style={{ fontSize: "18px" }}
                    >
                      Please input the data for the issue part .
                      (กรุณากรอกข้อมูลที่ต้องการจ่ายให้ถูกต้อง)
                      <div className="mt-5 py-5 border-top text-center">
                        <Row className="justify-content-center">
                          <Col lg="9"></Col>
                        </Row>

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
                          className="modal-dialog-centered modal-primary modal-lg"
                          contentClassName="bg-gradient-primary"
                          isOpen={this.state.notificationModal}
                          toggle={() => this.toggleModal("notificationModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-notification"
                            >
                              Selected Items
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
                                className="fa fa-telegram fa-5x"
                                aria-hidden="true"
                              ></i>
                              <h4 className="heading mt-4">
                                Selected MO Numbers
                              </h4>
                              {this.renderDataEntries()}
                            </div>
                          </div>

                          <div className="modal-footer">
                            <Button
                              className="btn-white"
                              color="default"
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

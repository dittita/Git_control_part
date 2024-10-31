/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  // Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  // NavItem,
  // NavLink,
  Nav,
  Container,
  Row,
  Col,
  // UncontrolledTooltip,
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/minebea_logo_web.png")}
                  style={{ width: "360px", height: "auto" }} // Adjust the size as needed
                />
              </NavbarBrand>

              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/minebea_logo_web.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Master</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag={Link} to="/racknumber">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-album-2" />
                          </div>
                          <h6 className="heading text-primary mb-md-1 ml-2">
                            Rack number
                          </h6>
                        </div>
                      </DropdownItem>
                      <DropdownItem to="/Master-part" tag={Link}>
                      <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                            <i className="ni ni-atom" />
                          </div>
                          <h6 className="heading text-info mb-md-1 ml-2">
                          Component part
                          </h6>
                        </div>
                       
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Control part</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/Receive-page" tag={Link}>

                      <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-basket" />
                          </div>
                          <h6 className="heading text-primary mb-md-1 ml-2">
                          Receiving Parts
                          </h6>
                        </div>
                      
                      </DropdownItem>
                      <DropdownItem to="/Issue-page" tag={Link}>
                        
                      <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                            <i className="ni ni-spaceship" />
                          </div>
                          <h6 className="heading text-info mb-md-1">
                              Issue component part
                          </h6>
                        </div>
                      
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Return part</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/Receive-page" tag={Link}>

                      <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                          <i class="fa fa-battery-quarter" aria-hidden="true"></i>
                          </div>
                          <h6 className="heading text-primary mb-md-1 ml-2">
                          Retrun type 1 (S1 have MO number)
                          </h6>
                        </div>
                        
                      </DropdownItem>
                      <DropdownItem to="/Issue-page" tag={Link}>
                      <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                          <i class="fa fa-battery-half" aria-hidden="true"></i>
                          </div>
                          <h6 className="heading text-info mb-md-1 ml-2">
                          Retrun type 2 (S5)
                          </h6>
                        </div>
                      
                      </DropdownItem> <DropdownItem to="/Issue-page" tag={Link}>

                      <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                          <i class="fa fa-battery-full" aria-hidden="true"></i>
                          </div>
                          <h6 className="heading text-success mb-md-1 ml-2">
                          Retrun type 3 (S1)
                          </h6>
                        </div>
                       
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  
                  {/* <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">User</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/login-page" tag={Link}>

                      <div className="d-flex align-items-center">
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                          <i class="fa fa-battery-quarter" aria-hidden="true"></i>
                          </div>
                          <h6 className="heading text-primary mb-md-1 ml-2">
                          Login
                          </h6>
                        </div>
                        
                      </DropdownItem>
                
                    </DropdownMenu>
                  </UncontrolledDropdown> */}

                </Nav>

                {/* <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.facebook.com/creativetim"
                      id="tooltip333589074"
                      target="_blank"
                    >
                      <i className="fa fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip333589074">
                      Like us on Facebook
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.instagram.com/creativetimofficial"
                      id="tooltip356693867"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Instagram
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip356693867">
                      Follow us on Instagram
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://twitter.com/creativetim"
                      id="tooltip184698705"
                      target="_blank"
                    >
                      <i className="fa fa-twitter-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Twitter
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip184698705">
                      Follow us on Twitter
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/creativetimofficial/argon-design-system-react"
                      id="tooltip112445449"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Star us on Github
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                      target="_blank"
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-cloud-download mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Download
                      </span>
                    </Button>
                  </NavItem>
                </Nav> */}
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;

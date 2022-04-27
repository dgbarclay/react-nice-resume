import React, { Component } from "react";
import Fade from "react-reveal";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="row">
          <Fade bottom>
            <p>Multi-Label Zero-Shot Learning, a project by Dan Barclay</p>
            <p>All data provided is deleted permanently after use. Use includes passing data into model and recieving an output prediction. No data is used to further train the model. This project is for educational purposes only.</p>
          </Fade>

          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="icon-up-open"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

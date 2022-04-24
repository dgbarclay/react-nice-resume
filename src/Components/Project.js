import React, { Component } from "react";
import Slide from "react-reveal";
import { WebCamDisplay } from "./WebCamDisplay";
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Project extends Component {

  state = {
    selectedFile: null,
    embeddingResponse: undefined,
    generativeResponse: undefined,
    img: null,
  };
  onFileChangeEmbedding = event => {
    this.setState({ selectedFile: [event.target.files[0], "embedding"] });
    this.setState({ img: URL.createObjectURL(event.target.files[0]) })
  };

  onFileChangeGenerative = event => {
    this.setState({ selectedFile: [event.target.files[0], "generative"] });
    this.setState({ img: URL.createObjectURL(event.target.files[0]) })
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", this.state.selectedFile[0]);
    formData.append("filename", this.state.selectedFile[0].name);
    formData.append("type", this.state.selectedFile[1]);

    axios.post("https://efa55a63-3460-418e-a0fd-8eb3ffe86aa4.syndic.ai/", formData)
    .then( response => this.setState({embeddingResponse : response}));
  };

  render() {

    const embedding = "This model is trained to identify over 20 different types of facial emotion. It is an embedding model \
    and has been trained on AffectNet, a dataset with over 120,000 different faces."

    const generative = "This model is trained to predict the class of over 900 different objects. \
    It is a generative model and is trained on NUS-WIDE, a dataset of over 200,000 images taken from Flickr."
  
    return (
      <section id="project">
        <Slide left duration={1300}>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Embedding Model</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">
                  <p>{embedding}</p>
                  <p>Please align face in the center of the image. Press the camera icon or an upload an image once you are ready.</p>
                  <WebCamDisplay/>
                  <input type="file" onChange={this.onFileChangeEmbedding} />
                  {!this.state.selectedFile &&
                    <Button disabled variant="contained" color="primary" component="span" onClick={this.onFileUpload}>
                    Upload
                    </Button>
                  }
                  {this.state.selectedFile &&
                    <>
                    <img src={this.state.img} width="200px"></img>
                    <Button variant="contained" color="primary" component="span"onClick={this.onFileUpload}>
                    Upload
                    </Button>
                    </>
                  }
                  {this.state.embeddingResponse && this.state.embeddingResponse.data &&
                      <p>Prediction: 
                        {this.state.embeddingResponse.data.map(d => (<li>{d}</li>))}
                      </p>
                  }
                </div>
              </div>
            </div>
          </div><div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Generative Model</span>
              </h1>
            </div>
            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">
                  <p>{generative}</p>
                  <p>Please align an object in the center of the image. Press the camera icon or an upload an image once you are ready.</p>
                  <WebCamDisplay/>
                  <input type="file" onChange={this.onFileChangeGenerative} />
                  {!this.state.selectedFile &&
                    <Button disabled variant="contained" color="primary" component="span"onClick={this.onFileUpload}>
                    Upload
                    </Button>
                  }
                  {this.state.selectedFile &&
                    <Button variant="contained" color="primary" component="span"onClick={this.onFileUpload}>
                    Upload
                    </Button>
                  }
                  {this.state.generativeResponse && this.state.generativeResponse.data &&
                      <p>Prediction: 
                        {this.state.generativeResponse.data.map(d => (<li>{d}</li>))}
                      </p>
                  }
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default Project;

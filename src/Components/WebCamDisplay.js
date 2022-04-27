import React, { Component } from "react";
import Webcam from "react-webcam-mirror";
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

class WebCamDisplay extends Component {  
  state = {
    image: null,
    prediction: null
  };

  sendData = () => {
    var arr = this.state.image.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    this.props.parentCallback([new File([u8arr], "webcamInput", {type:mime}), this.props.type]);
  };

  capture = () => {
    if (this.props.type == 'embedding'){
      this.setState({image: webcamRefEmbedding.current.getScreenshot()});
    } else {
      this.setState({image: webcamRefGenerative.current.getScreenshot()});
    }
  };

  retake = () => {
    this.props.resetCallback(this.props.type)
    this.setState({prediction: null});
    this.setState({image: null});
  };

  predict = () => {
    this.setState({prediction: "Happy"});
  };

  render() {
    return (
      <>
      { !this.state.image && this.props.type == 'embedding' &&
          <>
          <Webcam
            audio={false}
            height={360}
            ref={webcamRefEmbedding}
            screenshotFormat="image/jpeg"
            width={500}
            style={{
              transform: 'scaleX(-1)'
            }}
            videoConstraints={videoConstraints}
          />
          <div style={{marginLeft: '230px', marginBottom: '30px'}}>
          <IconButton onClick={this.capture} color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          </div>
          </>
      }
      { !this.state.image && this.props.type == 'generative' &&
          <>
          <Webcam
            audio={false}
            height={360}
            ref={webcamRefGenerative}
            screenshotFormat="image/jpeg"
            width={500}
            style={{
              transform: 'scaleX(-1)'
            }}
            videoConstraints={videoConstraints}
          />
          <div style={{marginLeft: '230px', marginBottom: '30px'}}>
          <IconButton onClick={this.capture} color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          </div>
          </>
      }
      { this.state.image &&
          <>
          <img src={this.state.image} alt="" style={{
            transform: 'scaleX(-1)'
          }}></img>
          <div className="row item">
          <Button onClick={this.retake} variant="contained" color="primary" component="span">
            Retake
          </Button>
          <Button onClick={this.sendData} variant="contained" color="primary" component="span">
            Predict
          </Button>
          </div>
          </>
      }
      { this.state.prediction &&
      <h1>Predicition : {this.state.prediction}</h1>
      }
      </>

    );
  }
}

const webcamRefEmbedding = React.createRef(null);
const webcamRefGenerative = React.createRef(null);


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

export default WebCamDisplay;
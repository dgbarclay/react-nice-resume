import React, { useState } from "react";
import Webcam from "react-webcam-mirror";
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

export const WebCamDisplay = () => {
  const [image, setImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const webcamRef = React.useRef(null);
  
  const capture = React.useCallback(
    () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    },
    [webcamRef]
  );

  const retake = React.useCallback(
    () => {
    setImage(null);
    setPrediction(null);
    }
  );

  const predict = React.useCallback(
    () => {
      setPrediction("Happy");
    }
  );

  return (
    <>
    { !image &&
        <>
        <Webcam
          audio={false}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          style={{
            transform: 'scaleX(-1)'
          }}
          videoConstraints={videoConstraints}
        />
        <div style={{marginLeft: '230px', marginBottom: '30px'}}>
        <IconButton onClick={capture} color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        </div>
        </>
    }
    { image &&
        <>
        <img src={image} alt="" style={{
          transform: 'scaleX(-1)'
        }}></img>
        <div className="row item">
        <Button onClick={retake} variant="contained" color="primary" component="span">
          Retake
        </Button>
        <Button onClick={predict} variant="contained" color="primary" component="span">
          Predict
        </Button>
        </div>
        </>
    }
    { prediction &&
    <h1>Predicition : {prediction}</h1>
    }
    </>

  );
};

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
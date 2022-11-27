import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from '../ImageCropper/ImgDialoge';
import { getCroppedImg, getRotatedImage } from './CanvasUtils'
import { styles } from './Styles'
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { useHistory } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}

const Demo = ({ classes }) => {

  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [imageUpload, setImageUpload] = useState(null);
  const [email,setEmail] = useState(localStorage.getItem('email'));
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }

      setImageSrc(imageDataUrl)
      setImageUpload(file)
    }
  }
  
  const uploadFile = () => {
    if (imageUpload == null) return;
    setIsLoading(true);
    const imageRef = ref(storage, `images/${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(croppedAreaPixels)
        console.log(url);
        submitTest(url,croppedAreaPixels.x,croppedAreaPixels.y,croppedAreaPixels.height,croppedAreaPixels.width);
      });
    });
  };

  const submitTest = (imgUrl, x, y, height, width) => {

    let url = 'http://localhost:8000/parkinson-test';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify({
        email:email,
        imgUrl:imgUrl,
        x:x,
        y:y,
        height:height,
        width:width
      }),
     })
     .then((response) => response.json())
     .then((data) => {
        if(data){
          console.log(data);
          setIsLoading(false);
          history.replace(`/previous-tests/${data.testId}`,{...data})
        }
     })
     .catch((err) => {
          alert('Error While Processing Your Request')
          history.replace('/');
     });

  }


  return (
    isLoading === true ? <Spinner/> : <div>
    {imageSrc ? (
      <React.Fragment>
        <div className={classes.cropContainer}>
          <Cropper
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ root: classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Rotation
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              classes={{ root: classes.slider }}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
          <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            classes={{ root: classes.cropButton }}
          >
            Show Result
          </Button>
        </div>
        <ImgDialog img={croppedImage} onClose={onClose} onUploadFile={uploadFile}/>
      </React.Fragment>
    ) : (
      <div>
        <h2 for="formFileLg" class="form-label" style={{margin:"3% auto", textAlign:"center", color:"#38015c"}}><b>Upload Spiral/Wave Drawing (Same As Below Sample) For Parkinson Test</b></h2>
        <div class="card" style={{margin:"2% auto", width:"50%"}}>
          <div class="card-body" style={{textAlign:"center"}}>
            <div>
              <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={onFileChange} accept="image/*"/>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col">
              <div class="card" style={{width:"50%", margin:"1% 0 1% 50%", textAlign:"center"}}>
                <img class="card-img-top" src="spiral.png" alt="spiral-demo" style={{height:"256px",width:"100%",border:"1px solid grey"}}/>
                  <div class="card-body">
                    <p class="card-text"><b>Spiral Drawing</b></p>
                  </div>
              </div>
            </div>
            <div class="col">
              <div class="card" style={{width:"50%", margin:"1% 0 1% 0", textAlign:"center"}}>
                <img class="card-img-top" src="wave.png" alt="wave-demo" style={{height:"256px",width:"100%",border:"1px solid grey"}}/>
                  <div class="card-body">
                    <p class="card-text"><b>Wave Drawing</b></p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )}
  </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const StyledDemo = withStyles(styles)(Demo)

export default StyledDemo;
import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Cropped image
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.imgContainer}>
            <img src={this.props.img} alt="Cropped" className={classes.img} />
          </div>

          <div class="card" style={{width:"50%", margin:"5% auto 5% auto", padding:"2%"}} >
            <select class="form-select" aria-label="Default select example" style={{margin:"2% 0"}}>
              <option selected>Select Drawing Type Parkinson Test</option>
              <option value="spiral">Spiral</option>
              <option value="wave">Wave</option>
            </select>
            <div class="d-grid" style={{margin:"2% 0"}}>
              <button onClick={this.props.onUploadFile} class="btn btn-secondary" type="button">Submit Drawing For Parkinson Test</button>
            </div>
          </div>

        </div>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ImgDialog)

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux'
import Dots from "../../Icons/Dots.svg"
import AprobarTutor from "./aprobarTutor"
import  {modifier} from '../../features/admin/adminSlice'
import RechazarTutor from "./rechazarTutor"

export default function ActionMenu(props) {

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOut = (e) => {
    // console.log(e.target.id);
    dispatch(modifier(['idNewTutor', e.target.id])); 
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <figure className="dots image is-32x32">
            <img id={props.id} alt="" src={Dots} onClick={ e => handleOut(e)}/>
        </figure>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem> <AprobarTutor btnName="Aprobar"/> </MenuItem>
        <MenuItem><RechazarTutor /></MenuItem>
      </Menu>
    </div>
  );
}
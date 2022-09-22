import { Button, Menu, MenuItem } from "@mui/material";
import * as React from "react";

export default function PopoverMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Popover Menu</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} className="py-2">
          Small Item
        </MenuItem>
        <MenuItem onClick={handleClose} className="py-8">
          Large Item
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

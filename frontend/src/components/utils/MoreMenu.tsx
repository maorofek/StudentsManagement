import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import eyeOutline from "@iconify/icons-eva/eye-outline";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

type MoreMenuProps = {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  onView: VoidFunction;
  isEditDisabled?: boolean;
  isDeleteDisabled?: boolean;
  isViewDisabled?: boolean;
  deleteText?: string;
};

export default function MoreMenu({
  onDelete,
  onEdit,
  onView,
  isEditDisabled,
  isDeleteDisabled,
  isViewDisabled,
  deleteText,
}: MoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    ((!isEditDisabled || !isDeleteDisabled || !isViewDisabled) && (
      <>
        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </IconButton>

        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: "100%" },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {!isViewDisabled && (
            <MenuItem
              onClick={() => {
                onView();
                setIsOpen(false);
              }}
              sx={{ color: "text.secondary" }}
            >
              <ListItemIcon>
                <Icon icon={eyeOutline} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="צפייה"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          )}
          {!isEditDisabled && (
            <MenuItem
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              sx={{ color: "text.secondary" }}
            >
              <ListItemIcon>
                <Icon icon={editFill} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="עריכה"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          )}
          {!isDeleteDisabled && (
            <MenuItem
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              sx={{ color: "text.secondary" }}
            >
              <ListItemIcon>
                <Icon icon={trash2Outline} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={deleteText ? deleteText : "מחיקה"}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          )}
        </Menu>
      </>
    )) ||
    null
  );
}

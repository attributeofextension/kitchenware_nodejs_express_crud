// components/ProductActions.tsx
import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ProductActionsProps {
    onEdit: () => void;
    onDelete: () => void;
    iconSize?: 'small' | 'medium' | 'large';
}

export const ProductActions = ({ onEdit, onDelete, iconSize = 'medium' }: ProductActionsProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent row/card click
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action: () => void) => (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent row/card click
        action();
        handleClose();
    };

    return (
        <>
            <IconButton
                size={iconSize}
                onClick={handleClick}
                aria-label="more actions"
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={(e) => e.stopPropagation()}
            >
                <MenuItem onClick={handleAction(onEdit)}>
                    <EditIcon sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleAction(onDelete)} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};
import { Box, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

interface StyledDrialogTitleProps {
  icon?: ReactNode;
  title: string;
}

export function StyledDrialogTitle({icon, title}: StyledDrialogTitleProps) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    pl: icon ? 1.5 : 0,
    'svg': {
      opacity: 0.6,
    },
  };

  const titleStyle = {
    pl: icon ? 1 : 1.5,
    flexGrow: 1,
  };

  return (
    <Box sx={containerStyle}>
      {icon && icon}
          
      <DialogTitle sx={titleStyle}>
        {title}
      </DialogTitle>
    </Box>
  );
}
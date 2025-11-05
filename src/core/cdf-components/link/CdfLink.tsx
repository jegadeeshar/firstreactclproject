import React from 'react';
import { Link, Typography } from '@mui/material';

export interface CdfLinkProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const CdfLink: React.FC<CdfLinkProps> = ({ label, icon, onClick, href }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      underline="always"
      color="primary"
      variant="body1"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {icon}
      <Typography variant="body1">{label}</Typography>
    </Link>
  );
};

export default CdfLink;

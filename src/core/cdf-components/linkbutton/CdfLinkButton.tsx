import { type FC } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import type { CdfLinkButtonPropsType } from '@/core/types';

// Styled version of MUI Button
const StyledLinkButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  borderColor: theme.palette.primary.main,
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const CdfLinkButton: FC<CdfLinkButtonPropsType> = ({ label, icon, href }) => {
  return (
    <StyledLinkButton variant="outlined" href={href} startIcon={icon}>
      {label}
    </StyledLinkButton>
  );
};

export default CdfLinkButton;

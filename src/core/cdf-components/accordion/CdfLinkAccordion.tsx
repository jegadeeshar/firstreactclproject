import { useState, type SyntheticEvent } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { CdfLinkAccordionProps } from '@/core/types';

const CdfLinkAccordion: React.FC<CdfLinkAccordionProps> = ({
  expandedText,
  collapsedText,
  children,
  ...props
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&::before': { display: 'none' },
        '&.Mui-expanded': {
          margin: '0 !important',
        },
      }}
      {...props}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', fontSize: '1rem' }} />}
        sx={{
          minHeight: 'unset !important',
          padding: 0,
          justifyContent: 'flex-end',
          transition: 'none',
          '&.Mui-expanded': {
            minHeight: 'unset !important',
          },
          '& .MuiAccordionSummary-content': {
            margin: '0 !important',
            flexGrow: 0,
            marginRight: '8px',
          },
          '&:hover': {
            '& .MuiTypography-root': {
              textDecoration: 'underline',
            },
          },
        }}
      >
        <Typography
          sx={{
            color: 'primary.main',
            fontSize: '0.875rem',
          }}
        >
          {expanded === 'panel1' ? expandedText : collapsedText}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, paddingTop: '8px', overflow: 'visible' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CdfLinkAccordion;

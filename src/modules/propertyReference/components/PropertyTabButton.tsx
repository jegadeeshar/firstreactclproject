import CdfLink from '@/core/cdf-components/link/CdfLink';
import CdfTabs from '@/core/cdf-components/tabs/CdfTabs';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import logger from '@/core/utils/loggerUtils';

const PropertyTabButton: React.FC = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  logger.debug('Is Mobile View: ', isMobileView);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CdfTabs
              defaultValue="bureau"
              tabs={[
                {
                  content: <div></div>,
                  label: 'Property 1',
                  value: 'property1',
                },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} display="flex" justifyContent="flex-end">
            <CdfLink
              icon={<AddCircleOutlineIcon sx={{ mr: 1 }} />}
              label="Add "
              onClick={() => console.log('Add Account clicked')}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PropertyTabButton;

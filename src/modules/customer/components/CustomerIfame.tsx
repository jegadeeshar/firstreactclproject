import React, { useState } from 'react';
import { Box, CircularProgress, Typography, styled } from '@mui/material';

const IframeStyle = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  flexGrow: 1,
});

const LoaderContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));

const LoadingText = styled(Typography)({
  marginLeft: '8px',
});

const StyledIframe = styled('iframe')<{ $loading: boolean }>(({ $loading }) => ({
  border: 'none',
  width: '100%',
  height: '100%',
  display: 'block',
  visibility: $loading ? 'hidden' : 'visible',
}));

const CustomerIframe: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const iframeUrl =
    'https://stgleapkycfe.chola.murugappa.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJDRjAxMDM1IiwidXNlclR5cGUiOiJwZXJzb24iLCJtcyI6NjQ4LCJpYXQiOjE3NjEyMjE3MzgsImV4cCI6MTc2MTMwNzczOCwiaXNzIjoiY2hvbGFMZWFwIn0.Nk1Wg7tpG_KzhaH9lPdN1fePzHbH-_5CRpiLJiqr4FE&leadID=bbbc92c0-ab4b-11f0-9b6b-1b6164cb0529&leadDisplayID=16507418&role=sfe&roleID=ROL002&currentWorkStatus=Pending&customer_workstatus=completed&Box=leapdev01&needPipelineDedupe=true&channel=&isFastTrackUser=true';

  return (
    <IframeStyle>
      {loading && (
        <LoaderContainer>
          <CircularProgress />
          <LoadingText>Loading Verification...</LoadingText>
        </LoaderContainer>
      )}

      <StyledIframe
        src={iframeUrl}
        title="Customer Content" // ✅ Match test expectation
        $loading={loading}
        onLoad={() => setLoading(false)}
      />
    </IframeStyle>
  );
};

export default CustomerIframe;

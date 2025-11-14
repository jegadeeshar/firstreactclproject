import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import CdfPillTabs from '@/core/cdf-components/tabs/CdfPillTabs';

interface TabConfig {
  label: string;
  content: ReactNode;
}

interface TabsWrapperProps {
  tabs: TabConfig[];
  initialTab?: number;
}

const TabsWrapper: React.FC<TabsWrapperProps> = ({ tabs, initialTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabLabels = tabs.map((tab) => tab.label);

  return (
    <>
      <CdfPillTabs tabs={tabLabels} initialValue={activeTab} onChange={setActiveTab} />
      <Box sx={{ mt: 2 }}>{tabs[activeTab]?.content}</Box>
    </>
  );
};

export default TabsWrapper;

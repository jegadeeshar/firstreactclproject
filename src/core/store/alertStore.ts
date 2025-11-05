import { create } from 'zustand';
import { type AlertColor } from '@mui/material';
import { generateUniqueKey } from '@core/utils/commonUtils';

export interface AlertItem {
  id: string; // unique id for each alert
  message: string;
  type: AlertColor;
}

interface AlertState {
  alerts: AlertItem[];
  showAlert: (message: string, type?: AlertColor) => void;
  hideAlert: (id: string) => void;
}

const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  showAlert: (message, type: AlertColor = 'info') =>
    set((state) => ({
      alerts: [...state.alerts, { id: generateUniqueKey(), message, type }],
    })),
  hideAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
}));

export default useAlertStore;

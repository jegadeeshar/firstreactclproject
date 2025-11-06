import type { ButtonProps, DialogProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export interface PageLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export interface FormWrapperProps<T extends Record<string, unknown> = Record<string, unknown>> {
  methods: UseFormReturn<T>;
  children: ReactNode;
  footer?: ReactNode;
}

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  layout?: 'main' | 'auth';
}

export interface AppBarCustomProps {
  title: string;
  userName?: string;
  branch?: string;
  notificationCount: number;
}
export type CdfTableProps = {
  headers: readonly string[];
  rows: Record<string, string>[];
};

export type CdfActionFooterProps = {
  closeButtonLabel?: string;
  submitButtonLabel?: string;
  deleteButtonLabel?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  onDelete?: () => void;
};
export type TabItem = {
  label?: string;
  value?: string;
  content: React.ReactNode;
};

export type CdfTabsProps = {
  tabs: TabItem[];
  defaultValue?: string;
};

export interface CdfAccordionProps {
  summary: React.ReactNode;
  details: React.ReactNode;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  sx?: object;
}

export interface CdfDialogProps extends DialogProps {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  submitButtonLabel?: string;
  onButtonClick?: () => void;
  showCancel?: boolean;
}

// ✅ Common base button type (inherits all MUI Button props)
export interface CdfButtonProps extends ButtonProps {
  label?: string;
}

export interface CdfIconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  label?: string;
}

export interface CdfPillTabsProps {
  tabs: string[];
  initialValue?: number;
}
export interface CdfLinkButtonPropsType {
  label: string; // Button text
  onClick?: () => void; // Optional click handler
  icon?: ReactNode;
  href?: string;
}

export interface CdfLinkAccordionProps extends Omit<CdfAccordionProps, 'summary' | 'details'> {
  expandedText: string;
  collapsedText: string;
  children: React.ReactNode;
}

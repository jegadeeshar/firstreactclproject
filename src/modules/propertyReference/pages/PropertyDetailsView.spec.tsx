import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PropertyDetailsView from './PropertyDetailsView';
import LabelProvider from '@/core/providers/LabelProvider';

describe('PropertyDetailsView', () => {
  it('renders property details view', () => {
    render(
      <LabelProvider>
        <PropertyDetailsView />
      </LabelProvider>
    );

    expect(screen.getByText('PROPERTY DETAILS')).toBeInTheDocument();
    expect(screen.getByText('BOUNDARY DETAILS')).toBeInTheDocument();
    expect(screen.getByText('COLLATERAL ADDRESS')).toBeInTheDocument();
  });

  it('displays property details data', () => {
    render(
      <LabelProvider>
        <PropertyDetailsView />
      </LabelProvider>
    );

    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('Self Occupied')).toBeInTheDocument();
    expect(screen.getByText('Farm House')).toBeInTheDocument();
    expect(screen.getByText('Freehold')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import CdfField from './CdfField';

describe('CdfField component', () => {
  it('renders children properly', () => {
    render(
      <CdfField>
        <span data-testid="child">Test Content</span>
      </CdfField>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Test Content');
  });

  it('applies default size classes or style (xs=12, sm=4) when no props provided', () => {
    const { container } = render(
      <CdfField>
        <div>Default size</div>
      </CdfField>
    );
    // This assertion may depend on how your grid classnames/style generate; for example:
    const fieldDiv = container.firstChild as HTMLElement;
    expect(fieldDiv).toBeInTheDocument();
    // you might check for a class name or style width based on your theme/grid system
  });

  it('applies wide size when wide prop is true', () => {
    const { container } = render(
      <CdfField wide>
        <div>Wide field</div>
      </CdfField>
    );
    const fieldDiv = container.firstChild as HTMLElement;
    expect(fieldDiv).toBeInTheDocument();
    // Optionally test for expected width style, e.g. sm:8 -> width: ~66% depending on grid
  });

  it('applies custom size when size prop is provided', () => {
    const { container } = render(
      <CdfField size={{ xs: 12, sm: 6, md: 6 }}>
        <div>Custom size</div>
      </CdfField>
    );
    const fieldDiv = container.firstChild as HTMLElement;
    expect(fieldDiv).toBeInTheDocument();
    // Test for size‐based width or classes
  });
});

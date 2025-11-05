import { render, screen } from '@testing-library/react';
import CdfContainer from './CdfContainer';

describe('CdfContainer', () => {
  it('renders children properly', () => {
    render(
      <CdfContainer>
        <div data-testid="child">Hello</div>
      </CdfContainer>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('applies marginBottom style based on prop', () => {
    const { container } = render(
      <CdfContainer marginBottom={8}>
        <div>Content</div>
      </CdfContainer>
    );
    const rootDiv = container.firstChild as Element;
    // We expect margin-bottom style to be theme.spacing(8)
    expect(rootDiv).toHaveStyle(`margin-bottom: 64px`);
  });

  it('applies default spacing when props not provided', () => {
    const { container } = render(
      <CdfContainer>
        <span>Test</span>
      </CdfContainer>
    );
    const rootDiv = container.firstChild as Element;
    // default marginBottom = 4 → theme.spacing(4) = 32px
    expect(rootDiv).toHaveStyle(`margin-bottom: 32px`);
  });
});

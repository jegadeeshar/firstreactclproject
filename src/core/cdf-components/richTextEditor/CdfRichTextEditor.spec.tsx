import React, { useEffect } from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';
import { CdfRichTextEditor } from './CdfRichTextEditor';
import { act } from 'react-dom/test-utils';

interface FormValues {
  test: string;
}

beforeAll(() => {
  HTMLElement.prototype.getClientRects = () => {
    const rect = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };

    return {
      length: 1,
      item: () => rect,
      [0]: rect,
      [Symbol.iterator]: function* () {
        yield rect;
      },
    } as unknown as DOMRectList;
  };

  HTMLElement.prototype.scrollIntoView = vi.fn();
});

const WrapperWithForm = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<FormValues>;
}) => {
  const methods = useForm<FormValues>();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>
        {children}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('CdfRichTextEditor', () => {
  it('renders uncontrolled mode without react-hook-form and shows label left aligned', () => {
    render(<CdfRichTextEditor name="test" value="<p>Initial content</p>" label="Test Label" />);
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe('label');

    // Label style checks
    expect(label).toHaveStyle({ textAlign: 'left', display: 'block' });

    // Toolbar button presence check (bold button)
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
  });

  it('renders controlled mode with react-hook-form context and shows label left aligned', () => {
    render(
      <WrapperWithForm>
        <CdfRichTextEditor name="test" value="<p>Initial content</p>" label="Controlled Label" />
      </WrapperWithForm>
    );
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();

    const label = screen.getByText('Controlled Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe('label');
    expect(label).toHaveStyle({ textAlign: 'left', display: 'block' });
  });

  it('shows validation error if required and empty on submit', async () => {
    const onSubmit: SubmitHandler<FormValues> = vi.fn();

    render(
      <WrapperWithForm onSubmit={onSubmit}>
        <CdfRichTextEditor name="test" value="" required label="Required Field" />
      </WrapperWithForm>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/test is required/i)).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('updates value and calls onSubmit with updated HTML', async () => {
    const onSubmit: SubmitHandler<FormValues> = vi.fn();

    const TestWrapper: React.FC<{ value: string }> = ({ value }) => {
      const methods: UseFormReturn<FormValues> = useForm<FormValues>({
        defaultValues: { test: value },
      });

      useEffect(() => {
        methods.setValue('test', value);
      }, [methods, value]);

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CdfRichTextEditor name="test" required label="Editor Label" />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    const { rerender } = render(<TestWrapper value="<p>Initial</p>" />);

    // Wait for initial content to appear
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveTextContent('Initial');
    });

    // Update the form value to new content
    rerender(<TestWrapper value="<p>Updated Content</p>" />);

    // Wait for editor to update and show new content (wait longer and use act)
    await act(async () => {
      await waitFor(
        () => {
          expect(screen.getByRole('textbox')).toHaveTextContent('Updated Content');
        },
        { timeout: 3000 }
      );
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { test: expect.stringContaining('Updated Content') },
        expect.anything()
      );
    });
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/components/UI/SearchBar';
import { describe, it, expect, vi } from 'vitest';

describe('SearchBar', () => {
  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search characters...');
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(handleChange).toHaveBeenCalledWith('Rick');
  });

  it('displays the correct value', () => {
      render(<SearchBar value="Morty" onChange={() => {}} />);
      const input = screen.getByDisplayValue('Morty');
      expect(input).toBeInTheDocument();
  });
});

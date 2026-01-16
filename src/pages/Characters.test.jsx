import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Characters from './Characters';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as useCharactersHook from '../hooks/useCharacters';

// Mock the hook
vi.mock('../hooks/useCharacters');

const mockData = {
  info: { count: 2, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      image: "image-url",
      location: { name: "Earth" }
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      image: "image-url",
      location: { name: "Earth" }
    }
  ]
};

describe('Characters Page', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

  it('renders loading state initially', () => {
    useCharactersHook.default.mockReturnValue({
      loading: true,
      error: null,
      data: { results: [], info: {} }
    });

    render(
      <BrowserRouter>
        <Characters />
      </BrowserRouter>
    );

    // Loader usually has some specific markup, or we check absence of chars
    // But better to check for Loader if it has text or specific role
    // My Loader is just a spinner. I can check for "Error" absence and "No characters" absence
    expect(screen.queryByText('Error loading characters.')).not.toBeInTheDocument();
    expect(screen.queryByText('No characters found.')).not.toBeInTheDocument();
  });

  it('renders characters when data is loaded', () => {
     useCharactersHook.default.mockReturnValue({
      loading: false,
      error: null,
      data: mockData
    });

    render(
      <BrowserRouter>
        <Characters />
      </BrowserRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('renders error state', () => {
     useCharactersHook.default.mockReturnValue({
      loading: false,
      error: { message: "Failed" },
      data: { results: [], info: {} }
    });

    render(
      <BrowserRouter>
        <Characters />
      </BrowserRouter>
    );

    expect(screen.getByText('Error loading characters.')).toBeInTheDocument();
  });
});

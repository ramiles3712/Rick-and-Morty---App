import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { describe, it, expect } from 'vitest';

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: { name: "Earth (Replacement Dimension)" }
};

describe('CharacterCard', () => {
  it('renders character information correctly', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText("Earth (Replacement Dimension)")).toBeInTheDocument();
  });
});

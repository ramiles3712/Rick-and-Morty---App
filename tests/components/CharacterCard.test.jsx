import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterCard from '../../src/components/UI/CharacterCard';
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

  it('renders correct status colors', () => {
    const aliveChar = { ...mockCharacter, status: 'Alive' };
    const deadChar = { ...mockCharacter, status: 'Dead' };
    const unknownChar = { ...mockCharacter, status: 'unknown' };

    const { unmount } = render(
        <BrowserRouter>
            <CharacterCard character={aliveChar} />
        </BrowserRouter>
    );
    expect(screen.getByText('Alive')).toHaveClass('bg-green-500');
    unmount();

    render(
        <BrowserRouter>
             <CharacterCard character={deadChar} />
        </BrowserRouter>
    );
    expect(screen.getByText('Dead')).toHaveClass('bg-red-500');
    
    // Test the unknown/default case
     render(
        <BrowserRouter>
             <CharacterCard character={unknownChar} />
        </BrowserRouter>
    );
    expect(screen.getByText('unknown')).toHaveClass('bg-gray-500');
  });
});

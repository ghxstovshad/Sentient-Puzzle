
import React from 'react';
import { TileData } from '../types';
import Tile from './Tile';

interface PuzzleGridProps {
    tiles: TileData[];
    onTileClick: (index: number) => void;
    selectedIndex: number | null;
    isSolved: boolean;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ tiles, onTileClick, selectedIndex, isSolved }) => {
    return (
        <div className="grid grid-cols-3 gap-2 p-2 bg-gray-900/30 rounded-xl shadow-2xl">
            {tiles.map((tile, index) => (
                <Tile
                    key={tile.id}
                    tileData={tile}
                    onClick={() => onTileClick(index)}
                    isSelected={selectedIndex === index}
                    isSolved={isSolved}
                />
            ))}
        </div>
    );
};

export default PuzzleGrid;

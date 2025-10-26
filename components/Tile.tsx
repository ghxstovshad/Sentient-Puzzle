
import React from 'react';
import { TileData } from '../types';

interface TileProps {
    tileData: TileData;
    onClick: () => void;
    isSelected: boolean;
    isSolved: boolean;
}

const Tile: React.FC<TileProps> = ({ tileData, onClick, isSelected, isSolved }) => {
    const tileClasses = `
        aspect-square rounded-lg cursor-pointer bg-cover bg-center
        transition-all duration-300 ease-in-out
        transform hover:scale-105 
        ${isSolved ? '' : `hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:z-10`}
        ${isSelected ? 'scale-95 ring-4 ring-white ring-offset-4 ring-offset-[#FF007A]' : 'shadow-md'}
    `;

    return (
        <div
            onClick={onClick}
            className={tileClasses}
            style={tileData.style}
        />
    );
};

export default Tile;

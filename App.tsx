import React, { useState, useEffect, useCallback } from 'react';
import { TileData } from './types';
import { GRID_SIZE, PUZZLE_IMAGE_URL } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import PuzzleGrid from './components/PuzzleGrid';
import SuccessModal from './components/SuccessModal';

const App: React.FC = () => {
    const [tiles, setTiles] = useState<TileData[]>([]);
    const [moves, setMoves] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isSolved, setIsSolved] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [bestMoves, setBestMoves] = useState<number | null>(null);
    const [bestTime, setBestTime] = useState<number | null>(null);

    const shuffle = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const initializeAndShuffle = useCallback(() => {
        const newTiles: TileData[] = [];
        const totalTiles = GRID_SIZE * GRID_SIZE;
        const backgroundSize = `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`;

        for (let i = 0; i < totalTiles; i++) {
            const row = Math.floor(i / GRID_SIZE);
            const col = i % GRID_SIZE;
            const xPos = (col / (GRID_SIZE - 1)) * 100;
            const yPos = (row / (GRID_SIZE - 1)) * 100;

            newTiles.push({
                id: i,
                style: {
                    backgroundImage: `url(${PUZZLE_IMAGE_URL})`,
                    backgroundSize: backgroundSize,
                    backgroundPosition: `${xPos}% ${yPos}%`,
                },
            });
        }
        setTiles(shuffle(newTiles));
        setMoves(0);
        setIsSolved(false);
        setSelectedIndex(null);
        setTimeElapsed(0);
        setStartTime(null);
    }, []);
    
    useEffect(() => {
      const loadedBestMoves = localStorage.getItem('bestMoves');
      if (loadedBestMoves) setBestMoves(parseInt(loadedBestMoves, 10));
      const loadedBestTime = localStorage.getItem('bestTime');
      if (loadedBestTime) setBestTime(parseInt(loadedBestTime, 10));

      const img = new Image();
      img.src = PUZZLE_IMAGE_URL;
      img.onload = () => {
        setIsLoaded(true);
        initializeAndShuffle();
      }
    }, [initializeAndShuffle]);

    useEffect(() => {
        let timerId: number;
        if (startTime && !isSolved) {
            timerId = window.setInterval(() => {
                setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [startTime, isSolved]);

    useEffect(() => {
        if (tiles.length === 0 || !isLoaded) return;
        
        const solved = tiles.every((tile, index) => tile.id === index);
        if (solved) {
            setIsSolved(true);
            if (bestMoves === null || moves < bestMoves) {
                setBestMoves(moves);
                localStorage.setItem('bestMoves', moves.toString());
            }
            if (bestTime === null || timeElapsed < bestTime) {
                setBestTime(timeElapsed);
                localStorage.setItem('bestTime', timeElapsed.toString());
            }
        }
    }, [tiles, isLoaded, moves, timeElapsed, bestMoves, bestTime]);

    const handleTileClick = (clickedIndex: number) => {
        if (isSolved) return;

        if (startTime === null) {
            setStartTime(Date.now());
        }

        if (selectedIndex === null) {
            setSelectedIndex(clickedIndex);
        } else {
            if (selectedIndex !== clickedIndex) {
                const newTiles = [...tiles];
                [newTiles[selectedIndex], newTiles[clickedIndex]] = [newTiles[clickedIndex], newTiles[selectedIndex]];
                setTiles(newTiles);
                setMoves(prevMoves => prevMoves + 1);
            }
            setSelectedIndex(null);
        }
    };
    
    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    if (!isLoaded) {
      return (
        <div className="min-h-screen bg-[#FF007A] flex items-center justify-center text-white text-2xl font-bold">
          Loading Puzzle...
        </div>
      );
    }

    return (
        <div className="min-h-screen bg-[#FF007A] text-white font-sans flex flex-col items-center pt-24 pb-20 px-4">
            <Header />
            
            <main className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
                <div className="w-full max-w-md bg-gray-900/30 p-4 rounded-xl shadow-lg flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="text-center">
                            <h4 className="text-sm uppercase tracking-wider text-white/70">Moves</h4>
                            <p className="font-bold text-2xl">{moves}</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-sm uppercase tracking-wider text-white/70">Time</h4>
                            <p className="font-bold text-2xl">{formatTime(timeElapsed)}</p>
                        </div>
                        <button
                            onClick={initializeAndShuffle}
                            className="bg-white text-[#FF007A] font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
                        >
                            Shuffle
                        </button>
                    </div>
                    <div className="border-t border-white/20 pt-4 flex justify-around items-center text-center">
                        <div className="flex-1">
                            <h4 className="text-sm uppercase tracking-wider text-white/70">Best Moves</h4>
                            <p className="font-bold text-2xl">{bestMoves ?? '---'}</p>
                        </div>
                         <div className="flex-1">
                            <h4 className="text-sm uppercase tracking-wider text-white/70">Best Time</h4>
                            <p className="font-bold text-2xl">{bestTime !== null ? formatTime(bestTime) : '---'}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md aspect-square">
                    <PuzzleGrid
                        tiles={tiles}
                        onTileClick={handleTileClick}
                        selectedIndex={selectedIndex}
                        isSolved={isSolved}
                    />
                </div>

                <div className="w-full max-w-sm bg-gray-900/30 p-4 rounded-xl shadow-lg">
                    <h3 className="text-center font-bold text-lg mb-2">Original Image</h3>
                    <img src={PUZZLE_IMAGE_URL} alt="Original Puzzle" className="rounded-lg w-full" />
                </div>
            </main>
            
            {isSolved && <SuccessModal onClose={initializeAndShuffle} moves={moves} time={timeElapsed} />}
            
            <Footer />
        </div>
    );
};

export default App;
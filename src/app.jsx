import React, { useState } from "react";
import Chessboard from "chessboardjsx";


export default function ChessMoveCalculator() {
  const [fen, setFen] = useState("start");
  const [sideToMove, setSideToMove] = useState("white");
  const [bestMove, setBestMove] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    setBestMove(null);

    const response = await fetch("http://localhost:8000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fen, side: sideToMove })
    });

    const data = await response.json();
    setBestMove(data.bestMove);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Point-Based Chess Move Calculator</h1>
      <div className="max-w-fit border rounded p-2 bg-white shadow">
        <Chessboard
          position={fen}
          onPositionChange={setFen}
          arePiecesDraggable
          boardWidth={400}
        />
      </div>

      <div className="flex gap-4 items-center mt-4">
        <label className="text-md">Side to move:</label>
        <select
          value={sideToMove}
          onChange={(e) => setSideToMove(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>

        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isCalculating ? "Calculating..." : "Calculate Best Move"}
        </button>
      </div>

      {bestMove && (
        <div className="text-lg font-medium text-green-700 mt-2">
          Best Move: {bestMove}
        </div>
      )}
    </div>
  );
}

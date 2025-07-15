import React, { useState } from "react";
import { Chessboard } from "react-chessboard";

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
    <div style={{ padding: "2rem" }}>
      <h2>Next Best Move Calculator</h2>
      <Chessboard position={fen} onPositionChange={setFen} />
      <br />
      <select value={sideToMove} onChange={(e) => setSideToMove(e.target.value)}>
        <option value="white">White to move</option>
        <option value="black">Black to move</option>
      </select>
      <br /><br />
      <button onClick={handleCalculate} disabled={isCalculating}>
        {isCalculating ? "Calculating..." : "Calculate Best Move"}
      </button>
      {bestMove && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Best Move:</strong> {bestMove}
        </div>
      )}
    </div>
  );
}

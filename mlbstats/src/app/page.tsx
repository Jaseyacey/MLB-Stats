"use client";
import { useState } from "react";
import styles from "./page.module.css";

// Updated Player type to match the API response structure
type Player = {
  rank: number;
  player_name: string;
  team: string;
  stat_value: string;
};

const statTypes = [
  "gamesPlayed",
  "groundOuts",
  "runs",
  "doubles",
  "triples",
  "homeRuns",
  "hits",
  "strikeOuts",
  "baseOnBalls",
  "caughtStealing",
  "stolenBases",
];

export default function Home() {
  const [data, setData] = useState<Player[] | null>(null);
  const [stat, setStat] = useState("");
  const [season, setSeason] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/data/${stat}/${season}`
      );
      const rawData = await response.json();
      console.log(rawData);
      // Convert the raw data into the desired structure
      const formattedData = rawData.map((item: any) => ({
        rank: item[0],
        player_name: item[1],
        team: item[2],
        stat_value: item[3],
      }));
      setData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>MLB Stats</h1>
      <p>Get the latest MLB stats here!</p>
      <p className={styles.text}>Enter the stat you want to see:</p>
      <ul className={styles.statText}>
        {statTypes.map((statType) => (
          <li key={statType}>
            <button
              onClick={() => setStat(statType)}
              className={stat === statType ? styles.activeStat : ""}
            >
              {statType}
            </button>
          </li>
        ))}
      </ul>
      <p>Enter the season you want to see stats for:</p>
      <input
        type="text"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      />
      <button className={styles.button} onClick={handleClick}>
        Get the Stats
      </button>
      {data && (
        <div>
          <h2>Results:</h2>
          <ul>
            {data.map((player) => (
              <>
                <li key={player.rank}>
                  {player.rank}.{player.player_name}({player.team}) -{" "}
                  {player.stat_value}
                </li>
                <br />
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

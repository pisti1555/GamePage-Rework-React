import { Game } from '../../../../../interfaces/Game';
import { GameStats } from '../../../../../interfaces/GameStats';
import css from './ProfileGameStats.module.css';

export default function ProfileGameStats({games, gameStats}: {games: Game[], gameStats: GameStats[]}) {
  return (
    <section className={css.playerGameData}>
      {gameStats.map(stat => {
        return (
          <div className={css.game}>
            {games.map(g => {
              if (g.id === stat.gameId) {
                return (
                  <>
                    <div className={css.imageContainer}>
                      <img src={g.thumbnailUrl} alt={g.name} />
                    </div>
                    <div className={css.gameData}>
                      <h2>{g.name}</h2>
                      <h3>Games played: {stat.played}</h3>
                      <h3>Games won: {stat.won}</h3>
                      <h3>Moves done: {stat.moves}</h3>          
                    </div>
                  </>
                );
              } else return null;
            })}
        </div>
        );
      })}
    </section>
  );
}
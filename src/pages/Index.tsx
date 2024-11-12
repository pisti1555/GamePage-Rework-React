import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="game-list">
            <Link to={"/fly-in-the-web"} className="game">
                <div className="img-container">
                    <img src="/images/thumbnails/fitw_thumbnail.jpg" />
                </div>
                <h3>Fly in the web</h3>
            </Link>
            <Link to={"/tic-tac-toe"} className="game">
                <div className="img-container">
                  <img src="/images/thumbnails/fitw_thumbnail.jpg" />
                </div>
                <h3>Tic - Tac - Toe</h3>
            </Link>
        </div>
  );
}
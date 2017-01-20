import React from 'react';
import Tile from '../Tile/tile';
import EmptyTile from '../Tile/empty_tile';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export default class Game extends React.Component {

  constructor() {
    super();
    const GAME_SIZE = 15;
    this.moveTileUp = this.moveTileUp.bind(this);
    this.moveTileDown = this.moveTileDown.bind(this);
    this.moveTileRight = this.moveTileRight.bind(this);
    this.moveTileLeft = this.moveTileLeft.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      won: false,
      tiles: [],
    };
  }

  componentWillMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    const tiles = this.makeGameArray();
    this.setState({ tiles });
  }

  makeGameArray() {
    let array = [];
    for (let i = 1; i <= 15; i += 1) {
      array.push(i);
    }
    array = shuffleArray(array);
    array.push(0);
    return array;
  }

  makeTiles() {
    const gameArray = this.state.tiles;
    const tiles = [];
    gameArray.forEach((num) => {
      if (num === 0) {
        tiles.push(<EmptyTile />);
      } else {
        tiles.push(<Tile number={num} />);
      }
    });
    return tiles;
  }

  handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.moveTileUp();
        break;
      case 'ArrowDown':
        this.moveTileDown();
        break;
      case 'ArrowRight':
        this.moveTileRight();
        break;
      case 'ArrowLeft':
        this.moveTileLeft();
        break;
      default:
        return;
    }
  }

  moveTileUp() {
    const emptyTileIndex = this.findEmptyTile();
    const tiles = this.state.tiles;
    if (emptyTileIndex > 3) {
      tiles[emptyTileIndex] = tiles[emptyTileIndex - 4];
      tiles[emptyTileIndex - 4] = 0;
      this.setState({ tiles });
    }
  }

  moveTileDown() {
    const emptyTileIndex = this.findEmptyTile();
    const tiles = this.state.tiles;
    if (emptyTileIndex <= 11) {
      tiles[emptyTileIndex] = tiles[emptyTileIndex + 4];
      tiles[emptyTileIndex + 4] = 0;
      this.setState({ tiles });
    }
  }

  moveTileLeft() {
    const emptyTileIndex = this.findEmptyTile();
    const tiles = this.state.tiles;
    if (emptyTileIndex % 4 !== 0) {
      tiles[emptyTileIndex] = tiles[emptyTileIndex - 1];
      tiles[emptyTileIndex - 1] = 0;
      this.setState({ tiles });
    }
  }

  moveTileRight() {
    const emptyTileIndex = this.findEmptyTile();
    const tiles = this.state.tiles;
    if (![3, 7, 11, 15].includes(emptyTileIndex)) {
      tiles[emptyTileIndex] = tiles[emptyTileIndex + 1];
      tiles[emptyTileIndex + 1] = 0;
      this.setState({ tiles });
    }
  }

  findEmptyTile() {
    const tiles = this.state.tiles;
    for (let i = 0; i < tiles.length; i += 1 ) {
      if (tiles[i] === 0) {
        return i;
      }
    }
  }

  render() {
    const tiles = this.makeTiles();
    return (
      <div className="board" onKeyDown={this.handleKeyPress}>
        {tiles}
      </div>
    );
  }

}

export default function CalculateWinner(squares) { //Menyimpan keadaan board nya atau array squares.
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
  
    for(let i = 0; i < lines.length; i++){
      // const a = lines[i][0]; // 0
      // const b = lines[i][1]; // 1
      // const c = lines[i][2]; // 2, Ketiga baris ini kurang rapih, jika ingin rapih pakai teknik destructuring.
      const [a, b, c] = lines[i];
      // Misal keadaan : ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      if(squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
        return squares[a];
      }
    }
    return false;
  }
/* eslint-disable react/prop-types */
import Square from "./Square";
import CalculateWinner from "./CalculateWinner";

export default function Board({xIsNext, squares, onPlay}) {

    function handleClick(i) {
      if(squares[i] || CalculateWinner(squares)) return; // Agar jika sudah terisi, tidak bisa diubah lagi.
      const nextsquares = squares.slice();
      nextsquares[i] = (xIsNext) ? 'X' : 'O'; // Ini pakai ternary, if else juga bisa.
      // setsquares(nextsquares); // Setelah sampai di sini, error banyak di console dengan tulisan 'too many re-renders'. Artinya karena ada function yang otomatis jalan yaitu handelClick(). Ini disebabkan karena ada nya kurung '()' yang membuat function otomatis jalan atau tidak menunggu diclick dulu. Jika dihapus, kita juga perlu parameter untuk dikirim ke function nantinya atau ketika function dipanggil. Nah supaya tidak langsung dieksekusi, harus dibungkus ke dalam function, biasanya dibungkus ke anonymus function. Tapi supaya jadi gampang atau jadi satu baris, dibungkus pakai arrow function aja.
      // setXIsNext(!xIsNext);
      // setsquares(netsquares) dan setXIsNext(!xIsNext) tidak dipakai lagi, karena akan diambil dari function onPlay.
      onPlay(nextsquares);
    }
  
    const winner = CalculateWinner(squares);
    // console.log(winner); // Cek hingga ada yang menang
    let status = '';
    // if(winner) {
    //   status = 'Winner : ' + winner;
    // }
    // else {
    //   status = 'Next Player : ' + (xIsNext ? 'X' : 'O');
    // }
    status = winner ? 'Winner!!! : ' + winner + ' 🎉' : 'Next Player : ' + (xIsNext ? 'X' : 'O'); // Bentuk ternary dari kondisi di atas.
  
    return (
      <>
        <div className='status'>{status}</div>
        <div className='board'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> {/*Ini tuh ibarat props*/}
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} /> 
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </>
    );
  }
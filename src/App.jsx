/* eslint-disable react/prop-types */
import { useState } from 'react'
import Board from './components/Board';
import Footer from './components/Footer';

export default function Game() { //Berisi banyak keadaan dari board, board menyimpan keadaan dari squares. Ibarat gitu tujuan dari lifting state up.
  // const [xIsNext, setXIsNext] = useState(true); //Dikeep karena penjelasan line syntax : 'setXIsNext(!xIsNext);'
  const [history, setHistory] = useState([Array(9).fill(null)]); //Yang sebelumnya diisi (Array(9).fill(null)) ini untuk mengisi suatu array, sedangkan di sini untuk mengisi array di dalam array, karena ibarat dari game kan ke -> board -> squares. Maka dikasih aja array nya pakai [].
  //Gambaran : 
  //[
  //  [null, null, null, null, null, null, null, null, null]; 
  //  ['X'', null, null, null, null, null, null, null, null]; misal diclick array[0] nya nanti begini, makanya array di dalam array gitu.
  //]
  const [currentMove, setCurrentMove] = useState(0); //State untuk menentukan sekarang kita lagi ada di move ke berapa. Sehingga jika kita ingin loncat ke move sebelumnya, kita punya penyimpanan nya.
  // const currentSquares = history[history.length - 1]; //Untuk simpan keadaan terakhir
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; //Di atas diganti dengan ini, karena simpan nya bukan keadaan akhir lagi, tetapi currentMove nya atau berada di move ke-berapa gitu.
  
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); //Berikutnya kita akan tentukan giliran nya. Move genap itu pasti 'X', dan ganjil 'O'. Maka cek pakai modulus genap aja.
    // setXIsNext(nextMove % 2 === 0); //Dikeep karena alasan berkesinambungan dari (!XIsNext) itu dan const[xIsNext, setXIsNext] gitu lah.
  }

  function handlePlay(nextSquares) { //Sebagai props dari boardnya, jadi board punya 2 props. Ke-1 itu giliran siapa, Ke-2 itu keadaan di board nya seperti apa. Ke-3 fungsi handlePlay nya tujuan nya saat diclick board nya melakukan apa.
    // setHistory([...history, nextSquares]); //...history itu meng-copy array. Lalu nextSquares itu menambahkan array baru diakhirnya. Nah kemudian dikirim ke handlePlay(nextSquares). 
    // //Tujuan setHistory itu untuk memasukkan keadaan saat ini yang dikirim dari board 'onPlay(nextSquares)' ke array baru atau ditumpuk gitu tiap diclick, yang ditangkap dulu oleh handlePlay(nextSquares). 
    // setHistory lama dikeep aja, karena sekarang array nya bukan bergerak maju aja, bisa ke kondisi sebelumnya atau mundur. Maka, dislice dari array 0 hingga currentMove + 1 atau kita click di pergerakan ke-berapa. Ibaratnya gitu.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); //Karena ketika mundur sisanya ilang kan (yang ilang isi content dari board nya), maka isinya currentMove nya yaitu nextistory.length - 1.
    // setXIsNext(!xIsNext); //Ini dikeep karena giliran nya sudah tidak perlu lagi ditentukan giliran siapa gitu nya. Sudah bisa dientukan dari kita berada dimove ke berapa (genap pasti 'X', ganjil pasti 'O').
  }

  const moves = history.map((squares, move) => {
    let description= ''; //Buat text untuk tombolnya
    if(move > 0) {
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to game start!';
    }

    return ( //Ini untuk dimasukkan ke dalam ol, jadi di dalam ul akan banyak li. Dilooping li nya.
      <li key={move}> {/*Kalau looping li tuh harus dikasih key yang unik, kita pakai saja move karena dia pasti tidak ada yang sama juga nilainya. */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );

  });//Ini tuh ibarat pengen ditransformasi keadaan history sebelumnya menjadi tombol. Jadi tombol tuh nyimpan keadaan saat diclick. Jumlah tombol = jumlah diclick = jumlah array nya.

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> {/*Di sini (nambahin propsnya) bisa langsung handlePlay karena tidak pakai parameter si function nya, kalau pake maka harus make arrow function di props nya. */}
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <Footer />
    </div>
  )
}
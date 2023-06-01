import { Sudokku } from './Sudokku.js';
import { UIHandler } from './UIHandler.js';

const container = document.getElementById('content');
const game = new Sudokku();

////////////////////////////////////////////////////////////////

function DrawBoard()
{
    if (game)
    {
        let i=1;
        for (let x=0; x<game.size; x++)
        {
            const row = document.createElement('DIV');
            row.classList.add('row');
            row.dataset.rowid = x;
            for (let y=0; y<game.size; y++ )
            {
                const cell = document.createElement('DIV');
                cell.classList.add('cell');
                cell.id = 'cell-' + i;
                cell.dataset.endvalue = game.matrix[x][y] ? game.matrix[x][y] : 0;
                cell.dataset.tempvalue = game.matrix[x][y] ? game.matrix[x][y] : 0;
                cell.dataset.shown = '1';
                const span = document.createElement('SPAN');
                span.innerHTML = game.matrix[x][y] ? game.matrix[x][y] : 0;
                cell.appendChild(span);
                cell.addEventListener('click', () => {
                    console.log(cell.id + ' endvalue: ' + cell.dataset.endvalue + ' tempvalue: ' + cell.dataset.tempvalue);
                });
                row.appendChild(cell);
                i++;
            }
            container.appendChild(row);
        }
    }
}

function HideCells(num)
{
    const cells = Array.from(document.getElementsByClassName('cell'));
    let hidden = [];
    let i=0;
    while (i<num)
    {
        let rnd = Math.floor(Math.random() * 82);
        if (!hidden.includes(rnd)) 
        {
            hidden.push(rnd);
            i++;
        }
    }
   
    for (let c=0; c<cells.length; c++)
    {
        if (hidden.includes(c)) 
        {
            cells[c].firstChild.innerHTML = ''; 
            cells[c].dataset.tempvalue = '0';
            cells[c].dataset.shown = '0';
            cells[c].classList.add('hidden');
        }
    }
    console.log(hidden);
}

game.fillSquare(0,0);
game.fillSquare(3,3);
game.fillSquare(6,6);
game.fillUnfilled(0, game.sqrt);
DrawBoard();
HideCells(50);

const UI = new UIHandler();

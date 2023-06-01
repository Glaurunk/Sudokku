export class Sudokku
{
    constructor() 
    {
        this.size = 9;
        this.sqrt = 3;
        this.matrix = [[0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]];
    }
    
    randomGenerator(num) {
        return Math.floor(Math.random() * num + 1);
    }

    //used to fill the 3 diagonal boxes
    fillSquare(row,col)
    {
        let num = 0;
        for (let x = 0; x < this.sqrt; x++) 
        {
            for (let y = 0; y < this.sqrt; y++) 
            {
                while (true) 
                {
                    num = this.randomGenerator(this.size);
                    if (this.checkIfInSquare(row,col,num) ) 
                    {
                        break;
                    }
                }
                this.matrix[row + x][col + y] = num;
            }
        }
    }

    fillUnfilled(x,y)
    {
        // Check if we have reached the end of the matrix
        if (x === this.size - 1 && y === this.size) {
            return true;
        }
        // Move to the next row if we have reached the end of the current row
        if (y === this.size) {
            x += 1;
            y = 0;
        }
        // Skip cells that are already filled
        if (this.matrix[x][y] !== 0) {
            return this.fillUnfilled(x, y + 1);
        }
        // Try filling the current cell with a valid value
        for (let num = 1; num <= this.size; num++) {
            if (this.checkIfSafe(x, y, num)) {
                this.matrix[x][y] = num;
                if (this.fillUnfilled(x, y + 1)) {
                    return true;
                }
                this.matrix[x][y] = 0;
            }
        } 
        // No valid value was found, so backtrack
        return false;
    }
    
    checkIfInRow(row,num)
    {
        for (let x = 0; x < this.size; x++) 
        {
            if (this.matrix[row][x] === num) 
            {
                return false;
            }
        }
        return true;
    }

    checkIfInColumn(col,num)
    {
        for (let y = 0; y < this.size; y++) 
        {
            if (this.matrix[y][col] === num) 
            {
                return false;
            }
        }
        return true;
        
    }

    checkIfInSquare(row,col,num)
    {
        for (let x = 0; x < this.sqrt; x++) {
            for (let y = 0; y < this.sqrt; y++) {
                if (this.matrix[row + x][col + y] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    checkIfSafe(x, y, num) {
        return (
            this.checkIfInRow(x, num) &&
            this.checkIfInColumn(y, num) &&
            this.checkIfInSquare(x - (x % this.sqrt), y - (y % this.sqrt), num)
        );
    }

}





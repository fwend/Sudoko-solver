function sudoku(grid) {
    const base = 9;
    const total = base * base;
    const subw = 3;
    const subh = 3;

    function solve(pos) {
        if (pos === total) {
            return true;
        }

        const col = pos % base;
        const row = Math.floor(pos / base);

        if (grid[row][col] !== 0) {
            return solve(pos + 1);
        }

        outer:
        for (let n = 1; n < base + 1; n++) {
            // check the columns and rows
            for (let i = 0; i < base; i++) {
                if (grid[i][col] === n || grid[row][i] === n) {
                    continue outer;
                }
            }

            // check the subsquares
            const sc = Math.floor(col / subw) * subw;
            const sr = Math.floor(row / subh) * subh;
            for (let r = sr; r < sr + subh; r++) {
                for (let c = sc; c < sc + subw; c++) {
                    if (grid[r][c] === n) {
                        continue outer;
                    }
                }
            }

            grid[row][col] = n;
            if (solve(pos + 1)) {
                return true;
            }
            grid[row][col] = 0;  // backtrack
        }
        return false;
    }

    if (!solve(0)) {
        return "no solution found";
    }
    return grid;
}
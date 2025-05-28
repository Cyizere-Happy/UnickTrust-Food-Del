const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const { Random } = require("random");

const path = "./data.json";
const random = new Random(); // Initialize Random properly

const makeCommits = (n) => {
    if (n === 0) {
        return simpleGit().push();
    }
    
    const x = random.int(0, 54);
    const y = random.int(0, 6);
    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .add(x, "w")
        .add(y, "d") // Use y for days
        .format();
    
    const data = {
        date: date,
    };
    
    console.log(`Commit ${n}: ${date}`);
    
    jsonfile.writeFile(path, data, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        
        simpleGit()
            .add([path])
            .commit(date, { '--date': date })
            .then(() => {
                // Recursive call with decremented n
                makeCommits(n - 1);
            })
            .catch((error) => {
                console.error("Git error:", error);
            });
    });
};

// Start with the number of commits you want
makeCommits(5);
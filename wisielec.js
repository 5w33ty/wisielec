const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const solutions = ["SLAMAR", "SWEETY", "BIKER", "FALCON", "UNKNOWN"];
const solution =
  solutions[Math.floor(Math.random() * solutions.length)].split("");
// console.log(solution);
let dude_level = 1;

const table = document.getElementById("letters");
let letterID = 0;
for (let y = 0; y < 5; y++) {
  const tr = document.createElement("tr");
  for (let x = 0; x < 5; x++) {
    const td = document.createElement("td");
    td.innerText = alphabet[letterID];
    td.setAttribute("onclick", `testLetter('${alphabet[letterID]}')`);
    td.setAttribute("id", `${alphabet[letterID]}`);
    tr.appendChild(td);
    letterID += 1;
  }
  table.appendChild(tr);
}

const tr_pass = document.getElementById("resolved");
for (let i = 0; i < solution.length; i += 1) {
  const td = document.createElement("td");
  const img = document.createElement("img");
  img.setAttribute("src", "./img/underscore.png");
  td.appendChild(img);
  tr_pass.appendChild(td);
}

function putLetters(letter) {
  const kreski = document.querySelectorAll("#resolved td");
  let full = false;
  for (let i = 0; i < solution.length; i += 1) {
    if (letter === solution[i]) {
      kreski[i].innerText = letter;
    }
  }
  for (let y = 0; y < solution.length; y += 1) {
    if (kreski[y].innerText !== solution[y]) {
      full = false;
      break;
    } else {
      full = true;
    }
  }
  if (full) document.getElementById("message").innerText = "Wygrana";
}

function testLetter(letter) {
  let lives = document.getElementById("lives");
  console.log(letter);
  let miss = true;
  const hangedman = document.getElementById("ziomek");
  for (let i = 0; i < solution.length; i++) {
    if (letter === solution[i]) {
      miss = false;
      putLetters(letter);
      document.getElementById(`${letter}`).setAttribute("class", "good");
    }
  }
  // one line if
  if (miss) {
    lives.innerText -= 1;
    dude_level += 1;
    ziomek.setAttribute("src", `./img/${dude_level}.png`);
    document.getElementById(`${letter}`).setAttribute("class", "bad");
  }
  if (lives.innerText < 1) {
    document.getElementById("message").innerText = "Przegrana";
    // setTimeout(function () {
    //   location.reload();
    // }, 10000);
  }

  //   solution.forEach((l)=>{
  //   if(letter === l) {
  //     alert("widze go 2gi raz");
  //   }
  // })

  console.log(solution.includes(letter));

  const araj = solution.filter((l) => {
    return l === letter;
  });
  console.log(araj.length);
}

function checkLetter(letter) {}

// void
/* function tableCreate() {
  // get from website element with id letters
  const table = document.getElementById('letters');
  // create tag sweety for website with inner text
  const td = document.createElement('td')
  td.innerText='wygrałeś sweety';
  // put object sweety (html tag sweety) on website
  table.appendChild(td)
} */
//   table.setAttribute('border', '1');
//   for (const i = 0; i < 5; i++) {
//     var tr = document.createElement('tr');
//     for (const j = 0; j < 3; j++) {
//       if (i == 2 && j == 1) {
//         break
//       } else {
//         const td = document.createElement('td');
//         td.innerText=1;
//         tr.appendChild(td)
//       }
//     }
//     table.appendChild(tr);
//   }
//   body.appendChild(table)
// }
// function insertPhoto() {
//   const table = document.getElementById('photo');
//   const photo2 = document.createElement('img');
//   photo2.setAttribute('src','./img/2.png')
//   table.appendChild(photo2)
// }
//tableCreate();
// insertPhoto();

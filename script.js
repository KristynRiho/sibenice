let lengthOfRiver;
let numberOfAttempts;
let river;
let counter = 0;

/** Skrytí názvu řeky */
document.querySelector('p').style.display = 'none';
document.querySelector('.letter').style.display = 'none';
document.querySelector('.result').style.display = 'none';

/*** spustení nové hry */
document.querySelector('button').addEventListener('click', function () {
  let rivers = [
    ['L', 'A', 'B', 'E'],
    ['V', 'L', 'T', 'A', 'V', 'A'],
  ];
  river = rivers[Math.floor(Math.random() * rivers.length)];
  console.log(river);

  document.querySelector('p').textContent = river;
  document.querySelector('.letter').style.display = 'block';

  lengthOfRiver = river.length;
  numberOfAttempts = Math.ceil(lengthOfRiver * 1.5);
  document.querySelector('.attempts').textContent = numberOfAttempts;

  let riverLettersToDisplay = [];
  for (let i = 0; i < lengthOfRiver; i++) {
    riverLettersToDisplay[i] = '_';
  }
  riverLettersToDisplay = riverLettersToDisplay.join('');
  document.querySelector('p').style.display = 'block';
  document.querySelector('p').textContent = riverLettersToDisplay;
});

/*** písmena */
document.body.addEventListener('keydown', function (even) {
  let pismeno = even.key.toLocaleUpperCase();
  document.querySelector('.result').style.display = 'block';
  counter++;

  /** proč tato část musí být znovu tady vlozená?, proc to nestačí nahoře, proč když je tato část jen nahoře, tak mi to pak tady hlásí, ze je riverLettersToDisplay undefined? */
  let riverLettersToDisplay = [];
  for (let i = 0; i < lengthOfRiver; i++) {
    riverLettersToDisplay[i] = '_';
  }

  if (numberOfAttempts === counter) {
    document.querySelector('.result').textContent =
      'Smůla, prohrál(a) jsi, tvé pokusy jsou vyčerpány!';
  } else {
    if (river.includes(pismeno) === true) {
      document.querySelector('.result').textContent =
        'Trefa, název řeky toto písmeno obsahuje!';

      document.querySelector('p').style.display = 'block';
      document.querySelector('p').textContent = riverLettersToDisplay;

      let indexOfLetter = river.indexOf(pismeno);
      console.log(indexOfLetter);
      let pismenoDisplay = river[indexOfLetter];
      console.log(pismenoDisplay);

      riverLettersToDisplay[indexOfLetter] = pismenoDisplay;

      console.log(riverLettersToDisplay);
      let riverLettersToDisplayAsString = riverLettersToDisplay.join('');
      document.querySelector('p').textContent = riverLettersToDisplayAsString;
    } else {
      document.querySelector('.result').textContent =
        'Toto písmeno bohužel v názvu řeky není, zkus jiné!';
    }
  } /* let listOfLetters = [];
else if (listOfLetters.includes(pismeno) === true) {
        document.querySelector(".result").textContent = "Toto písmeno jsi už zadával(a), zkus jiné!"
        listOfLetters.push(pismeno);
        break;*/
});

'use strict';
// globální proměnné ****************************
let river = '';
let riverWithoutLetters;
let numberOfAttempts;
let i = 0;

// funkce *********************************************

//fce na získání indexu písmena
const indexOfLetter = (array, char) => {
  return array.indexOf(char);
};

//fce která nahradí prázdné místo v poli zadaným písmenem na odpovídajícím indexu z pole s názvem řeky - funční pouze pro dvě stejná písmena v názvu
const replaceLetterInEmptyArray = (arrayWithRiver, arrayEmpty, char) => {
  let indexPismena = arrayWithRiver.indexOf(char);
  arrayEmpty[indexPismena] = char;
  let riverSliced = arrayWithRiver.slice(indexPismena + 1); //uřízne zbytek slova

  arrayEmpty[
    indexOfLetter(riverSliced, char) + (indexPismena + 1) // nahradí druhý výskyt písmena
  ] = char;
  return arrayEmpty;
};

/** Skrytí názvu řeky */
document.querySelector('p').style.display = 'none';
document.querySelector('.letter').style.display = 'none';
document.querySelector('.result').style.display = 'none';

/*** spustení nové hry */
document.querySelector('button').addEventListener('click', function () {
  const rivers = [
    'Labe',
    'Vltava',
    'Malše',
    'Svratka',
    'Nežárka',
    'Sázava',
    'Ohře',
    'Lužnice',
    'Jizera',
    'Dyje',
    'Berounka',
    'Morava',
    'Vydra',
  ];
  river = rivers[Math.floor(Math.random() * rivers.length)];
  river = river.toUpperCase();
  console.log(river);

  document.querySelector('p').textContent = river;
  document.querySelector('.letter').style.display = 'block';

  const lengthOfRiverName = river.length;
  numberOfAttempts = Math.ceil(lengthOfRiverName * 1.5);
  document.querySelector('.attempts').textContent = numberOfAttempts + 1;
  console.log(lengthOfRiverName);
  console.log(numberOfAttempts);

  riverWithoutLetters = [];
  console.log(riverWithoutLetters);
  for (let i = 0; i < lengthOfRiverName; i++) {
    riverWithoutLetters.push('_');
  }
  let displayLetters = riverWithoutLetters.join(' ');
  document.querySelector('p').style.display = 'block';
  document.querySelector('p').textContent = displayLetters;
  document.querySelector('.result').style.display = 'none';
  i = 0;
});

/*** písmena */

document.body.addEventListener('keyup', (even) => {
  let letter = even.key.toLocaleUpperCase();
  document.querySelector('.result').style.display = 'block';

  if (i === numberOfAttempts) {
    document.querySelector(
      '.result',
    ).textContent = `Hra skončila, již nemáš žádné pokusy! Hledaná řeka byla ${river}`;
    document.querySelector('p').textContent = 'GAME OVER :-(';
  } else if (i > numberOfAttempts) {
    document.querySelector(
      '.result',
    ).textContent = `Jestli chceš hrát znova, klikni na tlačítko "Nová hra"`;
  } else {
    if (riverWithoutLetters.includes('_') === false) {
      document.querySelector('.result').textContent =
        'Gratuluji, uhodl jsi název řeky!';
      i = i + 20;
    } else if (riverWithoutLetters.includes('_')) {
      if (river.includes(letter)) {
        document.querySelector('.result').textContent =
          'Trefa, název řeky toto písmeno obsahuje!';
        riverWithoutLetters = replaceLetterInEmptyArray(
          river,
          riverWithoutLetters,
          letter,
        );
        document.querySelector('p').textContent = riverWithoutLetters.join(' ');
      } else {
        document.querySelector('.result').textContent =
          'Bohužel zadané písmeno není v názvu, zkus jiné';
        document.querySelector('p').textContent = riverWithoutLetters.join(' ');
      }
    }
  }
  i++;
});

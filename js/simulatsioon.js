var mastid = ["artu", "poti", "risti", "ruutu"];
var vaartused = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "poiss", "emand", "kuningas", "ass"];
var pakk = [];

var mangijaKaed = [];
var panused = [];
var praeguneKasi = 0;

var diileriKaardid = [];
var diileriKaartPeidus = true;

var raha = 500;
var mangKaib = false;
var nupudLukus = false;
var jagamiseSamm = 0;

function teePakk() {
    pakk = [];
    for (var i = 0; i < mastid.length; i++) {
        for (var j = 0; j < vaartused.length; j++) {
            pakk.push(mastid[i] + "_" + vaartused[j]);
        }
    }
}

function segaPakk() {
    for (var i = 0; i < pakk.length; i++) {
        var j = Math.floor(Math.random() * pakk.length);
        var ajutine = pakk[i];
        pakk[i] = pakk[j];
        pakk[j] = ajutine;
    }
}

function votaKaart() {
    return pakk.pop();
}

function kaardiVaartus(kaart) {
    return kaart.split("_")[1];
}

function arvutaPunktid(kaardid) {
    var punktid = 0;
    var assad = 0;

    for (var i = 0; i < kaardid.length; i++) {
        var vaartus = kaardiVaartus(kaardid[i]);

        if (vaartus == "ass") {
            punktid = punktid + 11;
            assad = assad + 1;
        } else if (vaartus == "poiss" || vaartus == "emand" || vaartus == "kuningas") {
            punktid = punktid + 10;
        } else {
            punktid = punktid + parseInt(vaartus);
        }
    }

    while (punktid > 21 && assad > 0) {
        punktid = punktid - 10;
        assad = assad - 1;
    }

    return punktid;
}

function naitaPunkte() {
    var mangijaTekst = "Sina";
    if (mangijaKaed.length > 0 && mangijaKaed[0].length > 0) {
        mangijaTekst = "Sina: ";
        for (var k = 0; k < mangijaKaed.length; k++) {
            if (k > 0) {
                mangijaTekst += " / ";
            }
            mangijaTekst += arvutaPunktid(mangijaKaed[k]);
        }
    }
    document.getElementById("mangijaPunktid").innerHTML = mangijaTekst;

    var diileriTekst = "Diiler";
    if (diileriKaardid.length > 0) {
        if (diileriKaartPeidus == true) {
            diileriTekst = "Diiler: " + arvutaPunktid([diileriKaardid[0]]);
        } else {
            diileriTekst = "Diiler: " + arvutaPunktid(diileriKaardid);
        }
    }
    document.getElementById("diileriPunktid").innerHTML = diileriTekst;
}

function naitaKaarte() {
    var diilerDiv = document.getElementById("diileriKaardid");
    var mangijaDiv = document.getElementById("mangijaKaardid");
    diilerDiv.innerHTML = "";
    mangijaDiv.innerHTML = "";

    naitaPunkte();

    for (var k = 0; k < mangijaKaed.length; k++) {
        var klass = "kasi";
        if (mangijaKaed.length > 1 && k == praeguneKasi && mangKaib == true) {
            klass = "kasi aktiivne";
        }

        var html = '<div class="' + klass + '">';
        for (var i = 0; i < mangijaKaed[k].length; i++) {
            html += '<img src="img/kaardid/' + mangijaKaed[k][i] + '.png">';
        }
        html += '</div>';
        mangijaDiv.innerHTML += html;
    }

    if (diileriKaardid.length == 0) {
        return;
    }

    if (diileriKaartPeidus == true) {
        diilerDiv.innerHTML += '<img src="img/kaardid/' + diileriKaardid[0] + '.png">';
        if (diileriKaardid.length > 1) {
            diilerDiv.innerHTML += '<img src="img/kaardid/tagakulg.png">';
        }
    } else {
        for (var i = 0; i < diileriKaardid.length; i++) {
            diilerDiv.innerHTML += '<img src="img/kaardid/' + diileriKaardid[i] + '.png">';
        }
    }
}

function uuendaRaha() {
    document.getElementById("raha").innerHTML = raha + "$";
}

function naitaTeadet(tekst) {
    document.getElementById("teade").innerHTML = tekst;
}

var nupuPanused = [10, 25, 50, 100];

function naitaNuppe() {
    if (mangKaib == true) {
        document.getElementById("nupp1").innerHTML = "Hit";
        document.getElementById("nupp2").innerHTML = "Split";
        document.getElementById("nupp3").innerHTML = "Double";
        document.getElementById("nupp4").innerHTML = "Stand";
    } else {
        document.getElementById("nupp1").innerHTML = nupuPanused[0] + "$";
        document.getElementById("nupp2").innerHTML = nupuPanused[1] + "$";
        document.getElementById("nupp3").innerHTML = nupuPanused[2] + "$";
        document.getElementById("nupp4").innerHTML = nupuPanused[3] + "$";
    }
}

function nupp1() {
    if (nupudLukus == true) {
        return;
    }
    if (mangKaib == true) {
        hit();
    } else {
        jaga(nupuPanused[0]);
    }
}

function nupp2() {
    if (nupudLukus == true) {
        return;
    }
    if (mangKaib == true) {
        split();
    } else {
        jaga(nupuPanused[1]);
    }
}

function nupp3() {
    if (nupudLukus == true) {
        return;
    }
    if (mangKaib == true) {
        double();
    } else {
        jaga(nupuPanused[2]);
    }
}

function nupp4() {
    if (nupudLukus == true) {
        return;
    }
    if (mangKaib == true) {
        stand();
    } else {
        jaga(nupuPanused[3]);
    }
}

function jaga(panus) {
    if (raha < nupuPanused[0]) {
        raha = 500;
        uuendaRaha();
    }

    if (panus > raha) {
        alert("Sul ei ole nii palju raha!");
        return;
    }

    raha = raha - panus;
    uuendaRaha();

    teePakk();
    segaPakk();
    mangijaKaed = [[]];
    panused = [panus];
    praeguneKasi = 0;
    diileriKaardid = [];
    diileriKaartPeidus = true;
    mangKaib = true;
    naitaTeadet("");

    nupudLukus = true;
    naitaNuppe();

    jagamiseSamm = 0;
    jagaKaart();
}

function jagaKaart() {
    if (jagamiseSamm == 0 || jagamiseSamm == 2) {
        mangijaKaed[0].push(votaKaart());
    } else {
        diileriKaardid.push(votaKaart());
    }
    naitaKaarte();

    jagamiseSamm = jagamiseSamm + 1;

    if (jagamiseSamm < 4) {
        setTimeout(jagaKaart, 800);
    } else {
        nupudLukus = false;
        kontrolliBlackjack();
    }
}

function kontrolliBlackjack() {
    var panus = panused[0];
    var mangijaPunktid = arvutaPunktid(mangijaKaed[0]);
    var diileriPunktid = arvutaPunktid(diileriKaardid);

    if (mangijaPunktid == 21 || diileriPunktid == 21) {
        mangKaib = false;
        diileriKaartPeidus = false;

        if (mangijaPunktid == 21 && diileriPunktid == 21) {
            raha = raha + panus;
            naitaTeadet("Mõlemal on blackjack! Viik.");
        } else if (mangijaPunktid == 21) {
            raha = raha + panus + panus * 1.5;
            naitaTeadet("BLACKJACK! Võitsid " + (panus * 1.5) + "$");
        } else {
            naitaTeadet("Diileril on blackjack. Kaotasid.");
        }

        lopeta();
    }
}

function hit() {
    if (mangKaib == false) {
        return;
    }

    var kasi = mangijaKaed[praeguneKasi];
    kasi.push(votaKaart());
    naitaKaarte();

    if (arvutaPunktid(kasi) >= 21) {
        jargmineKasi();
    }
}

function stand() {
    if (mangKaib == false) {
        return;
    }
    jargmineKasi();
}

function double() {
    if (mangKaib == false) {
        return;
    }

    var kasi = mangijaKaed[praeguneKasi];

    if (kasi.length != 2) {
        alert("Double saab teha ainult kahe kaardiga!");
        return;
    }
    if (raha < panused[praeguneKasi]) {
        alert("Sul ei ole double tegemiseks piisavalt raha!");
        return;
    }

    raha = raha - panused[praeguneKasi];
    panused[praeguneKasi] = panused[praeguneKasi] * 2;
    uuendaRaha();

    kasi.push(votaKaart());
    naitaKaarte();
    jargmineKasi();
}

function split() {
    if (mangKaib == false) {
        return;
    }

    var kasi = mangijaKaed[0];

    if (mangijaKaed.length > 1) {
        alert("Splitti saab teha ainult ühe korra!");
        return;
    }
    if (kasi.length != 2 || arvutaPunktid([kasi[0]]) != arvutaPunktid([kasi[1]])) {
        alert("Splitti saab teha ainult siis kui mõlemal kaardil on sama väärtus!");
        return;
    }
    if (raha < panused[0]) {
        alert("Sul ei ole spliti tegemiseks piisavalt raha!");
        return;
    }

    raha = raha - panused[0];
    uuendaRaha();

    var esimeneKasi = [kasi[0], votaKaart()];
    var teineKasi = [kasi[1], votaKaart()];
    mangijaKaed = [esimeneKasi, teineKasi];
    panused = [panused[0], panused[0]];
    praeguneKasi = 0;

    naitaKaarte();

    if (arvutaPunktid(mangijaKaed[0]) == 21) {
        jargmineKasi();
    }
}

function jargmineKasi() {
    praeguneKasi = praeguneKasi + 1;

    if (praeguneKasi < mangijaKaed.length) {
        naitaKaarte();
        if (arvutaPunktid(mangijaKaed[praeguneKasi]) == 21) {
            jargmineKasi();
        }
    } else {
        diileriKaik();
    }
}

function diileriKaik() {
    mangKaib = false;
    nupudLukus = true;

    diileriKaartPeidus = false;
    naitaKaarte();

    var keegiAlles = false;
    for (var k = 0; k < mangijaKaed.length; k++) {
        if (arvutaPunktid(mangijaKaed[k]) <= 21) {
            keegiAlles = true;
        }
    }

    if (keegiAlles == true) {
        setTimeout(diileriJargmineKaart, 800);
    } else {
        setTimeout(naitaTulemust, 800);
    }
}

function diileriJargmineKaart() {
    if (arvutaPunktid(diileriKaardid) < 17) {
        diileriKaardid.push(votaKaart());
        naitaKaarte();
        setTimeout(diileriJargmineKaart, 800);
    } else {
        naitaTulemust();
    }
}

function naitaTulemust() {
    var diileriPunktid = arvutaPunktid(diileriKaardid);
    var tekst = "";

    for (var k = 0; k < mangijaKaed.length; k++) {
        var mangijaPunktid = arvutaPunktid(mangijaKaed[k]);
        var panus = panused[k];

        if (mangijaKaed.length > 1) {
            tekst += (k + 1) + ". käsi: ";
        }

        if (mangijaPunktid > 21) {
            tekst += "Läksid lõhki! Kaotasid " + panus + "$";
        } else if (diileriPunktid > 21) {
            raha = raha + panus * 2;
            tekst += "Diiler läks lõhki! Võitsid " + panus + "$";
        } else if (mangijaPunktid > diileriPunktid) {
            raha = raha + panus * 2;
            tekst += "Võitsid " + panus + "$";
        } else if (mangijaPunktid == diileriPunktid) {
            raha = raha + panus;
            tekst += "Viik, said oma raha tagasi";
        } else {
            tekst += "Diiler võitis. Kaotasid " + panus + "$";
        }

        tekst += "<br>";
    }

    naitaTeadet(tekst);
    lopeta();
}

function lopeta() {
    mangKaib = false;
    nupudLukus = true;
    uuendaRaha();
    naitaKaarte();

    if (raha < nupuPanused[0]) {
        naitaTeadet(document.getElementById("teade").innerHTML + "Raha sai otsa! Vali panus et alustada uuesti 500$-ga.");
    }

    setTimeout(koristaLaud, 3000);
}

function koristaLaud() {
    mangijaKaed = [];
    diileriKaardid = [];
    naitaKaarte();
    naitaTeadet("");
    nupudLukus = false;
    naitaNuppe();
}

uuendaRaha();
naitaNuppe();

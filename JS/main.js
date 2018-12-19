 
/* Paramètrage éléments dynamiques de la page */
document.getElementById("infosStation").style.display = "none";
document.getElementById("reservebox").style.display = "none";
document.getElementById("infosReservation").style.display = "none";

let fad = new fader();

/* Initialisation slider */
let images = [
["picture/0.jpg", "Bienvenue sur Lyon Velob"], 
["picture/1.png", "Choisir sa station"], 
["picture/2.png", "Faites une réservation"],
["picture/3.png", "Remplissez le formulaire et signez"], 
["picture/4.png", "Votre vélo vous attend"], 
]; // tableau contenant les chemin vers les images du slider et leur description.

let description = [
"<h2>Bienvenue sur Lyon Velob</h2><p>Le site de Lyon pour la location de volé simple et rapide</p>",
"<h2>Choisir sa station</h2><p>Commencer par choisir la station de vélo où vous souhaitez le récuperer</p>",
"<h2>Faites une réservation</h2><p>Si des vélos sont disponibles, vous pouvez effectuer une réservation.</p>",
"<h2>Remplissez le formulaire et signez</h2><p>Renseigner quelques informations avant de valider votre réservation</p>",
"<h2>Votre vélo vous attend</h2><p>Vous pouvez retrouver en ligne le temps restant de votre réservation</p>",
] // Elements de textes compris dans les slides.

let slider1 = new create_slider(document.getElementById("slide-group"));
slider1.addDiapo(images);
slider1.addDescrition(description);
slider1.addDefilAuto(4000, "right");
slider1.addButton();
slider1.addKeyNavigation();

/* Map Lyon Init */
mapLyon = new create_map("map", 45.750, 4.848, 12);
mapLyon.addMarkerJCD("Lyon", "85fa1cc72399e6c89b7ad11bb48c418003f72ef5");

/* Canvas Init */
let canv = new canvas("canvas");

document.getElementById("canvas").addEventListener("touchstart", (e) => {
  canv.active(e);
});
document.getElementById("canvas").addEventListener("touchmove", (e) => {
  canv.active(e);
});
document.getElementById("canvas").addEventListener("mousedown", (e) => {
  canv.active(e);
}); 
document.getElementById("canvas").addEventListener("mousemove", (e) => {
  canv.active(e);
});
document.getElementById("canvas").addEventListener("touchend", (e) => {
  canv.paintOff();
});
document.getElementById("canvas").addEventListener("mouseup", (e) => {
  canv.paintOff();
});
document.getElementById("canvas").addEventListener("mouseleave", (e) => {
  canv.paintOff();
});
document.getElementById("delete").addEventListener("click", (e) => {
  canv.delete();
});


let = Storage = new sessStorage();
Storage.actualisation()
setInterval(() => Storage.actualisation(), 1000);
document.getElementById("valid").addEventListener("click", () => {
Storage.reservation()
})

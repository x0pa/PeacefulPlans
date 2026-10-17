var DOCNAMES = {
  MB: { directive: "une directive en matière de soins de santé, nommant un mandataire", poa: "une procuration durable relative aux biens", note: "Au Manitoba, le document de soins est la directive en matière de soins de santé, et vous nommez un mandataire pour parler en votre nom." },
  ON: { directive: "une procuration relative au soin de la personne", poa: "une procuration perpétuelle relative aux biens", note: "En Ontario, le document de soins est la procuration relative au soin de la personne. Le document relatif aux biens est distinct : la procuration perpétuelle relative aux biens." },
  BC: { directive: "un accord de représentation, et toute directive préalable", poa: "une procuration durable relative aux biens", note: "En Colombie-Britannique, les décisions de soins passent par un accord de représentation. Beaucoup de gens consignent aussi une directive préalable." },
  AB: { directive: "une directive personnelle, nommant un mandataire", poa: "une procuration durable relative aux biens", note: "En Alberta, le document de soins est la directive personnelle, et la personne que vous nommez s'appelle votre mandataire." },
  SK: { directive: "une directive en matière de soins de santé, nommant un mandataire", poa: "une procuration durable relative aux biens", note: "En Saskatchewan, le document de soins est la directive en matière de soins de santé, et vous pouvez nommer un mandataire." },
  QC: { directive: "un mandat de protection, préparé pour le cas où vous deviendriez inapte", poa: "un mandat de protection, qui couvre la personne et les biens ensemble", note: "Au Québec, un seul document, le mandat de protection, couvre les soins et les biens ensemble, et il ne prend effet qu'après son homologation par le tribunal. Le testament notarié est la voie habituelle pour les testaments." },
  NS: { directive: "une directive personnelle, nommant un délégué", poa: "une procuration durable relative aux biens", note: "En Nouvelle-Écosse, le document de soins est la directive personnelle, et la personne que vous nommez s'appelle un délégué." },
  NB: { directive: "une directive préalable en matière de soins de santé", poa: "une procuration durable, qui au Nouveau-Brunswick peut aussi couvrir les décisions de soins", note: "Au Nouveau-Brunswick, une procuration durable peut couvrir à la fois les biens et les décisions de soins de santé. Beaucoup de gens consignent aussi une directive préalable en matière de soins de santé." },
  PE: { directive: "une directive en matière de soins de santé, nommant un décideur substitut", poa: "une procuration durable relative aux biens", note: "À l'Île-du-Prince-Édouard, le document de soins est la directive en matière de soins de santé." },
  NL: { directive: "une directive préalable en matière de soins de santé, nommant un décideur substitut", poa: "une procuration durable relative aux biens", note: "À Terre-Neuve-et-Labrador, le document de soins est la directive préalable en matière de soins de santé." },
  YT: { directive: "une directive préalable, selon le droit du Yukon", poa: "une procuration durable relative aux biens", note: "Au Yukon, les documents de planification des soins comprennent les directives préalables et les procurations durables." },
  NT: { directive: "une directive personnelle, nommant un mandataire", poa: "une procuration durable relative aux biens", note: "Dans les Territoires du Nord-Ouest, le document de soins est la directive personnelle." },
  NU: { directive: "une directive préalable, selon le droit du Nunavut", poa: "une procuration durable relative aux biens", note: "Au Nunavut, confirmez les formulaires actuels auprès d'un professionnel du droit, car les indications territoriales sont plus minces que dans les provinces." }
};
var GUIDES = [
  "/fr/guides/do-you-need-a-will-in-canada/",
  "/fr/guides/power-of-attorney-in-canada-two-documents/",
  "/fr/guides/power-of-attorney-in-canada-two-documents/",
  "/fr/guides/choosing-an-executor/",
  "/fr/guides/choosing-an-executor/",
  "/fr/guides/should-you-buy-a-burial-plot-ahead-of-time/",
  "/fr/guides/do-you-need-a-will-in-canada/",
  "/fr/guides/how-to-make-a-will-in-canada/",
  "/fr/tools/documents-checklist/",
  "/fr/guides/do-you-need-a-will-in-canada/"
];
var sel = document.getElementById("provinceSelect");
var boxes = Array.prototype.slice.call(document.querySelectorAll("#checklistForm .ck"));
function refreshNames() {
  var d = DOCNAMES[sel.value] || DOCNAMES.MB;
  document.getElementById("docNames").textContent = d.note;
  document.getElementById("lblDirective").textContent = "En place : " + d.directive;
  document.getElementById("lblPoa").textContent = "En place : " + d.poa;
}
function refreshScore() {
  var done = boxes.filter(function (b) { return b.checked; }).length;
  var total = boxes.length;
  document.getElementById("progressFill").style.width = Math.round(done / total * 100) + "%";
  document.getElementById("resultHead").textContent = "Votre préparation : " + done + " sur " + total + " en place";
  var txt = document.getElementById("resultText");
  var list = document.getElementById("missingList");
  list.innerHTML = "";
  if (done === total) {
    txt.textContent = "Tout ce qui figure sur cette liste est en place. Bravo. Revoyez la chaque année, et après tout grand changement de vie, et dites à votre liquidateur ou exécuteur où se trouvent les documents.";
    return;
  }
  txt.textContent = done === 0 ? "Un point de départ calme : choisissez le premier élément ci dessous et suivez son guide. Un document à la fois, c'est exactement comme cela que ça se fait." : "Beau progrès. Voici ce qui reste ouvert, dans un ordre sensé, avec le guide pour chacun.";
  boxes.forEach(function (b, i) {
    if (!b.checked) {
      var li = document.createElement("li");
      var label = b.parentElement.querySelector("span").textContent;
      li.innerHTML = label + " — <a href=\"" + GUIDES[i] + "\">lire le guide</a>";
      list.appendChild(li);
    }
  });
}
sel.addEventListener("change", refreshNames);
boxes.forEach(function (b) { b.addEventListener("change", refreshScore); });
refreshNames();
refreshScore();

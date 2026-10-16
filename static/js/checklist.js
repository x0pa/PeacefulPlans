var DOCNAMES = {
  MB: { directive: "a Health Care Directive, naming a proxy", poa: "an enduring power of attorney for property", note: "In Manitoba the care document is the Health Care Directive, and you name a proxy to speak for you." },
  ON: { directive: "a Power of Attorney for Personal Care", poa: "a Continuing Power of Attorney for Property", note: "In Ontario the care document is the Power of Attorney for Personal Care. The property document is a separate one, the Continuing Power of Attorney for Property." },
  BC: { directive: "a Representation Agreement, and any advance directive", poa: "an enduring power of attorney for property", note: "In British Columbia care decisions run through a Representation Agreement. Many people also record an advance directive." },
  AB: { directive: "a Personal Directive, naming an agent", poa: "an Enduring Power of Attorney for property", note: "In Alberta the care document is the Personal Directive, and the person you name is called your agent." },
  SK: { directive: "a health care directive, naming a proxy", poa: "an enduring power of attorney for property", note: "In Saskatchewan the care document is the health care directive, and you may name a proxy." },
  QC: { directive: "a Protection Mandate, made for if you become unable to care for yourself", poa: "a Protection Mandate, which covers person and property together", note: "In Quebec one document, the Protection Mandate, covers care and property together, and it takes effect only after homologation by the court. A notarial will is the common route for wills." },
  NS: { directive: "a Personal Directive, naming a delegate", poa: "an enduring power of attorney for property", note: "In Nova Scotia the care document is the Personal Directive, and the person you name is called a delegate." },
  NB: { directive: "an advance health care directive", poa: "an enduring power of attorney, which in New Brunswick can cover health care decisions too", note: "In New Brunswick an enduring power of attorney can cover both property and health care decisions. Many people also record an advance health care directive." },
  PE: { directive: "a health care directive, naming a substitute decision maker", poa: "an enduring power of attorney for property", note: "In Prince Edward Island the care document is the health care directive." },
  NL: { directive: "an advance health care directive, naming a substitute decision maker", poa: "an enduring power of attorney for property", note: "In Newfoundland and Labrador the care document is the advance health care directive." },
  YT: { directive: "an advance directive, under Yukon law", poa: "an enduring power of attorney for property", note: "In Yukon, care planning documents include advance directives and enduring powers of attorney." },
  NT: { directive: "a personal directive, naming an agent", poa: "an enduring power of attorney for property", note: "In the Northwest Territories the care document is the personal directive." },
  NU: { directive: "an advance directive, under Nunavut law", poa: "an enduring power of attorney for property", note: "In Nunavut, confirm the current forms with a legal professional, as territorial guidance is thinner than in the provinces." }
};
var GUIDES = [
  "/guides/do-you-need-a-will-in-canada/",
  "/guides/power-of-attorney-in-canada-two-documents/",
  "/guides/power-of-attorney-in-canada-two-documents/",
  "/guides/choosing-an-executor/",
  "/guides/choosing-an-executor/",
  "/guides/should-you-buy-a-burial-plot-ahead-of-time/",
  "/guides/do-you-need-a-will-in-canada/",
  "/guides/how-to-make-a-will-in-canada/",
  "/tools/documents-checklist/",
  "/guides/do-you-need-a-will-in-canada/"
];
var sel = document.getElementById("provinceSelect");
var boxes = Array.prototype.slice.call(document.querySelectorAll("#checklistForm .ck"));
function refreshNames() {
  var d = DOCNAMES[sel.value] || DOCNAMES.MB;
  document.getElementById("docNames").textContent = d.note;
  document.getElementById("lblDirective").textContent = "In place: " + d.directive;
  document.getElementById("lblPoa").textContent = "In place: " + d.poa;
}
function refreshScore() {
  var done = boxes.filter(function (b) { return b.checked; }).length;
  var total = boxes.length;
  document.getElementById("progressFill").style.width = Math.round(done / total * 100) + "%";
  document.getElementById("resultHead").textContent = "Your readiness: " + done + " of " + total + " in place";
  var txt = document.getElementById("resultText");
  var list = document.getElementById("missingList");
  list.innerHTML = "";
  if (done === total) {
    txt.textContent = "Everything on this list is in place. Well done. Revisit it each year, and after any major life change, and tell your executor where the papers live.";
    return;
  }
  txt.textContent = done === 0 ? "A calm place to start: pick the first item below and work through its guide. One document at a time is exactly how this gets done." : "Good ground covered. Here is what is still open, in a sensible order, with the guide for each one.";
  boxes.forEach(function (b, i) {
    if (!b.checked) {
      var li = document.createElement("li");
      var label = b.parentElement.querySelector("span").textContent;
      li.innerHTML = label + " — <a href=\"" + GUIDES[i] + "\">read the guide</a>";
      list.appendChild(li);
    }
  });
}
sel.addEventListener("change", refreshNames);
boxes.forEach(function (b) { b.addEventListener("change", refreshScore); });
refreshNames();
refreshScore();

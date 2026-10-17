function cad(n) {
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: n % 1 === 0 ? 0 : 2 });
}
function calcFee(prov, v) {
  if (prov === "MB") return { fee: 0, detail: "Le Manitoba ne facture aucuns frais d'homologation. La province a aboli ces frais en 2020, donc les frais de cour pour une succession de " + cad(v) + " sont de zéro. Des frais de dépôt et d'autres coûts de règlement peuvent tout de même s'appliquer." };
  if (prov === "ON") {
    if (v <= 50000) return { fee: 0, detail: "L'Ontario ne perçoit aucuns droits d'administration successorale sur la première tranche de 50 000 $ de la valeur de la succession, donc les droits sur " + cad(v) + " sont de zéro." };
    var fee = 0.015 * (v - 50000);
    return { fee: fee, detail: "Droits d'administration successorale de l'Ontario : rien sur la première tranche de 50 000 $, puis 15 $ par tranche de 1 000 $ au delà. Sur " + cad(v) + ", cela représente 1,5 pour cent de " + cad(v - 50000) + "." };
  }
  if (prov === "BC") {
    if (v <= 25000) return { fee: 0, detail: "La Colombie-Britannique ne facture aucuns frais d'homologation sur les successions de 25 000 $ ou moins." };
    if (v <= 50000) { var f1 = 200 + 0.006 * (v - 25000); return { fee: f1, detail: "Colombie-Britannique : des frais de dépôt de 200 $, plus 0,6 pour cent de la portion entre 25 000 $ et 50 000 $." }; }
    var f2 = 200 + 0.006 * 25000 + 0.014 * (v - 50000);
    return { fee: f2, detail: "Colombie-Britannique : des frais de dépôt de 200 $, plus 0,6 pour cent de la portion de 25 000 $ à 50 000 $, plus 1,4 pour cent de tout ce qui dépasse 50 000 $." };
  }
  if (prov === "AB") {
    var fee = v <= 10000 ? 35 : v <= 25000 ? 135 : v <= 125000 ? 275 : v <= 250000 ? 400 : 525;
    return { fee: fee, detail: "L'Alberta facture des frais de cour fixes selon une échelle de valeur. Une succession de " + cad(v) + " tombe dans la tranche de " + cad(fee) + ". Les frais plafonnent à 525 $, quelle que soit la taille de la succession." };
  }
  if (prov === "SK") { var f3 = 200 + 0.007 * v; return { fee: f3, detail: "La Saskatchewan facture des frais de registraire local de 200 $, plus 7 $ par tranche de 1 000 $ de valeur successorale, soit 0,7 pour cent de " + cad(v) + ", pour un total de " + cad(f3) + "." }; }
  return { fee: 0, detail: "Cette province n'est pas encore chargée dans ce calculateur." };
}
document.getElementById("calcBtn").addEventListener("click", function () {
  var prov = document.getElementById("probateProvince").value;
  var v = parseFloat(document.getElementById("estateValue").value) || 0;
  var r = calcFee(prov, v);
  document.getElementById("probateResult").textContent = "Frais de cour estimés : " + cad(r.fee);
  document.getElementById("probateDetail").textContent = r.detail;
});

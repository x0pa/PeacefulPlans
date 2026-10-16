function cad(n) {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: n % 1 === 0 ? 0 : 2 });
}
function calcFee(prov, v) {
  if (prov === "MB") return { fee: 0, detail: "Manitoba charges no probate fee. The province removed these fees in 2020, so the court fee on an estate of " + cad(v) + " is zero. Court filing and other settling costs can still apply." };
  if (prov === "ON") {
    if (v <= 50000) return { fee: 0, detail: "Ontario charges no Estate Administration Tax on the first $50,000 of estate value, so the tax on " + cad(v) + " is zero." };
    var fee = 0.015 * (v - 50000);
    return { fee: fee, detail: "Ontario Estate Administration Tax: nothing on the first $50,000, then $15 for each $1,000 above that. On " + cad(v) + " that is 1.5 percent of " + cad(v - 50000) + "." };
  }
  if (prov === "BC") {
    if (v <= 25000) return { fee: 0, detail: "British Columbia charges no probate fee on estates of $25,000 or less." };
    if (v <= 50000) { var f1 = 200 + 0.006 * (v - 25000); return { fee: f1, detail: "British Columbia: a $200 filing fee plus 0.6 percent of the portion between $25,000 and $50,000." }; }
    var f2 = 200 + 0.006 * 25000 + 0.014 * (v - 50000);
    return { fee: f2, detail: "British Columbia: a $200 filing fee, plus 0.6 percent of the portion from $25,000 to $50,000, plus 1.4 percent of everything above $50,000." };
  }
  if (prov === "AB") {
    var fee = v <= 10000 ? 35 : v <= 25000 ? 135 : v <= 125000 ? 275 : v <= 250000 ? 400 : 525;
    return { fee: fee, detail: "Alberta charges a flat court fee by estate value band. An estate of " + cad(v) + " falls in the " + cad(fee) + " band. Fees top out at $525, however large the estate." };
  }
  if (prov === "SK") { var f3 = 200 + 0.007 * v; return { fee: f3, detail: "Saskatchewan charges a $200 local registrar fee plus $7 for each $1,000 of estate value, which is 0.7 percent of " + cad(v) + ", for a total of " + cad(f3) + "." }; }
  return { fee: 0, detail: "That province is not loaded in this test build yet." };
}
document.getElementById("calcBtn").addEventListener("click", function () {
  var prov = document.getElementById("probateProvince").value;
  var v = parseFloat(document.getElementById("estateValue").value) || 0;
  var r = calcFee(prov, v);
  document.getElementById("probateResult").textContent = "Estimated court fee: " + cad(r.fee);
  document.getElementById("probateDetail").textContent = r.detail;
});

(function(){
  var input=document.getElementById("pp-search-input");
  if(!input||!window.PP_SEARCH) return;
  var cfg=window.PP_SEARCH;
  function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
  fetch(cfg.indexUrl).then(function(r){return r.json();}).then(function(idx){
    var pages=(idx&&idx.pages)||[];
    var box=document.getElementById("pp-search-results");
    var status=document.getElementById("pp-search-status");
    var timer=null;
    function setStatus(msg){
      if(!status) return;
      if(timer) window.clearTimeout(timer);
      timer=window.setTimeout(function(){status.textContent=msg;},250);
    }
    input.addEventListener("input",function(){
      var q=input.value.trim(), nq=norm(q);
      box.innerHTML="";
      if(q.length<2){setStatus("");return;}
      var found=0;
      pages.filter(function(p){
        return norm(p.title).indexOf(nq)>=0||norm(p.topic).indexOf(nq)>=0||norm(p.summary).indexOf(nq)>=0;
      }).slice(0,12).forEach(function(p){
        var a=document.createElement("a");
        a.className="guide-card"; a.href=p.url;
        var k=document.createElement("span"); k.className="pillar"; k.textContent=p.topic;
        var h=document.createElement("h3"); h.textContent=p.title;
        var s=document.createElement("p"); s.textContent=p.summary;
        a.appendChild(k); a.appendChild(h); a.appendChild(s);
        box.appendChild(a); found++;
      });
      if(!found){
        var d=document.createElement("div"); d.className="search-none";
        var t=document.createElement("p"); t.textContent=cfg.noResults+" ";
        var a2=document.createElement("a"); a2.href=cfg.guidesUrl; a2.textContent=cfg.browseText;
        t.appendChild(a2); d.appendChild(t); box.appendChild(d);
      }
      setStatus(found?(found+" "+(found===1?cfg.resultWord:cfg.resultsWord)+" "+cfg.forWord+" \u201C"+q+"\u201D"):"");
    });
  }).catch(function(){});
})();

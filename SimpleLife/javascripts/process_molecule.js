function submitSmiles() {
  var smiles = document.JME.smiles();
  var jme = document.JME.jmeFile();
    alert(smiles)
  document.getElementById("smilesstr").value = smiles
  if (smiles == "") {
    alert("Nothing to submit");
  }
  else {
    opener.fromEditor(smiles,jme);
    //window.close();
  }
}

function openHelpWindow() {
  window.open("http://www.molinspiration.com/jme/help/jme2008hints.html","jmehelp","toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=510,height=675,left=400,top=20");
}

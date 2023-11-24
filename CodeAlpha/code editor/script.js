function run() {
    let htmlcode = document.getElementById("html-code").value;
    let csscode = document.getElementById("css-code").value;
    let javascriptcode = document.getElementById("javascript-code").value;
    let output = document.getElementById("output");
  
    output.contentDocument.body.innerHTML = htmlcode;
    let styleTag = output.contentDocument.createElement("style");
    styleTag.innerHTML = csscode;
    output.contentDocument.head.appendChild(styleTag);
  
    output.contentDocument.body.innerHTML +='<div id="error"></div>';
    
    try {
      output.contentWindow.eval(javascriptcode);
    } catch (error) {
      console.error(error);
    }
  }


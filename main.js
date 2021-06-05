function loadJS(url, implementationCode, location){
  var scriptTag = document.createElement('script');
  scriptTag.src = url;

  scriptTag.onload = implementationCode;
  scriptTag.onreadystatechange = implementationCode;

  location.appendChild(scriptTag);
};

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

function runLexer(){
  document.getElementById("run-output").innerHTML = "";
  var input = self.monacoIdeInstance.getValue();
  var chars = new antlr4.InputStream(input);
  var lexer = new DemoLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  tokens.fill();

  document.getElementById("output").innerHTML = "";
  tokens.tokens.forEach( (token) => {
    var tokenType = (token.type == -1)? "EOF" : DemoLexer.symbolicNames[token.type];
    document.getElementById("output").innerHTML += 'Text: <samp>' + token.text + '</samp> | start (line, col): ' + token.line + ', ' + token.column + ' | type: <samp>' + tokenType +  '</samp> <br/>';
  });

  // debug code
  console.log("One runLexer call");
}

function compileLexer(){
  var input = self.monacoIdeInstanceGrammar.getValue();

  var data = new FormData();
  data.append('content', input);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'compile.php', true);
  xhr.onload = function(e) {
    var client = new HttpClient();
    client.get('get.php?prefix=' + xhr.response + '-output', function(response){
	document.getElementById("build-output").innerHTML = response;		
    });
    loadJS('get.php?type=js&prefix=' + xhr.response + '-lexer' , function (){}, document.body);
    loadJS('get.php?type=js&prefix=' + xhr.response + '-listener' , function (){}, document.body);
    loadJS('get.php?type=js&prefix=' + xhr.response + '-parser', function (){}, document.body);
  }

  xhr.send(data);

  // debug code
  console.log("One compilerLexer call");
}

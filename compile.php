<?php

// assign an unique name to the submission
$prefix = uniqid("", TRUE);
mkdir(getcwd() . '/' . $prefix);

// put the input in a file
file_put_contents(getcwd() . '/' . $prefix . '/Demo.g4', $_POST['content']);

// run the js-generator in the "sandbox" folder
exec("java -jar antlr4-4.9.2-complete.jar -Dlanguage=JavaScript " . $prefix . "/Demo.g4 2>&1", $antlrOutputArray);

// read the results and delete the "sandbox" folder
$compiledLexer  = file_get_contents(getcwd() . '/' . $prefix . '/DemoLexer.js' );
$compiledParser = file_get_contents(getcwd() . '/' . $prefix . '/DemoParser.js');
$compiledListener = file_get_contents(getcwd() . '/' . $prefix . '/DemoListener.js');
exec("rm -rf " . $prefix);

// upload the results to memcached
$memcachedConn = new Memcached();
$memcachedConn->addServer('localhost', 11211);
$memcachedConn->set($prefix . '-lexer'   , $compiledLexer    );
$memcachedConn->set($prefix . '-parser'  , $compiledParser   );
$memcachedConn->set($prefix . '-output'  , implode("\n", $antlrOutputArray) );
$memcachedConn->set($prefix . '-listener', $compiledListener);

$memcachedConn->set($prefix . '-output', implode("\n", $antlrOutputArray));

// return the name of the submission to the client
echo $prefix;

// -------------------
// Roadmap
// -------------------
//
// TODO short term:
// [ ] Compilation unsuccessful popup - https://alertifyjs.com/
// [ ] Mark synchronization levels
//   - Current/stale/no grammar loaded
//   - Compilation successful/unsuccessful popup
//   - Current/stale lexer output
//
// TODO medium term:
// [ ] Instead of uniqid, use hashes
// [ ] Max execution time - 5s https://easyengine.io/tutorials/php/increase-script-execution-time/
// [ ] Max request size - 10kB https://www.tecmint.com/limit-file-upload-size-in-nginx/
// [ ] New button to run Parser

?>

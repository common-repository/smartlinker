<?php header('Content-Type: text/html; charset=UTF-8'); ?>
<?php  

include_once('class.http.php');
$http = new Http();  
$http->useCurl(false);  
$http->setMethod('POST');

$http->addParam('query', $_REQUEST["query"]);
$http->addParam('code', $_REQUEST["code"]);

$http->setTimeout(10);

$http->setReferrer('http://localhost');
$http->execute('http://www.inetlinker.com/module/smartlinkerautocomplete'); 

$res=($http->error) ? $http->error : $http->result;


print($res);

?>

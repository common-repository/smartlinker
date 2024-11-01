<?php 
header('Content-Type: application/jsonrequest'); 
header("Cache-Control: no-cache");
header("Pragma: no-cache");
?>
<?php  

	require_once('JSON.php');
	$json = new Services_JSON();


   $input = file_get_contents('php://input');
   $input1=$input=urldecode($input);
   $input=substr($input, 12);
   $jsonRequest = $json->decode($input);
 

include_once('class.http.php');
$http = new Http();  
$http->useCurl(false);  
$http->setMethod('POST');
$http->setTimeout('40');
//$http->addParam('input', $jsonRequest->input);
$http->addParam('query', $jsonRequest->input);
//$http->addParam('type', 'text');
//$http->addParam('code', $jsonRequest->code);
//$http->addParam('openinnewwindow', $jsonRequest->openinnewwindow);



$http->setReferrer('http://localhost');
$http->execute('http://www.inetlinker.com/module/search?q='.$jsonRequest->input);

$res=($http->error) ? $http->error : $http->result;

print($res);

?>

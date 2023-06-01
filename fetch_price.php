<?php
$url = 'https://mon-essence.fr/station/saint-gregoire/leclerc-st-gregoire';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);

$response = curl_exec($ch);
curl_close($ch);

$doc = new DOMDocument();
libxml_use_internal_errors(true);
$doc->loadHTML($response);
libxml_clear_errors();

$xpath = new DOMXPath($doc);
$price = $xpath->query("/html/body/div[2]/div[2]/div[1]/div[2]/table/tbody/tr/td[4]/span");

//if ($price->length > 0) {
    $priceValue = $price->item(0)->nodeValue;
//} else {
//    $priceValue = 'N/A';
//}

header('Content-Type: text/plain');
echo $priceValue;
?>
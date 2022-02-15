------------------------------------------Simple XSJS file to perform the calcultaion multiplication---------------------------------------------
function calculatemult(val1, val2)
{
	return val1*val2;
	
}

var result = calculatemult(5,3);

$.response.setBody(result.toString());

calling the xsjs file in the web broser  https://hxehost:51056/xsjs/calculate.xsjs
Output:- 15

----------------------------------------XSJS file to perform the calcultaion multiplication with user input values-------------------------------


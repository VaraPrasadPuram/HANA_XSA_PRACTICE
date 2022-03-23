
------------------------------------------Simple XSJS file to perform the calcultaion multiplication---------------------------------------------
function calculatemult(val1, val2)
{
	return val1*val2;
	
}

var result = calculatemult(5,3);

$.response.setBody(result.toString());

calling the xsjs file in the web broser:https://hxehost:51056/xsjs/calculate.xsjs
Output:- 15

----------------------------------------XSJS file to perform the calcultaion multiplication with user input values-------------------------------

function calculatemult(val1, val2)
{
	return val1*val2;
}

var  num1 = $.request.parameters.get('valueone');

var num2 = $.request.parameters.get('valuetwo');

}
$.response.setBody(result.toString());
}
else
{
	$.response.setBody("Please correct your input");
}

calling the XSJS file in the web browser : https://hxehost:51056/xsjs/CalculatWithParameters.xsjs?valueone=10&valuetwo=20

-------------XSJS file to perform the calcultaion multiplication with user input values with the switch to perform based on the operation selection---------------

function calculatemult(val1, val2)
{
	return val1*val2;
}

function calculatesum(val1, val2)
{
	return parseInt(val1)+parseInt(val2);
}
var  num1 = $.request.parameters.get('valueone');

var num2 = $.request.parameters.get('valuetwo');

var opr =  $.request.parameters.get('opr');

var result =0;

if(num1 && num2)
{
switch(opr){
	case "mul":
		result = calculatemult(num1,num2);
		break;
	case "sum":
		result = calculatesum(num1,num2);
		break;
}
$.response.setBody(result.toString());
}
else
{
	$.response.setBody("Please correct your input");
}

calling the xsjs file in the web broswer :https://hxehost:51056/xsjs/CalculatWithParameters.xsjs?valueone=10&valuetwo=20&opr=sum

======================================================Accessing the First row of the Array object result===================

var conn  = $.hdb.getConnection();
var result = conn.executeQuery('SELECT "PURCHASEORDERID","PRODUCTID","QUANTITY", "GROSSAMOUNT" FROM "PO.Item" limit 5');
//var iterator = result.getIterator();
//console.log(iterator);
/*var totalPrice = 0;
while(iterator.next()) {
    var currentRow = iterator.value();

}*/
var rs = result[0];
$.response.contentType = 'application/json';
    $.response.setBody(rs);
    $.response.status = $.net.http.OK;

===================================================Accessing teh Column values of the resultant====================================

var conn  = $.hdb.getConnection();
var result = conn.executeQuery('SELECT "PURCHASEORDERID","PRODUCTID","QUANTITY", "GROSSAMOUNT" FROM "PO.Item" limit 5');
var rs = result[0]['PRODUCTID'];
$.response.contentType = 'application/json';
$.response.setBody(rs);
$.response.status = $.net.http.OK;
 -----------------------------------------------------------------------------   
    var conn  = $.hdb.getConnection();
var result = conn.executeQuery('SELECT "PURCHASEORDERID","PRODUCTID","QUANTITY", "GROSSAMOUNT" FROM "PO.Item" limit 5');
var row = result[0];
var rs = row['PURCHASEORDERID'];
//var rs = row.PRODUCTID;
//var rs = row[0];
$.response.contentType = 'application/json';
$.response.setBody(rs);
$.response.status = $.net.http.OK;
---------------------------------------------------------------------------------------------------

var conn  = $.hdb.getConnection();
var result = conn.executeQuery('SELECT "PURCHASEORDERID","PRODUCTID","QUANTITY", "GROSSAMOUNT" FROM "PO.Item" limit 5');
var QTY;
for (var row in result){
	QTY += result[row]['QUANTITY'] + ' ';
}
$.response.contentType = 'application/json';
    $.response.setBody(QTY);
    $.response.status = $.net.http.OK;



-----------------------------------Reading the table data and converting the table data into JSON format------------------------------	

/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";
var conn = $.hdb.getConnection();
var query = 'SELECT "PURCHASEORDERID","PURCHASEORDERITEM","QUANTITYUNIT","DELIVERYDATE" FROM "PO.Item"';
var rs = conn.executeQuery(query);
$.response.setBody(JSON.stringify(rs));
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;

callin the XSJS file ---https://hxehost:51060/xsjs/hdb.xsjs
output data in JSON format:---  [{"PURCHASEORDERID":300000000,"PURCHASEORDERITEM":10,"QUANTITYUNIT":"EA","DELIVERYDATE":"2015-05-06T18:30:00.000Z"},
{"PURCHASEORDERID":300000000,"PURCHASEORDERITEM":20,"QUANTITYUNIT":"EA","DELIVERYDATE":"2015-09-04T18:30:00.000Z"}]

------------------------------Reading the table data record by record using the loop and Inserting the fetched data into Target table-------------------------

"use strict";
var conn = $.hdb.getConnection();
var lv_purchase_id, lv_product_id;
var lv_gross_amt = 0,lv_net_amt = 0,lv_tax_amt = 0,lv_qunatity = 0,lv_quantity_unit = 0;
var recordsIteration = {};
var i;
var lv_query = 'SELECT "PURCHASEORDERID","PRODUCTID","GROSSAMOUNT","NETAMOUNT","TAXAMOUNT","QUANTITY","QUANTITYUNIT" FROM "PO.Item" where "PURCHASEORDERID" = ?';
/*,"TAXAMOUNT","QUANTITY","QUANTITYUNIT" */
var PurchaseOrdervalue = $.request.parameters.get('Purchasevalue');

var rs = conn.executeQuery(lv_query,PurchaseOrdervalue);

for (i =0; i< rs.length; i++)
{
 recordsIteration = rs[i];
 lv_purchase_id = recordsIteration.PURCHASEORDERID;
 lv_product_id = recordsIteration.PRODUCTID;
 lv_gross_amt = recordsIteration.GROSSAMOUNT;
 lv_net_amt = recordsIteration.NETAMOUNT;
 lv_tax_amt = recordsIteration.TAXAMOUNT;
 lv_qunatity = recordsIteration.QUANTITY;
 lv_quantity_unit = recordsIteration.QUANTITYUNIT;
}

var querty = "INSERT INTO \"table_xsjs\" VALUES(?,?,?,?,?,?,?)";
rs = conn.executeUpdate(querty,lv_purchase_id,lv_product_id,lv_gross_amt,lv_net_amt,lv_tax_amt,lv_qunatity,lv_quantity_unit);

conn.commit();
conn.close();


  /*body += recordsIteration.PURCHASEORDERID + "\t" + recordsIteration.PRODUCTID + "\t" + recordsIteration.GROSSAMOUNT + "\t" + recordsIteration.NETAMOUNT + "\n";
 
 }
 $.response.setBody(body);
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;*/

--------------------------------------------Downloading table data as Execl file --------------------------------------------------------


/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";
var conn = $.hdb.getConnection();
var query = 'SELECT "PURCHASEORDERID","PURCHASEORDERITEM","QUANTITYUNIT" FROM "PO.Item"';
var rs = conn.executeQuery(query);
var i = 0;
var item ={};
var body = '';
for (i =0; i< rs.length; i++)
{
 item = rs[i];
 body += item.PURCHASEORDERID + "\t" + item.PURCHASEORDERITEM + "\t" + item.QUANTITYUNIT + "\n";

}
	$.response.setBody(body);   
    $.response.contentType = 'application/vnd.ms-excel; charset=utf-16le';
    $.response.headers.set('Content-Disposition','attachment; filename=Excel.xls');
    $.response.headers.set('access-control-allow-origin','*');
    $.response.status = $.net.http.OK;
 

------------------------------------------------Reading all the Table Column meta data from table with all the properties of table------------------------

var conn = $.hdb.getConnection();
var query = 'SELECT * FROM "PO.Item"';
var rs = conn.executeQuery(query);
var columnsMetadata = rs.metadata.columns;
var columnCount = columnsMetadata.length;
var body = "";
for(var i = 0; i < columnCount; i++) {
    body += "Column " + (i + 1) + " metadata:\n";
    body += "  Catalog name: " + columnsMetadata[i].catalogName + "\n";
    body += "  Display size: " + columnsMetadata[i].displaySize + "\n";
    body += "  Label:        " + columnsMetadata[i].label + "\n";
    body += "  Name:         " + columnsMetadata[i].name + "\n";
    body += "  Type:         " + columnsMetadata[i].type + "\n";
    body += "  Type name:    " + columnsMetadata[i].typeName + "\n";
    body += "  Precision:    " + columnsMetadata[i].precision + "\n";
    body += "  Scale:        " + columnsMetadata[i].scale + "\n";
    body += "  Table name:   " + columnsMetadata[i].tableName + "\n";
    body += "  Is nullable:  " + (columnsMetadata[i].isNullable ? "true" : "false") + "\n\n";
}
$.response.contentType = "text/plain";
$.response.setBody(body);

Output of the XSJS
Column 1 metadata:
  Catalog name: undefined
  Display size: undefined
  Label:        PURCHASEORDERID
  Name:         PURCHASEORDERID
  Type:         3
  Type name:    INTEGER
  Precision:    10
  Scale:        0
  Table name:   PO.Item
  Is nullable:  false

-----------------------------------------------------Reading the table data record by record and storing it as the JSOn format-------------------------------------

var conn = $.hdb.getConnection();

var query = 'SELECT "STATE","COUNTRY" FROM "Cust_Info"';
var i;
var rs = conn.executeQuery(query);
var data =[];

for (i =0; i< rs.length; i++)
{
var row ={};
------we can also do storing the data into variable and iterat 
var records = rs[i];
row.state = rs[i].STATE;	
row.country =rs[i].COUNTRY;

	data.push(row);	
}
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(data));

----------------------------------------------------------------Reading the table data using the Hdb connection-------------------------------------------------
if ($.request.method === $.net.http.GET) {
    const id = $.request.parameters.get('id');
    $.response.contentType = "application/json";

    const conn = $.hdb.getConnection();
    try {
        const resultSet = conn.executeQuery('select * from "user_table" where "id" = ?', id);
        $.response.setBody(JSON.stringify(resultSet));
        $.response.status = $.net.http.OK;
    } catch (ex) {
        $.response.setBody(ex.toString());
    } finally {
        if (conn) {
            conn.close();
        }
    }
}
-----------------------------------------------------Printing the body as the JSON format-----------------------------------------------------
var body = '';
    body = JSON.stringify({
        "session": [{
     
          //$.session.getUsername() - Returns the user name of the logged-on database user
          "UserName": $.session.getUsername(),
     
         //$.session.language - Contains an empty string unless a language is explicitly set by the XS session layer.
         "Language": $.session.language
        }]
    });
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;

================================================Updating the DISCOUNTAMOUNT ============================================
var conn = $.hdb.getConnection();
var rs;
var query;
query = 'SELECT * FROM "PO.Header" LIMIT 10';
rs = conn.executeQuery(query);
for (let item of rs) {
	item.DISCOUNTAMOUNT = (item.GROSSAMOUNT - item.GROSSAMOUNT * .10);
}
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(rs));
===================================================Checking the table data==========================================
$.response.contentType = "text/html";
var sOutput = "Hello, World! <br><br>";

var oConn = $.hdb.getConnection();
var sQuery = 'select * from "PO.Item"';
var aRs = oConn.executeQuery(sQuery);

if (aRs.length>1) {
    $.response.setBody("Failed to retrieve data");
    $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
    sOutput += "This is the response from my SQL: " + aRs[0].DUMMY;
    $.response.setBody(sOutput);
}
oConn.close(); 
===============================Redaing Tables data with the Aggregation and selecting data with record iteration====================
function   getData(){
var conn = $.hdb.getConnection();
var  purchId = $.request.parameters.get("purchId"); 
var output = {};
var entry;
$.hdb.getConnection();
 var query =   'SELECT "PURCHASEORDERID","CURRENCY",sum("GROSSAMOUNT") as "GROSSAMOUNT" FROM "PO.Item" where "PURCHASEORDERID" =? GROUP BY "PURCHASEORDERID","CURRENCY"';
  var rs = conn.executeQuery(query, purchId);
if(rs.length<1){
		$.response.setBody("Failed to retieve data");
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    } else {
        output.TotallGrossAmt = rs[0].GROSSAMOUNT;
    }
	if(output.TotallGrossAmt !==null){	
	query = 'SELECT sum("GROSSAMOUNT") as "GROSSAMOUNT_HEAD",year("HISTORY.CHANGEDAT") as "YEAR" FROM "PO.Header" where "PURCHASEORDERID" =? GROUP BY year("HISTORY.CHANGEDAT")';
	 rs = conn.executeQuery(query, purchId);	
	if(rs.length<1){
		$.response.setBody("Failed to retieve data");
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    } else {
        output.Sales_YOY = [];
        var i;
        for (i=0;i<rs.length;i++){
        entry ={};
        entry.AMOUNT = rs[i].GROSSAMOUNT_HEAD;
        entry.YEAR = rs[i].YEAR;
         entry.CURRENCY = 'EURO';
         output.Sales_YOY.push(entry);    
        }
    }
	}
$.response.status = $.net.http.OK;
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(output));
}
var aCmd = $.request.parameters.get("cmd");
switch (aCmd) {
    case "getData":
        getData();
        break;
    default:
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody('Invalid Command: ' + aCmd);
}
        
calling the xsjs Service https://hxehost:51060/xsjs/arrayBasics.xsjs?cmd=getData&purchId=300000008


=================================Reading the Payload data and storing it into target table===================================
var conn = $.hdb.getConnection();
var i;
var payload = 	[
	{
		"PRODUCT_ID": "VG10001",
		"PRODUCT_NAME": "LAPTOP",
		"CATEGORY": "ELECTRONICS",
		"SIZE": "L",
		"QTY": 10
	},
	{
		"PRODUCT_ID": "VG10002",
		"PRODUCT_NAME": "FRIDGE",
		"CATEGORY": "ELECTRONICS",
		"SIZE": "M",
		"QTY": 12
	},
	{
		"PRODUCT_ID": "VG10003",
		"PRODUCT_NAME": "SWITCHES",
		"CATEGORY": "ELECTRONICS",
		"SIZE": "S",
		"QTY": 5
	}];
	var result =[];
for (i=0;i<payload.length;i++)
{
result.push([payload[i].PRODUCT_ID.toUpperCase(),payload[i].PRODUCT_NAME.toUpperCase(),payload[i].CATEGORY.toUpperCase(),payload[i].SIZE.toUpperCase(),payload[i].QTY]);	
	//var bdata ={};
	/*bdata.PRODUCT_ID = payload[i].PRODUCT_ID;
	bdata.PRODUCT_NAME = payload[i].PRODUCT_NAME;
	bdata.CATEGORY = payload[i].CATEGORY;
	bdata.SIZE = payload[i].SIZE;
    bdata.QTY = payload[i].QTY;*/

}
conn.executeUpdate('INSERT INTO "PRODUCT_INFO" VALUES (?,?,?,?,?)', result);
var query =  'SELECT * FROM  "PRODUCT_INFO"';
var rs = conn.executeQuery(query);
if(rs.length<1){
	$.response.setBody("Failed to retieve data");
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    } else {
       $.response.setBody("Data is loaded in the table");
	   $.response.status = $.net.http.OK;	
}


conn.commit();

==================================================Loading the Array data into the target table========================================
var connection = $.hdb.getConnection();

var argsArray = [["VG10001","LAPTOP","ELECTRONICS","L",2], ["VG10002","FRIDGE","ELECTRONICS","M",3], ["VG10003","SWITCHES","ELECTRONICS","S",98]];
connection.executeUpdate('INSERT INTO "PRODUCT_INFO" VALUES (?,?,?,?,?)', argsArray);
$.response.setBody(JSON.stringify(argsArray));
$.response.status = $.net.http.OK;	
connection.commit();








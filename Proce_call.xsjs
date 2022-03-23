var p_product = $.request.parameters.get('im_product');  
                --//-->Input Parameter of HDB procedure
var p_version = $.request.parameters.get('im_version');  
                --//--> Resutl set to capture output 
var results = {};                                        
results.data = [];		

try {
                 --//--> HDB connection details
var conn = $.hdb.getConnection(); 
                --//--> HDB proceude and scheman name                       
var query = conn.loadProcedure("IGO", "IGO.Proc::Order_Calc_SRT_p"); 
               --//--> Pass the parameter values
var params = query(p_product, p_version);    
              --//--> Capture the output using out paramater of HDB procedure                        
var out_data = params['p_out_table'];                                 
             --//--> Pass the output to result set                                                                        
results.data = out_data; 
            --//--> pass the status code to  response                                           
$.response.status = $.net.http.OK;                                   
$.response.contentType = "application/json";
           --//--> set response body with result output
$.response.setBody(JSON.stringify(results));                         
          --//--> Error handeling                                                                        
} catch (err) {                                                     

$.response.setBody(err.message);
}
conn.commit();
conn.close();

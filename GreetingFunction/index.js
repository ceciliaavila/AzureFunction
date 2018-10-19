module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

	var name = req.query.name; 
	var date = req.query.date; //"YYYY-MM-DD"
	var today = new Date().toISOString().slice(0,10); 
	var birthdate = "";
	var aDate;
	var bUTC;
	var tUTC;
	var diff=0;
	var days = 0;

	// input validation
	if (!date || !name )
	{
      context.res = 
		{
			status: 400,
			body: "Please pass both name and birthday on de query string"
		};	
    }else
    {
		//formating the birthdate
		birthdate = today.slice(0, 4) + "-" + date.slice(5, 7) + "-" + date.slice(8, 10);
        aDate = birthdate.split('-');
        bUTC = Date.UTC(aDate[0],aDate[1]-1,aDate[2]);
        
		//formating the today's date
        aDate = today.split('-');
        tUTC = Date.UTC(aDate[0],aDate[1]-1,aDate[2]);

        diff = bUTC - tUTC;
		days = diff / (1000 * 60 * 60 * 24);
		
		if(days === 0)
		{
			context.res = {body: "Happy Birthday " + name + "!!!"};
			
		}else if (days > 0) 
		{
			context.res = {body: name + "! " + days + " days left for your birthday!!!"};
			
		}else 
		{
            birthdate = (parseInt(today.slice(0, 4)) + 1 ) + "-" + date.slice(5, 7) + "-" + date.slice(8, 10);
            aDate = birthdate.split('-');
        	bUTC = Date.UTC(aDate[0],aDate[1]-1,aDate[2]);
            
            diff=bUTC - tUTC;
			days = diff / (1000 * 60 * 60 * 24);
            context.res = {body: name + "! " + days + " days left for your birthday!!!"};
		}		
	}
};

$(document).ready(function(){
	var table = "<table class='table table-striped table-bordered'>";
	table+="<thead>";
		table+="<th>Value of p</th>";
		table+="<th>Network Reliability</th>";
	table+="</thead>";
	table+="<tbody>";
// Total number of nodes in the network
	var N = 5;
	var localP = -1;
	var reliability = 0;
	var d = [0,1,2,3,4,5,6,7,8,9];
	var linkReliability = new Array(10);
	var nodes = new Array(1024);
	var temp = new Array(1024);
	var pVals = [];
	var pArr = [];
	var kVals = [];
	var kArr = [];
	for(var p=0.05; p<1.05; p+=0.05){
	    var counter = 0;
		for(var n=0;n<1024; n++){
		    temp[n] = 0;
			var matrix = new Array(5);
			nodes[n] = new Array(10);
			var state = n.toString(2);
			var padding = 10 - state.length;
			var stateString = "";
			for(var b=0; b<padding; b++)
				stateString = stateString.concat("0");
			stateString = stateString.concat(state);
			for(var i=0; i<5; i++)
				matrix[i] = -1;
			for(var j=0; j<10; j++)
			    nodes[n][j] = stateString.charAt(j);
			if (nodes[n][0] == 1) {
                matrix[0] = 0;
                matrix[1] = 1;
            }
            if (nodes[n][1] == 1) {
                matrix[0] = 0;
                matrix[2] = 2;
            }
            if (nodes[n][2] == 1) {
                matrix[0] = 0;
                matrix[3] = 3;
            }
            if (nodes[n][3] == 1) {
                matrix[0] = 0;
                matrix[4] = 4;
            }
            if (nodes[n][4] == 1) {
                matrix[1] = 1;
                matrix[2] = 2;
            }
            if (nodes[n][5] == 1) {
                matrix[1] = 1;
                matrix[3] = 3;
            }
            if (nodes[n][6] == 1) {
                matrix[1] = 1;
                matrix[4] = 4;
            }
            if (nodes[n][7] == 1) {
                matrix[2] = 2;
                matrix[3] = 3;
            }
            if (nodes[n][8] == 1) {
                matrix[2] = 2;
                matrix[4] = 4;
            }
            if (nodes[n][9] == 1) {
                matrix[3] = 3;
                matrix[4] = 4;
            }
            var count = 0;
            for (var j = 0; j < 5; j++)
                count += matrix[j];
            if (count == 10) {
                temp[counter] = n;
                counter++;
            }
		}
		for(var i=0; i<linkReliability.length; i++)
			linkReliability[i] = Math.pow(p, Math.ceil(d[i]/3));
		for(var n=0;n<1024; n++){
    		if (temp[n] != 0) {
    		    for (var m = 0; m < 10; m++) {
                    if (nodes[temp[n]][m] == 1) {
                        if (localP == -1)
                            localP = linkReliability[m];
                        else
                            localP = localP * linkReliability[m];
                    }else{
                        if (localP == -1)
                            localP = (1 - linkReliability[m]);
                        else
                            localP = localP * (1 - linkReliability[m]);
                    }
                }
                reliability += localP;
                localP = -1;
            }
		}
		table+="<tr>";
		    table+="<td>"+p.toFixed(2)+"</td>";
		    table+="<td>"+reliability+"</td>";
		table+="</tr>";
		pVals.push(p.toFixed(2));
		pArr.push(reliability);
		reliability = 0;
	}
	    table+="</tbody>";
	table+="</table>";
	$("#resultHolder").html(table);
	var ctxP = document.getElementById("pChart").getContext("2d");
	var pData = {
        labels: pVals,
        datasets: [
            {
                label: "Network Reliability",
    						fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: pArr,
            }
        ]
	};
	var pChart = new Chart(ctxP).Line(pData, {});
	table = "<table class='table table-striped table-bordered'>";
	table+="<thead>";
		table+="<th>Value of K</th>";
		table+="<th>Network Reliability</th>";
	table+="</thead>";
	table+="<tbody>";
	var p=0.9;
	for(var k=1; k<21; k++){
	    var kRandoms = [];
	    counter = 0;
	    while(kRandoms.length<k){
			var t = getRandomInt(0, 1023);
			if(!in_array(t, kRandoms))
				kRandoms.push(t);
	    }
    	for(var n=0;n<1024; n++){
    	    temp[n] = 0;
    		matrix = new Array(5);
    		nodes[n] = new Array(10);
    	    state = n.toString(2);
    	    padding = 10 - state.length;
    		stateString = "";
    		for(var b=0; b<padding; b++)
    			stateString = stateString.concat("0");
    		stateString = stateString.concat(state);
    		for(var i=0; i<5; i++)
    			matrix[i] = -1;
    		for(var j=0; j<10; j++){
    		    nodes[n][j] = stateString.charAt(j);
    		    if(in_array(n, kRandoms)){
    		        if(nodes[n][j]==0)
    		            nodes[n][j] = 1;
    		        else
    		            nodes[n][j] = 0;
    		    }
    		}
    		if (nodes[n][0] == 1) {
                matrix[0] = 0;
                matrix[1] = 1;
            }
            if (nodes[n][1] == 1) {
                matrix[0] = 0;
                matrix[2] = 2;
            }
            if (nodes[n][2] == 1) {
                matrix[0] = 0;
                matrix[3] = 3;
            }
            if (nodes[n][3] == 1) {
                matrix[0] = 0;
                matrix[4] = 4;
            }
            if (nodes[n][4] == 1) {
                matrix[1] = 1;
                matrix[2] = 2;
            }
            if (nodes[n][5] == 1) {
                matrix[1] = 1;
                matrix[3] = 3;
            }
            if (nodes[n][6] == 1) {
                matrix[1] = 1;
                matrix[4] = 4;
            }
            if (nodes[n][7] == 1) {
                matrix[2] = 2;
                matrix[3] = 3;
            }
            if (nodes[n][8] == 1) {
                matrix[2] = 2;
                matrix[4] = 4;
            }
            if (nodes[n][9] == 1) {
                matrix[3] = 3;
                matrix[4] = 4;
            }
            count = 0;
            for (var j = 0; j < 5; j++)
                count += matrix[j];
            if (count == 10) {
                temp[counter] = n;
                counter++;
            }
    	}
    	for(var i=0; i<linkReliability.length; i++)
    		linkReliability[i] = Math.pow(p, Math.ceil(d[i]/3));
    	for(var n=0;n<1024; n++){
    		if (temp[n] != 0) {
    		    for (var m = 0; m < 10; m++) {
                    if (nodes[temp[n]][m] == 1) {
                        if (localP == -1)
                            localP = linkReliability[m];
                        else
                            localP = localP * linkReliability[m];
                    }else{
                        if (localP == -1)
                            localP = (1 - linkReliability[m]);
                        else
                            localP = localP * (1 - linkReliability[m]);
                    }
                }
                reliability += localP;
                localP = -1;
            }
    	}
    	table+="<tr>";
		    table+="<td>"+k+"</td>";
		    table+="<td>"+reliability+"</td>";
		table+="</tr>";
		kVals.push(k);
		kArr.push(reliability);
		reliability = 0;
	}
	    table+="</tbody>";
	table+="</table>";
	$("#k9").html(table);
	var ctxK = document.getElementById("kChart").getContext("2d");
	var kData = {
        labels: kVals,
        datasets: [
            {
                label: "Network Reliability",
    						fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: kArr,
            }
        ]
	};
	var kChart = new Chart(ctxK).Line(kData, {});
	function in_array(what, where){
		var a=false;
	    for(var i=0;i<where.length;i++){
		    if(what == where[i]){
		    	a=true;
		    	break;
		    }
		}
		return a;
	}
	function getRandomInt (minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}
});

# Network Reliability using EXHAUSTIVE ENUMERATION

This is a JavaScript, HTML5 and CSS3 enabled website which computes the network reliability dependency on the individual link reliabilities

Requirements:

1) A latest version of web browser like Google Chrome or Mozilla Firefox or Safari
2) A folder structure as follows:
  Project2
  |
    - css
    - js
    - index.html (file)

In order to build and execute the program kindly follow the instructions:

1) Create a new file with name index.html and write the following code inside:
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.min.css"/>
    	<link rel="stylesheet" href="css/mystyle.css"/>
		<title>Network Reliability - Jatan Patel</title>
		<script src="js/jquery-1.9.1.min.js"></script>
		<script src="js/chart.min.js"></script>
    	<script src="js/myscript.js"></script>
	</head>
	<body>
		<div class="container">
			<div class="row">
				<div id="urlHolder" class="col-lg-12 text-center">
					<h1>Network Reliability using EXHAUSTIVE ENUMERATION - Jatan Patel (jjp140230)</h1>
				</div>
			</div>
			<div class="row" id="resultHolder"></div>
			<canvas id="pChart" width="800" height="600"></canvas>
			<h2>Fixing p=0.9</h2>
			<div class="row" id="k9"></div>
			<canvas id="kChart" width="800" height="600"></canvas>
		</div>
	</body>
</html>

```

2) Create a new file with name myscript.js inside js folder and write the following code inside:
```
$(document).ready(function(){
	var table = "<table class='table table-striped table-bordered'>";
	table+="<thead>";
		table+="<th>Value of p</th>";
		table+="<th>Network Reliability</th>";
	table+="</thead>";
	table+="<tbody>";
	var N = 5;
	var localP = -1;
	var reliability = 0;
	var myUTDid = [2,0,2,1,2,3,1,0,5,7];
	var d = myUTDid;
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

```

3) Create a new file with name mysstyle.css inside css folder and write the following code inside:
```
body{
	text-align: center;
}
#urlHolder{
	padding-top: 5px;
}
#resultHolder{
	text-align: center !important;
}
#vidURL{
	width: 500px;
}
.row{
	margin-top:25px;
}
thead,th{
	text-align: center !important;
}

```

4) Create a new file with name bootstrap.min.css inside css folder and write the code from the link below:

https://raw.githubusercontent.com/jatanpatel92/ViralAnalysis/master/css/bootstrap.min.css

5) Create a new file with name chart.min.js inside js folder and write the code from the link below:

https://raw.githubusercontent.com/jatanpatel92/ViralAnalysis/master/js/chart.min.js

6) Create a new file with name jquery-1.9.1.min.js inside js folder and write the code from the link below:

https://raw.githubusercontent.com/jatanpatel92/ViralAnalysis/master/js/jquery-1.9.1.min.js

7) Now open index.html with the web browser and explore the results by reloading the page.

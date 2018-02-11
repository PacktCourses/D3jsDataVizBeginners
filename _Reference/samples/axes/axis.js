var chartWidth = 600;
var chartHeight = 50;

var stringDates = ['1/1/2003', '2/1/2003', '3/1/2003', '4/1/2003', '5/1/2003', '6/1/2003'];
var parseDate = d3.timeParse("%m/%d/%Y");


var a = d3.scalePoint().domain(['Apples','Oranges','Pears','Plums']).range([0,chartWidth]);
var b = d3.scalePoint().domain([1, 2, 3, 4]).range([0, chartWidth]);
var c = d3.scalePoint().domain([1, 2, 3, 4]).rangeRound([0, chartWidth]);
var d = d3.scaleBand().domain([1, 2, 3, 4]).range([0, chartWidth]);
var e = d3.scaleBand().domain([1, 2, 3, 4]).rangeRound([0, chartWidth]);

var f = d3.schemeCategory10;
var g = d3.schemeCategory20;
var h = d3.schemeCategory20b;
var ii = d3.schemeCategory20c;

var j = d3.scaleTime().domain(d3.extent(stringDates, function(d){ return parseDate(d); })).range([0,chartWidth]);

var k = d3.scaleLinear().domain([0,1000]).range([0,chartWidth]);
var l = d3.scaleQuantile().domain([0,1000]).range([0,chartWidth]);
var m = d3.scaleQuantize().domain([0,1000]).range([0,chartWidth]);//typically used for colour
var n = d3.scaleThreshold().domain([1,93,428]).range([1,100,130,300]);//typically used for colour
var o = d3.scaleLog().range([0,chartWidth]).base(10);
var pp = d3.scalePow().exponent(2).domain([0,1000]).range([0,chartWidth]);
var qq = d3.scaleSqrt().domain([0,1000]).range([0,chartWidth]);
var r = d3.scaleIdentity().domain([0,1000]).range([0,chartWidth]);




var ordinalScales = [a,b,c,d,e];
var timeScales = [j,j,j,j,j,j,j,j,j,j,j,j,j,j,j,j,j];
var numericScales = [k,l,m,n,o,pp,qq,r];

 var axisTypes = ['Ordinal: scalePoint','Ordinal: scalePoint', 'Ordinal: scalePoint, rangeRound', 'Ordinal: scaleBand', 'Ordinal: scaleBand, rangeRound'];

var svg = d3.select("body").append("svg").attr("id","svg").attr("width","100%").attr("height","200%");


var newY = 0;

for (var p=0; p<ordinalScales.length; p++) {

  var xAxis = d3.axisBottom(ordinalScales[p]);

	var svgGroup = svg.append("g").attr("transform","translate(0,"+((p+1)*chartHeight)+")");
	svgGroup.append("text").attr("class","blue").attr("x","240").attr("y",0).attr("alignment-baseline","middle").attr("text-anchor","end").text(axisTypes[p]);
	svgGroup.append("g").attr("transform","translate(270,0)").attr("class","axis").call(xAxis);



}

var timeTypes = ['Time: default ','Time: ticks(2)','Time: ticks(10)','Time: ticks(12)','Time: tickFormat(%B)','Time: tickFormat(%b)','Time: tickFormat(%Y)','Time: tickFormat(%y)','Time: tickFormat(%b %d)','Time: tickFormat(%a %d)','Time: tickSize(-6)','Time: tickSize(-20)','Time: tickSizeInner(10) & tickSizeOuter(-10)','Time: tickSizeInner(-10) & tickSizeOuter(10)','Time: axisTop()','Time: tickPadding(10)','Time: tickPadding(-10)'];
var newY = chartHeight*ordinalScales.length;



for (var p=0; p<timeScales.length; p++) {


	switch(p) {


		case 0: var xAxis = d3.axisBottom(timeScales[p]); break;
		case 1: var xAxis = d3.axisBottom(timeScales[p]).ticks(2); break;
		case 2: var xAxis = d3.axisBottom(timeScales[p]).ticks(10); break;
		case 3: var xAxis = d3.axisBottom(timeScales[p]).ticks(12); break;
		case 4: var xAxis = d3.axisBottom(timeScales[p]).tickFormat(d3.timeFormat("%B")); break;
		case 5: var xAxis = d3.axisBottom(timeScales[p]).tickFormat(d3.timeFormat("%b")); break;
		case 6: var xAxis = d3.axisBottom(timeScales[p]).tickFormat(d3.timeFormat("%Y")); break;
		case 7: var xAxis = d3.axisBottom(timeScales[p]).tickFormat(d3.timeFormat("%y")); break;
		case 8: var xAxis = d3.axisBottom(timeScales[p]).tickFormat(d3.timeFormat("%b %d")); break;
		case 9: var xAxis = d3.axisBottom(timeScales[p]).tickFormat(d3.timeFormat("%a %d")); break;
		case 10: var xAxis = d3.axisBottom(timeScales[p]).tickSize(-6); break;
		case 11: var xAxis = d3.axisBottom(timeScales[p]).tickSize(-20); break;
		case 12: var xAxis = d3.axisBottom(timeScales[p]).tickSizeInner(10).tickSizeOuter(-10); break;
		case 13: var xAxis = d3.axisBottom(timeScales[p]).tickSizeInner(-10).tickSizeOuter(10); break;
		case 14: var xAxis = d3.axisTop(timeScales[p]); break;
		case 15: var xAxis = d3.axisBottom(timeScales[p]).tickPadding(10); break;
		case 16: var xAxis = d3.axisBottom(timeScales[p]).tickPadding(-10); break;

	}


	var svgGroup = svg.append("g").attr("transform","translate(0,"+(((p+1)*chartHeight)+newY)+")");
	svgGroup.append("text").attr("class","red").attr("x","240").attr("y",0).attr("alignment-baseline","middle").attr("text-anchor","end").text(timeTypes[p]);
	svgGroup.append("g").attr("transform","translate(270,0)").attr("class","axis").call(xAxis);


}


var numberTypes = ['Linear','Quantile','Quantize','Threshold','Log base 10','Power ^ 2','Square root','Identity'];
newY += chartHeight*timeScales.length;

for (var p=0; p<numericScales.length; p++) {


	var xAxis = d3.axisBottom(numericScales[p]).ticks(10);




	var svgGroup = svg.append("g").attr("transform","translate(0,"+(((p+1)*chartHeight)+newY)+")");
	svgGroup.append("text").attr("class","purple").attr("x","240").attr("y",0).attr("alignment-baseline","middle").attr("text-anchor","end").text(numberTypes[p]);
	svgGroup.append("g").attr("transform","translate(270,0)").attr("class","axis").call(xAxis);


}



var svg = document.getElementById("svg");
var bb = svg.getBBox();
svg.style.height = bb.y + bb.height + "px";
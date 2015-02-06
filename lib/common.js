function updateChart(data) {
    var serieColor = ['#5cb85c', '#337ab7'];
    var datasets = Enumerable.From(data).Select(function(s, i) {
        return {
            fillColor: serieColor[i],
            strokeColor: serieColor[i],
            label: data[i].desc,
            data: data[i].serie
        };
    }).ToArray();
    var ctx = $('#chart').get(0).getContext('2d');
    var chart = new Chart(ctx).Bar({
        labels: Enumerable.Range(0, 23).ToArray(),
        datasets: datasets
    }, {
        responsive: true,
        legendTemplate: '<ul class=\"legend\">'
            + '<% for (var i = 0; i < datasets.length; i++) { %>'
            + '<li>'
            + '<span style=\"background-color:<%=datasets[i].fillColor%>\"></span>'
            + '<% if (datasets[i].label) { %><%= datasets[i].label %><% } %>'
            + '</li>'
            + '<% } %>'
            + '</ul>'
    });

    // Generate legend
    var legend = chart.generateLegend();
    $('#legend').html(legend);
}

function showFunctionSource(func) {
    // Get the function body and strip whitespace from the start
    var functionCode = func.toString();
    var functionBody = functionCode.substring(functionCode.indexOf('{') + 1, functionCode.lastIndexOf('}'));
    var whiteSpaceString = Array(functionBody.search(/\S/)).join(' ');
    var code = Enumerable.From(functionBody.split('\n')).Select(function(item) {
        return item.replace(whiteSpaceString, '');
    }).ToArray().join('\n');
    $('#srcCode').html(code);

    // Init highlight
    hljs.initHighlightingOnLoad();
}

function showError(msg) {
    var alert = $('#alertError');
    if (msg) {
        alert.show();
        $('.text', alert).text(msg);
    } else {
        alert.hide();
    }
}
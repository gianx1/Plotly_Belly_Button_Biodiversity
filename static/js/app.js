function getPlot (id) {
    d3.json("samples.json").then((sampledata) => {
        console.log(sampledata)        

        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)

        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)

        var labels = sampledata.samples[0].otu_lables.slice(0,10);
        console.log(labels)

        // get the top 10 OTUs
        var OTU_top = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();

        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)

        var labels = sampledata.samples[0].otu_lables.slice(0,10);
        console.log(`OTU_lables: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(36, 114, 209)'},
            type: "bar", 
            orientation: "h"
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTUs",
            yaxis:{
                tickmode: "linear"
            },

            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30                
            }
        };

    Plotly.newPlot("bar", data, layout);
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels  
        };
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
        
        var data1 = [trace1];

    Plotly.newPlot("bubble", data1, layout_2); 
    });
}

function getDemoInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() ===  id)[0];
        var demographicsInfo = d3.select("#sample-metadata");

        demographicsInfo.html("");

        Object.defineProperties(result).forEach((key) => {
            demographicsInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropDown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropDown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();
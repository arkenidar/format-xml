var formatted=`#a
href=https://google.com
target=_blank
=Link label text with 
#0

#b
=bold text`

var nodes=formatted.split("\n\n")
nodes=nodes.map(_=>_.split("\n"))
console.log(nodes)
console.log(produceXML(nodes,0))

function produceXML(nodes,i){
    var node=nodes[i]
    var xml=""
    var tag_name=node[0].slice(1)
    node=node.slice(1)

    var attributes=""
    var content=""

    for(var item of node){
        if(item[0]=="#"){
            var nested_i=parseInt(item.slice(1))
            content+=produceXML(nodes,(i+1)+nested_i)
        }else
        if(item[0]=="="){
            var text=item.slice(1)
            content+=text
        }else{
            //var pair=item.split("=") // not proper
            var pair=single_split(item,"=")
            attributes+=" "+pair[0]+"=\""+pair[1]+"\""
        }
    }

    xml+="<"+tag_name+attributes+">"
    xml+=content
    xml+="</"+tag_name+">"
    return xml
}

function single_split(string, separator){
    var splitting=string.indexOf(separator)
    if(splitting<0) return
    var before=string.substring(0,splitting)
    var after=string.substring(splitting+separator.length)
    return [before,after]
}

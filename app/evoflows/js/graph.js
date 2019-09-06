
function Graph(listVertex, listMultiedges){

    this.listVertex = listVertex;
    this.listMultiedges = listMultiedges;

    this.getListVertex = ()=>{
        return this.listVertex.map(vertex=>vertex.getName());
    };

    this.getListMultiedges = ()=>{
        return this.listMultiedges.map(multiedge=>multiedge.getName());
    };

    this.isAlreadyVertexById = (id)=>{
        let index = this.listVertex.map(vertex=>vertex.id).indexOf(id);
        return index!=-1?true:false;
    };

    this.isAlreadyVertexByLabel = (label)=>{
        let index = this.listVertex.map(vertex=>vertex.label).indexOf(label);
        return index!=-1?true:false;
    };
}

function Vertex(id,label,position,weight){
    this.id = id;
    this.label = label;
    this.position = position;
    this.weight = weight;

    this.getName = ()=>{
        return this.id + "-" + this.label;
    };
}

function Multiedge(id,idSource,idTarget,listEdges){
    this.id = id;
    this.idSource = idSource;
    this.idTarget = idTarget;
    this.listEdges = listEdges;
}

function Edge(id,label,type,idSource,idTarget){
    this.id = id;
    this.label = label;
    this.type = type;
    this.idSource = idSource;
    this.idTarget = idTarget;

}





























function tangentPoints2Circles(x1,y1,r1,x2,y2,r2){


    let d_sq = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    if (d_sq <= (r1 - r2) * (r1 - r2))
        return [[0,4]];

    let d = Math.sqrt(d_sq);
    let vx = (x2 - x1) / d;
    let vy = (y2 - y1) / d;

    let res = [];
    let i = 0;
    let a = [];

    for (let sign1 = +1; sign1 >= -1; sign1 -= 2) {
        let c = (r1 - sign1 * r2) / d;

        // Now we're just intersecting a line with a circle: v*n=c, n*n=1

        if (c * c > 1.0)
            continue;
        let h = Math.sqrt(Math.max(0.0, 1.0 - c * c));

        for (let sign2 = +1; sign2 >= -1; sign2 -= 2) {
            let nx = vx * c - sign2 * h * vy;
            let ny = vy * c + sign2 * h * vx;
console.log("i",i)
            // a = [];
            a[0] = x1 + r1 * nx;
            a[1] = y1 + r1 * ny;
            a[2] = x2 + sign1 * r2 * nx;
            a[3] = y2 + sign1 * r2 * ny;
        }
    }

    return a;

}
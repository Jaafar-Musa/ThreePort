interface IProj {
    name:string,
    info:string
    projects?:string[]
}
interface IRepo {
    [name:string]:{
        "rating":number,
        description:string,
        "libraries"?:IProj[],
    }
}

export const repo:IRepo= {
    "Py":{
        "rating":10,
        "description":"The first language ive learned",
        "libraries":[{name:"flask",info:"One of the first libraries I've used"},]
    },
    "Html":{
        "rating":85,
        "description":"The first language ive learned",
    }
}
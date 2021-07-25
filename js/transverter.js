//str与json对象互相转换
class transverter{
    constructor(str,json){
        this.str=str;
        this.json=json;
    }
    strTojson(str){
        this.json=JSON.parse(str);//转为json对象
        return this.json;
    }
    jsonTostr(json){
        this.str=JSON.stringify(json);//转为str
        return this.str;
    }
    //get方法
    setstr(str){
        this.str=str;
    }
    setjson(json){
        this.json=json;
    }
    //set方法
    getstr(){
        return str;
    }
    getjson(){
        return json;
    }
 
 
 }
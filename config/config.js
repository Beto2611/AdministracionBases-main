const oracledb= require('oracledb');



const open = async(sql,binds,autoCommit,db) =>{
    try {
        
        let con = await oracledb.getConnection(db);
         let result = await con.execute(sql,binds,{autoCommit});
        con.release();
        return result;
    } catch (error) {
        console.log(error);
    }
    
}

const  DbOnline = async(db) =>{
    try {
        let con = await oracledb.getConnection(db);
        con.release();
        return con;
    } catch (error) {
        console.log('esta mierda no sirve');
    }
    
}
exports.Open = open;
exports.DBONLINE=DbOnline;

const conexion = require('../config/config');



exports.login = async(req, res)=>{
  try {
      
    const user = req.body.user;
    const password= req.body.password;
    if (!user ||!password ) {
      res.render('login',{
        alert:true,
        alertTitle: "Advertencia",
        alertMessage:"Ingrese un usuario y contraseña",
        alertIcon:'info',
        showConfirmButton:true,
        timer:false,
        ruta:"/"
      })
    }else{
        const db={
        user:user,
        password:password,
        connectString:"localhost:1521"
        
    }
    let result = await conexion.DBONLINE(db)
    if (result) {

      req.session.name = user;
      req.session.logged = true;
      let ruta="";
     
      if(user === "Maria" ||user === "Pedro"||user === "Juan"){
        ruta = "cajeroVentas"
      }
      if(user === "Luis"|| user === "Jesus"){
        ruta ="gerenteGeneral"
      }
      
      if(user === "Jose"|| user === "Ana"|| user === "Pablo"|| user === "Carlos"){
        ruta ="gerenteAreas"
      }
      if(user === "David"|| user === "Moises"){
        ruta ="sistemas"
      }
      
      
      res.render('login',{
        alert:true,
        alertTitle: "Conexion exitosa",
        alertMessage:"Login Correcto",
        alertIcon:'success',
        showConfirmButton:false,
        timer:800,
        ruta:ruta
    })
       
    }else{

      res.render('login',{
        alert:true,
        alertTitle: "Advertencia",
        alertMessage:"El nombre usuario o contraseña son incorrectos",
        alertIcon:'error',
        showConfirmButton:true,
        timer:false,
        ruta:"/"
      })


    }
    
    
    
   
  
}
    
    
    
  } catch (error) {
    
      
      console.error(error)
      
  }
  
}

exports.ConsultaPrecioCajero = async (req,res)=>{
 
  const Codigo = req.body.codigo;
  const db={
    user:"system",
    password:"1234",
    connectString:"localhost:1521"
    
}
 const sql= "select nombre from usuario where IDUSUARIO = 1";
 console.log(db)
const Usuarios =[];
let result = await conexion.Open(sql,[],false,db);

result.rows.map(Usuario=>{
  let user ={
      "NOMBRE": Usuario[0], 
  }
  Usuarios.push(user)
});

req.session.Teemo = Usuarios.NOMBRE



res.redirect("/consulta");

 

 }

    
   
  exports.logout =(req,res)=>{

  return res.redirect('/login')
  }
 
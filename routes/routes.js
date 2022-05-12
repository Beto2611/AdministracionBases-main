const { Router } = require("express");
const crud = require("../controllers/crud");
const router = Router();
const DB = require("../config/config");
const OracleDB = require("oracledb");

////////Login//////////////

router.get("/", (req, res) => {
  res.render("login", { alert: false });
});
////////////////////////////////
router.get("/cajeroVentas", (req, res) => {
  if (req.session.logged) {
    res.render("cajeroVentas", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
router.get("/gerenteAreaConsultaProducto", (req, res) => {
  if (req.session.logged) {
    res.render("gerenteAreaConsultas", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
///////////////////////GerenteAREAS
router.get("/gerenteAreas", (req, res) => {
  if (req.session.logged) {
    res.render("gerenteAreas", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
router.get("/Bitacora", (req, res) => {
  if (req.session.logged) {
    res.render("sistemasBitcora", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
router.get("/api/gerenteAreas", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };

    let userCurrentConnect = req.session.name;

    let sql = `select * from table (admindb.getTablaProductoGerenteArea('${req.session.name}'))`;

    let result = await DB.Open(sql, [], true, db);
    let Usuarios = [];
    result.rows.map((Usuario) => {
      let user = {
        EAN: Usuario[0],
        PLU: Usuario[1],
        descripcion: Usuario[2],
        precio: Usuario[3],
        area: Usuario[4],
        cantidad: Usuario[5],
        peso: Usuario[6],
        desciption: Usuario[7],
      };
      Usuarios.push(user);
    });

    res.send(Usuarios);
  } catch (error) {}
});

/////////////////////////////////////////////////////
router.get("/consulta", (req, res) => {
  if (req.session.logged) {
    res.render("cajeroConsultas", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
///////////////////////////MetodosPara El Gerente General////////////////////////////////////////////////
router.get("/api/articulosGerente", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    sql = "select * from table (admindb.getTablaProducto)";

    const Usuarios = [];
    let result = await DB.Open(sql, [], true, db);
    result.rows.map((Usuario) => {
      let user = {
        EAN: Usuario[0],
        PLU: Usuario[1],
        descripcion: Usuario[2],
        precio: Usuario[3],
        area: Usuario[4],
        cantidad: Usuario[5],
        peso: Usuario[6],
        desciption: Usuario[7],
      };
      Usuarios.push(user);
    });

    res.send(Usuarios);
  } catch (error) {}
});
router.get("/GerenteGeneral", (req, res) => {
  if (req.session.logged) {
    res.render("gerenteGeneral", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
router.get("/sistemasFacturas", (req, res) => {
  if (req.session.logged) {
    res.render("sistemasFacturacion", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
router.get("/sistemas", (req, res) => {
  if (req.session.logged) {
    res.render("sistemasProductos", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
router.get("/sistemasArea", (req, res) => {
  if (req.session.logged) {
    res.render("sistemasArea", {
      name: req.session.name,
      login: req.session.logged,
    });
  } else {
    !req.session.logged;
    res.redirect("/");
  }
});
router.delete("/api/articulosGerente/:id", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };

    let aux = req.params.id;

    let sql = "";

    if (aux.length <= 5) {
      sql = `BEGIN
              admindb.eliminar_producto('0','${aux}'); 
              END;`;
    } else {
      sql = `BEGIN
              admindb.eliminar_producto('${aux}','0'); 
              END;`;
    }

    let result = await DB.Open(sql, [], true, db);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
router.post("/api/articulosGerente", async (req, res) => {
  try {
    let data = {
      cod: req.body.codigo,
      Descripcion: req.body.descripcion,
      cantPeso: req.body.stock,
      precio: req.body.cost,
      area: req.body.area,
    };
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    let sql = "";
    if (data.cod.length <= 5) {
      sql = `BEGIN
      admindb.insertar_producto('0','${data.cod}','${data.Descripcion}',${data.precio},'${data.area}',0,${data.cantPeso}); 
      END;`;
    }
    if (data.cod.length === 13) {
      sql = `BEGIN
      admindb.insertar_producto('${data.cod}','0','${data.Descripcion}',${data.precio},'${data.area}',${data.cantPeso},0); 
      END;`;
    }

    let result = await DB.Open(sql, [], true, db);
    res.send(result);
  } catch (error) {}
});

router.put("/api/articulosGerente/:id", async (req, res) => {
  try {
    const data = {
      codigo: req.body.codigo,
      Descripcion: req.body.descripcion,
      cantPeso: req.body.stock,
      precio: req.body.cost,
      area: req.body.area,
    };
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };

    let sql = "";

    if (data.codigo.length <= 5) {
      sql = `BEGIN
    admindb.actualizar_producto('0','${data.codigo}','${data.Descripcion}',${data.precio},0,${data.cantPeso}); 
    END;`;
    }
    if (data.codigo.length == 13) {
      sql = `BEGIN
    admindb.actualizar_producto('${data.codigo}','0','${data.Descripcion}',${data.precio},${data.cantPeso},0); 
    END;`;
    }
    let result = await DB.Open(sql, [], true, db);

    res.send(result);
  } catch (error) {}
});
router.post("/api/CajeroArticulo", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    let test = [];
    const data = {
      cantidad: parseInt(req.body.cantidad),
      subtotal: req.body.subtotal,
      Nofactura: req.body.nofactura,
      numcaja: req.body.numcaja,
      montototal: req.body.montototal,
      idproducto: req.body.idproducto,
      idfresco: req.body.idfresco,
      peso: parseInt(req.body.Peso),
    };
    test.push(data);
    let sql = "";

    test.forEach(async (element) => {
      if (element.idproducto === "0") {
        sql = `BEGIN
        admindb.insertar_factura(${element.peso},${element.subtotal},'${element.Nofactura}',${element.numcaja},${element.montototal},${element.idproducto},${element.idfresco}); 
        END;`;
      }

      if (element.idfresco === "0") {
        sql = `BEGIN
        admindb.insertar_factura(${element.cantidad},${element.subtotal},'${element.Nofactura}',${element.numcaja},${element.montototal},${element.idproducto},${element.idfresco}); 
        END;`;
      }

      let result = await DB.Open(sql, [], true, db);
      res.send(result);
    });

    console.log("test: " + test);
  } catch (error) {
    console.log("error" + error);
  }
});
router.get("/api/CajeroArticulo/:id", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };

    const idArticulo = req.params.id;
    let sql = "";
    if (idArticulo.length <= 5) {
      sql = `select * from table (admindb.getTablaProductoCajero('${req.params.id}','0'))`;
    }

    if (idArticulo.length === 13) {
      sql = `select * from table (admindb.getTablaProductoCajero('0','${req.params.id}'))`;
    }
    let result = await DB.Open(sql, [], true, db);
    let Usuarios = [];
    result.rows.map((Usuario) => {
      let user = {
        EAN: Usuario[0],
        PLU: Usuario[1],
        descripcion: Usuario[2],
        precio: Usuario[3],
        area: Usuario[4],
        cantidad: Usuario[5],
        peso: Usuario[6],
        desciption: Usuario[7],
      };
      Usuarios.push(user);
    });

    res.send(result.rows);
  } catch (error) {}
});

router.get("/api/CajeroArticuloNofactura/", async (req, res) => {
  try {
    const db = await OracleDB.getConnection({
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    });
    const resultado = await db.execute(
      `BEGIN 
        :ret:=admindb.NO_FACTURA();
      END; `,
      {
        ret: {
          dir: OracleDB.BIND_OUT,
          type: OracleDB.DB_TYPE_NUMBER,
          maxSize: 40,
        },
      }
    );
    const aa = resultado.outBinds.ret;
    const numero = {
      nofact: aa,
    };
    res.send(numero);
  } catch (error) {}
});

router.post("/api/CajeroArticuloVerificaCantidad/", async (req, res) => {
  try {
    const db = await OracleDB.getConnection({
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    });
    const resultado = await db.execute(
      `BEGIN 
        :ret:=admindb.VERIFICAR_CANTIDAD_PRODUCTO(:PEAN,:PPLU,:NUMBER);
      END; `,
      {
        PEAN: req.body.EAN,
        PPLU: req.body.PLU,
        NUMBER: req.body.CANTIDAD,
        ret: {
          dir: OracleDB.BIND_OUT,
          type: OracleDB.DB_TYPE_BOOLEAN,
          maxSize: 40,
        },
      }
    );
    const aa = resultado.outBinds.ret;
    const VALIDO = {
      booleano: aa,
    };
    res.send(VALIDO);
  } catch (error) {}
});

router.post("/consulta", crud.ConsultaPrecioCajero);

router.post("/login", crud.login);

router.post("/logout", crud.logout);

router.post("/api/CajeroArticuloConsulta", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };

    let sql = "";

    const con = {
      consulta: `${req.body.consulta}`,
    };

    if (con.consulta.length === 13) {
      sql = `select * from table (admindb.getTablaProductoCajero('0','${con.consulta}'))`;
      let result = await DB.Open(sql, [], true, db);
      let Usuarios = [];
      result.rows.map((Usuario) => {
        let user = {
          EAN: Usuario[0],
          PLU: Usuario[1],
          descripcion: Usuario[2],
          precio: Usuario[3],
          area: Usuario[4],
          cantidad: Usuario[5],
          peso: Usuario[6],
          desciption: Usuario[7],
        };
        res.send(user);
      });
    } else {
      if (con.consulta.length <= 5) {
        sql = `select * from table (admindb.getTablaProductoCajero('${con.consulta}','0'))`;
        let result = await DB.Open(sql, [], true, db);
        let Usuarios = [];
        result.rows.map((Usuario) => {
          let user = {
            EAN: Usuario[0],
            PLU: Usuario[1],
            descripcion: Usuario[2],
            precio: Usuario[3],
            area: Usuario[4],
            cantidad: Usuario[5],
            peso: Usuario[6],
            desciption: Usuario[7],
          };
          res.send(user);
        });
      } else {
        res.send({ res: "no" });
      }
    }
  } catch (error) {}
});

router.post("/api/GerenteAreaConsulta", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };

    const con = {
      consulta: `${req.body.consulta}`,
    };
    const sql = `select * from table ( admindb.getTablaProductoGerenteAreaConsulta('${con.consulta}'))`;

    let result = await DB.Open(sql, [], true, db);
    let Usuarios = [];
    result.rows.map((Usuario) => {
      let user = {
        EAN: Usuario[0],
        PLU: Usuario[1],
        descripcion: Usuario[2],
        precio: Usuario[3],
        area: Usuario[4],
        cantidad: Usuario[5],
        peso: Usuario[6],
        desciption: Usuario[7],
      };
      res.send(user);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/ConsultaArea", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    let Usuarios = [];
    const sql = "select * from table (admindb.getTablaArea)";

    let result = await DB.Open(sql, [], true, db);

    result.rows.map((Usuario) => {
      let user = {
        idArea: Usuario[0],
        idGerente: Usuario[1],
        desciption: Usuario[2],
      };
      Usuarios.push(user);
    });

    res.send(Usuarios);
  } catch (error) {
    console.log(error);
  }
});
router.post("/api/ConsultaArea", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    let data = {
      codigo: req.body.codigo,
      descripcion: req.body.descripcion,
      gerente: req.body.gerente,
    };

    const sql = `BEGIN
    admindb.insertar_area('${data.codigo}','${data.gerente}','${data.descripcion}'); 
    END;`;

    let result = await DB.Open(sql, [], true, db);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/api/ConsultaArea/:id", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    const codigo = req.params.id;

    const sql = `BEGIN
    admindb.eliminar_area('${codigo}'); 
    END;`;

    let result = await DB.Open(sql, [], true, db);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/api/ConsultaArea/:id", async (req, res) => {
  try {
    let data = {
      codigo: req.params.id,
      descripcion: req.body.descripcion,
      gerente: req.body.gerente,
    };
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };

    const sql = `BEGIN
    admindb.actualizar_area('${data.codigo}','${data.descripcion}','${data.gerente}'); 
    END;`;
    let result = await DB.Open(sql, [], true, db);

    res.send(result);
  } catch (error) {}
});

router.get("/api/Bitacoras", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    let Usuarios = [];
    let sql = "select * from table (admindb.getTablaBitacora)";
    let result = await DB.Open(sql, [], true, db);
    result.rows.map((Usuario) => {
      let user = {
        IdBitacora: Usuario[0],
        Usuario: Usuario[1],
        Accion: Usuario[2],
        tablaAlterada: Usuario[3],
        fechamodificacion: Usuario[4],
      };
      Usuarios.push(user);
    });

    res.send(Usuarios);
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/ConsultaFacturas", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    let Usuarios = [];
    const sql = "select * from table (admindb.getTablaFactura)";

    let result = await DB.Open(sql, [], true, db);

    result.rows.map((Usuario) => {
      let user = {
        nofactura: Usuario[0],
        idcajero: Usuario[1],
        fecha: Usuario[2],
        montototal: Usuario[3],
      };
      Usuarios.push(user);
    });

    res.send(Usuarios);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/ConsultaFacturas/:id", async (req, res) => {
  try {
    const db = {
      user: req.session.name,
      password: req.session.name,
      connectString: "localhost:1521",
    };
    const codigo = req.params.id;

    const sql = `BEGIN
    admindb.eliminar_Factura('${codigo}'); 
    END;`;

    let result = await DB.Open(sql, [], true, db);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

let db= require("../src/database/models");
const path = require('path');


let peliculasController={
    crear: function(req,res){
        //para que vea los generos disponibles en nuestrabase de datos
         db.Genero.findAll() //aca uso el alias del modelo 
            .then(function(generos){ //le doy un nombre a la variable que se va a obtener
                return res.render("creacionPeliculas", {generos:generos}) //comparto a la vista el resuldado de la promesa
            })
    },
    guardado: function(req,res){ //procesa la  info del formulario
        db.Pelicula.create({ // lo guarda a la base de datos 
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        });
        res.redirect("/peliculas");
    },
    listado: function(req,res){ 
        db.Pelicula.findAll() //listado de todas las peliculas
            .then(function(peliculas) {
            res.render("ListadoPeliculas", {peliculas:peliculas})
        })   
    },
    detalle: function(req,res){
        db.Pelicula.findByPk(req.params.id, { //el id capturamos desde el listado de pelis, le deccimos que busque por clave primaria
            include:  [{association:"genero"}, {association: "actores"}]//en modelo Peliculas, usamos el nombre de la asociacion (as), aca decimos que queremos incluir la tabla actores y generos
            //genero y actor lo llamaremos en la vista, ej: pelicula.genero.name y/o pelicula.actor.name
        }) 
            .then(function(pelicula){
                res.render("detallePelicula", {pelicula:pelicula})
            })
    },
    editar: function(req, res){ //tenemos dos pedidos asincronicos,
        let pedidoPelicula= db.Pelicula.findByPk(req.params.id); //le pasamos el id que esta en la url
       
        let pedidoGeneros= db.Genero.findAll();
        
        Promise.all([pedidoPelicula, pedidoGeneros]) //array de promesas
            .then( function([pelicula,generos]) {// resultado de las promesas
                res.render("editarPelicula",{pelicula:pelicula, generos:generos} )
            });
    }, 
    actualizar: function(req, res){ // es casi igual a "guardado"
        db.Pelicula.update( { // lo guarda a la base de datos 
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
            }, {
                where:{
                    id:req.params.id
                }
        });
        res.redirect("/peliculas/"+req.params.id); //para que nos redireccione al detalle

    },
    borrar: function(req, res){
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/peliculas");
    }
}


module.exports= peliculasController;

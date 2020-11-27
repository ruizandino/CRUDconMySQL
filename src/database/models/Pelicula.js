
module.exports = function(sequelize, dataTypes){
    let alias= "Pelicula" // le doy un apodo de como voy a llamar a esta tabla
    
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        title: {
            type: dataTypes.STRING

        },
        awards:{
            type: dataTypes.INTEGER
        },
        rating:{
            type: dataTypes.DOUBLE
        },
        length:{
            type: dataTypes.INTEGER
        },
        genre_id:{
            type:dataTypes.INTEGER
        },
        release_date:{
            type: dataTypes.DATE
        }

    }

    let config={
        tableName: "movies",
        timestamps:false
    }

    let Pelicula= sequelize.define(alias,cols,config)
    
    Pelicula.associate = function(models){ // asociacion de las tablas
        Pelicula.belongsTo(models.Genero, {  //pertenece a un solo genero //una pelicula tiene un solo genero
            as:"genero", // nombre de la relacion
            foreignKey: "genre_id" // en peliculas la clave foranea es esa
    
         });
         Pelicula.belongsToMany(models.Actor, { //relacion de muchos a muchos //una pelicula tiene varios actores... y un actor tiene varias peliculas
           as:"actores", // nombre de la relacion, porque yo desdde el genero voy a pedir las muchas peliculas que tiene EL genero
           through: "actor_movie", // a través de actor_movie (tabla intermedia)
            foreignKey: "movie_id", // clave foranea de la tabla actor_movie
            otherKey: "actor_id",
            timestamps: false
        });
    }
    
    
    return Pelicula;
}
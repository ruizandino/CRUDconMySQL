
module.exports = function(sequelize, dataTypes){
    let alias= "Genero"; // le doy un apodo de como voy a llamar a esta tabla
    
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        name: {
            type: dataTypes.STRING

        }
    }

    let config={
        tableName: "genres", //nombre de la tabla en la base de datos
        timestamps:false
    }

    let Genero= sequelize.define(alias, cols, config);
    
    Genero.associate = function(models){ // asociacion de las tablas
        Genero.hasMany(models.Pelicula, {  //Pelicula es el alias del modelo //un genero tiene muchas peliculas asociadas
            as:"peliculas", // nombre de la relacion, porque yo desdde el genero voy a pedir las muchas peliculas que tiene EL genero
            foreignKey: "genre_id" // en peliculas la clave foranea es esa
    
         });
    }
    
    
    return Genero;
}
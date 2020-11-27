module.exports = function(sequelize, dataTypes){
    let alias= "Actor" // le doy un apodo de como voy a llamar a esta tabla
    
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        first_name: {
            type: dataTypes.STRING

        },
        last_name:{
            type: dataTypes.STRING
        }

    };

    let config={
        tableName: "actors", //nombre de la tabla en la base de datos
        timestamps:false
    };

    let Actor= sequelize.define(alias,cols,config);

    Actor.associate = function(models){ // asociacion de las tablas
      Actor.belongsToMany(models.Pelicula, { //relacion de muchos a muchos //una pelicula tiene varios actores... y un actor tiene varias peliculas
           as:"peliculas", 
           through: "actor_movie", // a través de actor_movie (tabla intermedia)
            foreignKey: "actor_id", // clave foranea de la tabla actor_movie
            otherKey: "movie_id",
            timestamps: false
        });
    }

    return Actor; 
    
}
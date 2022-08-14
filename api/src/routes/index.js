const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require("axios")
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

var apiInfo = [];

const getApiGames = async (url) => {
    try {
      if (apiInfo.length <= 100) {
        const apiUrl = await axios.get(url);
        const data2 = await axios.get(apiUrl.data.next);
        const data3 = await axios.get(data2.data.next);
        const data4 = await axios.get(data3.data.next);
        const data5 = await axios.get(data4.data.next);
  
        const union = data3.data.results.concat(data4.data.results);
        const filtro = apiUrl.data.results.concat(data2.data.results);
        const td = filtro.concat(union);
        const todo = data5.data.results.concat(td);
  
        apiInfo = todo.map((e) => {
          return {
            id: e.id,
            name: e.name,
            description: e.description,  
            background_image: e. background_image,
            released: e.released,
            rating: e.rating,
            genres: e.genres
              .map((e) => {
                return e.name;
              })
              .join(" "),
            platform: e.platforms.map((e) => e.platform.name),
          };
        });
        return apiInfo;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoDB = async () => {
    const dbData = await Videogame.findAll({
      include: {
        model: Genre,
        attribute: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbData;
  };

  const allGames = async () => {
    try {
      const api = await getApiGames(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
      );
      const dbInfo = await getInfoDB();
      const allInfo = api.concat(dbInfo);
      return allInfo;
    } catch (error) {
      console.log(error);
    }
  };

   // aqui rutas solicitadas

  router.get("/videogames", async (req, res) =>{ // ?name="el nombre"
    const name = req.query.name //se pide por query
    let videogamesTotales = await allGames()//trae todos los perros
    if(name){ //pregunta si hay un name por query
        let gamesName = await videogamesTotales.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()))//para no tener problema con las mays y minus
        gamesName.length ?//encontraste el nombre?
        res.status(200).send(gamesName):
        res.status(404).send("No esta disponible");
    }else{   
        res.status(200).send(videogamesTotales)//si no hay un query envia los perros totales
    }
})//quiero guardar solo las ocupaciones en la bd y dejarlas listas para cada vez

router.get('/genres', async (req,res) => {
  const genresApi = await axios.get((`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`));
  const genres = await genresApi.data.results.map(e => e.name)

  

  genres.forEach(e => Genre.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
      where: {name: e} //
  }))

  const allGenres = await Genre.findAll() //me traigo todos los generos que guarde en mi db
  res.json(allGenres)
})

router.post('/videogames', async (req,res) =>{
  let {name, description, released, rating, platforms, background_image, genres} = req.body

  if (!name || !description || !genres ) {
      return res.status(400).send("Faltan parametros");
  }
  //valido que el nombre del juego no exista
  const findVideogame = await Videogame.findAll({ where: { name: name } });
  if (findVideogame.length != 0) {
      return res.send("El nombre ya esta en uso");
  }

  
  //creo un videogame
  let vgCreate = await Videogame.create({
      name,
      description,
      rating,
      released,
      background_image,
      platforms: platforms.toString(),

  });
  //busco el genero en mi Base de datos
  let genreDb = await Genre.findAll({
    where: { name: genres },
  });

  //agrego el genero a mi videogame creado
  vgCreate.addGenre(genreDb);

  res.send("El Videogame fue creado con exito");

})

router.get('/videogames/:id', async (req, res) =>{
  const {id} = req.params;
  try{
if(!id.includes('-')){
      let allVideogames = await allGames(); // me trae todo
  
      let idGame = await allVideogames.filter(e => e.id === parseInt(id));
  
      if(idGame.length > 0){
          const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
          const description = detalle.data.description_raw;
          idGame[0]['description'] = description;
          res.status(200).send(idGame)
      }
  }else {
      let gameFound = await Videogame.findByPk(id, {
          include: [{
              model: Genres,
              attributes: ['name'],
              through : {
                  attributes: [],
              }
          }]
      })
      var arreglo = []
      arreglo.push(gameFound)

      res.status(200).json(arreglo)
  }
  }catch(error){
      res.status(404).send(error)
  }
  

})

  
module.exports = router;

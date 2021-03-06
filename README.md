# liri-node-app
**Creator**: `Barry Green`

**Created on**: `Apr 4 2020`
- - -

## ABOUT THE APP
  LIRI (Language Interpretation and Recognition Interface) is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The  `Commands` are:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

   ## HOW LIRI WORKS

   Users will search via command line for artists, songs, or movies using the corresponding command. LIRI will return a list of upcoming concerts, list of songs, or movie data based on the user's input. LIRI will then save the results to a log file. See the examples below:

   ### Concert-this
   This command allows the user to input an artist and LIRI will return a list of upcoming concerts with the venue name, city, date, and time.

   ![Results](/screenshots/concert-this.png)

   ### Spotify-this-song
   This command allows the user to input an song title and LIRI will return a list of songs matching that title. Each song is accompanied by artist, album, and a link to a song preview from Spotify.

   ![Results](/screenshots/spotify-this-song.png)

   ### Movie-this
   This command allows the user to input a movie title and LIRI will return movie ratings from IMDB and Rotten Tomatoes, the country the movie was made in, the language, the cast, and the plot.

   ![Results](/screenshots/movie-this.png)

   ### Do-what-it-says
   This command allows will take a command and search term from the random.txt file and return the result.

   ![Results](/screenshots/doIt.png)

   ### Blank Search Terms
   Each command will has a default return if no search term is entered.

   ![Results](/screenshots/noterm.png)
   ![Results](/screenshots/noterm2.png)

   ### Unrecognized Commands
   If the user puts in an invalid command, LIRI will inform the user how to communitcate with him.

   ![Results](/screenshots/norec.png)

   ## Technologies Used
* Javascript
* Nodejs
* Node packages:
    * Node-Spotify-API
    * Axios
    * Moment
    * DotEnv
* APIs used:
    * Bands in Town
    * OMDB
    * Spotify
* Git
* GitHub


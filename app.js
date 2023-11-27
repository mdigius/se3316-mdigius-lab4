const express = require('express');
const fs = require('fs');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');
const {MongoClient} = require('mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uri = 'mongodb+srv://mdigius:mdigi2012@cluster0.xfcxsn5.mongodb.net/?retryWrites=true&w=majority'
    
const client = new MongoClient(uri);
try{
    client.connect();
    } 
    catch(e){
        console.error(e)
   }
async function listDatabases(){
    const databasesList = await client.db().admin().listDatabases()
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}

const app = express();

app.use(cors());

const superheroInfo = JSON.parse(fs.readFileSync('superhero_info.json'));
const superheroPowers = JSON.parse(fs.readFileSync('superhero_powers.json'));
app.use(express.json());

app.route('/api/secure/:user/lists')
    .get(async (req, res) => {
        const username = req.params.user
        const listResults = await client.db("Superheroes").collection("Lists").find({ username: username }).toArray();

        if (!listResults.length>0) {
            return res.status(404).json({ error: 'User has no lists!' });
        }

        res.json(listResults);

    })
    .post(async (req, res) => {
        const username = req.params.user
        const heroIDs = req.body.heroIDs
        const listName = req.body.listName
        // Verifies that the request included all proper parameters
        if(!username || !heroIDs){
            return res.status(400).json({ error: 'Improper parameters in req body' });
        }
        list = {
            username: username,
            listName: listName,
            heroIDs: heroIDs
        }
        client.db("Superheroes").collection("Lists").insertOne(list)
        res.status(201).json({ message: 'Successfully created list' })
        
    })

    app.route('/api/secure/')
    .get(async (req, res) => {
        const username = req.query.username;
        const password = req.query.password;

        const usernameResult = await client.db("Superheroes").collection("Users").findOne({ username: username });

        if (!usernameResult) {
            return res.status(404).json({ error: 'No account with provided username' });
        }

        // Use bcrypt.compare to compare the hashed password with the provided password
        const isPasswordMatch = await bcrypt.compare(password, usernameResult.password);

        if (isPasswordMatch) {
            res.status(201).json({ message: 'Successfully authenticated user' });
        } else {
            return res.status(400).json({ error: 'Invalid password' });
        }
    })
    .post(async (req, res) => {

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        // Verifies that the request included all proper parameters
        if(!username || !email || !password){
            return res.status(400).json({ error: 'Improper parameters in req body' });
        }
        // Checks to see if there is already an account registered to the passed username and email
        const usernameResult = await client.db("Superheroes").collection("Users").findOne({username: username})
        const emailResult = await client.db("Superheroes").collection("Users").findOne({email: email})
        // If so send an error
        if(usernameResult){
            return res.status(400).json({ error: 'Username taken' });
        }
        if(emailResult){
            return res.status(400).json({ error: 'Email taken' });
        }

        // Hash the password before storing it for security purposes
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user = {
            username: username,
            email: email,
            password: hashedPassword,
            disabled: false

        }
        client.db("Superheroes").collection("Users").insertOne(user)
        res.status(201).json({ message: 'Succesfully added user'})
    })


// Returns JSON objects of all superheroes
app.route('/api/superheroInfo')
    .get((req, res) => {
        res.json(superheroInfo);
    });

// Functionality for searching by superheroID
app.route('/api/superheroInfo/:id')
    .get((req, res) => {
        const superheroId = parseInt(req.params.id);
        const superhero = superheroInfo.find((hero) => hero.id === superheroId);
        if (superhero) {
            res.json(superhero);
        } else {
            res.status(404).json({ message: `No existing superhero with id: ${superheroId}` });
        }
    });

// Functionality for searching by name
app.route('/api/superheroInfo/name/:name')
    .get((req, res) => {
        const name = req.params.name.toLowerCase();
        const superheroes = superheroInfo.filter((hero) => hero.name.toLowerCase().includes(name));
        if (superheroes.length > 0) {
            res.json(superheroes);
        } else {
            res.status(404).json({ message: `No existing superhero with name: ${name}` });
        }
    });

// Functionality for searching powers for a given superhero name
app.route('/api/powers/hero/:name')
    .get((req, res) => {
        const name = req.params.name.toLowerCase();
        const powers = superheroPowers.find((power) => power.hero_names.toLowerCase() === name);
        const truePowers = new Set()
        if (powers) {
            // Loops over all powers and only appends true powers to the set
            for(const power in powers){
                if(powers[power] == 'True'){
                    truePowers.add(power)
                }
            }
            res.json(Array.from(truePowers));
        } else {
            res.status(404).json({ message: `No existing powers for superhero with name: ${name}` });
        }
    });

// Search functionality to return all hero names with a given power
app.get('/api/powers/:power', (req, res) => {
    const requestedPower = req.params.power.toLowerCase();
    const heroes = new Set();

    superheroPowers.forEach((hero) => {
        // Convert each power name to lowercase for case-insensitive comparison
        for (const key in hero) {
            if (key.toLowerCase().includes(requestedPower)) {
                if (hero[key].toLowerCase() === 'true') {
                    // Checks to see if there is a hero found, and not just a null object
                    const foundHero = superheroInfo.find((heroObj) => heroObj.name.toLowerCase() === hero.hero_names.toLowerCase());
                    if (foundHero) {
                        heroes.add(foundHero);
                    }
                }
            }
        }
    });

    if (heroes.size > 0) {
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for power: ${req.params.power}` });
    }
});


// Returns list of all publishers
app.get('/api/publishers', (req, res) => {
    const publishers = new Set();
    superheroInfo.forEach((hero) => {
        publishers.add(hero.Publisher.toLowerCase());
    });
    res.json(Array.from(publishers));
});

// Returns a list of all heroes from a given publisher
app.get('/api/publishers/:id', (req, res) => {
    const pub = req.params.id.toLowerCase();
    const heroes = new Set();
    superheroInfo.forEach((hero) => {
        if (hero.Publisher.toLowerCase().includes(pub)) {
            heroes.add(hero);
        }
    });
    if (heroes.size > 0) {
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for publisher: ${pub}` });
    }
});

// Return list of all races
app.get('/api/race', (req, res) => {
    const races = new Set();
    superheroInfo.forEach((hero) => {
        races.add(hero.Race.toLowerCase());
    });
    res.json(Array.from(races));
});

// Returns a list of all hero names from a given race
app.get('/api/race/:id', (req, res) => {
    const race = req.params.id.toLowerCase();
    const heroes = new Set();
    superheroInfo.forEach((hero) => {
        if (hero.Race.toLowerCase().includes(race)) {
            heroes.add(hero);
        }
    });
    if (heroes.size > 0) {
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for race: ${race}` });
    }
});

app.listen(5002, () => console.log('Listening on port 5002'));
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');
const {MongoClient} = require('mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uri = 'mongodb+srv://mdigius:mdigi2012@cluster0.xfcxsn5.mongodb.net/?retryWrites=true&w=majority'
// Code to kill port: lsof -ti:5002 | xargs kill -9
 
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

app.route('/api/admin/users')
    .get(async (req, res) => {
        const userResults = await client.db("Superheroes").collection("Users").find().toArray()

        if(!userResults){
            return res.status(404).json({ error: 'No users!' });
        }
        const users = new Set()
        userResults.forEach(user => {
            const result = {
                username: user.username,
                disabled: user.disabled
            }
            users.add(result)
        })

        res.json(Array.from(users))

    })
    
    .post(async (req, res) => {
        const username = req.body.username
        const disabled = req.body.disabled
        const userResult = await client.db("Superheroes").collection("Users").findOne({username: username})
        if (!userResult) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        await client.db("Superheroes").collection("Users").updateOne(
            { username: username },
            { $set: { disabled: disabled } }
        );

        res.status(201).json({message: 'Successfully modified users disabled status'})


    })


app.route('/api/reviews/:listName')
    .get(async (req, res) => {
        const listName = req.params.listName
        var counter = 0
        const listResult = await client.db("Superheroes").collection("Lists").findOne({listName: listName})
        if (!listResult) {
            return res.status(404).json({ error: 'List does not exist' });
        }
        const reviewResults = await client.db("Superheroes").collection("Reviews").find({listName: listName}).toArray()
        if(!reviewResults){
            return res.json(counter)
        } else {
            reviewResults.forEach(review => {
                counter+=review.selectedStars
            })
            
            const averageStars = Math.round(counter / reviewResults.length);

            return res.json(averageStars);
        }


    })
app.route('/api/secure/reviews/:listName')
    .get(async (req, res) => {
        const listName = req.params.listName
        const reviewResults = await client.db("Superheroes").collection("Reviews").find({listName: listName}).toArray()
        if(!reviewResults){
            return res.status(404).json({ error: 'List has no reviews' });
        } else {
            res.json(reviewResults)
        }
    })
    .post(async (req,res) => {
        const listName = req.params.listName
        const author = req.body.author
        const selectedStars = req.body.selectedStars
        const comment = req.body.comment
        const listResult = await client.db("Superheroes").collection("Lists").findOne({listName: listName})
        if (!listResult) {
            return res.status(404).json({ error: 'List does not exist' });
        }

        const reviewResult = await client.db("Superheroes").collection("Reviews").findOne({listName: listName, author: author})

        if(reviewResult){
            return res.status(404).json({ error: 'User has already left a review' });
        }

        const review = {
            listName: listName,
            author: author,
            selectedStars: selectedStars,
            comment: comment,
            hidden: false
        }

        client.db("Superheroes").collection("Reviews").insertOne(review)


    })

app.route('/api/secure/:user/modify')
    .post(async (req, res) => {
        const username = req.params.user
        const currentPassword = req.body.currentPassword
        const newPassword = req.body.newPassword

        const usernameResult = await client.db("Superheroes").collection("Users").findOne({ username: username });

        if (!usernameResult) {
            return res.status(404).json({ error: 'No account with the provided username' });
        }

        if (!usernameResult.verified) {
            return res.status(400).json({ error: 'Account is not verified' });
        }

        // Use bcrypt.compare to compare the hashed password with the provided password
        const isPasswordMatch = await bcrypt.compare(currentPassword, usernameResult.password);

        if (isPasswordMatch) {
            // Hash the new password before updating it in the database
            const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

            await client.db("Superheroes").collection("Users").updateOne(
                { username: username },
                { $set: { password: hashedNewPassword } }
            );

            return res.status(201).json({ message: 'Successfully Updated Password' });
        } else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    });

    app.route('/api/secure/publicLists')
    .get(async (req, res) => {
        try {
            const listResults = await client.db("Superheroes").collection("Lists")
                .find({ publicList: true })
                .sort({ date: -1 }) // Sort by date in descending order
                .toArray();

            if (!listResults || listResults.length === 0) {
                return res.status(404).json({ error: 'No public lists available!' });
            }

            res.json(listResults.slice(0, 10));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


app.route('/api/secure/lists/:listName/heroes')
    .get(async (req, res) => {
        const listName = req.params.listName
        const listResult = await client.db("Superheroes").collection("Lists").findOne({listName: listName});

        if (!listResult) {
            return res.status(404).json({ error: 'List does not exist' });
        }
        
        const heroResults = new Set()
        listResult.heroIDs.forEach((myHeroID) => {
            const superhero = superheroInfo.find((hero) => hero.id === myHeroID)
            if (superhero) {
                heroResults.add(superhero);
            }
        })



        res.json(Array.from(heroResults));

    })


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
        const username = req.params.user;
        const heroIDs = req.body.heroIDs;
        const description = req.body.description;
        const listName = req.body.listName;
        const publicList = req.body.publicList;
        const isUpdate = req.body.isUpdate;
    
        // Verifies that the request included all proper parameters
        if (!username || !heroIDs || !listName) {
            return res.status(400).json({ error: 'Improper parameters in req body' });
        }
    
        const currentDate = new Date(); // Get the current date
    
        const list = {
            username: username,
            listName: listName,
            description: description,
            heroIDs: heroIDs.split(',').map(id => parseInt(id.trim(), 10)),
            publicList: publicList,
            date: currentDate, // Add the current date to the list
        };
    
        if (!isUpdate) {
            await client.db("Superheroes").collection("Lists").insertOne(list);
            res.status(201).json({ message: 'Successfully created list' });
        } else {
            await client.db("Superheroes").collection("Lists").updateOne({ listName: listName }, { $set: list });
            res.status(201).json({ message: 'Successfully updated list' });
        }
    })
    .delete(async (req, res) => {
        const listName = req.body.listName
        const listResult = await client.db("Superheroes").collection("Lists").findOne({ listName: listName });
        if(!listName){
            return res.status(400).json({ error: 'Improper parameters in req body' });
        }
        if(!listResult){
            return res.status(404).json({ error: 'List doesnt exist'});
        }

        client.db("Superheroes").collection("Lists").deleteOne({listName: listName})
        res.status(201).json({ message: 'Successfully deleted list' })
    })

    app.route('/api/secure/')
    .get(async (req, res) => {
        const username = req.query.username;
        const password = req.query.password;

        const usernameResult = await client.db("Superheroes").collection("Users").findOne({ username: username });

        if (!usernameResult) {
            
            return res.status(404).json({ error: 'No account with provided username' });
        }
        if(usernameResult.verified == false){
            return res.status(400).json('Account is not verified');

        }
        if(usernameResult.disabled == true){
            return res.status(401).json({message: 'Account is disabled. Contact site administrator' });
            
        }
        // Use bcrypt.compare to compare the hashed password with the provided password
        const isPasswordMatch = await bcrypt.compare(password, usernameResult.password);

        if (isPasswordMatch) {
            if(usernameResult.admin){
                res.json(true)
            } else {
            res.status(201).json({ message: 'Successfully authenticated user' });
            }
        } else {
            return res.status(402).json({message: 'Invalid password' });
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
            disabled: false,
            verified: true,
            admin: false
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
        const returnN = req.query.returnN;
        const name = req.params.name.toLowerCase();
        const superheroes = superheroInfo.filter((hero) => hero.name.toLowerCase().includes(name));
        if (superheroes.length > 0) {
            if(returnN){
                res.json(superheroes.slice(0, returnN))
            }
            res.json(superheroes);
        } else {
            res.status(404).json({ message: `No existing superhero with name: ${name}` });
        }
    });

// Functionality for searching powers for a given superhero name
app.route('/api/power/hero/:name')
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
app.get('/api/power/:power', (req, res) => {
    const requestedPower = req.params.power.toLowerCase();
    const returnN = req.query.returnN;
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
        if(returnN){
            res.json(Array.from(heroes).slice(0, returnN))
        }
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for power: ${req.params.power}` });
    }
});


// Returns list of all publishers
app.get('/api/publisher', (req, res) => {
    const publishers = new Set();
    superheroInfo.forEach((hero) => {
        publishers.add(hero.Publisher.toLowerCase());
    });
    res.json(Array.from(publishers));
});

// Returns a list of all heroes from a given publisher
app.get('/api/publisher/:id', (req, res) => {
    const pub = req.params.id.toLowerCase();
    const returnN = req.query.returnN;
    const heroes = new Set();
    superheroInfo.forEach((hero) => {
        if (hero.Publisher.toLowerCase().includes(pub)) {
            heroes.add(hero);
        }
    });
    if (heroes.size > 0) {
        if(returnN){
            res.json(Array.from(heroes).slice(0, returnN))
        }
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
    const returnN = req.query.returnN;
    const heroes = new Set();
    superheroInfo.forEach((hero) => {
        if (hero.Race.toLowerCase().includes(race)) {
            heroes.add(hero);
        }
    });
    if (heroes.size > 0) {
        if(returnN){
            res.json(Array.from(heroes).slice(0, returnN))
        }
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for race: ${race}` });
    }
});

app.listen(5002, () => console.log('Listening on port 5002'));
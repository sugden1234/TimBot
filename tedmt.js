console.log(`Loading...`);

//Calling packages
const Discord = require('discord.js');
const { token } = require('./config.json');
const eco = require("discord-economy");
const client = new Discord.Client();
const modRole = 'Wizard\'s Foot';
const modRole2 = 'Wizard\'s Foot';
const banRole = 'useless bitch';
const sql = require('sqlite');
sql.open('Storage/userData.sqlite');

//Initialization
client.on('ready', () => {
    console.log('TedMT v0.9.0 Launched');
})

//Listener
client.on('message', async message => {
    //Variables
    var msg = message.content.toUpperCase();
    var prefix = 'T!';
    var prefix2 = 'S!';
    var sender = message.author;

    var currencyName = `SilverBux`;

    if(msg.startsWith(prefix)) {
        var args = message.content.slice(prefix.length).trim().split(/ +/g); //Creates array with content after prefix
        var command = args.shift().toUpperCase(); //Slices off the first word e.g. 'm!<this part>'
    } else if (msg.startsWith(prefix2)) {
        var sArgs = message.content.slice(prefix.length).trim().split(/ +/g); //Creates array with content after prefix
        var sCommand = sArgs.shift().toUpperCase(); //Slices off the first word e.g. 'm!<this part>'
    }

    //Ignore
    if (!msg.startsWith(prefix) && !msg.startsWith(prefix2)) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    //Ping
    if (command === `PING`) {
        message.channel.send('Fuck you!');
    }

    if (sCommand === `PING`) {
        message.channel.send('Fuck you too!');
    }

    //Help
    if (command === `HELP`) {
        const embed = new Discord.RichEmbed()
            .setTitle(`TedMT Help`)
            .setColor(0xF1C40F)
            .addField('t!help', `What you're looking at right now.`, true)
            .addField('t!bal', `Displays your TedCoin balance.`, true)
            .addField('t!give <amount> <user>', `Gives TedCoin to another user`, true)
            .addField('t!quote', 'Try it :)', true)
        message.channel.send({embed});
    }

    //General
    if (command === `QUOTE` || command === `Q`) {
        var quotes = [`What's your favorite minecraft block?`,
            `You lack a fundamental understanding of literature if you ever slightly enjoyed the character of Taylor`,
            `Puff is too high`,
            `Puff is too low`,
            `puff is too low`,
            `Instead of walking home why don't you take your cop car?`,
            `gang`,
            `I wouldn't like Fiction half as much if other people didn't hate him lol`,
            `It's time for an honest leader, Ganon 2020.`,
            `this may just be a goblin den I've been invited into`,
            `lol people like the last jedi\nthats hilarious`,
            `Cops get muted`,
            `Has anyone actually ever IRL moonwalked an entire marathon before?`,
            `I wish my gf was blue haired, tall and had a sword`,
            `DUCK. FUCKING. NUMBERS.`,
            `we need TedUniversalBasicIncome`,
            `I MADE THE FUCKING POST\nFUCK you. I **FUCKING** HATE YOU. FUCK you.\nFUCK YOU.`,
            `as always, scandenavia looks like a bunch a penis`,
            `Some of us appreciate flaccid dicks\nThey look kinder`,
            `Food is delicious, and cosplaying is for nerds.`,
            `It Darshed me up cuz I was thinking about how it'd Darsh me up.\nIt was multi-opponent conditioning.`,
            `*jumps off and nairs into the blast zone*\nIs this the Ginger nair?`,
            `I think that listening to rage against the machine is the fastest way to improve short term as pichu`,
            `ok`,
            `sploosh sploosh`,
            `The penis makes it better`,
            `lol u guys are/aren't into dick?`,
            `I mean realistically speaking, I would bang irl\nBut I wouldn't fap`,
            `I wouldn't bang in this instance\nTilted photo`,
            `Pseudobiceros hancockanus`,
            `Nah don't worry fam I'm a stem major so I'm not legally allowed to talk to g*rls`,
            `a dick should be the rough shape and texture of a brick`,
            `Karen Nanney 😍`,
            `SKELETON ORB`,
            `fuckability of a gooblin or otherwise relevant cutyamagubbin is related to 3 primary qualities\n1. personality\n2. absolute threat to your life\n3. butt`,
            `if they had dna-up bio-remodeling and i could transition into an orc i would be there in a heartbeat`,
            `I forgot that the month of May existed`,
            `lets hear it one more time\nbotched! foreskin! restoration!`,
            `Santa does exist, and I can confirm he has two dicks.`,
            `Is it better to be feared or loved for having two dicks?`,
            `Obviously the female gerudo have dicks\nIt's just that Gannon has *two* dicks`,
            `You've really gotta try making fun of black people sometime, it's a lot of fun`,
            `"But I very much enjoy just fox" - Stephen 'Darsh' McTowlie 2019`,
            `"But I very much enjoy... Stephen 'Darsh' McTowlie" -Subjective 'SubjectiveF' F, 2019`,
            `fox's aerials are more diverse than the ult roster`,
            `I like the Swastika`,
            `You think he's man enough to rape?`,
            `do your parents know that you're speaking about nazism while in the car`,
            `Feels Cael Man`,
            `you descend into the abyss that is candy corn, and then you're like OH NO...`,
            `Hot people are my type.`,
            `Who would win: 3 Vishes or 2 Chillins?`,
            `hboard`,
            `The b0xx manifesto is only like half the length of Capital volume 1`,
            `Darsh you're stupid\nRead the manual`,
            `Repent, zoomer!`,
            `don't quote me but that's a 3 frame window`,
            `If there is a God, why do good things happen to Sheik mains?`,
            `I don't get it, how do you not be loud?`,
            `Staying Up Late thinking about how mang0 definitely has more hair on his ass cheeks than me`,
            `I'm the baby being delivered`,
            `i am the quickest male\nit's not always a good thing 🙁`,
            `u deestand`,
            `I think everything in this situation is retarded, including us`,
            `SeethethingisIagreewithmostofthestuffinyourpostbutyourpostisjustadescriptionofthingsthattakeskillincs,itdoesn'treallydomuchtocomparethemtotf2orexplainwhytheytakemoreskillthanallthethingsintf2.Icouldmakeasimilarpost,talkingaboutalltheintricaciesoftf2notpresentincsgo,likethecomplexmovementtechniquesofsoldieranddemo(andevenscout),ubers,etc.butIdon'tthinkthat'sagoodwaytosumuphowmuchskillagametakesbecauseit'snotreallyabouttheNUMBERofmechanicsinthegameyoucanlistoff,it'saboutHOWdeepeachoneofthemis.Forexample,thefactthatmomentumcarriesoverwithgrenadesiscertainlyacoolfeatureincs,butinthegrandschemeofthingstheamountofskillrequiredtomasterthatisabsolutelynegligiblecomparedtothegameasawholeandnotevenreallyworthmentioning,tbh.Samegoesformostofthelittlethingsyoumentioninyourpost,eventhoughthey'realsorealthings.TF2doesn'thaveasmanyminutemechanicstolistoff,buttheonesthataretherearearguablymorecomplex.Thevarietyintroducedbythedifferentclassesisfarmoresignificantthanthatofthedifferentweaponsincsgo,theplayergenerallyhasmoreoptionsavailabletothematonetime,andthere'sjustgenerallymoregoingonatonceintf2thancsgo.Specifically,IthinkyouranalogywasreallybadwiththeLolvsDota2stuff,becauseLoLandDota2arefundamentallysimilargameswhereDotaismorecomplexmechanically,buttf2andcsgoaren'tevenfundamentallysimilargamessoyoucan'treallymakethecomparison.Onthesurface,csgodoeshavemoremechanicsthantf2,butthat'scertainlynotanywhereclosetothewholestory,regardlessofwhichgamehasahigherskillceilingoverall.`,
            `The interesting thing about FD is that it has no platforms`,
            `"I don't care if mango won"\n- Sugden`,
            `Why would anybody do drugs when you could just mow the lawn?`,
            `Why does hbox, the largest top 10 player, not simply eat the others?`,
            `It's 2019 and Hbox is still out here not knowing how to jc crab`,
            `🦀 MELEE IS DEAD 🦀`,
            `The true darsh up is the friends we made along the way.`,
            `SUGDEN MY BALLS`,
            `True story, when Hbox was in high school, a gaggle of girls dumped a barrel of live crabs on him while he was in a bathroom stall.\nThe name of those girls?\nStephen McTowlie`,
            `if you grow up around enough itals you learn to sling salami`,
            `I wish foreskins were real`,
            `Jesus goes to bed at 7:30 on fridays`,
            `I wouldn’t netplay for the same reasons that I don’t cry in front of my dad`,
            `Netplay, along with the Peking man, is a sin beacon designed to make us stop going to work and roll stop signs in mall parking lots`,
            `Asking is pointless because nobody will ever say no.`,
            `ill suck you guys again, watch me`,
            `I plan to get at least 5 belts on my 23rd birthday`,
            `How is PPMD meditating if he isn't wearing an Amazon Basics monk outfit?`,
            `linux is basically project m`,
            `I'm saving my pee till marriage`,
            `gamer boy pee - a PPMD combo video`,
            `Zen and the Art of Marth Maintenance - a PPMD Combo Video [Stream 2019]`,
            `be like water - a PPMD combo video [APEX 2015]`,
            `lmao imagine gimr actually counting something that isn't his money`,
            `cum`,
            `You can hate jews and not be a nazi.`,
            `I don't care for balls.`,
            `thinking that traps are gay is utopian`,
            `You're not much of a scientist, are you?`,
            `Dude, balls suck`,
            `just warms my cockles that someone somewhere gets the wizzrod`,
            `darsh brand dick pills`,
            `I think Sub's rubbing off on me.\nI think that's illegal.\nNo, I'm just counting friendlies.`,
            `Young Link's just like me because he's blonde and drinks milk.`,
            `Go to GOML`,
            `Susan B Anthony? More like Susan B Shopping!`,
            `You coulda cum way deeper`,
            `I sweat to god`,
            `Traps aren't gay isn't a meme`,
            `Hey, is your refrigerator running?`,
            `THEY HAVE A FLAG?`,
            `more like isn'treal`,
            `So you know, like, redheads?\nSome of them look really good, but some of them are uggos\nThey're like the Westballz of women.`,
            `Tear gas makes people cry, and laughing gas makes people laugh, what other types of gas do you wish existed?\nCum gas.`,
            `i'm feeling so attacked that you should be forced to roll a d20 for initiative`,
            `Get over here and gimme a smooch you hot piece of ass`,
            `If they put stomp knee in the louvre, I'm burning another notre dame`,
            `Beywiz only lets me vape from his stuff if he inhales first and then blows it into my mouth while we lock lips.`,
            `italians make the worst pasta`,
            `They aren't gods, they're humans.\nThey rape children just like you or me.`,
            `sometimes I entertain myself for hours just hitting t!q`,
            `Are there special dating platforms for people like us? Finding these girls in reality seems to be really challenging, whenever I chat up a girl at a bar she either seems to be only into horses (which can sometimes be a little too weird), girly tv shows or opera music. Granted my sample size isn't that big but that's my impression so far. Now I'm not looking for anything special: 18 to 21, thin, loves Melee (not just casually but plays herself and can appreciate the beauty that is PPMD's Marth), c cups, red hair (I main Fox), especially into spacies. However if only b cups are available, that will work out just fine too. These girls seem to be kind of rare though, however with the help of the internet it should be theoretically easier to find them, but I'm not sure how, maybe I'm disregarding the most obvious solutions.`,
            `there is no context for abstract questions of reality`,
            `Pornstars Without Borders was a tremendous PR success.`,
            `Stadium is like a nightmare where I'm playing melee, then all of a sudden we're in adventure mode.`,
            `getting better has made me worse`,
            `Sugden on deez nuts\nU gotta sugden on deez nuts\nGonna be Sugden on deez nuts\nDeez Nuts need a Sug\nEnough Sug? Not for Deez Nuts\nNine Eleven`,
            `Learn how to make lemons out of lemonade, come to my seminar!`,
            `they are the future\nim just here to put a lil boom in their zoom you know`,
            `Sheik mains read all the cards in Cards against Humanity but never play the game.`,
            `hey kids wanna go bomb a US military base?\nnot a fed btw`,
            `I hate how good his D is`,
            `What if Obama was a Sheik main?`,
            `ADLP: Am Dope Love Penis`,
            `If you doxx my mom I will end you`,
            `Dragon Ball Z is not an anime`,
            `I respect the attempt at Hitler, but I think your attempt is a disservice to a great man.`,
            `There's no bad kind of eugenics.`,
            `no one engages with video game content more VITALLY and AUTHENTICALLY than i do, i guarantee you that much`,
            `Iron man dies and doesn't come back\nThere's time travel bullshit\nBlack Widow dies and doesn't come back\nCaptain America travels back in time and stays there so he ages like 100 years\nThor gets fat and fortnite dances\noops did I do that?`,
            `"Pichu is slept on, man."\n -SubjectiveF`,
            `when you think about it, has humanity really ever topped yogurt covered pretzels?`,
            `It's true you don't see many dwarf women. And in fact, they are so alike in voice and appearance that they are often mistaken for dwarf men. And this in turn has given rise to the belief that there are no dwarf women, and that dwarves just spring out of holes in the ground!`,
            `What other takes did you bring back from the arctic?`,
            `KJH is black SFAT`,
            `I need to be gay for the fashion`,
            `90s kids remember when ppl liked dj`,
            `You think after Leffen jab upsmash hbox to take the set, he leaned over to hbox and said 'that was a read, by the way. You can't do that on reaction'?`,
            `You think hbox pops off after he beats his wife?`,
            `Like it or not, I am a part of this community. So when you put on your naruto shirts and your Hen-ties, you're dragging me down with you.`,
            `I misinterpreted what I meant to say`,
            `if a tree fell in the woods and no one was there to hear it, how would they burn 30000 bodies a day?`,
            `I unironically think Giorno is one of the most beautiful fictional characters, he easily surpasses a lot of girls in beauty and style. Just look at the donuts on his hair, at his chest, his magnificent lips. Love the wings on his winch, rhombus pattern on his back. He's slim yet muscular. Young and pure. \nI'm not gay, but damn he's good.`,
            `I am every living thing in britain`,
            `hmm okay kingdom hearts might be devoid of merit`,
            `Darsh is better than top players.`,
            `DJmutendo`,
            `Shroomed is white.`,
            `I'm actually two caels in a trench coat`,
            `My melee starts in my balls and runs into my fingertips without stopping by my brain.`,
            `it was me :)`,
            `Peeing would be better if the piss could go back into your bladder if it wanted.`,
            `it's a plane you move through linearly, without changing directions`,
            `Fox carries the game by making lame characters more fun to play and watch when they combo spacies. The reality is no one would play floaties if spacies didn’t exist to get combod by them so next time you play a fox or falco thank them for existing so that you can have your fun.`,
            `No matter how you try easing people in here, they're gonna meet SubF at some point.`,
            `what about instead of “worm” its “norm” and its the same book except norm macdonald is the main character`,
            `Ironic, he could roll from everyone, except himself`,
            `It's over Ganon! I have the top platform!`,
            `You underestimate my up air!`,
            `Welcome to the shit post section, Hello There! Ha! Just a little prequel meme humour for ya.\nRemember, keep it shitty, but try not to be the most gaping buttholes on the internet ;)`,
            `I killed all of them.... And not just the foxes, but the midtiers and the low tiers`,
            `hbox is a full time egamer\nwho games harder, faster, or more thoroughly than him?`,
            `Y'all a bunch of ignant doogiehousers`,
            `women my age are kinda low tier\nfucking someone so young would feel kinda pedophilic`,
            `bowser doesn't get comboed harder than fox`,
            `There’s nothing more attractive than a woman who’s okay with me being emotionally unavailable`,
            `what if u were friends with tony stark and spiderman and u went to johnny rockets 2gether`,
            `what if peter parker met black panther and told him about memes jsjksksjsjkskj\nwhat if thor sex captain marvel`,
            `"Because I am a top" -Darsh 2019`,
            `it was platonic animal abuse`,
            `I love gentlemen`,
            `can't wait for sug's girlfriend to get pregnant and for us all to react with :SugMistake:`,
            `*Silverhand Inc. The Technology Revolutionary who blesses us with modern advancements*`,
            `The balls are just adherent to the asshole`,
            `It's not that I have a huge dick, it's that I have a really small gooch`,
            `hax is just Wizzy but for delivery dates`,
            `any moderator who doesn't show intense favoritism to the notable users of this discord is wack`,
            `cyberbullying is:\n❌ great\n❌ acceptable\n❌ real`,
            `Just found out benjamin franklin was never a president`,
            `I was never used to seeing bald white people`,
            `N3z likes top players more than normal dudes`,
            `Yeah kira was dumb but who can blame him he lived in 2015 california`,
            `Never cum`,
            `If I had been raised by more abusive parents I would have probably bullied kids like Fiction`,
            `Ok, I'm gonna send a message. React to it with an emote and I'll time you.\nReady?\nGo!`,
            `rog would love to be cucked way more than midnight`,
            `the founder of Mormonism married a 14 year old\nwhat a pimp!`,
            `I, too, am the child`,
            `Undertale is such a safe space that not even the gameplay can get you.`,
            `No, I think Juiey is probably a Braziliancel`,
            `D is off the menu, my mom took it`,
            `I just learned a new spell... Spanish!`,
            `bug catcher baby driver wants to battle!`,
            `Everyone in this fucking server except for me is a beaner`,
            `Seafood sucks`,
            `Dexterito\nQuiero desnudarte a besos dexterito\nFirmo en las paredes de tu laberinto\nY hacer de tu cuerpo todo un manuscrito (sube, sube, sube)\n(Sube, sube)`,
            `I have many mid level spacie problems. The main one being I’m actually low level.`,
            `8==============D SYKE I'M A GROWER NOT A SHOWER`,
            `You should have given me head\n-gay thanos`,
            `Lesbian sex is extended foreplay.\nIt just keeps going right on into fiveplay.\nAnd sixplay.\nA lot of butt bumping, actually.`,
            `i thought lesbian sex was just bumping boobs into each other`,
            `lmao @ reading anything other than cereal boxes and ur moms diary`,
            `well whatever you do, DO NOT go to a college party and while there DEFINITELY DO NOT drink alcohol which will lower your inhibitions, and DO NOT limit yourself to exactly 1 drink so you'll still be mindful of the valuable advice you've been given here`,
            `What are you smoking them with?\nBecause if it isn't the corpse of Sweet Baby Ray himself, it just isn't good enough.`,
            `i was a fat kid for what felt like 30 min\nnever felt bad about it it was fun playing with my titties`,
            `I fuckin love klopmario`,
            `Alexa, set alarm for six thirty AM\nAlexa, set alarm for six fourty-five AM\nAlexa, set alarm for six fifty AM\n...\nAlexa, send resignation letter`,
            `The X-Files is like The Office but not funny`,
            `was there a big armada/mango rivalry?`,
            `PoE more like P(oopo)o(peepe)E`,
            `"I will happily concede that Risc is the best [...] DK on the server" - Paul "Chandy" Chanderson, August 2019`,
            `I eat the tape, but you know, that's like a fruit roll up`,
            `also, should i get this hat?\njavascript:;`,
            `your mom is gonna display in whatever language her console is set to`,
            `I'm standing naked in my bathroom chugging a pre shower brewski so I'll be right back with you kids`,
            `tread lightly, lest you get sucked off by me right now`,
            `i do all kinds of stupid and gay shit. they cant attack you if you dress up as a girl and kiss them. i dont like doing it  but it works`,
            `you play ganon for long enough, you're gonna get ganon brain`,
            `what the fuck is a rhombus?`,
            `he double stocked him!`,
            `If he was under 12 years of age, then I'll allow it.`,
            `I thought barnes and noble was the ice cream shop`,
            `I want wub to have kids so I can curbstomp his kids`,
            `people who say vaginas are good looking are psychopaths`,
            `"Never paying attention to that Gringo Mudblood again." -SubF`,
            `October sucks`,
            `I should do octo nut october\n8 times a day`,
            `wear a trench coat and a hat every day and stand in the corner\npeople like mystery`,
            `protip: everyone is gay`,
            `i've never agreed with you more\nPDA deserves jail time`,
            `like if you wanted to fuck the blue people from avatar or a klingon in public people still wouldn't like that`,
            `I still think people holding hands in public should be beaned in the gourd with tennis balls`,
            `Theres a guy near me using his outside voice while indoors\nNobody else is nearly as loud as him\nSub can you please quiet down a bit`,
            `Try\n- Using more Slurs\n- Breaking things in your home\n- Internalizing the emotions but letting your self-worth take the brunt of the negative energy`,
            `Jerking off before you respond to your crush’s text so you won’t say dumb shit was like my number one high school life hack`,
            `morning boner is basically a phone alarm for me to take my ssri now`,
            `depending on what you use reddit for, either all the posters are assholes or all the posts are assholes`,
            `My grandma owns an old timey cash register, I guess her house is a store now and people can just buy her furniture`,
            `That's because burritos are American.`,
            `I wish I would just eat shit and die`,
            `socially, im the most retarded demographic`,
            `I watched hentai before I watched porn for the first time because it got linked in youtube comments`,
            `Thats not minecraft, thats my wife!`,
            `| only type | with | because |'m a fucking hipster`,
            `not l, the gamer\nwas it an i or an L?\nwho knows\nonly I, the gamer\n- a poem by wub -`,
            `zizek really is just hegelfag lobsterman but his video where he rails against political correctness and how his black friends giving him the n word pass are useful for decoverting to be nazi imageboard users`,
            `That's both an off and a yikes.\nYoof.`];

        var r = Math.floor((Math.random() * quotes.length));

        message.channel.send(quotes[r]);
    }

    if (command === `CRAB`) {
        var daily = await eco.Daily(sender.id);

        if (daily.updated) {
            var c = [`the crab hits your face`,
                    `the crab hits your face`,
                    `the crab grabs onto your arm and pinches it as it flies by`,
                    `the crab grabs onto your arm and pinches it as it flies by`,
                    `the crab falling single hit uairs you`,
                    `the crab falling single hit uairs you`,
                    `the crab narrowly misses you`,
                    `the crab narrowly misses you`,
                    `the crab sails over your head`,
                    `the crab sails over your head`,
                    `you are not a puff main and your superior reflexes allow you to catch the crab`,
                    `you are not a puff main and your superior reflexes allow you to catch the crab`,
                    `the crab reverse fadeback fairs you`,
                    `you use your copious amount of tech skill practice to jc crab and escape`];

            var r = Math.floor((Math.random() * c.length));

            message.channel.send(c[r]);

            var reward = 0;

            if (r < 2) {
                reward = 15;
            } else if (r >= 2 && r < 4) {
                reward = 20;
            } else if (r >= 4 && r < 6) {
                reward = 25;
            } else if (r >= 6 && r < 8) {
                reward = 40;
            } else if (r >= 8 && r < 10) {
                reward = 55;
            } else if (r >= 10 && r < 12) {
                reward = 75;
            } else if (r >= 12 && r < 13) {
                reward = 90;
            } else if (r >= 13 && r < 14) {
                reward = 100;
            }

            var results = await eco.AddToBalance(sender.id, reward);

            if (r > 5) {
                const embed = new Discord.RichEmbed()
                    .setTitle(`Congratulations! You won ${reward} ${currencyName}`)
                    .setColor(0xF1C40F)
                    .addField(`${currencyName}`, `${results.newbalance}`, true)
                message.channel.send({embed});
            } else {
                const embed = new Discord.RichEmbed()
                    .setTitle(`Congratulations..? You won ${reward} ${currencyName}`)
                    .setColor(0xF1C40F)
                    .addField(`${currencyName}`, `${results.newbalance}`, true)
                message.channel.send({embed});
            }

            var d = new Date();

            if(d.getDay() == 5) {
                var r2 = Math.floor((Math.random() * c.length));

                message.channel.send(`It's double crab friday!\n`+c[r2]);

                var reward = 0;

                if (r2 < 2) {
                    reward = 15;
                } else if (r2 >= 2 && r2 < 4) {
                    reward = 20;
                } else if (r2 >= 4 && r2 < 6) {
                    reward = 25;
                } else if (r2 >= 6 && r2 < 8) {
                    reward = 40;
                } else if (r2 >= 8 && r2 < 10) {
                    reward = 55;
                } else if (r2 >= 10 && r2 < 12) {
                    reward = 75;
                } else if (r2 >= 12 && r2 < 13) {
                    reward = 90;
                } else if (r2 >= 13 && r2 < 14) {
                    reward = 100;
                }

                var results = await eco.AddToBalance(sender.id, reward);

                if (r > 5) {
                    const embed = new Discord.RichEmbed()
                        .setTitle(`Congratulations! You won ${reward} ${currencyName}`)
                        .setColor(0xF1C40F)
                        .addField(`${currencyName}`, `${results.newbalance}`, true)
                    message.channel.send({embed});
                } else {
                    const embed = new Discord.RichEmbed()
                        .setTitle(`Congratulations..? You won ${reward} ${currencyName}`)
                        .setColor(0xF1C40F)
                        .addField(`${currencyName}`, `${results.newbalance}`, true)
                    message.channel.send({embed});
                }
            }
        } else {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: already completed')
                .setDescription('This command can be used once per day, you have ' + daily.timetowait + ' remaining.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }
    }

    //Holiday Commands
    /* 4th of July
    if (command === `FIREWORK` || command === `FIREWORKS`) {
        var c = [`the firework explodes in your face`,
                `the firework sails over your head`,
                `the firework narrowly misses you`,
                `the firework burns the hair off your arm as it flies by`,
                `you are not a puff main and your superior reflexes allow you to catch the firework and throw it at someone else`,
                `the firework flies where it's supposed to and looks pretty`,
                `the firework lands on the ground right in front of you`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    } */

    //People Commands
    if (command === `SUBF` || command === `SUBJECTIVE` || command === `SUBJECTIVEF`) {
        var f = [`Fox`,
            `Fun`,
            `Fuck`,
            `Fucker`,
            `Fascist`,
            `Fag`,
            `FungaBunga`,
            `Fiction`,
            `Falco`,
            `Fungus`,
            `Fashion`,
            `Finance`,
            `Flower`,
            `Fraud`,
            `Frick`,
            `puFf`,
            `Falcon`,
            `Free`,
            `Floaty`,
            `Fastfaller`,
            `Fast fall`,
            `Fish`,
            `F-air`,
            `F-smash`,
            `Foxtrot`,
            `Full hop`,
            `Final Destination`,
            `Frame`,
            `Future`,
            `FMT`,
            `Feminine penis`,
            `Fucking love penis`,
            `Fuck engineers`,
            `Fuck mini sentries`,
            `Fruit`,
            `Fuck cael`,
            `Feel`,
            `Feelings`,
            `Faker`,
            `Friend`,
            `Fool`,
            `can'tgobackwardsinstarFox64`];

        var r = Math.floor((Math.random() * f.length));

        message.channel.send(`The F stands for `+f[r]);
    }

    if (command === `GOITER` || command === `ASKGOITER`) {
        var g = [`It is certain.`,
                `It is decidedly so.`,
                `Without a doubt.`,
                `Yes - definitely.`,
                `You may rely on it.`,
                `As I see it, yes.`,
                `Most likely.`,
                `Outlook good.`,
                `Yes.`,
                `Signs point to yes.`,
                `Reply hazy, try again.`,
                `Ask again later.`,
                `Better not tell you now.`,
                `Cannot predict now.`,
                `Concentrate and ask again.`,
                `Don't count on it.`,
                `My reply is no.`,
                `My sources say no.`,
                `Outlook not so good.`,
                `Very doubtful.`];

        var r = Math.floor((Math.random() * g.length));

        message.channel.send(g[r]);
    }

    if (command === `WINNARLY` || command === `WINNAR`) {
        var w = [`Final Destination has no platforms?`,
                `cum sounds like come?`,
                `it's meaningless to factor in how long a win streak lasted since it doesn't reveal how many tournaments the player went to in that time period?`,
                `hbox had a 6 month win streak before he lost come to papa 3 to Zain?`,
                `some synagogues sell tickets to their service on high holidays when attendance is expected to be high?`,
                `pichu can now officially dab to escape falco shield pressure?`,
                `having money is unethical?`,
                `you can now pet the dog thanks to the new update?`,
                `brawl's dankest meme was stolen from melee?`,
                `shine's a 1 frame move?`,
                `I'm making a video game?`,
                `before drew became a subreddit roy stan, he was the inspiration for one of the most ambitious cinematic accomplishments in the history of schmelee?`,
                `we all die someday and nobody has time for your chicken shit bull shit?`,
                `doc’s nair gets stronger the longer the hitbox is out?`,
                `humans thousands of years ago literally did not feel stress?`,
                `Helium is an actual atom? It's not just in balloons!`,
                `mango is in grand finals winners side of pound 2019?`,
                `under night is going to be at melee instead of evo?`,
                `giga bowser has a shorter jumpsquat than bowser?`,
                `2 dicks are better than 1?`,
                `the first mbmbam podcast was don on a rockband controller?`,
                `dr pp got rainbow cruise banned?`,
                `ganondorf has a frame 3 down b?`,
                `bowser loses to puff?`,
                `melee was invinted before color?`,
                `worm was originally a fox main?`,
                `marth has a down air that can't be meteor canceled?`,
                `Roy can OHKO Puff with his up b?`,
                `rog is druggedfox?`,
                `you only like this game because it activates pleasure receptors in your brain? Fucking sheep.`,
                `JK Rowling came out and said that the reader was gay?`,
                `literally the only reason people still play melee is because Fox is so fucking sick?`,
                `Buffalo NY actually stole Buffalo Wings from Montpelier, VT?`,
                `you can reach side platforms with Fox usmash on yoshis?`,
                `DuckNumbers has his own subreddit for all his shitposts?`,
                `borp and pannenkoek are brothers?`,
                `puff dies early?`,
                `pannenkoek's brother is rognut?`,
                `Fiction's a little bitch?`,
                `you can't go backwards in the OG Mario, I'm pretty sure?`,
                `Dark Souls 2 is a completely different game in Japan! It was released in the rest of the world as "Dark Souls: The Lost Levels" and the Dark Souls 2 you know and love was originally a game called "Doki Doki Literature Club"`,
                `on no DI, upthrow rest works on fox from anywhere between 0 and 104%?`,
                `gamefreak ripped off sceptile's mega from a fangame?`,
                `Mewtwo can just roll away from Kirby and there's literally nothing Kirby can do to stop it?`,
                `a picture is worth a thousand words?`,
                `Falco's downsmash hits below battlefield?`,
                `ganon is the highest tier zelda character on the css?`,
                `bowser's NICE top spin serve is only 6 mph faster than baby mario's due to a programming error?`,
                `you can see the decline of civilization is directly correlated to how prominent final fantasy is in popular media`,
                `you could say the n word on discord and delete it before anyone sees\nwatch`,
                `you can delete cortana altogether`,
                `lgl will actually hurt amsa and ultimate2king too? we should only be trying to target hbox here, ok?`,
                `sub is african american?`,
                `in addition to playing melee over the internet, you can also hold a conversation over the internet!`,
                `Osama Bin Laden had emulators, pokemon roms and naruto episodes downloaded onto his laptop?`,
                `I don't eat any vegetables whatsoever?`,
                `shine turnaround firefox to grab ledge is actually shit?`,
                `Philly cheesesteaks were actually invented in New Hampshire?`,
                `Ganon plays much more like Sheik than like Falcon?`,
                `Borp's brother is Aniolas?`,
                `you can't go backwards in the OG Mario, I'm pretty sure?`,
                `Marth is actually in the Mario Tennis GBA game?`,
                `The X-Files is like The Office but not funny`,
                `Darsh once held the world record for Luigi Downward Angled Forward Tilt Only Home Run Contest?`,
                `The Falcon Punch, while a very famous and iconic move, sees little use in competitive play, mainly due to its relatively lackluster start-up window.`,
                `armada and mango used to have a rivalry?`,
                `Mario says "yahoo!" when he does a tornado, but Doc remains silent during his?`,
                `Dr. Mario's neutral aerial does more damage and knockback the longer it's out, while it does less damage and knockback when it first comes out. Overall, Mario's sweetspotted neutral is in between Dr. Mario's neutral aerial's sweet and sour spots.`,
                `Eddie Vedder was the Goatest Guitarist?`,
                `red moroccan salt can center your chakras?`,
                `there was a set with amsa vs hbox I think where he's doing ECE's and dies for it\nand scar is like HOW DID HE DIE`,
                `bowser's NICE top spin serve is only 6 mph faster than baby mario's due to a programming error?`,
                `you can see the decline of civilization is directly correlated to how prominent final fantasy is in popular media`,
                `lgl will actually hurt amsa and ultimate2king too? we should only be trying to target hbox here, ok?`,
                `in the PAL version of Super Smash Bros. Melee, Marth, Roy, Link, and Young Link had their swords completely removed from the game?`];

        var t = [`Wow!`,
                `It's true!`,
                `Wow!`,
                `It's true!`,
                `The more you know!`,
                `I wouldn't lie to you!`,
                `Simply... wow.`,
                `Isn't the world amazing?`,
                `How interesting!`,
                `Yeah, that's right!`,
                `I said it.`,
                `Facts don't care about your feelings.`,
                `It explains everything!`];

        var r = Math.floor((Math.random() * w.length));
        var r2 = Math.floor((Math.random() * t.length));

        message.channel.send(`Did you know... that `+w[r]+`\n`+t[r2]);
    }

    if (command === `DREW` || command === `ZMWIVD`) {
        var d = [`SubF`,
                `SubjectiveF`,
                `Sub`,
                `ADLP`,
                `anime lover`,
                `Antiprompt`,
                `Brio`,
                `Cagliostro`,
                `Chandy`,
                `Coffee`,
                `Cuck Daddy`,
                `Darsh`,
                `dimi`,
                `Drew`,
                `Zimmy`,
                `Zmwivd`,
                `Zimwit`,
                `Draco`,
                `DuckNumbers`,
                `Ted`,
                `Cael`,
                `Loscar`,
                `midnight`,
                `Rognut`,
                `Silver`,
                `Struc`,
                `Sugden`,
                `Winnarly`,
                `Wub`,
                `Risc`];

        var r = Math.floor((Math.random() * d.length));

        message.channel.send(`No matter how you try easing people in here, they're gonna meet `+d[r]+` at some point.`);
    }

    if (command === `DARSH` || command === `STEPHEN` || command === `GANON` || command === `GANONDORF`) {
        var d = [`navigating a shitty maze slowly.`,
                `playing a game just to be able to argue about it with your friends.`,
                `a big maze of right angles instead of levels.`,
                `The Hollow Knight being gay the whole time.`,
                `being a slightly worse Metroid.`,
                `not moving in the Z-axis.`,
                `regressing from Dark Souls by removing an entire dimension.`,
                `everything Darsh says being right.`,
                `not having any control over the way you play.`,
                `going through a place that actually exists and has a history.`,
                `exploration that isn't even exploration.`,
                `all the rooms looking the same.`,
                `checking your map for open doors and going to them.`,
                `no one being online to play netplay with you instead.`,
                `dinosaurs.`,
                `polish and mechanical innovations still not making metroidvanias any better.`,
                `metroidvanias sucking my dick.`,
                `being the literal best game of all time, as decided by some group of nerds.`,
                `telling your friends your enlightened opinions.`,
                `wasting your money and time.`,
                `convincing all of your friends to play a shitty game.`,
                `being a metroidvania for marth mains.`,
                `being such a safe space that not even the gameplay can get you.`];

        var r = Math.floor((Math.random() * d.length));

        //message.channel.send(`Hollow Knight's a game about `+d[r]);
        message.channel.send(`My advice?\nGo to the gym.`);
    }

    if (command === `MIDNIGHT` || command === `MIDNIGHTLIFTER`) {
        var m = [`*fadeback upsmashes*`,
                `*reverse fadeback upsmashes*`,
                `*just stands there and upsmashes*`,
                `*triple upsmashes*`,
                `*quad upsmashes*`,
                `*uptilts instead of upsmash*\n\n*then upsmashes anyways*`,
                `*runs at you and upsmashes*`];

        var r = Math.floor((Math.random() * m.length));

        message.channel.send(m[r]);
    }

    if (command === `BEYWIZ` || command === `BEY`) {
        message.channel.send(`Fuck I woulda thrown a whole ass lobster`);
    }

    if (command === `STRUC` || command === `STRUCTURE` || command === `STRUCTUREMOLE` || command === `MOLE`) {
        var s = [`J.D. from scrubs`,
                `Dr. House from House`,
                `Bones from StarTrek`,
                `Doc from Back to the Future`,
                `Dr. Frankenstein from Frankenstein`,
                `Dr. Wu from Jurassic Park`,
                `Dr. Jekyll from The Strange Case of Dr. Jekyll and Mr. Hyde`,
                `Dr. Rumack from Airplane!`,
                `Doc Ock from Spider-Man`,
                `Dr. Evil from Austin Powers`,
                `Dr. Strangelove from Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb`,
                `The Doctor from Doctor Who`,
                `Dr. Griffin from The Invisible Man`,
                `Dr. Lecter from Silence of the Lambs`,
                `Dr. Huxtable from The Cosby Show`,
                `Dr. Zoidberg from Futurama`,
                `Dr. Spaceman from 30 Rock`,
                `Dr. Mario from Melee`,
                `Dr. Freeman from Half-Life`,
                `Dr. Zhivago from Doctor Zhivago`,
                `Dr. Acula from Dr. Acula`,
                `Dr. Oz from The Dr. Oz Show`,
                `Dr. Eggman from Sonic the Hedgehog`,
                `The Medic from Mafia.gg`];

        var r = Math.floor((Math.random() * s.length))

        message.channel.send(`Became a doctor to be like `+s[r]);
    }

    if (command === `WUB` || command === `WUBWUB` || command === `WUBWUBWOWZY`) {
        var w = [`101 Dalmations`,
                `Aladdin`,
                `Antz`,
                `Cars`,
                `Casper the Friendly Ghost`,
                `Chronicles of Narnia`,
                `E.T.`,
                `Ghostbusters`,
                `Harry Potter`,
                `The Incredibles`,
                `Jurassic Park`,
                `Kung Fu Panda`,
                `Lilo & Stitch`,
                `The Lion King`,
                `The Little Mermaid`,
                `Madagascar`,
                `Monsters, Inc.`,
                `The Nightmare Before Christmas`,
                `Over the Hedge`,
                `Pink Panther`,
                `Pirates of the Caribbean`,
                `Shrek`,
                `Spider-Man`,
                `Star Wars`,
                `Toy Story`,
                `Tarzan`,
                `Wallace and Gromit`,
                `Winnie the Pooh`,
                `Alice in Wonderland`,
                `Alvin and the Chipmunks`,
                `Angry Birds The Movie`,
                `The Ant Bully`,
                `Astro Boy`,
                `Atlantis The Lost Empire`,
                `Avatar`,
                `Back to the Future`,
                `Batman`,
                `Barnyard`,
                `Bee Movie`,
                `A Bug's Life`,
                `Cars 2`,
                `Cars 3`,
                `The Cat in the Hat`,
                `Charlie and the Chocolate Factory`,
                `Charlotte's Web`,
                `Chicken Little`,
                `Chicken Run`,
                `Cloudy with a Chance of Meatballs`,
                `Coraline`,
                `Curious George`,
                `Brother Bear`,
                `How the Grinch Stole Christmas`,
                `Eragon`,
                `The Emperor's New Groove`,
                `Fantastic Four`,
                `Finding Nemo`,
                `Flushed Away`,
                `Frozen`,
                `G-Force`,
                `G.I. Joe`,
                `Ghost Rider`,
                `The Golden Compass`,
                `Gremlins`,
                `Happy Feet`,
                `How to Train Your Dragon`,
                `Herbie`,
                `Hulk`,
                `Ice Age`,
                `Ice Age 2`,
                `The Incredibles: Rise of the Underminer`,
                `Iron Man`,
                `Jurassic Park 2`,
                `Karate Kid`,
                `Kung Fu Panda 2`,
                `Kung Fu Panda 3`,
                `The Land Before Time`,
                `The Last Airbender`,
                `Shrek 2`,
                `Shrek 3`,
                `Shrek 4`,
                `Toy Story 2`,
                `Toy Story 3`,
                `Legend of the Guardians: The Owls of Ga'Hoole`,
                `The Lego Movie`,
                `A Series of Unfortunate Events`,
                `Meet the Robinsons`,
                `Men in Black`,
                `Mighty Morphin Power Rangers: The Movie`,
                `Monster House`,
                `Monsters vs. Aliens`,
                `Nacho Libre`,
                `Napoleon Dynamite`,
                `Night at the Museum`,
                `Night at the Museum: Battle of the Smithsonian`,
                `Open Season`,
                `Pacific Rim`,
                `Phineas and Ferb`,
                `The Polar Express`,
                `Ratatouille`,
                `Robots`,
                `The Room`,
                `The Rugrats Movie`,
                `Rugrats in Paris`,
                `Shark Tale`,
                `The Smurfs`,
                `Space Jam`,
                `Speed Racer`,
                `The Spiderwick Chronicles`,
                `The SpongeBob SquarePants Movie`,
                `Surf's Up`,
                `Tangled`,
                `Up`,
                `WALL-E`,
                `Wallace & Gromit: The Curse of the Were-Rabbit`,
                `The Wizard of Oz`];

        var r = Math.floor((Math.random() * w.length));

        message.channel.send(`Recently purchased the `+w[r]+` video game.`);
    }

    if (command === `CAEL` || command === `KALE`) {
        var c = [`Still waiting on his b0xx. He'll be so good once he starts playing on it, you'll see.`,
                `The b0xx manifesto is only like half the length of Capital volume 1`,
                `Has switched mains 37 times this year and counting`,
                `thinks Kirby's Dream Course should've won the video game tournament`,
                `women my age are kinda low tier\nfucking someone so young would feel kinda pedophilic`,
                `was there a big armada/mango rivalry?`,
                `I should do octo nut october\n8 times a day`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    if (command === `REPLYGUY` || command === `:REPLYGUY:` || command === `SM` || command === `MERCURY` || command === `SAILOR` || command === `SAILORMERCURY` || command === `REDSHEIK`) {
        message.channel.send(`I MADE THE FUCKING POST\nFUCK you. I **FUCKING** HATE YOU. FUCK you.\nFUCK YOU.`);
    }

    if (command === `TED`) {
        message.channel.send(`Traitor.`);
    }

    if (command === `ADLP`) {
        message.channel.send(`COP ALERT!\nhttp://imgs.fyi/img/7skw.jpg`);
    }

    if (command === `SUGDEN` || command === `SUG` || command === `CHAZZ` || command === `CHAZ` || command === `CHAZZDEN` || command === `SUGDEEZY` || command === `SUGDEB` || command === `DOG` || command === `CUM`) {
        var s = [`https://i.imgur.com/vnY6qBY.jpg`,
                `https://i.imgur.com/BvXGg7I.png`,
                `https://i.imgur.com/YtYweuz.jpg`,
                `https://i.imgur.com/Tf9QJaA.jpg`,
                `https://i.imgur.com/dqdUUZt.jpg`,
                `https://media.discordapp.net/attachments/555176988562948116/600003058323423233/unknown.png?width=288&height=640`,
                `https://media.discordapp.net/attachments/555176988562948116/600003345767202818/unknown.png?width=471&height=641`,
                `https://media.discordapp.net/attachments/555176988562948116/600003486087905281/unknown.png?width=934&height=640`,
                `https://media.discordapp.net/attachments/555176988562948116/600067265987346432/unknown.png?width=732&height=640`,
                `https://media.discordapp.net/attachments/555176988562948116/600067494463406090/unknown.png?width=672&height=640`,
                `https://media.discordapp.net/attachments/555176988562948116/600067651313729546/unknown.png?width=500&height=640`,
                `https://media.discordapp.net/attachments/555176988562948116/600067685019156518/IMG_20181001_122428.png?width=516&height=640`,
                `https://media.discordapp.net/attachments/566411042738143242/600061732135764003/D-RI0IdW4AQg5Oj.png?width=640&height=640`,
                `https://cdn.discordapp.com/attachments/542494706932645918/598248990638735370/image0.jpg`,
                `https://cdn.discordapp.com/attachments/542494706932645918/598248832144375959/image0.jpg`,
                `https://cdn.discordapp.com/attachments/555176988562948116/600069530353532948/unknown.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/600069573932351496/20190508_173330.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/600070030293467136/unknown.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602172803609001994/JPEG_20190720_103000.jpg`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602172885888663552/IMG_20190718_193205.jpg`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602172886807085087/IMG_20190718_193115.jpg`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602172966729416735/JPEG_20190720_163446.jpg`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602207672137285633/unknown.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602207713757364233/20180429_191241.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602207743058771975/FullSizeR.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602207763224985600/red_and_blue.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602207790387298311/1449118552328.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602208807552024577/unknown.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602209495325737006/unknown.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602209552989159424/Snapchat-825518123.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602209741372129280/unknown.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/602210191877865502/unknown.png`,
                `https://cdn.discordapp.com/attachments/542142763693768731/596392410913832970/JPEG_20190704_103028.jpg`,
                `https://cdn.discordapp.com/attachments/567417652331413544/601222330865156097/IMG_20190622_142738926.jpg`,
                `https://cdn.discordapp.com/attachments/555176988562948116/605898887491878956/dog.png`,
                `https://cdn.discordapp.com/attachments/555176988562948116/605898903086170147/dog_2.png`,
                `https://cdn.discordapp.com/attachments/542142763693768731/605539691571314718/JPEG_20190728_090311.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/605540018982748172/mq8eny9u3da31.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/604802387756056707/image0.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/604682716482633758/JPEG_20190727_153253.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/604682878902730761/JPEG_20190727_153329.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/604435328610336778/timmy.png`,
                `https://cdn.discordapp.com/attachments/566411042738143242/603537385300557824/JPEG_20190724_114130.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/603428017863131164/JPEG_20190724_042706.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/603255906351841289/JPEG_20190723_170320.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/603256016632676362/JPEG_20190723_170352.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/605540431043756033/20190729_172103.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/605540736271777831/Screenshot_20190729-172231_Instagram.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/605540868459593748/Screenshot_20190729-172303_Instagram.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/605541052975153192/Screenshot_20190729-172348_Instagram.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/606138286091665451/image.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/606113989956730901/JPEG_20190731_142006.jpg`,
                `https://cdn.discordapp.com/attachments/555176988562948116/606140681353691166/unknown.png`,
                `https://cdn.discordapp.com/attachments/542142763693768731/606138286091665451/image.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/606113989956730901/JPEG_20190731_142006.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/606095855841443850/JPEG_20190731_130813.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/607189046015426560/JPEG_20190803_133207.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/607188105207873537/JPEG_20190803_132820.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/606559419605581834/IMG-20180831-WA0002.jpg`,
                `https://cdn.discordapp.com/attachments/598336899010003015/606270930641223693/IMG_20190731_194403770.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/607210695876149248/image0.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/607210812594978826/image0.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/607211749984174110/image0.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/607222454917791745/IMG-20190802-WA0005.jpg`,
                `https://cdn.discordapp.com/attachments/542142763693768731/607222944317571073/Screenshot_20190803-164652.png`];

        var r = Math.floor((Math.random() * s.length));

        message.channel.send(s[r]);
    }

    if (command === `DUCK` || command === `DUCKNUMBERS` || command === `DUCKFUCKINGNUMBERS`) {
        message.channel.send(`*Watch this.*`);
    }

    if (command === `SILVER` || command === `SILVERHAND`) {
        var s = [`see`,
                `see`,
                `see`,
                `hear`,
                `hear`,
                `smell`,
                `taste`,
                `sense`];

        var r = Math.floor((Math.random() * s.length));

        //message.channel.send(`Is that a mechanical keyboard I `+s[r]+`? What kind of switches do you have?`);

        message.channel.send(`Still on indefinite haitus, brought the bot back for the rest of you though`);
    }

    if (command === `DIMI` || command === `DIMINNUENDO`) {
        var d = [`Who knew New Jersey had a botched foreskin problem?`,
                `im gay`,
                `im gay`,
                `im gay`,
                `/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////`,
                `im gay`,
                `**diminnuendo** is typing...`,
                `im@gay`];

        var r = Math.floor((Math.random() * d.length));

        message.channel.send(d[r]);
    }

    if (command === `LOSCAR`) {
        var l = [`a bar`,
                `a bar`,
                `a bar`,
                `his boss's wife's house`,
                `a wedding`,
                `a funeral`,
                `a party`,
                `home\n\n...just kidding, he could be anywhere`,
                `work`,
                `work`,
                `a gas station`,
                `a bus stop`,
                `church`,
                `his parents' house`,
                `a mexican gang meeting`,
                `a bachelor's party`,
                `the Canary Island Hard Vaginas vs Hong Kong Sexy Bitches game`,
                `an airport`,
                `a Les Schwab Tire Center`,
                `a local`,
                `his good friend Mr. Ratburn's wedding`,
                `the Beerlympics`,
                `an open house`,
                `Chandy's Tacos`];

        var r = Math.floor((Math.random() * l.length));

        message.channel.send(`Currently on discord at `+l[r]);
    }

    if (command === `MANGO` || command === `MANG0`) {
        message.channel.send(`MANGO\nMANGO\nMANGO`);
    }

    if (command === `AXE` || command === `EXA`) {
        message.channel.send(`AXE WON SUMMIT!!`);
    }

    if (command === `BRIO` || command === `BRANDON`) {
        message.channel.send(`You know what this reminds me of? TF2 rocket jumping...`);
    }

    if (command === `DRACO` || command === `DRACONITIX`) {
        message.channel.send(`wanna do netplay`);
    }

    if (command === `AHAMPSTER` || command === `HAMPSTER`) {
        message.channel.send(`??? - 2019\nBrutally murdered by a puff GIMR put on stream`);
    }

    if (command === `GIMR`) {
        var g = [`Greed Is My Reason`,
                `offline`,
                `offline`,
                `still offline`,
                `GIMR Is Melee's Richardnixon`,
                `Glock In My Rari`,
                `Gayness In My Rectum`,
                `Get Ingots, Melee RIP`,
                `Garbage Idiot Making Ruin`,
                `Goal: Invalidate Melee's Relevance`,
                `Get In My Rump`,
                `Gold Is My Reward`,
                `Gosh, I'm Mad Retarded`,
                `Gets Impotent Meleestream Routers`,
                `God's In My Rectum`,
                `GIMR Instinctively Murders Rats`];

        var r = Math.floor((Math.random() * g.length));

        message.channel.send(g[r]);
    }

    if (command === `IBDW` || command === `CODY`) {
        var i = [`I Be Destroying Waterclosets`,
                `I Blow Dude Weiners`,
                `I Binge Drink Weekly`,
                `I Bang Dudes Weekly`,
                `I Be a Devil Worshiper`,
                `I Be Docking Weiners`];

        var r = Math.floor((Math.random() * i.length));

        message.channel.send(i[r]);
    }

    if (command === `CHANDY` || command === `CHANMAN` || command === `CHANDYMAN` || command === `CHANCORE` || command === `CHANSTER` || command === `CHANDLER` || command === `CHANBLASTER` || command === `CHANBLASTERS`|| command === `CHANDYBLASTER` || command === `CHANDYBLASTERS` || command === `BLASTERS` || command === `MT64` || command === `TENNIS`) {
        var c = [`so yeah it's a tricky mix-up, but there are characters with the tools to mitigate its effectiveness and courts that invalidate bowser completely based on the match-up`,
                `again, the fact that there's no color trail on some of those top spin chance balls means that (against a human player), judging the right amount of charge to apply can be a total crapshoot`,
                `when he doesn't charge it enough, it goes out of bounds. if he charges too much, he'll hit the net. if he had better control and power, the sweetspot would be bigger, and there would be more semi-charge returns that would clear the net`,
                `and this is on a normal bounce strength court, bowser's best courts very on the match-up but he always wants high bounce. sometimes he wants a high speed court if he's playing against a weaker opponent like a speed type, but against a fellow power character he wants a slow court so that he's not totally incapable of chasing down angled shots`,
                `but if you give bowser the opportunity to move forward, he will just dismantle you at the net. all of the power characters have great reach but bowser is the second tallest character in the game, so getting around him if he manages to push up on the net is near impossible`,
                `if you don't constantly keep them moving around the court, they can set their feet and charge unreturnable smashes. it's much easier to do that if you're not on the backstep though, so you might be tempted to slice a lot to give yourself more time to recover and get back in the center of the court`,
                `even his medium strength shots have so much power that you can never be sure how to return them\nyour best bet is to play conservatively and that requires a technique character with mobility (like waluigi)\nbut more likely toad or shyguy in the current meta\nif the power character catches you out of position, it's really hard to take control of the pace of the volley from them`,
                `there's a very specific sweetspot for smashing a heavy topspin shot. uncharged or minimally charged and you'll get across the net, but it'll have too much hangtime and go OB\ntoo much charge and you'll muscle it down into the net`,
                `if it bounces with high spin, returning it with an overhead smash will result in a super shallow angle unless you have high control and power, and an even shallower return angle if you try a passing shot instead of volleying across`,
                `on a weak bounce court, this won't have as much of an impact, but on any other court,  you have to be super careful about how you receive a power character's topspin`,
                `this makes them very risky to return on courts with high bounce. bowser can hit a chance ball that looks like a perfect meatball jammed lob ("chance ball"), but lands with absurd spin.`,
                `in practice, this graphical quirk is mostly helpful for the extremely powerful characters on the cast\nbowser has to really swing on a fool to get a power trail, so a lot of his topspin volleys won't get a trail even though they're still travelling and spinning extremely fast`,
                `that's a nice serve that doesn't crack 60 mph, and his overhead smash is basically a drop shot disguised as a purple smash shot\nthat smash shot trail only appears because this boy is hitting close to his peak potential, even though in an absolute sense it's laughably weak`,
                `all that matters is that mario hits a powerful shot relative to what mario's potential power is\nhere's my meme character's stat loadout\ni don't know what's more disgusting, this build or the condition of my gba screen so you've been warned\nhttps://media.discordapp.net/attachments/542219115696226304/599760577258192897/image0.jpg?width=853&height=640`,
                `the particle trails do not appear at an absolute threshold of speed across the cast\nit's not like "if a shot is returned with slice and it exceeds 70 mph on the volley, then there's a blue trail"\nrather, the trail threshold is PROPORTIONAL to your character's maximum possible speed when returning a shot of that nature with the stroke they chose`,
                `Parents’ money\nWho the fuck else is going to a tennis academy run by Mario?\nIt’s canon in Power Tour’s storyline that your character is from the snobby rich kid academy\nSass, the working man’s tennis hunk, is from the Factory academy. Basically a technical school for dummies and COOLIES`,
                `The core mechanics of the “simple” rules have remained the same throughout pretty much every installment of the series and aces is no different.\nMy problem with Aces is that the roster is way too big and has too many tricky characters\n2 Tricky characters was the right amount. Boo and Paratroopa have tolerable, skill intensive gimmicks that still require you to have a grasp of the fundamentals.\nRosalina can frig right off with her dumb bull hockey.`,
                `https://www.youtube.com/playlist?list=PLV04ijEs_dq1hJCJXH1xmUV_WNJat5uQa`,
                `What makes the technique archetype hard to deal with is that they are very low power across the board, so they can often hit non-trailed weaker shots with tons of spin that are very visually indistinct`,
                `Just because you know what spin is on the ball, however, does not mean you’ll be able to anticipate where it bounces after the volley. The bounce happens right before your return shot, so characters with great spin stats (like Boo) will make you wait until the very last second to react appropriately.`,
                `Depending on where you’re positioned and whether or not it will be a forehand or backhand return, the optimal spin choice varies wildly`,
                `Overhead flat shots become smash shots with a particle trail\nOnce a stroke reaches a certain strength level (attained by charging, overhead positioning, or returning a stroke with a complementary spin type), it will gain the bright particle trail\nShots below this threshold only have a quick burst of particles`,
                `Topspin is orange, slice is blue, and flat shots are purple`,
                `You’ll see. I’ll upload some of the tennis lessons from the GBA game, they’re really quite interesting.`,
                `You guys just need to listen better and more\nAnd yknow, we USED to have a Mario sports channel\nIt wasn’t my choice to remove it`,
                `IT’S NOT RAMBLING\nIt’s not my fault I’m so good at explaining the core concepts of the game in great detail`,
                `That’s why handedness counterpicking is usually done double blind at the top of the set`,
                `Topspin serve is only optimal for 1/4 court positions\nFor the 3/4 others you need to mix up smash and slice`,
                `Now Sass... that boy’s a power factory\nHe’s got the second strongest smash serve in the game behind Bowser\nBut his slice serve is actually a bit faster than Bowser’s\nIf you’re playing righty then slice serves are the real workhorse`,
                `Y’know, Marth is actually in the Mario Tennis GBA game`,
                `IT’S A GREAT GAME WITH TONS OF NUANCE`,
                `cagliostro9 Last Friday at 12:15 PM: Chan we all know it’s real it’s just a good 60% of the chat doesn’t give a shit\nChandy Last Friday at 12:15 PM: Well I’m just going to have to keep explaining it until that 60% goes down to 0%`,
                `You guys act like I’m just making this shit up but it’s almost all supported by canon`,
                `I’m serious, the GBA and GBC games do an excellent job about teaching you good tennis stratagems`,
                `the GBA game is heavier on the instructional content and plot, so it's better as a self contained game. GBC is closest to N64 mechanically, but only very slightly. both are good introductions.`,
                `Wii VC is the most modern faithful release of the game. Wii U VC is more recent, but Wii U VC was significantly worse than Wii\nlaggy and bad color reproduction, like all Wii U N64 VC games`,
                `these guys really hate it when i talk about MT64 in huge walls of text, so you're always welcome to DM me if questions arise`,
                `and even then, my edited save is customized to polarize the lvl99 characters according to min/max instead of highest overall stats\nso alex is the speediest possible speedster, harry is the strongest he can possibly be etc`,
                `there would have to be a standardized stat and equipment loadout and everyone would have to download that special edited save\nthey're great for practice because you can customize them to have any set of broken stats though, so if there's a particular playstyle you struggle against you can optimize them towards that\nkind of like early amiibos in a way, since they gain EXP from being used in both games`,
                `after the top tiers, there are certain characters who can kind of hang and are soft counters on counterpick courts\nParatroopa is probably the worst character you can solo main on any court\nParatroopa, Toad, Shyguy, and Bowser are viable in certain match-ups with the right court`,
                `Waluigi is considered unviable against any speed character and baby mario and yoshi are some of the most popular, so RIP me`,
                `Mario, Luigi and the Princesses are too unspecialized to be worth using, mostly just good beginners characters`,
                `some people like to argue birdo is close to viable but she's the "technique" favored speed character so she's kind of saddled with the worst set of attributes\ni think she's the worst in the game because her niche isn't really good against anyone, but some people think speed is everything`,
                `DK runs into the same problem where he's the technique favored power character, but he's not as hopeless as birdo`,
                `the problem is that power characters get most of their mileage off the serve and early strokes so if you wanted a really good serving character with great shot placement, you'd just use boo and make up for a lack of raw power with broken serve gimmicks`,
                `playing the GBC game is actually a really good introduction to the core concepts of the meta and how it differs from IRL tennis in its unique and quirky ways`,
                `SS tier characters are wario and baby mario\nthe fastest power character and the strongest speed character, respectively\nS tier characters are boo, yoshi and DK Jr`,
                `the curse of bowser is that you're slicing all the god damn time to slow down the pace of the volley\nsince you have no mobility, you need the most time to get into a good position to anticipate a return\nso you have all the power in the world but you only really get to use it on the serve and the killstroke`,
                `i don't mean to imply that they are unga bunga, that's just a meme\nyou have to be really smart about spin choice as power characters`,
                `shy guy is sick. he's my secondary but he and waluigi play super different`,
                `i prefer technique as an archetype though, since the baits are my favorite part`,
                `honestly the secondary that would help me most is DK Jr, but i don't want to pick up an unga bunga power character`,
                `too many gimmick characters in aces\nthe two tricky characters in MT64 are very cool at top level\nshy guy should be considered a tricky character, although his gimmick is more like a core concept of his character\nrather than just a weird attribute or two like boo and paratroopa`,
                `it's a semi popular speedrunning game too, so mostly we congregate in the in the series wide mario tennis discord`,
                `they're legitimately good practice\nthey hit reactions that human players almost never do\nthat's why it's super hard to beat them at the net`,
                `it would have been a much more dominant performance if i had used the best technique character`,
                `i had to make several reads in that match\nseveral of them were unsuccessful reads too\nthe return game does not start off pretty`,
                `get overpowered on a top spin serve that forces me out of the flank, then i have to scramble back to midcourt but position myself somewhere to react to his return on the meatball i just gave him`,
                `i stopped my dash short so that i could react to the trajectory of where it would go if he had top spin smashed it, but then he hit a flat shot down the diagonal. if i had kept running i could have returned it but I had to guess\ntextbook unsuccessful read`,
                `the exact same situation happens at 2:08, and i don't cover that same angle down the diagonal\nthis time i run in that direction but decide to snake back to the left in case he goes for the mix-up and hits a straight shot down the left sideline\nagain, i guess wrong but this time i get lucky and he smashes it out of bounds`,
                `i wanted to show why waluigi conceptually struggles with speed characters`,
                `he's a max CPU on the best speed character in the entire game\nhe can read my controller inputs!!!`,
                `there are 50/50s i just have to take`,
                `of course not\nyou're fighting for your life in this match-up\ndid you not notice how conservatively i had to play on the returns?`,
                `when i saw that he didn't react well and push up on that slice, i knew i could put in the drop shot and push to the net`,
                `technique as an archetype is supposed to lose to speed anyway but i'll be damned if it isn't the paper in this rock paper scissors conundrum`,
                `i just realized that's an indirect endorsement of netplay\nlet me just clarify that this is not the position i hold whatsoever.`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    if (command === `COFFEE` || command === `SDDL`) {
        var c = [`you hate to see it`,
                `you love to see it`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    if (command === `ANTI` || command === `ANTIPROMPT`) {
        var a = [`Mario`,
                `Mario`,
                `Luigi`,
                `Bowser`,
                `Peach`,
                `Princess Peach`,
                `Daisy`,
                `Wario`,
                `Toad`,
                `Yoshi`,
                `King Bob-omb`,
                `King Boo`,
                `Kamek`,
                `a goomba`,
                `Bowser Jr.`,
                `Waluigi`,
                `Donkey Kong`,
                `Toadette`,
                `Captain Toad`,
                `Birdo`,
                `Rosalina`,
                `Boom Boom`,
                `Dry Bowser`,
                `Petey Piranha`,
                `Toadsworth`];

        var r = Math.floor((Math.random() * a.length));
        var r2 = Math.floor((Math.random() * a.length));

        message.channel.send(`What if `+a[r]+` sex `+a[r2]+`?`);
    }

    if (command === `SOAP`) {
        message.channel.send(`though he is better, its some dummy high apm dumb shit`);
    }

    if (command === `AL` || command === `ANIMELOVER`) {
        var d1 = [`I know what you're thinking: "Do NOT lamb D1." Well guess what? According to my calculations that wasn't really calculated, I have decided that it is the appropriate time for me to make a hard read and lamb the fuck out of that person. I'm a lambing GOD, and I'm 99.9% sure this person is mafia. If not, that's okay cause I'll be dead anyways. I'm sorry if I failed you, town. 3, 2, 1.`,
                `Oh, just 🥩 succulent, tender 💦 HNG 💦 Just 🥩 Just a lil' 🥩🥩 I'm just preparing 🧂 That's it 💦 JUS'- 💦 Getting my 🐑 ready is all 🥩🥩 Oh JUST A BIT 💦 🧂🥩🥩🥩🧂 A LITTLE SAAAAAALT 🧂 SOME S-S-SPICE 🌶️🌶️ AHHHHHhhhhhh JUST 💦💦 GETTING MY 🐑🐑🐑🐑 ON 💯💯💯`,
                `rr bitch`,
                `im villi btw`,
                `♿ D1 LAMB COMING THRU ♿`,
                `drop trou`,
                `Hello my fellow townspeople, it is me, slugbait. I regret to inform you that my role in this game is the Clown, which is actually quite ironic because it reflects how I am in real life, however it is a role belonging to the mafia. I do not wish to cause harm to the innocents in the town, so I would please ask if you would kindly lynch me on this day. Thank you for your cooperation.`];

        var r = Math.floor((Math.random() * d1.length));

        message.channel.send(d1[r]);
    }

    if (command === `NANCH` || command === `NANCHOMAN`) {
        message.channel.send(`Hello there! Ha! Just a little prequel meme humor for ya`);
    }

    if (command === `ROGNUT` || command === `ROG` || command === `ROGCHAMP`) {
        message.channel.send(`rog would love to be cucked way more than midnight`);
    }

    if (command === `CORI` || command === `CORIAMON`) {
        message.channel.send(`Go to GOML.`);
    }

    if (command === `BUBBLES`) {
        message.channel.send(`Best known for dying to a DBZ charge shot`);
    }

    if (command === `CAG` || command === `CAGLIOSTRO` || command === `CAGLIO`) {
        var c = [`https://docs.google.com/document/d/13i9BclOxbtFM4yWVTI3vHBvlgBGyhTEVATd-B7hbLZ0/edit?usp=sharing`,
                `https://docs.google.com/document/d/1FHU80Z9xMjJxrXcx95V7Q3LCkU3Syt2CWLLyQYQN4qk`,
                `https://cdn.discordapp.com/attachments/598336899010003015/599294726817972231/image0.jpg`,
                `bug catcher baby driver wants to battle!`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    if (command === `CUCK` || command === `CUCKDADDY`) {
        var c = [`I *told* you to stop drinking alone, Ciaran!`,
                `Go get some friends, Ciaran!`,
                `Get off Grailed and go outside, Ciaran!`,
                `Stop wobbling people, Ciaran, that's mean!`,
                `Pick a cooler character, Ciaran!`,
                `PM is for weiners, Ciaran, play Melee!`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    if (command === `RISC` || command === `BESTDK`) {
        message.channel.send(`Creeper? Aww man`);
    }

    if (command === `ME`) {
        message.delete(100);
        message.channel.send(`it was me :)`);
    }

    if (command === `YOU`) {
        message.delete(100);
        message.channel.send(`it was you :)`);
    }

    if (command === `SPOTW`) {
        message.channel.send(`haha yo check out this post bro it's really funny haha its a good post bro pls look at it haha\n<@!337284886039625728>`);
    }

    //Netplay

    if(command === `NETPLAY`) {
        var netplayMessage = `${sender.username} would like to play! `;

        if (message.member.roles.find(`name`, `VS-NW`)) {
            let role = message.guild.roles.find(`name`, `N-NW`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-CT`)) {
            let role = message.guild.roles.find(`name`, `N-CT`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-NE`)) {
            let role = message.guild.roles.find(`name`, `N-NE`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-SW`)) {
            let role = message.guild.roles.find(`name`, `N-SW`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-MW`)) {
            let role = message.guild.roles.find(`name`, `N-MW`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-SE`)) {
            let role = message.guild.roles.find(`name`, `N-SE`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-S`)) {
            let role = message.guild.roles.find(`name`, `N-S`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-EU`)) {
            let role = message.guild.roles.find(`name`, `N-EU`);
            netplayMessage += `${role} `;
        }

        message.channel.send(netplayMessage);
    }

    if(command === `OPTIN` || command === `OPT-IN`) {
        if(!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Netplay Roles`)
                .setColor(0x00BECC)
                .setDescription(`Add an N-XX role to be notified when someone is searching for players in your region. Add a VS-XX role to search for that region when you use t!netplay`)
                .addField(`Northwest`, `N-NW | VS-NW`, true)
                .addField(`Central`, `N-CT | VS-CT`, true)
                .addField(`Northeast`, `N-NE | VS-NE`, true)
                .addField(`Southwest`, `N-SW | VS-SW`, true)
                .addField(`Midwest`, `N-MW | VS-MW`, true)
                .addField(`Southeast`, `N-SE | VS-SE`, true)
                .addField(`South`, `N-S | VS-S`, true)
                .addField(`Europe`, `N-EU | VS-EU`, true)
            message.channel.send({embed});
        } else if (args[0] === `N-NW` || args[0] === `VS-NW` || args[0] === `N-CT` || args[0] === `VS-CT` || args[0] === `N-NE` || args[0] === `VS-NE` || args[0] === `N-SW` || args[0] === `VS-SW` || args[0] === `N-MW` || args[0] === `VS-MW` || args[0] === `N-SE` || args[0] === `VS-SE` || args[0] === `N-S` || args[0] === `VS-S` || args[0] === `N-EU` || args[0] === `VS-EU`) {
            var role = message.guild.roles.find(`name`, args[0]);

            message.member.addRole(role);

            message.channel.send(`Successfully added the `+args[0]+` role.`);
        } else {
            message.channel.send(`Error: invalid role`);
        }
    }

    if(command === `OPTOUT` || command === `OPT-OUT`) {
        if (args[0] === `N-NW` || args[0] === `VS-NW` || args[0] === `N-CT` || args[0] === `VS-CT` || args[0] === `N-NE` || args[0] === `VS-NE` || args[0] === `N-SW` || args[0] === `VS-SW` || args[0] === `N-MW` || args[0] === `VS-MW` || args[0] === `N-SE` || args[0] === `VS-SE` || args[0] === `N-S` || args[0] === `VS-S` || args[0] === `N-EU` || args[0] === `VS-EU`) {
            var role = message.guild.roles.find(`name`, args[0]);

            message.member.removeRole(role);

            message.channel.send(`Successfully removed the `+args[0]+` role.`);
        } else {
            message.channel.send(`Error: invalid role`);
        }
    }

    //Silverbux

    if (sCommand === `BALANCE` || sCommand === `BAL` || sCommand === `MONEY` || sCommand === `SILVERBUX` || sCommand === `SBUX` || sCommand === `BUX`) {
        var results = await eco.FetchBalance(sender.id);

        const embed = new Discord.RichEmbed()
            .setTitle(`${sender.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField(currencyName, `${results.balance}`, true)
        message.channel.send({embed});
    }

    if (sCommand === `CHECKBAL`) {
        if (!message.member.roles.find("name", modRole2)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole2 + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var results = await eco.FetchBalance(message.mentions.users.first().id);

        message.channel.send(results.balance);
    }

    if (sCommand === `INIT`) {
        if (!message.member.roles.find("name", modRole2)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole2 + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var defineduser = '';
        if (!sArgs[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = sender;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var output = await eco.FetchBalance(defineduser.id);

        if (output.balance == 0) { //User does not have a balance
            var results = await eco.SetBalance(defineduser.id, 100);

            const embed = new Discord.RichEmbed()
                .setTitle(`${defineduser.username}\'s Balance`)
                .setColor(0xF1C40F)
                .addField('SilverBux', `${results.balance}`, true)
            message.channel.send({embed});
        } else { //User already has a balance
            message.channel.send(`Error: This user already has a balance`);
        }
    }

    if (sCommand === `ADD`) {
        //Check for better mod
        if (!message.member.roles.find("name", modRole2)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole2 + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined an amount
        if (!sArgs[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of ${currencyName} to add. \nExample: \`${prefix2}add <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(sArgs[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: not a number')
                .setDescription(`This command requires an amount of ${currencyName} to add. Example: \`${prefix2}add <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var defineduser = '';
        if (!sArgs[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = sender;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var results = await eco.AddToBalance(defineduser.id, sArgs[0]);

        const embed = new Discord.RichEmbed()
            .setTitle(`${defineduser.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField('SilverBux', `${results.newbalance}`, true)
        message.channel.send({embed});
    }

    if (sCommand === `SUB` || sCommand === `SUBTRACT`) {
        //Check for better mod
        if (!message.member.roles.find("name", modRole2)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole2 + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined an amount
        if (!sArgs[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of ${currencyName} to subtract. \nExample: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(sArgs[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: not a number')
                .setDescription(`This command requires an amount of ${currencyName} to subtract. Example: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var defineduser = '';
        if (!sArgs[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = sender;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var results = await eco.SubstractFromBalance(defineduser.id, sArgs[0]);

        const embed = new Discord.RichEmbed()
            .setTitle(`${defineduser.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField('SilverBux', `${results.newbalance}`, true)
        message.channel.send({embed});
    }

    if (sCommand === `GIVE` || sCommand === `PAY` || sCommand === `TIP` || sCommand === `TAKEMYMONEYBITCH`) {
        //Check if they defined an amount
        if (!sArgs[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of ${currencyName} to give. \nExample: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(sArgs[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: not a number')
                .setDescription(`This command requires an amount of ${currencyName} to give. Example: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        if (Math.sign(sArgs[0]) == -1) {
            message.channel.send(`fuck you`);
            return;
        }

        //Check for defined user
        var defineduser = '';
        if (!sArgs[1]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no user defined')
                .setDescription(`This command requires a user to give ${currencyName} to. Example: \`${prefix2}give <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var amount = sArgs[0];
        var senderBalance = await eco.FetchBalance(sender.id);

        //Check if sender has enough money
        if (senderBalance.balance < amount) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Error: not enough ${currencyName}`)
                .setDescription(`You do not have enough ${currencyName} to perform this action.`)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var transfer = await eco.Transfer(sender.id, defineduser.id, amount);

        var senderNewBalance = await eco.FetchBalance(sender.id);
        var recipientNewBalance = await eco.FetchBalance(defineduser.id);

        const embed = new Discord.RichEmbed()
            .setTitle(`${sArgs[0]} ${currencyName} added to ${defineduser.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField(`${defineduser.username}'s Balance'`, `${recipientNewBalance.balance}`, true)
            .addField(`${sender.username}'s Balance'`, `${senderNewBalance.balance}`, true)
        message.channel.send({embed});
    }

    //TedCoin

    //SQL Initialization
    sql.get(`SELECT * FROM bank WHERE userID = "${message.author.id}"`).then(row => {
        if (!row) {
            sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [message.author.id, 0]);
        }
    }).catch(() => {
        console.error; //Log errors to console
        sql.run(`CREATE TABLE IF NOT EXISTS bank (userID TEXT, balance INTEGER)`).then( () => {
            sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [message.author.id, 0]);
        })
    })

    //Balance
    if (command === `BALANCE` || command === `BAL` || command === `MONEY`) {
        //Fetch balance from table
        sql.get(`SELECT * FROM bank WHERE userID ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("Error: Unfortunately you do not have any TedCoin yet!");

            //Format embed and send
            const embed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}\'s Balance`)
                .setColor(0xF1C40F)
                .addField('TedCoin', `${row.balance}`, true)
            message.channel.send({embed});
        })
    }

    //Add to balance
    if (command === `ADD`) {
        //Check for admin
        if (!message.member.roles.find("name", modRole) && !message.member.roles.find("name", modRole2)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined an amount
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of TedCoin to add. \nExample: \`${prefix}add <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(args[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: not a number')
                .setDescription(`This command requires an amount of TedCoin to add. Example: \`${prefix}add <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined a user
        let defineduser = '';
        if (!args[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = message.author.id;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }

        sql.get(`SELECT * FROM bank WHERE userID ="${defineduser}"`).then(row => {
            if(!row) {
                sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [defineduser, 0]);
            } else {
                //Add the points
                sql.run(`UPDATE bank SET balance =${row.balance + parseInt(args[0])} WHERE userID ="${defineduser}"`);

                //Let the user know
                var mentioned = client.users.get(defineduser);
                mentioned = mentioned.username;
                const embed = new Discord.RichEmbed()
                    .setTitle(`${args[0]} TedCoin added to ${mentioned}\'s Balance`)
                    .setColor(0xF1C40F)
                    .addField(`New Balance`, `${row.balance + parseInt(args[0])}`, true)
                message.channel.send({embed});
            }
        }).catch(() => {
            console.error;
            sql.run(`CREATE TABLE IF NOT EXISTS bank (userID TEXT, balance INTEGER)`).then( () => {
                sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [defineduser, 0]);
            })
        })
    }

    //Subtract from balance
    if (command === `SUB` || command === `SUBTRACT`) {
        //Check for admin
        if (!message.member.roles.find("name", modRole) && !message.member.roles.find("name", modRole2)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined an amount
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of TedCoin to subtract. \nExample: \`${prefix}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(args[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of TedCoin to subtract. Example: \`${prefix}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined a user
        let defineduser = '';
        if (!args[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = message.author.id;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }

        sql.get(`SELECT * FROM bank WHERE userID ="${defineduser}"`).then(row => {
            if(!row) {
                sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [defineduser, 0]);
            } else {
                //Subtract the points
                sql.run(`UPDATE bank SET balance =${row.balance - parseInt(args[0])} WHERE userID ="${defineduser}"`);

                //Let the user know
                var mentioned = client.users.get(defineduser);
                mentioned = mentioned.username;
                const embed = new Discord.RichEmbed()
                    .setTitle(`${args[0]} TedCoin subtracted from ${mentioned}\'s Balance`)
                    .setColor(0xF1C40F)
                    .addField(`New Balance`, `${row.balance - parseInt(args[0])}`, true)
                message.channel.send({embed});
            }
        }).catch(() => {
            console.error;
            sql.run(`CREATE TABLE IF NOT EXISTS bank (userID TEXT, balance INTEGER)`).then( () => {
                sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [defineduser, 0]);
            })
        })
    }

    if (command === 'GIVE' || command === 'PAY' || command === 'TIP') {
        //Check if they defined an amount
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of TedCoin to give. \nExample: \`${prefix}give <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(args[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of TedCoin to give. Example: \`${prefix}give <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined a user
        let defineduser = '';
        if (!args[1]) { //If they didn't define anyone, give an error
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no user defined')
                .setDescription(`This command requires a user to give TedCoin to. Example: \`${prefix}give <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }

        if (message.member.roles.find("name", banRole)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: banned user')
                .setDescription('You are banned from using the !give command')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        sql.get(`SELECT * FROM bank WHERE userID ="${defineduser}"`).then(row => {
            if(!row) {
                sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [defineduser, 0]);
            } else {
                //Subtract from sender
                sql.get(`SELECT * FROM bank WHERE userID="${message.author.id}"`).then(row => {
                    if(!row) {
                        sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [message.author.id, 0]);
                    }  if (args[0] > row.balance) {
                        const embed = new Discord.RichEmbed()
                            .setTitle('Error: balance too low')
                            .setDescription(`You do not have enough TedCoin to complete this transaction. Use \`${prefix}bal\` to check your balance.`)
                            .setColor(0xFF0000)
                        message.channel.send({embed});
                        args[0] = 0;
                        return;
                    } else {
                        //Remove points from sender
                        sql.run(`UPDATE bank SET balance =${row.balance - parseInt(args[0])} WHERE userID = "${message.author.id}"`);

                        //Get receiver's info again
                        sql.get(`SELECT * FROM bank WHERE userID ="${defineduser}"`).then(row=> {
                            //Add points
                            sql.run(`UPDATE bank SET balance =${row.balance + parseInt(args[0])} WHERE userID ="${defineduser}"`);
                        })
                    }
                })

                //Let the user know
                var mentioned = client.users.get(defineduser);
                mentioned = mentioned.username;
                const embed = new Discord.RichEmbed()
                    .setTitle(`${args[0]} TedCoin added to ${mentioned}\'s Balance`)
                    .setColor(0xF1C40F)
                    .addField(`New Balance`, `${row.balance + parseInt(args[0])}`, true)
                message.channel.send({embed});
            }
        }).catch(() => {
            console.error;
            sql.run(`CREATE TABLE IF NOT EXISTS bank (userID TEXT, balance INTEGER)`).then( () => {
                sql.run(`INSERT INTO bank (userID, balance) VALUES (?, ?)`, [defineduser, 0]);
            })
        })
    }





})

client.login(token);

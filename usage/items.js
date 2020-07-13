exports.weapons = {
    
    'God sword' : {dmg : 44.5, hitP : 100, desc : "Made by the gods, Only the owner shall have this weapon.",name : 'God sword', critC: 50},

    'Classic Sword' : {dmg : 14, hitP : 76, desc : "A royal knight gave you this.", name : 'Classic Sword', critC: 10},

    'Stick' : {dmg : 20, hitP : 36, desc : "A stick you found laying around.", name : 'Stick', critC: 2},

    '⚒Ban hammer' : {dmg : 100, hitP : 100, desc : "Anyone who gets hit with this shall go oof.", name : '⚒Ban hammer', critC: 99},

    'Sword' : {dmg : 10, hitP : 88, desc : "A sword crafted by a blacksmith",name : 'Sword', critC: 8},
    
    '✨Crit crasher': {
        dmg : 13, 
        hitP : 77, 
        desc : "You won, oof.",
        name : '✨Crit crasher', 
        critC: 79, 
    },
    '💫Dream fighter': {
        dmg : 20, 
        hitP : 81, 
        desc : "You wished for this sword, and it became a thing.",
        name : '💫Dream fighter', 
        critC: 65, 
    },
    '©Article 13' : {
        dmg : 18, 
        hitP : 81, 
        desc : "Content blocked in your country.",
        name : '©Article 13', 
        critC: 45, 
    },
    '<:Gauntlet:577171837931487233>Snap' : {
        dmg : 9999, 
        hitP : 100, 
        desc : "**fades away*",
        name : '<:Gauntlet:577171837931487233>Snap', 
        critC: 100, 
    },
    'Amaryllis' : {
        dmg : 21, 
        hitP : 76, 
        desc : "Forged with pure fire.",
        name : 'Amaryllis', 
        critC: 43, 
        special : ['burn', 2, 10]
    },
    'Veninu' : {
        dmg : 16, 
        hitP : 89, 
        desc : "You see the poision runing through the blades tongue",
        name : 'Veninu',
        critC: 43, 
        special : ['Poision', 3, 6]
    },
    '<:Obliterator:577550193344512031>Obliterator' : {
        dmg : 25, 
        hitP : 70, 
        desc : "'The final?'",
        name : '<:Obliterator:577550193344512031>Obliterator', 
        critC: 21, 
    },
    'Testing sword': {
        dmg : 645357354674, 
        hitP : 100, 
        desc : "Looks like a bug right?",
        name : 'Testing sword', 
        special : ['Death', 1000, 1000],
        critC: 100, 
    },
    'Excalibur' : {
        dmg : 25, 
        hitP : 96, 
        desc : "Yeahh its pretty good",
        name : 'Excalibur', 
        special : ['Gods might', 3, 6],
        critC: 79,
    },
}


exports.SHOPiw = 
{
    'Excalibur' : {
        desc : "Yeahh its pretty good.",
        name : 'Excalibur', 
        type : 'Weapons',
        price : 354000
    },

    '💫Dream fighter' : {
        desc : "You wished for this sword, and it became a thing.",
        name : '💫Dream fighter', 
        type : 'Weapons',
        price : 23000
    },
    '©Article 13' : {
        desc : "Content blocked in your country.",
        name : '©Article 13',
        type : 'Weapons',
        price : 23000
    }



}


exports.foundW = 
    {
        '⚔Iron sword':{
            dmg : 20, 
            hitP : 77, 
            desc : "A sword you found by beating a foe.",
            name : '⚔Iron sword', 
            critC: 12, 
            dropRate :22
        },
        '🌟Gold sword':{
            dmg : 15, 
            hitP : 88, 
            desc : "A sword you found by beating a foe.",
            name : '🌟Gold sword', 
            critC: 43, 
            dropRate :14

        },
        '🔥Fire': {
            dmg : 20, 
            hitP : 43, 
            desc : "Congratulations, You've harnessed the will to hold fire..",
            name : '🔥Fire', 
            critC: 77, 
            dropRate :10
        },
        '🗝Sword': {
            dmg : 22, 
            hitP : 54, 
            desc : "totally not a reference to kingdom hearts",
            name : '🗝Sword', 
            critC: 24, 
            dropRate :10
        }
    }
exports.items = 
    {
        
        'Owner' : {
            health : 1000,
            hitP : 1000,
            critC : 1000,
            hRegen : 1000,
            desc : 'Feel the owners wrath.',
            name : 'Owner',
            icon : '576555798025601055'
        },
        'Tester' : {
            health : 500,
            hitP : 40,
            critC : 40,
            hRegen : 500,
            desc : 'Picked out by the owner, allows testers to test more fluently.',
            name : 'Tester',
            icon : '579440146416402432'
        },
        'Health Crystal' : {
            health : 115,
            hitP : 0,
            critC : 0,
            hRegen : 10,
            desc : 'Regens your health and gives you a starting hp boost.',
            name : 'Health Crystal',
            icon : '576547251891994625',
            DR: 2
        },
        'Combat Crystal' : {
            health : 105,
            hitP : 15,
            critC : 15,
            hRegen : 1,
            desc : 'Increses your crit & hit %',
            name : 'Combat Crystal',
            icon : '576605043495796746',
            DR:2
        }

    }
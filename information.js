"use strict";

const header = document.getElementById("siteHeader");
const menu = document.getElementById("menuButton");
const navigation = document.getElementById("mainNavigation");
const chapterNavigation = document.getElementById("chapterNavigation");
const informationContent = document.getElementById("informationContent");
const currentYear = document.getElementById("currentYear");

const sections = [
  {
    id: "server",
    eyebrow: "SERVER BASICS",
    title: "Server IP and basic information",
    description:
      "The original presentation describes a cross-play network hosted in North America.",
    cards: [
      {
        label: "CONNECTION",
        title: "Server access",
        accent: "accent-purple",
        items: [
          "The server plans to use a wss:// connection because it is intended to support multiple clients.",
          "Planned clients include Java Edition and EaglerCraft.",
          "Cross-play is planned through the same IP or domain."
        ]
      },
      {
        label: "HOSTING",
        title: "North American hosting",
        accent: "accent-cyan",
        items: [
          "The planned host location is North America.",
          "Toronto is identified as the preferred hosting location."
        ]
      },
      {
        label: "NETWORK PURPOSE",
        title: "A connected Minecraft network",
        accent: "accent-gold",
        items: [
          "Multiple game modes are planned under one network.",
          "Currencies, ranks, cosmetics, quests, events, guilds, and rewards connect the experiences."
        ]
      }
    ]
  },
  {
    id: "economy",
    eyebrow: "AX, JEWELS, HEARTS, AND REWARDS",
    title: "Network economy systems",
    description:
      "The presentation defines gameplay currencies, premium currency, cosmetics, gifts, voting, and lottery rewards.",
    cards: [
      {
        label: "AX REWARDS",
        title: "Game reward values",
        accent: "accent-cyan",
        items: [
          "BedWars: 1 win = 50 AX.",
          "BedWars: 1 final kill = 10 AX.",
          "BedWars: 1 bed token = 20 AX.",
          "SkyWars: 1 win = 50 AX.",
          "SkyWars: 1 kill = 10 AX.",
          "KitPVP: 1 kill = 15 KitPVP Coins.",
          "Event Hole, as written on slide 4: 1 win = 300 AX, 1 host = 60 AX, and 1 join = 30 AX.",
          "Duels: 1 win = 25 AX and 1 loss = 10 AX."
        ],
        notice:
          "A later Event Hall slide lists different Event Hall rewards: 450 AX for the winner, 30 AX for players, and 80 AX for the host. Both versions are preserved."
      },
      {
        label: "ARMOR COSMETICS",
        title: "Armor prices",
        items: [
          "Rank Armor: 500 AX.",
          "Business Man Armor: 2,000 AX and a Business kill message.",
          "Fire Armor: 4,500 AX and a Fire kill message.",
          "Robot Armor: 5,000 AX and a Robot kill message.",
          "Samurai Armor: 7,500 AX and a Samurai kill message.",
          "Astronaut Armor: 9,000 AX and an Astronaut kill message.",
          "Star Armor: 10,000 AX and a Star kill message.",
          "Rainbow Armor: 15,000 AX.",
          "Idol Cutie Armor: available only to the Idol rank."
        ]
      },
      {
        label: "KILL MESSAGES",
        title: "Cosmetic elimination text",
        items: [
          "Default: Steve was slapped by Alex!",
          "Business: Steve was buried in paperwork by Alex!",
          "Fire: Steve got cooked with BBQ sauce by Alex!",
          "Robot: Steve failed the AI takeover led by Alex!",
          "Samurai: Steve was struck down by Samurai named Alex!",
          "Astronaut: Steve ran out of oxygen thanks to Alex.",
          "Star: Steve disappeared among the stars thanks to Alex!"
        ]
      },
      {
        label: "EFFECTS AND WINGS",
        title: "Wearable cosmetics",
        items: [
          "Blue Wings: 3,000 AX.",
          "Fire Wings: 5,000 AX.",
          "Katana: 7,500 AX and worn at the player's waist.",
          "Jetpack: 10,000 AX and worn on the player's back.",
          "Falling Stars: 15,000 AX, with stars falling from a small cloud above the player.",
          "Vortex Aura: 20,000 AX and displayed around the player's feet.",
          "Idol Cutie Wings: heart wings available only to Idol.",
          "Angel Wings: wings and a halo available only to Angel."
        ]
      },
      {
        label: "JEWELS",
        title: "Premium currency",
        accent: "accent-purple",
        items: [
          "Jewels are obtained from the official website.",
          "Jewels can be used to purchase ranks and Chat Tags.",
          "Jewels can be used to gift ranks to another player.",
          "Players can receive rewards for gifting ranks."
        ]
      },
      {
        label: "RANK GIFT MILESTONES",
        title: "Gifting progression",
        rewardMilestones: [
          "2 gifts",
          "4 gifts",
          "6 gifts",
          "10 gifts",
          "20 gifts",
          "40 gifts",
          "75 gifts",
          "100 gifts",
          "150 gifts",
          "200 gifts",
          "300 gifts",
          "400 gifts",
          "500 gifts",
          "650 gifts",
          "900 gifts",
          "800 gifts",
          "1,000 gifts"
        ],
        notice:
          "The original milestone slide visually associates rewards with each total. The milestone order, including 900 before 800, is preserved from the presentation."
      },
      {
        label: "GIFT EXAMPLE",
        title: "Example rank gift",
        items: [
          "The presentation shows an example where richmond, who has God rank, gifts VIP rank to alexiepro, who has Nova rank, using Jewels."
        ]
      },
      {
        label: "HEART SYSTEM",
        title: "Vote for the server",
        items: [
          "Players receive Hearts by voting for the server.",
          "A player can vote up to four times per day.",
          "Hearts can be used for the Voter Lottery."
        ]
      },
      {
        label: "VOTER LOTTERY",
        title: "Jackpot odds",
        accent: "accent-gold",
        items: [
          "50.0%: 50 VX.",
          "20.0%: 200 VX.",
          "15.0%: +50% Flake boost for 3 days.",
          "10.5%: one $10,000 Survival Lottery ticket.",
          "3.5%: 2x Flake boost for 1 week.",
          "0.9%: permanent +50% Flake boost.",
          "0.09%: 3-month rank upgrade.",
          "0.01%: permanent rank upgrade."
        ],
        notice:
          "The Voter Lottery slide uses VX, while other slides primarily use AX. The original currency wording is preserved."
      }
    ]
  },
  {
    id: "survival",
    eyebrow: "SURVIVAL",
    title: "Mine your dream and community",
    description:
      "Survival includes its own money, lottery, Flakes, crates, recovery items, kits, land protection, and rules.",
    cards: [
      {
        label: "SURVIVAL LOTTERY",
        title: "Lucky Lottery Ticket",
        accent: "accent-gold",
        items: [
          "One ticket costs $10,000 Survival Dollars.",
          "60.0%: $0 and a Good Luck Next Time result.",
          "25.0%: $10,000.",
          "10.0%: $25,000.",
          "4.0%: $100,000.",
          "0.9%: $500,000.",
          "0.1%: $2,000,000, identified as the American Dream result."
        ]
      },
      {
        label: "FLAKE SYSTEM",
        title: "Activity currency",
        accent: "accent-cyan",
        items: [
          "Flakes are a special Survival currency for active and dedicated players.",
          "Flakes cannot be obtained through normal economy activities.",
          "The presentation awards 1 Flake for 1 minute of AFK time.",
          "Flakes can purchase crate keys, a seven-day Nova trial, and Death Recovery Tokens."
        ]
      },
      {
        label: "COMMON KEY PACK",
        title: "1,200 Flakes",
        items: [
          "Full diamond armor.",
          "Iron sword, iron pickaxe, and iron axe.",
          "10 Golden Apples.",
          "64 Steaks.",
          "15 Diamonds."
        ]
      },
      {
        label: "EPIC KEY PACK",
        title: "2,100 Flakes",
        items: [
          "Full diamond armor.",
          "Diamond sword, diamond pickaxe, and diamond axe.",
          "1 Totem of Undying.",
          "16 Golden Apples.",
          "32 Diamonds.",
          "$5,000 Survival Dollars."
        ]
      },
      {
        label: "LEGENDARY KEY PACK",
        title: "5,000 Flakes",
        items: [
          "Full Netherite armor.",
          "Netherite sword, pickaxe, and axe.",
          "3 Totems of Undying.",
          "32 Golden Apples.",
          "40 Diamonds.",
          "$20,000 Survival Dollars."
        ]
      },
      {
        label: "GOATED KEY PACK",
        title: "7,500 Flakes",
        items: [
          "Zombie, Skeleton, Spider, and Blaze spawners.",
          "Full Netherite armor.",
          "Netherite sword and axe.",
          "Netherite pickaxe with Efficiency IV and Silk Touch.",
          "$50,000 Survival Dollars."
        ]
      },
      {
        label: "NOVA TRIAL",
        title: "Seven-day Nova rank trial",
        items: [
          "Available only to unranked players.",
          "Costs 400 Flakes.",
          "Can be used only once."
        ]
      },
      {
        label: "DEATH RECOVERY",
        title: "Death Recovery Token",
        items: [
          "Can be used after dying in Survival.",
          "Costs 500 Flakes.",
          "Has a six-hour cooldown."
        ]
      },
      {
        label: "KIT RULE",
        title: "Rank kit restrictions",
        accent: "accent-purple",
        items: [
          "Players can claim only the kit belonging to their own rank.",
          "Other rank kits cannot be directly claimed.",
          "Items from other kits may be obtained if another player gives them away or sells them through the Auction House."
        ]
      },
      {
        label: "GOD KIT",
        title: "Every 30 days",
        items: [
          "Netherite armor with Protection IV, Mending, and Unbreaking III.",
          "Netherite sword with Sharpness IV, Unbreaking III, and Mending.",
          "Netherite pickaxe with Efficiency IV, Unbreaking III, Mending, and Silk Touch.",
          "Netherite axe with Efficiency IV, Unbreaking III, and Mending.",
          "64 Golden Apples.",
          "3 Totems of Undying.",
          "1 Enchanted Golden Apple.",
          "128 Golden Carrots.",
          "32 Ender Pearls."
        ]
      },
      {
        label: "KING KIT",
        title: "Every 30 days",
        items: [
          "Netherite armor with Protection II, Mending, and Unbreaking II.",
          "Netherite sword with Sharpness II, Unbreaking II, and Mending.",
          "Netherite pickaxe with Efficiency II, Unbreaking II, and Mending.",
          "40 Golden Apples.",
          "3 Totems of Undying.",
          "128 Golden Carrots.",
          "16 Ender Pearls."
        ]
      },
      {
        label: "MVP KIT",
        title: "Every 20 days",
        items: [
          "Diamond armor with Protection IV, Mending, and Unbreaking II.",
          "Diamond sword with Sharpness IV, Unbreaking II, and Mending.",
          "Diamond pickaxe with Efficiency III, Unbreaking II, and Mending.",
          "25 Golden Apples.",
          "2 Totems of Undying.",
          "64 Golden Carrots.",
          "16 Ender Pearls."
        ]
      },
      {
        label: "IDOL KIT",
        title: "Every 15 days",
        items: [
          "Diamond armor with Protection III, Mending, and Unbreaking II.",
          "Diamond sword with Sharpness IV, Unbreaking I, and Mending.",
          "Diamond pickaxe with Efficiency II and Unbreaking I.",
          "20 Golden Apples.",
          "2 Totems of Undying.",
          "128 Steaks.",
          "16 Ender Pearls."
        ]
      },
      {
        label: "VIP KIT",
        title: "Every 10 days",
        items: [
          "Diamond armor with Protection II, Mending, and Unbreaking I.",
          "Sword with Sharpness III and Unbreaking I.",
          "Iron pickaxe with Efficiency II.",
          "15 Golden Apples.",
          "1 Totem of Undying.",
          "64 Steaks.",
          "8 Ender Pearls."
        ]
      },
      {
        label: "PLUS KIT",
        title: "Every 7 days",
        items: [
          "Diamond armor with Protection I and Unbreaking I.",
          "Sword with Sharpness I and Unbreaking I.",
          "Iron pickaxe with Efficiency I.",
          "10 Golden Apples.",
          "1 Totem of Undying.",
          "64 Steaks.",
          "4 Ender Pearls."
        ]
      },
      {
        label: "DEFAULT KIT",
        title: "Every day",
        items: [
          "Iron armor.",
          "Iron sword, pickaxe, and axe.",
          "5 Golden Apples.",
          "1 Totem of Undying.",
          "5 Ender Pearls.",
          "64 Steaks."
        ]
      },
      {
        label: "SURVIVAL MANUAL",
        title: "Perks and rules",
        wide: true,
        items: [
          "Players can use three homes according to the Survival manual slide.",
          "Use /kit to claim available kits.",
          "Use /land to protect a base.",
          "Do not damage another player's structure or base.",
          "Do not cheat.",
          "Breaking these rules can result in penalties."
        ],
        notice:
          "Rank slides later define different /home and /land limits for individual ranks. Those values are preserved in the Ranks section."
      }
    ]
  },
  {
    id: "bedwars",
    eyebrow: "BEDWARS",
    title: "Matchmaking, quests, and progression",
    description:
      "Players enter the BedWars lobby through an NPC and select Solo or Duo matchmaking.",
    cards: [
      {
        label: "MATCHMAKING",
        title: "NPC game entry",
        items: [
          "Touch the first NPC to enter the BedWars lobby.",
          "Touch the Solo or Duo NPC to join a game quickly."
        ]
      },
      {
        label: "DAILY QUESTS",
        title: "Daily XP",
        items: [
          "Win 1 game: 700 XP.",
          "Break 3 beds: 700 XP.",
          "Get 15 final kills: 1,000 XP."
        ]
      },
      {
        label: "WEEKLY QUESTS",
        title: "Weekly XP",
        items: [
          "Break 25 beds: 7,500 XP.",
          "Get 100 final kills: 7,500 XP."
        ]
      },
      {
        label: "SPECIAL WEEKLY QUESTS",
        title: "Rank-related quest goals",
        items: [
          "Get 130 kills: +4,000 XP.",
          "Break 40 beds: +10,000 XP."
        ]
      },
      {
        label: "LEVEL SYSTEM",
        title: "Charge XP to increase BedWars level",
        wide: true,
        items: [
          "The presentation contains a visual level progression chart.",
          "BedWars levels progress through earned XP from gameplay and quests."
        ]
      }
    ]
  },
  {
    id: "skywars",
    eyebrow: "SKYWARS",
    title: "Fast island battles and XP",
    description:
      "Players enter the SkyWars lobby and games through NPC interactions.",
    cards: [
      {
        label: "MATCHMAKING",
        title: "NPC game entry",
        items: [
          "Touch the first NPC to enter the SkyWars lobby.",
          "Touch the next NPC to join a game quickly."
        ]
      },
      {
        label: "DAILY QUESTS",
        title: "Daily XP",
        items: [
          "Win 1 game: 700 XP.",
          "Get 10 final kills: 1,000 XP."
        ]
      },
      {
        label: "WEEKLY QUEST",
        title: "Weekly XP",
        items: [
          "Get 70 kills: 4,000 XP."
        ]
      },
      {
        label: "SPECIAL WEEKLY QUESTS",
        title: "Additional goals",
        items: [
          "Get 100 kills: +2,500 XP.",
          "Win 40 games: +3,000 XP."
        ]
      },
      {
        label: "LEVEL SYSTEM",
        title: "Charge XP to increase SkyWars level",
        wide: true,
        items: [
          "The presentation contains a visual SkyWars level progression chart.",
          "SkyWars levels progress through earned XP from gameplay and quests."
        ]
      }
    ]
  },
  {
    id: "duels",
    eyebrow: "DUELS",
    title: "Short competitive game formats",
    description:
      "Duels contains a selection of direct competitive modes, with additional games planned.",
    cards: [
      {
        label: "AVAILABLE DUELS",
        title: "Planned game list",
        wide: true,
        items: [
          "1v1 Fireball Fight.",
          "1v1 Bed Fight.",
          "1v1 BuildUHC.",
          "Archer.",
          "Boxing.",
          "1v1 Sumo.",
          "1v1 Bridge Fight.",
          "Stick Fight.",
          "Combo.",
          "Potion Fight.",
          "Crystal.",
          "Mace.",
          "Spear.",
          "1v1 Sword.",
          "New games are planned for future updates."
        ]
      }
    ]
  },
  {
    id: "event-hall",
    eyebrow: "EVENT HALL",
    title: "Player-hosted community events",
    description:
      "MVP, King, and God players can use Event Hall tools to host structured events.",
    cards: [
      {
        label: "HOSTING REQUIREMENTS",
        title: "MVP and above",
        accent: "accent-purple",
        items: [
          "Event hosting is available from MVP rank.",
          "The maximum capacity is 30 players.",
          "At least 10 players are required to start.",
          "Hosting has a 30-minute cooldown.",
          "MVP, King, and God players can broadcast after an event is hosted."
        ]
      },
      {
        label: "EVENT REWARDS",
        title: "Later Event Hall values",
        accent: "accent-gold",
        items: [
          "Winner: 450 AX.",
          "Participating player: 30 AX.",
          "Host: 80 AX."
        ],
        notice:
          "Slide 4 gives earlier values of 300 AX for a win, 60 AX for hosting, and 30 AX for joining."
      },
      {
        label: "1V1 SUMO",
        title: "Knockback duel",
        items: [
          "Knock an opponent from a narrow platform into the void using knockback items."
        ]
      },
      {
        label: "COLOR DASH",
        title: "Find the announced color",
        items: [
          "Step on the designated colored block before the remaining floor disappears."
        ]
      },
      {
        label: "COPS AND ROBBERS",
        title: "Capture or survive",
        items: [
          "Robbers must survive the time limit and rescue jailed teammates.",
          "Cops must capture every robber before time expires."
        ]
      },
      {
        label: "OBSTACLE COURSE RELAY",
        title: "Team checkpoint race",
        items: [
          "Race through a trap-filled course.",
          "Step on checkpoints to open the gate for the next teammate."
        ]
      },
      {
        label: "LAVA RISE",
        title: "Vertical escape",
        items: [
          "Climb a vertical obstacle course before the rising lava consumes the team."
        ]
      },
      {
        label: "DANCING BLOCKS",
        title: "Rhythm survival",
        items: [
          "Move and perform actions according to beats and flashing neon floors."
        ]
      },
      {
        label: "EVENT ALERT",
        title: "Network announcement",
        wide: true,
        items: [
          "The presentation includes an example event alert.",
          "The alert identifies the host, event name, and a clickable join action."
        ]
      }
    ]
  },
  {
    id: "creative",
    eyebrow: "CREATIVE",
    title: "Personal building spaces",
    description:
      "Creative allows players to build structures in their assigned spaces.",
    cards: [
      {
        label: "CREATIVE RULES",
        title: "Build without destroying others",
        wide: true,
        items: [
          "All players can build structures in their own space.",
          "Players cannot damage or destroy another player's structures.",
          "Breaking the rules results in punishment."
        ]
      }
    ]
  },
  {
    id: "nightmare",
    eyebrow: "SQUID NIGHTMARE GAME",
    title: "Large staff-hosted elimination event",
    description:
      "The presentation describes a 100-player special event with a monthly cooldown and five elimination stages.",
    cards: [
      {
        label: "HOSTING",
        title: "Staff-controlled game",
        accent: "accent-purple",
        items: [
          "The title says only staff can host the game.",
          "The same slide also states that event hosting is available from King rank.",
          "The player limit is 100.",
          "At least 80 players are required to start.",
          "The hosting cooldown is one month.",
          "All staff can broadcast when the game is hosted."
        ],
        notice:
          "The staff-only statement and King-rank statement appear together in the source presentation and are both preserved."
      },
      {
        label: "RED LIGHT, GREEN LIGHT",
        title: "Stage 1",
        items: [
          "Players have five minutes to travel 400 meters.",
          "Players move while the text is green.",
          "Three warning beeps play before the text turns red.",
          "Players moving during red are eliminated."
        ]
      },
      {
        label: "HONEYCOMB GAME",
        title: "Stage 2",
        items: [
          "Players split into four equal teams.",
          "Shapes are Triangle, Circle, Star, and Umbrella.",
          "Teams hollow their shape from a giant wool block within five minutes.",
          "The slowest team is eliminated."
        ]
      },
      {
        label: "MERRY-GO-LAND OF DEATH",
        title: "Stage 3",
        items: [
          "Players move on a carousel.",
          "When music stops, a required group size is announced.",
          "Players must gather in rooms with exactly the announced number.",
          "The stage contains three rounds."
        ]
      },
      {
        label: "GLASS STEPPING STONES",
        title: "Stage 4",
        items: [
          "Players have ten minutes.",
          "The bridge contains 25 pairs of glass blocks.",
          "Players choose between safe and breakable glass.",
          "Progress depends on memory and the choices of players ahead."
        ]
      },
      {
        label: "HUNGER GAME",
        title: "Final stage",
        items: [
          "Players collect weapons from central chests.",
          "Players fight until only one survivor remains."
        ]
      },
      {
        label: "PRIZES",
        title: "Final placements",
        accent: "accent-gold",
        items: [
          "1st place: 1,000 Jewels.",
          "2nd place: 10,000 AX.",
          "3rd place: 5,000 AX.",
          "All players: 200 AX.",
          "Staff members cannot join the game."
        ]
      },
      {
        label: "CHEATING RULE",
        title: "Prize reassignment",
        wide: true,
        items: [
          "Do not use cheat clients or hacks.",
          "A cheating 1st, 2nd, or 3rd place player loses the prize and receives a 90-day ban.",
          "If 1st place is disqualified, 2nd receives the 1st-place prize, 3rd receives the 2nd-place prize, and 4th receives the 3rd-place prize.",
          "The same advancement process applies when 2nd or 3rd place is disqualified."
        ]
      }
    ]
  },
  {
    id: "christmas",
    eyebrow: "CHRISTMAS SPECIAL EVENT",
    title: "Find Santa Claus",
    description:
      "The presentation identifies this as the server's biggest event and limits it to December.",
    cards: [
      {
        label: "EVENT OVERVIEW",
        title: "Search a 1,000 × 1,000 world",
        accent: "accent-purple",
        items: [
          "Santa arrives in AxloMC during December.",
          "A hidden Santa NPC waits inside a 1,000 × 1,000 Christmas world.",
          "The first player to locate and click Santa wins.",
          "There is only one official winner."
        ]
      },
      {
        label: "PRIZES",
        title: "Christmas rewards",
        accent: "accent-gold",
        items: [
          "Player who finds Santa: 5,000 Jewels.",
          "Every participating player: 2,500 AX."
        ]
      },
      {
        label: "COOPERATION",
        title: "Agreements are player responsibility",
        items: [
          "Cooperation is allowed.",
          "The first player to click Santa receives the full official reward.",
          "Staff are not responsible for agreements, promises, trades, reward-sharing arrangements, or disputes.",
          "All official rewards are granted exclusively to the official winner.",
          "Participation means acceptance of these conditions."
        ]
      },
      {
        label: "ALLOWED",
        title: "Permitted behavior",
        items: [
          "Exploration.",
          "Teaming.",
          "Information sharing.",
          "Voice chat communication.",
          "Group searching."
        ]
      },
      {
        label: "NOT ALLOWED",
        title: "Prohibited behavior",
        items: [
          "Exploiting bugs.",
          "Using unauthorized modifications.",
          "Any form of cheating.",
          "Violations may result in temporary or permanent bans."
        ]
      },
      {
        label: "EXAMPLE",
        title: "Winner announcement",
        items: [
          "The presentation includes an example where qwertyygoat, an Idol-ranked player, finds Santa."
        ]
      }
    ]
  },
  {
    id: "ranks",
    eyebrow: "RANKS",
    title: "Permanent ranks and monthly upgrades",
    description:
      "Rank prices, Jewel prices, queue priority, kits, quests, hosting, land limits, homes, and Creative realms are preserved below.",
    cards: [
      {
        label: "MONTHLY MVP UPGRADE",
        title: "God",
        image: "./img/God.jpeg",
        price: "$8.99 per month or 900 Jewels per month",
        items: [
          "Fastest non-staff queue.",
          "Can host Event Hall events.",
          "Keeping God for 1 month grants a temporary custom tag.",
          "Can spectate in KitPVP.",
          "Special BedWars and SkyWars quests.",
          "Can fly in the Duels lobby.",
          "Can use /nick.",
          "Avoids clearly different ping in Duel matchmaking.",
          "Can create a guild.",
          "3.5x KitPVP kill coins.",
          "5 Creative realms.",
          "5 lands and 5 homes in Survival.",
          "Can claim the God kit.",
          "God chat prefix."
        ]
      },
      {
        label: "MONTHLY MVP UPGRADE",
        title: "King",
        image: "./img/King.jpeg",
        price: "$3.99 per month or 400 Jewels per month",
        items: [
          "Queue priority directly below God.",
          "Can host Event Hall events.",
          "Keeping King for 2 months grants a temporary custom tag.",
          "Can spectate in KitPVP.",
          "Special BedWars and SkyWars quests.",
          "Can fly in the Duels lobby.",
          "3x KitPVP kill coins.",
          "5 Creative realms.",
          "5 lands and 5 homes in Survival.",
          "Can claim the King kit.",
          "King chat prefix.",
          "Can use /nick.",
          "Can create a guild."
        ]
      },
      {
        label: "PERMANENT RANK",
        title: "MVP",
        image: "./img/MVP.jpeg",
        price: "$28.99 permanent or 2,900 Jewels permanent",
        items: [
          "Queue priority directly below King.",
          "Can host Event Hall events.",
          "MVP Survival kit.",
          "Can spectate in KitPVP.",
          "Good BedWars and SkyWars quests.",
          "Can fly in the Duels lobby.",
          "4 lands and 4 homes in Survival.",
          "5 Creative realms.",
          "3x KitPVP kill coins.",
          "Can create a guild."
        ]
      },
      {
        label: "PERMANENT RANK",
        title: "Idol",
        image: "./img/Idol.jpeg",
        price: "$20.99 permanent or 2,100 Jewels permanent",
        items: [
          "Queue priority directly below MVP.",
          "Idol Survival kit.",
          "Can spectate in KitPVP.",
          "Good BedWars and SkyWars quests.",
          "Exclusive Heart Rings in the lobby.",
          "Can fly in the Duels lobby.",
          "4 lands and 4 homes in Survival.",
          "5 Creative realms.",
          "Can create a guild.",
          "3x KitPVP kill coins."
        ]
      },
      {
        label: "PERMANENT RANK",
        title: "VIP",
        image: "./img/VIP.jpeg",
        price: "$10.99 permanent or 1,100 Jewels permanent",
        items: [
          "Queue priority directly below Idol.",
          "VIP Survival kit.",
          "VIP chat prefix.",
          "3 lands and 3 homes in Survival.",
          "2.5x KitPVP kill coins.",
          "Good BedWars and SkyWars quests.",
          "Can fly in the Duels lobby."
        ]
      },
      {
        label: "PERMANENT RANK",
        title: "Nova",
        image: "./img/Nova.jpeg",
        price: "$3.99 permanent or 400 Jewels permanent",
        items: [
          "Queue priority directly below VIP.",
          "Nova Survival kit.",
          "Normal BedWars and SkyWars quests.",
          "Can fly in the Duels lobby.",
          "3 lands and 3 homes in Survival.",
          "2 Creative realms.",
          "2x KitPVP kill coins."
        ]
      },
      {
        label: "FREE",
        title: "Common",
        price: "Free",
        items: [
          "Default Survival kit.",
          "Normal BedWars and SkyWars quests.",
          "3 lands and 2 homes in Survival.",
          "2 Creative realms.",
          "Can visit the server museum named Hall of Origins."
        ]
      },
      {
        label: "SPECIAL RANK",
        title: "Alumni",
        items: [
          "Given to retired staff members.",
          "The former staff member must not have committed ominous or serious misconduct."
        ]
      },
      {
        label: "SPECIAL RANK",
        title: "YouTube",
        items: [
          "At least 2 conditions must be met.",
          "Have 1,000 subscribers.",
          "Average more than 2,500 views on videos.",
          "Average more than 10,000 views on Shorts.",
          "Have a highest-viewed video exceeding 25,000 views."
        ]
      },
      {
        label: "SPECIAL RANK",
        title: "Creator",
        items: [
          "At least 2 conditions must be met.",
          "Have 200 subscribers.",
          "Average more than 100 views per video.",
          "Average more than 5,000 views on Shorts.",
          "Have a highest-viewed video exceeding 500 views."
        ]
      },
      {
        label: "SPECIAL RANK",
        title: "OG",
        items: [
          "Given only to a person who was among the first to see the server."
        ]
      },
      {
        label: "SPECIAL RANK",
        title: "Angel",
        items: [
          "Obtained by gifting ranks to 200 players using Jewels."
        ]
      }
    ]
  },
  {
    id: "tags",
    eyebrow: "CHAT TAGS",
    title: "Purchasable and limited tags",
    description:
      "The source presentation shows many tag designs visually. Pricing and category information is preserved here.",
    cards: [
      {
        label: "COMMON TAGS",
        title: "$1.99 or 200 Jewels",
        items: [
          "Common-tag designs are displayed visually in the original presentation."
        ]
      },
      {
        label: "EPIC TAGS",
        title: "$3.99 or 400 Jewels",
        items: [
          "Epic-tag designs are displayed visually in the original presentation."
        ]
      },
      {
        label: "LEGENDARY TAGS",
        title: "$5.99 or 600 Jewels",
        items: [
          "Legendary-tag designs are displayed visually in the original presentation."
        ]
      },
      {
        label: "CUSTOM TAGS",
        title: "Special and Elite",
        items: [
          "Permanent Custom Tag: $31.99 or 3,200 Jewels.",
          "Temporary Custom Tag: $2.99 or 300 Jewels.",
          "Temporary tags remain for one month.",
          "Additional visual tags on the slide are priced at $9.99, $14.99, and $25.00."
        ]
      },
      {
        label: "LIMITED TAGS",
        title: "$9.98 or 1,000 Jewels each",
        wide: true,
        items: [
          "The Limited Tags slide displays seven visual tag designs.",
          "Every Limited Tag is priced at $9.98 or 1,000 Jewels."
        ]
      }
    ]
  },
  {
    id: "staff",
    eyebrow: "STAFF",
    title: "Staff responsibilities and recruitment",
    description:
      "The presentation defines Engineer, Admin, Senior Moderator, Moderator, and Helper responsibilities and recruitment conditions.",
    cards: [
      {
        label: "ENGINEER",
        title: "Technical development",
        items: [
          "Develop custom Java plugins and unique game modes.",
          "Optimize server configurations and reduce lag.",
          "Monitor logs and fix bugs.",
          "Manage databases.",
          "Configure anti-cheat systems."
        ]
      },
      {
        label: "ADMIN",
        title: "Server operations",
        items: [
          "Manage daily server operations.",
          "Supervise staff, including Moderators and Builders.",
          "Handle high-level player issues.",
          "Manage the server economy.",
          "Make final decisions on ban appeals.",
          "Plan updates and events with the Owner and Engineers."
        ]
      },
      {
        label: "SENIOR MODERATOR",
        title: "Moderation supervision",
        items: [
          "Act as the bridge between Moderators and Admins.",
          "Supervise general Moderators.",
          "Ensure fair and consistent enforcement.",
          "Handle escalated reports and complex appeals.",
          "Train newly recruited staff.",
          "Monitor Minecraft and Discord community behavior."
        ]
      },
      {
        label: "MODERATOR",
        title: "Rule enforcement",
        items: [
          "Monitor in-game and Discord chat.",
          "Stop toxicity, spam, and harassment.",
          "Investigate reports and collect evidence.",
          "Issue mutes, kicks, and temporary bans.",
          "Answer player questions and help newcomers."
        ]
      },
      {
        label: "HELPER",
        title: "Player support",
        items: [
          "Welcome new players.",
          "Answer questions about features, commands, and rules.",
          "Work primarily in public chat.",
          "Warn rule-breakers and report serious issues.",
          "Normally does not have ban or kick permissions.",
          "Staff and developers first review whether an applicant is suitable for staff."
        ]
      },
      {
        label: "ENGINEER RECRUITMENT",
        title: "Portfolio and trial",
        items: [
          "Submit experience and availability online.",
          "Provide a GitHub link or portfolio.",
          "Complete a text or audio interview.",
          "Complete a short trial period.",
          "Applicants are typically at least 16 years old."
        ]
      },
      {
        label: "ADMIN RECRUITMENT",
        title: "Promotion requirements",
        items: [
          "Applicants are typically at least 16 years old.",
          "Applicants should have been Senior Moderator for at least 6 months.",
          "Admins manage operations, staff, economy, appeals, updates, and events."
        ]
      },
      {
        label: "SENIOR MODERATOR RECRUITMENT",
        title: "Internal promotion only",
        items: [
          "Senior Moderators are selected through internal promotion.",
          "Admins evaluate active and reliable Moderators.",
          "Leadership, maturity, policy knowledge, activity logs, calm judgment, and guidance skills are considered.",
          "Applicants are typically at least 16 years old.",
          "Applicants should have been Moderator for at least 6 months."
        ]
      },
      {
        label: "MODERATOR RECRUITMENT",
        title: "Helper promotion",
        items: [
          "Applicants are typically at least 15 years old.",
          "Applicants should have been Helper for at least 3 months.",
          "Moderators monitor chats, investigate reports, collect evidence, enforce rules, and support players."
        ]
      },
      {
        label: "HELPER RECRUITMENT",
        title: "Public application",
        items: [
          "Players submit an online application describing experience, rule knowledge, and active hours.",
          "Staff look for mature, active, and helpful candidates.",
          "Shortlisted candidates complete a Discord text or voice interview.",
          "Successful applicants enter a Helper or Trial Mod phase.",
          "Applicants are typically at least 15 years old."
        ]
      }
    ]
  },
  {
    id: "rules",
    eyebrow: "RULES, LOBBY, AND WEBSITE",
    title: "Network policy and public information",
    description:
      "The presentation defines punishment ranges, lobby displays, museum concepts, and website functions.",
    cards: [
      {
        label: "HACKING AND CHEATING",
        title: "30 to 90-day ban",
        items: [
          "Includes hack clients, cheat clients, duplicated-item abuse, bug abuse, and game-breaking harassment.",
          "Repeated violations may result in a permanent ban."
        ]
      },
      {
        label: "ABUSIVE LANGUAGE",
        title: "Mute or ban",
        items: [
          "Cyberbullying, harmful messages, and toxic language may result in a ban of up to 10 days.",
          "Repeated violations may result in a 30-day ban.",
          "Spam and bad sportsmanship may result in a mute or ban of up to 3 days."
        ]
      },
      {
        label: "INAPPROPRIATE SKINS",
        title: "Permanent ban",
        items: [
          "A skin considered inappropriate for children may result in a permanent ban."
        ]
      },
      {
        label: "STAFF PERMISSIONS",
        title: "Moderation commands",
        items: [
          "/ban and /mute are available from Moderator rank."
        ]
      },
      {
        label: "LOBBY HALL",
        title: "Statues, leaderboards, and staff lounge",
        items: [
          "A golden statue of an OG-ranked player's skin is permanently displayed.",
          "A live NX currency leaderboard is planned.",
          "Players who remain in the Top 3 for one full year can have their names permanently displayed in the lobby.",
          "A Staff Lounge is accessible only to staff members."
        ],
        notice:
          "The Lobby Hall slide uses NX, while other sections use AX or VX. The source wording is preserved."
      },
      {
        label: "OFFICIAL WEBSITE",
        title: "Planned website functions",
        items: [
          "View staff blogs and server articles.",
          "Purchase ranks and Chat Tags.",
          "Open the official Discord server.",
          "View the server IP.",
          "View all server rules."
        ]
      }
    ]
  },
  {
    id: "commands",
    eyebrow: "COMMANDS",
    title: "Player and staff command reference",
    description:
      "Commands are organized by the same categories used in the source presentation.",
    commandGroups: [
      {
        label: "CORE COMMANDS",
        title: "General navigation",
        commands: [
          ["/help", "Show a list of available commands."],
          ["/rules", "View the server rules."],
          ["/menu", "Open the main server menu."],
          ["/play", "Quickly join available games."],
          ["/spawn", "Teleport back to the lobby."]
        ]
      },
      {
        label: "SURVIVAL HOMES",
        title: "Home system",
        commands: [
          ["/home", "Select and teleport to a home."],
          ["/sethome", "Set the current location as a home."],
          ["/delhome", "Delete one of your homes."],
          ["/back", "Return to the previous location."]
        ]
      },
      {
        label: "SURVIVAL TELEPORTATION",
        title: "Player teleport requests",
        commands: [
          ["/tpa <player>", "Request to teleport to another player."],
          ["/tpahere <player>", "Request another player to teleport to you."],
          ["/tpaccept", "Accept a teleport request."],
          ["/tpdeny", "Deny a teleport request."],
          ["/tpacansel", "Cancel a teleport request, preserving the spelling from the presentation."]
        ]
      },
      {
        label: "SURVIVAL LAND",
        title: "Land protection",
        commands: [
          ["/land", "Open the land system menu."],
          ["/land claim", "Claim land to protect a base."],
          ["/land trust <player>", "Allow a player to access the land."],
          ["/land untrust <player>", "Remove a player's access."],
          ["/land invite <player>", "Invite a player to the land."],
          ["/land spawn", "Teleport to the land."],
          ["/land info", "Show information about the land."],
          ["/land list", "View all owned lands."]
        ]
      },
      {
        label: "ECONOMY",
        title: "Money and shop",
        commands: [
          ["/balance", "Check your balance."],
          ["/pay <player> <amount>", "Send money to another player."],
          ["/shop", "Open the server shop."],
          ["/sell <hand/all>", "Sell the held item or all eligible items."]
        ]
      },
      {
        label: "MARKET",
        title: "Auction House",
        commands: [
          ["/ah", "Open the Auction House."],
          ["/ah sell <price>", "List an item for sale."],
          ["/ah browse", "View items for sale."],
          ["/ah cancel", "Remove your item from sale."]
        ]
      },
      {
        label: "KITS AND PVP",
        title: "Kits and duel requests",
        commands: [
          ["/kit", "Claim an available kit."],
          ["/duel <player>", "Challenge another player."],
          ["/duel accept", "Accept a duel request."],
          ["/duel deny", "Deny a duel request."]
        ]
      },
      {
        label: "SOCIAL",
        title: "Messages and guilds",
        commands: [
          ["/msg <player> <message>", "Send a private message."],
          ["/reply <message>", "Reply to the most recent private message."],
          ["/ignore <player>", "Ignore another player."],
          ["/guild create <guild name>", "Create a guild."],
          ["/guild invite <player>", "Invite a player to the guild."],
          ["/guild join <guild name>", "Join a guild."],
          ["/guild leave", "Leave the current guild."]
        ]
      },
      {
        label: "UTILITY",
        title: "Convenience commands",
        commands: [
          ["/ping", "Show connection latency."],
          ["/seen <player>", "Show when a player was last online."],
          ["/compass", "Use a navigation tool."],
          ["/hat", "Wear the held item on the player's head."],
          ["/workbench", "Open a crafting table anywhere."],
          ["/anvil", "Open an anvil anywhere."],
          ["/enderchest", "Open the Ender Chest anywhere."]
        ]
      },
      {
        label: "REWARDS",
        title: "Voting and recurring rewards",
        commands: [
          ["/vote", "Vote for the server and receive rewards."],
          ["/daily", "Claim the daily reward."],
          ["/rewards", "View available rewards."]
        ]
      },
      {
        label: "STAFF COMMANDS",
        title: "Administration tools",
        commands: [
          [
            "/kick, /ban, /unban, /tempban, /mute, /unmute",
            "Punishment and account moderation."
          ],
          [
            "/report, /staffchat, /invsee, /enderchest",
            "Reports, staff communication, and inventory inspection."
          ],
          [
            "/vanish, /freeze, /tp, /tphere",
            "Investigation and teleportation."
          ],
          [
            "/gamemode, /give, /clear, /time, /weather",
            "World and player administration."
          ],
          [
            "/tps, /lag, /plugins, /version, /reload",
            "Server status and technical management."
          ]
        ]
      }
    ]
  },
  {
    id: "development",
    eyebrow: "DEVELOPMENT",
    title: "Initial phase, plugins, and developer rules",
    description:
      "The original roadmap emphasizes building a small, fully working server before attempting the complete network.",
    cards: [
      {
        label: "INITIAL GOAL",
        title: "Build a small working server",
        accent: "accent-cyan",
        items: [
          "The initial goal is not to build every proposed feature.",
          "The initial goal is to create a small, fully working server.",
          "The roadmap is directed toward the Owner and Engineer."
        ]
      },
      {
        label: "PLUGINS",
        title: "VortexMC Alpha Edition list",
        items: [
          "BedWars1058 for BedWars.",
          "LuckPerms for ranks and permissions.",
          "ProtocolLib for plugin compatibility.",
          "EssentialsX for commands.",
          "Vault for VX or balance integration.",
          "TAB for the tab list and name tags.",
          "DeluxeMenus for compass and GUI menus.",
          "WorldEdit for structures.",
          "WorldGuard for lobby protection, including disabled block breaking and PVP."
        ],
        notice:
          "The plugin slide retains the former VortexMC name and refers to VX. Both are preserved from the source."
      },
      {
        label: "DO NOT",
        title: "Developer restrictions",
        accent: "accent-gold",
        items: [
          "Do not try to build everything at once.",
          "Do not aim for perfection at the beginning.",
          "Do not use multiple servers too early."
        ]
      },
      {
        label: "DO",
        title: "Development approach",
        accent: "accent-purple",
        items: [
          "Build small and complete features.",
          "Let players test early.",
          "Improve the server step by step."
        ]
      },
      {
        label: "KEY PHILOSOPHY",
        title: "Iterate through working steps",
        wide: true,
        items: [
          "Successful servers are built through small, working, iterative steps rather than by creating everything at once."
        ]
      },
      {
        label: "VISUAL REFERENCE SLIDES",
        title: "Survival content and perks",
        wide: true,
        items: [
          "Slides 103 through 105 contain visual Survival Content and Perks references.",
          "Slide 105 is an image-only reference in the extracted presentation text."
        ]
      }
    ]
  }
];

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createList(items) {
  const list = createElement("ul");

  items.forEach((item) => {
    list.appendChild(createElement("li", "", item));
  });

  return list;
}

function createRewardGrid(items) {
  const grid = createElement("div", "reward-grid");

  items.forEach((item) => {
    grid.appendChild(createElement("span", "", item));
  });

  return grid;
}

function createCard(card) {
  const classNames = [
    "information-card",
    "rgb-interactive",
    "reveal"
  ];

  if (card.wide) {
    classNames.push("wide");
  }

  if (card.third) {
    classNames.push("third");
  }

  if (card.accent) {
    classNames.push(card.accent);
  }

  const article = createElement("article", classNames.join(" "));

  if (card.image) {
    const headerElement = createElement("div", "rank-header");
    const image = document.createElement("img");

    image.src = card.image;
    image.alt = `${card.title} rank preview`;

    const titleContainer = createElement("div");
    titleContainer.appendChild(
      createElement("p", "card-label", card.label)
    );
    titleContainer.appendChild(
      createElement("h3", "", card.title)
    );

    headerElement.appendChild(image);
    headerElement.appendChild(titleContainer);
    article.appendChild(headerElement);
  } else {
    article.appendChild(
      createElement("p", "card-label", card.label)
    );
    article.appendChild(
      createElement("h3", "", card.title)
    );
  }

  if (card.price) {
    article.appendChild(
      createElement("span", "rank-price", card.price)
    );
  }

  if (card.text) {
    article.appendChild(createElement("p", "", card.text));
  }

  if (card.items) {
    article.appendChild(createList(card.items));
  }

  if (card.rewardMilestones) {
    article.appendChild(
      createRewardGrid(card.rewardMilestones)
    );
  }

  if (card.notice) {
    article.appendChild(
      createElement("p", "notice", card.notice)
    );
  }

  return article;
}

function createCommandCard(group) {
  const article = createElement(
    "article",
    "information-card wide rgb-interactive reveal"
  );

  article.appendChild(
    createElement("p", "card-label", group.label)
  );

  article.appendChild(
    createElement("h3", "", group.title)
  );

  const commandList = createElement("div", "command-list");

  group.commands.forEach(([command, description]) => {
    const entry = createElement("div", "command-entry");
    const code = createElement("code", "", command);
    const explanation = createElement("span", "", description);

    entry.appendChild(code);
    entry.appendChild(explanation);
    commandList.appendChild(entry);
  });

  article.appendChild(commandList);

  return article;
}

function renderSections() {
  sections.forEach((sectionData) => {
    const section = createElement(
      "section",
      "information-section"
    );

    section.id = sectionData.id;

    const heading = createElement(
      "div",
      "section-heading reveal"
    );

    const titleContainer = createElement("div");

    titleContainer.appendChild(
      createElement("p", "eyebrow", sectionData.eyebrow)
    );

    titleContainer.appendChild(
      createElement("h2", "", sectionData.title)
    );

    heading.appendChild(titleContainer);

    heading.appendChild(
      createElement("p", "", sectionData.description)
    );

    section.appendChild(heading);

    const grid = createElement("div", "information-grid");

    if (sectionData.cards) {
      sectionData.cards.forEach((card) => {
        grid.appendChild(createCard(card));
      });
    }

    if (sectionData.commandGroups) {
      sectionData.commandGroups.forEach((group) => {
        grid.appendChild(createCommandCard(group));
      });
    }

    section.appendChild(grid);
    informationContent.appendChild(section);
  });
}

function updateHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 24
  );
}

function closeMenu() {
  if (!navigation || !menu) {
    return;
  }

  navigation.classList.remove("open");
  menu.classList.remove("active");
  menu.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function initializeNavigation() {
  if (!navigation || !menu) {
    return;
  }

  menu.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");

    menu.classList.toggle("active", open);
    menu.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();
}

function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function initializeChapterNavigation() {
  if (!chapterNavigation) {
    return;
  }

  const chapterLinks = [
    ...chapterNavigation.querySelectorAll("a")
  ];

  const observedSections = chapterLinks
    .map((link) => {
      const target = link.getAttribute("href");

      if (!target || !target.startsWith("#")) {
        return null;
      }

      return document.querySelector(target);
    })
    .filter(Boolean);

  function updateActiveChapter() {
    const referencePosition =
      window.scrollY + window.innerHeight * 0.28;

    let activeSection = observedSections[0];

    observedSections.forEach((section) => {
      if (section.offsetTop <= referencePosition) {
        activeSection = section;
      }
    });

    chapterLinks.forEach((link) => {
      const active =
        link.getAttribute("href") ===
        `#${activeSection.id}`;

      link.classList.toggle("active", active);
    });
  }

  chapterLinks.forEach((link) => {
    link.addEventListener("click", () => {
      chapterLinks.forEach((otherLink) => {
        otherLink.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  window.addEventListener(
    "scroll",
    updateActiveChapter,
    {
      passive: true
    }
  );

  updateActiveChapter();
}

function enableRgb() {
  const items = [
    ...document.querySelectorAll(".rgb-interactive")
  ];

  items.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (
        event.target.closest("a, button") &&
        event.target !== item
      ) {
        return;
      }

      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove("rgb-active");
        }
      });

      item.classList.toggle("rgb-active");
      event.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    items.forEach((item) => {
      item.classList.remove("rgb-active");
    });
  });
}

renderSections();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

initializeNavigation();
initializeRevealAnimations();
initializeChapterNavigation();
enableRgb();

# Introduce more translation data


```bash
curl -XPOST http://127.0.0.1:8090/api/translations \
-H 'Authorization: dlxr5494zoqir74gqxbrpvfb' \
-H 'Content-Type: application/json' \
-H 'App-Version: 1.0.0' \
-H 'Scope: admin' \
-H 'Client: webApp' -d \
'[
{ "source": "Now it goes around the sausage", "target": "Jetzt geht’s um die Wurst", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "There you are on the woodway", "target": "Du bist auf dem Holzweg", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "My hair stands up to the mountain", "target": "Mir stehen die Haare zu Berge", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I understand only train station", "target": "Ich versteh nur Bahnhof", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Sorry but my English is under all pig", "target": "Tut mir leid, aber mein Englisch ist under aller Sau", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I think I spider", "target": "Ich glaub, ich spinner", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "The Devil I will do!", "target": "Den Teufel werd ich tun!", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Come on, jump over your shadow", "target": "Komm schon, spring über deinen Schatten", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You walk me animally on the cookie", "target": "Du gehts mir tierisch auf den Keks", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Holla the wood fairy", "target": "Holla die Waidfee", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I see black for you", "target": "Ich seh schwarz für dich", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You are such a fear-rabbit", "target": "Du bist so ein Angsthase", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You might tick incorrectly", "target": "Sie ticken doch ganz nicht richtig", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You are missing cups in your cupboard", "target": "Du hast nicht mehr alle Tassen im Schrank", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You have a bird", "target": "Du hast doch einen Vogel", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "She had a circleruntogetherbreak", "target": "Sie hatten einen Kreislaufzusammenbruch", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I fall from all clouds", "target": "Ich falle aus allen Wolken", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "No one can reach me the water", "target": "Niemand kann mir das Wasser reichen", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You are the yellow from the egg", "target": "Du bist das Gelbe vom Ei", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "It runs me ice cold down my back", "target": "Es laûft mir eiskalt den Rücken runter", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I’m foxdevilswind", "target": "Ich bin fuchsteufelswild", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "That makes me nobody so quickly after", "target": "Das macht mir so schnell keiner nach", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Now we have the salad", "target": "Nun haben wir den Salat", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I think my pig whistles", "target": "Ich glaud mein Schwein pfeift", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You can slide my back down", "target": "Du kannst Mir den Buckel runter rutschen", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "My dear Mr Singing Club", "target": "Mein lieber Herr Gesangsverein", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "That goes off like Schmitz’ cat", "target": "Das geht ab wie Schmitz Katze", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I laugh me broken", "target": "Ich lach mich kaputt", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You will come in devil’s kitchen", "target": "Du kommst in Teufelsküche", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "The motive holies the means", "target": "Das Motiv heiligt die Mittel", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I make me out of the dust", "target": "Ich mach mich aus dem Staub", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You have a crack in your dish", "target": "Du hast nen Sprung in der Schüssel", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Now we sit here in the ink", "target": "Nun sitzen wir hier in der Tinte", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Now the oven is out", "target": "Nun ist der Ofen aus", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I have now really my nose full", "target": "Ich hab jetzt echt de Nase voll", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You luck mushroom", "target": "Du Glüchspilz", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I get the crisis", "target": "Ich krieg die Krise", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You’re a pea counter", "target": "Du bist ein Erbsenzähler", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Dead said live longer", "target": "Totgesagte leben länger", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "I stand on the tube", "target": "Ich steh auf dem Schlauch", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Everything for the cat", "target": "Alles für die Katz’", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "A stone falls from my heart", "target": "Mir fällt ein Stein vom Herzen", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Now it punches Thirteen", "target": "Nun schlägt’s aber dreizehn", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "That fits on no cowskin", "target": "Das passt auf keine Kuhhaut", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You can take poison on that", "target": "Darauf kannst du Gift nehmen", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "You helped me no meter further", "target": "Du hast mir keinen Meter weitergeholfen", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "There you are looking stupid out of the laundry", "target": "Da guckst du dumm aus der Wäsche", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "There the dog goes crazy in the pan", "target": "Da wird er Hund ind er Pfanne verrückt", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Put a tooth on it", "target": "Leg einen Zahn drauf", "sourceLanguage": "en", "targetLanguage": "de" },
{ "source": "Lid down, monkey dead", "target": "Klapp zu, Affe tot", "sourceLanguage": "en", "targetLanguage": "de" }
]'
```
// Every word is tagged with: level, category, and the course `day` (1-30)
// Flashcards & Quizzes filter by level/category; the 30-Day Course filters by day.
export const vocabulary = [
  // ── Day 1 · Greetings ───────────────────────────────────────
  { id: 1,  day: 1, italian: 'ciao',        english: 'hello / bye',     example_it: 'Ciao! Come stai?',        example_en: 'Hello! How are you?',     level: 'A1', category: 'Greetings',      pronunciation: 'CHOW'             },
  { id: 2,  day: 1, italian: 'buongiorno',  english: 'good morning',    example_it: 'Buongiorno, signora!',    example_en: 'Good morning, ma\'am!',   level: 'A1', category: 'Greetings',      pronunciation: 'bwon-JOR-no'      },
  { id: 3,  day: 1, italian: 'buonasera',   english: 'good evening',    example_it: 'Buonasera a tutti!',      example_en: 'Good evening, everyone!', level: 'A1', category: 'Greetings',      pronunciation: 'bwona-SE-ra'      },
  { id: 4,  day: 1, italian: 'arrivederci', english: 'goodbye',         example_it: 'Arrivederci! A presto!',  example_en: 'Goodbye! See you soon!',  level: 'A1', category: 'Greetings',      pronunciation: 'ar-ree-ve-DER-chi'},
  { id: 5,  day: 1, italian: 'grazie',      english: 'thank you',       example_it: 'Grazie mille!',           example_en: 'Thank you very much!',    level: 'A1', category: 'Greetings',      pronunciation: 'GRA-tsye'         },
  { id: 6,  day: 1, italian: 'prego',       english: "you're welcome",  example_it: 'Prego!',                  example_en: "You're welcome!",         level: 'A1', category: 'Greetings',      pronunciation: 'PRE-go'           },
  { id: 7,  day: 1, italian: 'per favore',  english: 'please',          example_it: 'Un caffè, per favore.',   example_en: 'A coffee, please.',       level: 'A1', category: 'Greetings',      pronunciation: 'per fa-VO-re'     },

  // ── Day 2 · Introducing Yourself ────────────────────────────
  { id: 8,  day: 2, italian: 'mi chiamo',   english: 'my name is',      example_it: 'Mi chiamo Marco.',        example_en: 'My name is Marco.',       level: 'A1', category: 'Common Phrases', pronunciation: 'mee KYA-mo'       },
  { id: 9,  day: 2, italian: 'come stai?',  english: 'how are you?',    example_it: 'Ciao! Come stai?',        example_en: 'Hi! How are you?',        level: 'A1', category: 'Common Phrases', pronunciation: 'KO-me STAI'       },
  { id: 10, day: 2, italian: 'piacere',     english: 'nice to meet you',example_it: 'Piacere, sono Anna.',     example_en: 'Nice to meet you, I\'m Anna.', level: 'A1', category: 'Common Phrases', pronunciation: 'pya-CHE-re'  },
  { id: 11, day: 2, italian: 'sì',          english: 'yes',             example_it: 'Sì, grazie!',             example_en: 'Yes, thank you!',         level: 'A1', category: 'Common Phrases', pronunciation: 'SEE'             },
  { id: 12, day: 2, italian: 'no',          english: 'no',              example_it: 'No, grazie.',             example_en: 'No, thank you.',          level: 'A1', category: 'Common Phrases', pronunciation: 'NO'              },
  { id: 13, day: 2, italian: 'scusi',       english: 'excuse me (formal)', example_it: "Scusi, dov'è il bagno?", example_en: 'Excuse me, where is the bathroom?', level: 'A1', category: 'Common Phrases', pronunciation: 'SKOO-zee' },

  // ── Day 3 · Numbers 1–10 ────────────────────────────────────
  { id: 14, day: 3, italian: 'uno',     english: 'one',   example_it: 'Ho uno zaino.',        example_en: 'I have one backpack.', level: 'A1', category: 'Numbers', pronunciation: 'OO-no'    },
  { id: 15, day: 3, italian: 'due',     english: 'two',   example_it: 'Ho due sorelle.',      example_en: 'I have two sisters.',  level: 'A1', category: 'Numbers', pronunciation: 'DOO-e'    },
  { id: 16, day: 3, italian: 'tre',     english: 'three', example_it: 'Tre caffè, per favore.', example_en: 'Three coffees, please.', level: 'A1', category: 'Numbers', pronunciation: 'TRE'    },
  { id: 17, day: 3, italian: 'quattro', english: 'four',  example_it: 'Sono le quattro.',     example_en: "It's four o'clock.",   level: 'A1', category: 'Numbers', pronunciation: 'KWAT-tro' },
  { id: 18, day: 3, italian: 'cinque',  english: 'five',  example_it: 'Ho cinque euro.',      example_en: 'I have five euros.',   level: 'A1', category: 'Numbers', pronunciation: 'CHEEN-kwe' },
  { id: 19, day: 3, italian: 'sei',     english: 'six',   example_it: 'Sei gatti!',           example_en: 'Six cats!',            level: 'A1', category: 'Numbers', pronunciation: 'SEY'      },
  { id: 20, day: 3, italian: 'sette',   english: 'seven', example_it: 'Sono le sette.',       example_en: "It's seven o'clock.",  level: 'A1', category: 'Numbers', pronunciation: 'SET-te'   },
  { id: 21, day: 3, italian: 'otto',    english: 'eight', example_it: 'Otto giorni.',         example_en: 'Eight days.',          level: 'A1', category: 'Numbers', pronunciation: 'OT-to'    },
  { id: 22, day: 3, italian: 'nove',    english: 'nine',  example_it: 'Nove mesi.',           example_en: 'Nine months.',         level: 'A1', category: 'Numbers', pronunciation: 'NO-ve'    },
  { id: 23, day: 3, italian: 'dieci',   english: 'ten',   example_it: 'Sono le dieci.',       example_en: "It's ten o'clock.",    level: 'A1', category: 'Numbers', pronunciation: 'DYE-chi'  },

  // ── Day 4 · Articles & Everyday Nouns ───────────────────────
  { id: 24, day: 4, italian: 'libro',  english: 'book',     example_it: 'Il libro è interessante.', example_en: 'The book is interesting.', level: 'A1', category: 'Objects', pronunciation: 'LEE-bro' },
  { id: 25, day: 4, italian: 'casa',   english: 'house / home', example_it: 'La casa è grande.',    example_en: 'The house is big.',        level: 'A1', category: 'Objects', pronunciation: 'KA-za'   },
  { id: 26, day: 4, italian: 'zaino',  english: 'backpack', example_it: 'Lo zaino è pesante.',      example_en: 'The backpack is heavy.',   level: 'A1', category: 'Objects', pronunciation: 'DZAI-no' },
  { id: 27, day: 4, italian: 'cane',   english: 'dog',      example_it: 'Il cane è fedele.',        example_en: 'The dog is faithful.',     level: 'A1', category: 'Animals', pronunciation: 'KA-ne'   },
  { id: 28, day: 4, italian: 'gatto',  english: 'cat',      example_it: 'Il gatto è nero.',         example_en: 'The cat is black.',        level: 'A1', category: 'Animals', pronunciation: 'GAT-to'  },

  // ── Day 5 · People ──────────────────────────────────────────
  { id: 29, day: 5, italian: 'amico',   english: 'friend (m)',  example_it: 'Ho un amico italiano.',  example_en: 'I have an Italian friend.', level: 'A1', category: 'People', pronunciation: 'a-MEE-ko'  },
  { id: 30, day: 5, italian: 'ragazza', english: 'girl',        example_it: 'La ragazza studia.',     example_en: 'The girl studies.',         level: 'A1', category: 'People', pronunciation: 'ra-GAT-tsa' },
  { id: 31, day: 5, italian: 'ragazzo', english: 'boy',         example_it: 'Il ragazzo gioca.',      example_en: 'The boy plays.',            level: 'A1', category: 'People', pronunciation: 'ra-GAT-tso' },
  { id: 32, day: 5, italian: 'donna',   english: 'woman',       example_it: 'La donna lavora qui.',   example_en: 'The woman works here.',     level: 'A1', category: 'People', pronunciation: 'DON-na'    },
  { id: 33, day: 5, italian: 'uomo',    english: 'man',         example_it: "L'uomo legge.",          example_en: 'The man reads.',            level: 'A1', category: 'People', pronunciation: 'WO-mo'     },

  // ── Day 6 · Colors ──────────────────────────────────────────
  { id: 34, day: 6, italian: 'rosso',     english: 'red',    example_it: 'Il pomodoro è rosso.', example_en: 'The tomato is red.',   level: 'A1', category: 'Colors', pronunciation: 'ROS-so'      },
  { id: 35, day: 6, italian: 'blu',       english: 'blue',   example_it: 'Il cielo è blu.',      example_en: 'The sky is blue.',     level: 'A1', category: 'Colors', pronunciation: 'BLOO'        },
  { id: 36, day: 6, italian: 'verde',     english: 'green',  example_it: "L'erba è verde.",      example_en: 'The grass is green.',  level: 'A1', category: 'Colors', pronunciation: 'VER-de'      },
  { id: 37, day: 6, italian: 'giallo',    english: 'yellow', example_it: 'Il sole è giallo.',    example_en: 'The sun is yellow.',   level: 'A1', category: 'Colors', pronunciation: 'JAL-lo'      },
  { id: 38, day: 6, italian: 'bianco',    english: 'white',  example_it: 'La neve è bianca.',    example_en: 'The snow is white.',   level: 'A1', category: 'Colors', pronunciation: 'BYAN-ko'     },
  { id: 39, day: 6, italian: 'nero',      english: 'black',  example_it: 'Il caffè è nero.',     example_en: 'The coffee is black.', level: 'A1', category: 'Colors', pronunciation: 'NE-ro'       },
  { id: 40, day: 6, italian: 'arancione', english: 'orange', example_it: "L'arancia è arancione.", example_en: 'The orange is orange.', level: 'A1', category: 'Colors', pronunciation: 'a-ran-CHO-ne' },

  // ── Day 7 · Family ──────────────────────────────────────────
  { id: 41, day: 7, italian: 'madre',    english: 'mother',      example_it: 'Mia madre si chiama Anna.', example_en: "My mother's name is Anna.", level: 'A1', category: 'Family', pronunciation: 'MA-dre'    },
  { id: 42, day: 7, italian: 'padre',    english: 'father',      example_it: 'Mio padre lavora a Roma.',  example_en: 'My father works in Rome.',  level: 'A1', category: 'Family', pronunciation: 'PA-dre'    },
  { id: 43, day: 7, italian: 'fratello', english: 'brother',     example_it: 'Ho un fratello maggiore.',  example_en: 'I have an older brother.',  level: 'A1', category: 'Family', pronunciation: 'fra-TEL-lo' },
  { id: 44, day: 7, italian: 'sorella',  english: 'sister',      example_it: 'Mia sorella è studentessa.', example_en: 'My sister is a student.',  level: 'A1', category: 'Family', pronunciation: 'so-REL-la' },
  { id: 45, day: 7, italian: 'figlio',   english: 'son',         example_it: 'Il loro figlio ha tre anni.', example_en: 'Their son is three years old.', level: 'A1', category: 'Family', pronunciation: 'FEEL-yo' },
  { id: 46, day: 7, italian: 'figlia',   english: 'daughter',    example_it: 'La loro figlia studia.',    example_en: 'Their daughter studies.',   level: 'A1', category: 'Family', pronunciation: 'FEEL-ya'  },
  { id: 47, day: 7, italian: 'nonno',    english: 'grandfather', example_it: 'Mio nonno è simpatico.',    example_en: 'My grandfather is nice.',   level: 'A1', category: 'Family', pronunciation: 'NON-no'    },
  { id: 48, day: 7, italian: 'nonna',    english: 'grandmother', example_it: 'La nonna cucina bene.',     example_en: 'Grandma cooks well.',       level: 'A1', category: 'Family', pronunciation: 'NON-na'    },

  // ── Day 8 · Food Basics ─────────────────────────────────────
  { id: 49, day: 8, italian: 'pane',   english: 'bread',  example_it: 'Il pane è fresco.',      example_en: 'The bread is fresh.',     level: 'A1', category: 'Food & Drink', pronunciation: 'PA-ne'  },
  { id: 50, day: 8, italian: 'acqua',  english: 'water',  example_it: "Un bicchiere d'acqua.",  example_en: 'A glass of water.',       level: 'A1', category: 'Food & Drink', pronunciation: 'AK-kwa' },
  { id: 51, day: 8, italian: 'caffè',  english: 'coffee', example_it: 'Prendo un caffè.',       example_en: "I'll have a coffee.",     level: 'A1', category: 'Food & Drink', pronunciation: 'kaf-FE' },
  { id: 52, day: 8, italian: 'vino',   english: 'wine',   example_it: 'Un bicchiere di vino.',  example_en: 'A glass of wine.',        level: 'A1', category: 'Food & Drink', pronunciation: 'VEE-no' },
  { id: 53, day: 8, italian: 'pasta',  english: 'pasta',  example_it: 'La pasta è deliziosa.',  example_en: 'The pasta is delicious.', level: 'A1', category: 'Food & Drink', pronunciation: 'PA-sta' },
  { id: 54, day: 8, italian: 'pizza',  english: 'pizza',  example_it: 'Amo la pizza margherita.', example_en: 'I love margherita pizza.', level: 'A1', category: 'Food & Drink', pronunciation: 'PEET-tsa' },
  { id: 55, day: 8, italian: 'latte',  english: 'milk',   example_it: 'Bevo il latte.',         example_en: 'I drink milk.',           level: 'A1', category: 'Food & Drink', pronunciation: 'LAT-te' },

  // ── Day 9 · At the Restaurant ───────────────────────────────
  { id: 56, day: 9, italian: 'cameriere', english: 'waiter',     example_it: 'Il cameriere è gentile.', example_en: 'The waiter is kind.',    level: 'A2', category: 'Food & Drink', pronunciation: 'ka-me-RYE-re' },
  { id: 57, day: 9, italian: 'menù',      english: 'menu',       example_it: 'Il menù, per favore.',    example_en: 'The menu, please.',      level: 'A2', category: 'Food & Drink', pronunciation: 'me-NOO'       },
  { id: 58, day: 9, italian: 'conto',     english: 'bill / check', example_it: 'Il conto, per favore.', example_en: 'The bill, please.',     level: 'A2', category: 'Food & Drink', pronunciation: 'KON-to'       },
  { id: 59, day: 9, italian: 'piatto',    english: 'dish / plate', example_it: 'Che piatto consigli?',  example_en: 'Which dish do you recommend?', level: 'A2', category: 'Food & Drink', pronunciation: 'PYAT-to' },
  { id: 60, day: 9, italian: 'bicchiere', english: 'glass',      example_it: 'Un bicchiere di acqua.',  example_en: 'A glass of water.',      level: 'A2', category: 'Food & Drink', pronunciation: 'bik-KYE-re'   },
  { id: 61, day: 9, italian: 'ordinare',  english: 'to order',   example_it: 'Vorrei ordinare adesso.', example_en: 'I would like to order now.', level: 'A2', category: 'Verbs',     pronunciation: 'or-dee-NA-re' },

  // ── Day 10 · Present-Tense Verbs ────────────────────────────
  { id: 62, day: 10, italian: 'parlare',  english: 'to speak', example_it: 'Io parlo italiano.',     example_en: 'I speak Italian.',     level: 'A1', category: 'Verbs', pronunciation: 'par-LA-re'  },
  { id: 63, day: 10, italian: 'mangiare', english: 'to eat',   example_it: 'Mangio la pasta.',       example_en: 'I eat pasta.',         level: 'A1', category: 'Verbs', pronunciation: 'man-JA-re'  },
  { id: 64, day: 10, italian: 'bere',     english: 'to drink', example_it: 'Bevo un caffè.',         example_en: 'I drink a coffee.',    level: 'A1', category: 'Verbs', pronunciation: 'BE-re'      },
  { id: 65, day: 10, italian: 'scrivere', english: 'to write', example_it: 'Lei scrive una lettera.', example_en: 'She writes a letter.', level: 'A1', category: 'Verbs', pronunciation: 'SKREE-ve-re' },
  { id: 66, day: 10, italian: 'dormire',  english: 'to sleep', example_it: 'Noi dormiamo bene.',     example_en: 'We sleep well.',       level: 'A1', category: 'Verbs', pronunciation: 'dor-MEE-re' },
  { id: 67, day: 10, italian: 'lavorare', english: 'to work',  example_it: 'Lavoro in ufficio.',     example_en: 'I work in an office.', level: 'A1', category: 'Verbs', pronunciation: 'la-vo-RA-re' },

  // ── Day 11 · Days of the Week ───────────────────────────────
  { id: 68, day: 11, italian: 'lunedì',    english: 'Monday',    example_it: 'Lunedì lavoro.',        example_en: 'On Monday I work.',     level: 'A2', category: 'Time', pronunciation: 'loo-ne-DEE'      },
  { id: 69, day: 11, italian: 'martedì',   english: 'Tuesday',   example_it: 'Martedì ho lezione.',   example_en: 'On Tuesday I have class.', level: 'A2', category: 'Time', pronunciation: 'mar-te-DEE'   },
  { id: 70, day: 11, italian: 'mercoledì', english: 'Wednesday', example_it: 'Mercoledì vado in palestra.', example_en: 'On Wednesday I go to the gym.', level: 'A2', category: 'Time', pronunciation: 'mer-ko-le-DEE' },
  { id: 71, day: 11, italian: 'giovedì',   english: 'Thursday',  example_it: 'Giovedì è festa.',      example_en: 'Thursday is a holiday.', level: 'A2', category: 'Time', pronunciation: 'jo-ve-DEE'      },
  { id: 72, day: 11, italian: 'venerdì',   english: 'Friday',    example_it: 'Venerdì esco con amici.', example_en: 'On Friday I go out with friends.', level: 'A2', category: 'Time', pronunciation: 've-ner-DEE' },
  { id: 73, day: 11, italian: 'sabato',    english: 'Saturday',  example_it: 'Sabato dormo molto.',   example_en: 'On Saturday I sleep a lot.', level: 'A2', category: 'Time', pronunciation: 'SA-ba-to'    },
  { id: 74, day: 11, italian: 'domenica',  english: 'Sunday',    example_it: 'Domenica vedo la famiglia.', example_en: 'On Sunday I see my family.', level: 'A2', category: 'Time', pronunciation: 'do-ME-ni-ka' },

  // ── Day 12 · Essential Irregular Verbs ──────────────────────
  { id: 75, day: 12, italian: 'essere', english: 'to be',       example_it: 'Io sono studente.',   example_en: 'I am a student.',    level: 'A1', category: 'Verbs', pronunciation: 'ES-se-re' },
  { id: 76, day: 12, italian: 'avere',  english: 'to have',     example_it: 'Ho un cane.',         example_en: 'I have a dog.',      level: 'A1', category: 'Verbs', pronunciation: 'a-VE-re'  },
  { id: 77, day: 12, italian: 'fare',   english: 'to do / make',example_it: 'Faccio i compiti.',   example_en: 'I do my homework.',  level: 'A1', category: 'Verbs', pronunciation: 'FA-re'    },
  { id: 78, day: 12, italian: 'andare', english: 'to go',       example_it: 'Vado a scuola.',      example_en: 'I go to school.',    level: 'A1', category: 'Verbs', pronunciation: 'an-DA-re'  },
  { id: 79, day: 12, italian: 'venire', english: 'to come',     example_it: 'Vieni a casa mia?',   example_en: 'Are you coming to my house?', level: 'A1', category: 'Verbs', pronunciation: 've-NEE-re' },
  { id: 80, day: 12, italian: 'dire',   english: 'to say',      example_it: 'Cosa dici?',          example_en: 'What are you saying?', level: 'A1', category: 'Verbs', pronunciation: 'DEE-re'  },

  // ── Day 13 · The House ──────────────────────────────────────
  { id: 81, day: 13, italian: 'camera',   english: 'room / bedroom', example_it: 'La mia camera è piccola.', example_en: 'My bedroom is small.', level: 'A2', category: 'House', pronunciation: 'KA-me-ra'   },
  { id: 82, day: 13, italian: 'cucina',   english: 'kitchen',  example_it: 'La cucina è moderna.',  example_en: 'The kitchen is modern.', level: 'A2', category: 'House', pronunciation: 'koo-CHEE-na' },
  { id: 83, day: 13, italian: 'bagno',    english: 'bathroom', example_it: "Dov'è il bagno?",       example_en: 'Where is the bathroom?', level: 'A2', category: 'House', pronunciation: 'BAN-yo'      },
  { id: 84, day: 13, italian: 'letto',    english: 'bed',      example_it: 'Il letto è comodo.',    example_en: 'The bed is comfortable.', level: 'A2', category: 'House', pronunciation: 'LET-to'     },
  { id: 85, day: 13, italian: 'tavolo',   english: 'table',    example_it: 'Il tavolo è di legno.', example_en: 'The table is made of wood.', level: 'A2', category: 'House', pronunciation: 'TA-vo-lo'  },
  { id: 86, day: 13, italian: 'porta',    english: 'door',     example_it: 'Chiudi la porta.',      example_en: 'Close the door.',       level: 'A2', category: 'House', pronunciation: 'POR-ta'      },
  { id: 87, day: 13, italian: 'finestra', english: 'window',   example_it: 'Apri la finestra.',     example_en: 'Open the window.',      level: 'A2', category: 'House', pronunciation: 'fee-NES-tra' },

  // ── Day 14 · Review & People ────────────────────────────────
  { id: 88, day: 14, italian: 'bambino', english: 'child',   example_it: 'Il bambino gioca.',  example_en: 'The child plays.',   level: 'A2', category: 'People', pronunciation: 'bam-BEE-no' },
  { id: 89, day: 14, italian: 'gente',   english: 'people',  example_it: "C'è molta gente qui.", example_en: 'There are many people here.', level: 'A2', category: 'People', pronunciation: 'JEN-te' },

  // ── Day 15 · Daily Routine (Reflexive) ──────────────────────
  { id: 90, day: 15, italian: 'svegliarsi', english: 'to wake up',   example_it: 'Mi sveglio alle sette.', example_en: 'I wake up at seven.',  level: 'A2', category: 'Verbs', pronunciation: 'zve-LYAR-see' },
  { id: 91, day: 15, italian: 'alzarsi',    english: 'to get up',    example_it: 'Mi alzo presto.',        example_en: 'I get up early.',      level: 'A2', category: 'Verbs', pronunciation: 'al-TSAR-see'  },
  { id: 92, day: 15, italian: 'lavarsi',    english: 'to wash up',   example_it: 'Mi lavo le mani.',       example_en: 'I wash my hands.',     level: 'A2', category: 'Verbs', pronunciation: 'la-VAR-see'   },
  { id: 93, day: 15, italian: 'vestirsi',   english: 'to get dressed', example_it: 'Mi vesto in fretta.',  example_en: 'I get dressed quickly.', level: 'A2', category: 'Verbs', pronunciation: 'ves-TEER-see' },
  { id: 94, day: 15, italian: 'chiamarsi',  english: 'to be called', example_it: 'Mi chiamo Giulia.',      example_en: 'My name is Giulia.',   level: 'A2', category: 'Verbs', pronunciation: 'kya-MAR-see'  },

  // ── Day 16 · Body & Health ──────────────────────────────────
  { id: 95,  day: 16, italian: 'testa',  english: 'head',  example_it: 'Mi fa male la testa.', example_en: 'My head hurts.',     level: 'A2', category: 'Body & Health', pronunciation: 'TES-ta'  },
  { id: 96,  day: 16, italian: 'occhio', english: 'eye',   example_it: 'Ha gli occhi azzurri.', example_en: 'He has blue eyes.', level: 'A2', category: 'Body & Health', pronunciation: 'OK-kyo'  },
  { id: 97,  day: 16, italian: 'mano',   english: 'hand',  example_it: 'Dammi la mano.',       example_en: 'Give me your hand.', level: 'A2', category: 'Body & Health', pronunciation: 'MA-no'   },
  { id: 98,  day: 16, italian: 'piede',  english: 'foot',  example_it: 'Mi fa male il piede.', example_en: 'My foot hurts.',     level: 'A2', category: 'Body & Health', pronunciation: 'PYE-de'  },
  { id: 99,  day: 16, italian: 'cuore',  english: 'heart', example_it: 'Il cuore batte forte.', example_en: 'The heart beats fast.', level: 'A2', category: 'Body & Health', pronunciation: 'KWO-re' },
  { id: 100, day: 16, italian: 'medico', english: 'doctor', example_it: 'Vado dal medico.',     example_en: 'I go to the doctor.', level: 'A2', category: 'Body & Health', pronunciation: 'ME-dee-ko' },
  { id: 101, day: 16, italian: 'malato', english: 'sick / ill', example_it: 'Oggi sono malato.', example_en: "Today I'm sick.",   level: 'A2', category: 'Body & Health', pronunciation: 'ma-LA-to' },

  // ── Day 17 · Clothing & Shopping ────────────────────────────
  { id: 102, day: 17, italian: 'vestito', english: 'dress / suit', example_it: 'Che bel vestito!',     example_en: 'What a nice dress!',  level: 'A2', category: 'Shopping', pronunciation: 'ves-TEE-to' },
  { id: 103, day: 17, italian: 'camicia', english: 'shirt',        example_it: 'La camicia è bianca.', example_en: 'The shirt is white.', level: 'A2', category: 'Shopping', pronunciation: 'ka-MEE-cha' },
  { id: 104, day: 17, italian: 'scarpe',  english: 'shoes',        example_it: 'Le scarpe sono nuove.', example_en: 'The shoes are new.', level: 'A2', category: 'Shopping', pronunciation: 'SKAR-pe'    },
  { id: 105, day: 17, italian: 'prezzo',  english: 'price',        example_it: "Qual è il prezzo?",    example_en: 'What is the price?',  level: 'A2', category: 'Shopping', pronunciation: 'PRET-tso'   },
  { id: 106, day: 17, italian: 'comprare', english: 'to buy',      example_it: 'Voglio comprare il pane.', example_en: 'I want to buy bread.', level: 'A2', category: 'Verbs',  pronunciation: 'kom-PRA-re' },
  { id: 107, day: 17, italian: 'negozio', english: 'shop / store', example_it: 'Vado al negozio.',     example_en: "I'm going to the store.", level: 'A2', category: 'Shopping', pronunciation: 'ne-GO-tsyo' },
  { id: 108, day: 17, italian: 'mercato', english: 'market',       example_it: 'Il mercato è aperto.', example_en: 'The market is open.', level: 'A2', category: 'Shopping', pronunciation: 'mer-KA-to'  },

  // ── Day 18 · Travel & Transport ─────────────────────────────
  { id: 109, day: 18, italian: 'treno',     english: 'train',    example_it: 'Il treno è in ritardo.', example_en: 'The train is late.',   level: 'A2', category: 'Travel', pronunciation: 'TRE-no'      },
  { id: 110, day: 18, italian: 'aereo',     english: 'airplane', example_it: "L'aereo parte alle dieci.", example_en: 'The plane leaves at ten.', level: 'A2', category: 'Travel', pronunciation: 'a-E-re-o' },
  { id: 111, day: 18, italian: 'autobus',   english: 'bus',      example_it: 'Prendo l\'autobus.',     example_en: 'I take the bus.',      level: 'A2', category: 'Travel', pronunciation: 'AU-to-boos'  },
  { id: 112, day: 18, italian: 'macchina',  english: 'car',      example_it: 'La macchina è rossa.',   example_en: 'The car is red.',      level: 'A2', category: 'Travel', pronunciation: 'MAK-kee-na'  },
  { id: 113, day: 18, italian: 'biglietto', english: 'ticket',   example_it: 'Un biglietto, per favore.', example_en: 'One ticket, please.', level: 'A2', category: 'Travel', pronunciation: 'beel-YET-to' },
  { id: 114, day: 18, italian: 'aeroporto', english: 'airport',  example_it: "L'aeroporto è lontano.", example_en: 'The airport is far.',  level: 'A2', category: 'Travel', pronunciation: 'a-e-ro-POR-to' },
  { id: 115, day: 18, italian: 'stazione',  english: 'station',  example_it: 'La stazione è vicina.',  example_en: 'The station is near.', level: 'A2', category: 'Travel', pronunciation: 'sta-TSYO-ne'  },

  // ── Day 19 · Directions & the City ──────────────────────────
  { id: 116, day: 19, italian: 'destra',   english: 'right',    example_it: 'Gira a destra.',       example_en: 'Turn right.',        level: 'A2', category: 'Places', pronunciation: 'DES-tra'   },
  { id: 117, day: 19, italian: 'sinistra', english: 'left',     example_it: 'Gira a sinistra.',     example_en: 'Turn left.',         level: 'A2', category: 'Places', pronunciation: 'see-NEES-tra' },
  { id: 118, day: 19, italian: 'dritto',   english: 'straight', example_it: 'Vai sempre dritto.',   example_en: 'Go straight ahead.', level: 'A2', category: 'Places', pronunciation: 'DREET-to'  },
  { id: 119, day: 19, italian: 'vicino',   english: 'near',     example_it: 'Il bar è vicino.',     example_en: 'The bar is near.',   level: 'A2', category: 'Places', pronunciation: 'vee-CHEE-no' },
  { id: 120, day: 19, italian: 'lontano',  english: 'far',      example_it: 'La stazione è lontana?', example_en: 'Is the station far?', level: 'A2', category: 'Places', pronunciation: 'lon-TA-no' },
  { id: 121, day: 19, italian: 'piazza',   english: 'square',   example_it: 'La piazza è bellissima.', example_en: 'The square is beautiful.', level: 'A2', category: 'Places', pronunciation: 'PYAT-tsa' },

  // ── Day 20 · Past Tense Verbs ───────────────────────────────
  { id: 122, day: 20, italian: 'prendere', english: 'to take',   example_it: 'Ho preso il treno.',  example_en: 'I took the train.',  level: 'A2', category: 'Verbs', pronunciation: 'PREN-de-re' },
  { id: 123, day: 20, italian: 'vedere',   english: 'to see',    example_it: 'Ho visto un film.',   example_en: 'I saw a film.',      level: 'A2', category: 'Verbs', pronunciation: 've-DE-re'   },
  { id: 124, day: 20, italian: 'partire',  english: 'to leave',  example_it: 'Sono partito ieri.',  example_en: 'I left yesterday.',  level: 'A2', category: 'Verbs', pronunciation: 'par-TEE-re' },
  { id: 125, day: 20, italian: 'arrivare', english: 'to arrive', example_it: 'Siamo arrivati tardi.', example_en: 'We arrived late.', level: 'A2', category: 'Verbs', pronunciation: 'ar-ree-VA-re' },

  // ── Day 21 · Review & Useful Verbs ──────────────────────────
  { id: 126, day: 21, italian: 'aspettare', english: 'to wait',       example_it: 'Aspetto un amico.',   example_en: "I'm waiting for a friend.", level: 'A2', category: 'Verbs', pronunciation: 'as-pet-TA-re' },
  { id: 127, day: 21, italian: 'capire',    english: 'to understand', example_it: 'Non capisco bene.',   example_en: "I don't understand well.", level: 'A2', category: 'Verbs', pronunciation: 'ka-PEE-re'   },

  // ── Day 22 · Weather & Nature ───────────────────────────────
  { id: 128, day: 22, italian: 'sole',     english: 'sun',      example_it: "C'è il sole oggi.",    example_en: "It's sunny today.",   level: 'A2', category: 'Nature & Weather', pronunciation: 'SO-le'   },
  { id: 129, day: 22, italian: 'pioggia',  english: 'rain',     example_it: 'La pioggia è forte.',  example_en: 'The rain is heavy.',  level: 'A2', category: 'Nature & Weather', pronunciation: 'PYOJ-ja' },
  { id: 130, day: 22, italian: 'neve',     english: 'snow',     example_it: 'La neve è bianca.',    example_en: 'The snow is white.',  level: 'A2', category: 'Nature & Weather', pronunciation: 'NE-ve'   },
  { id: 131, day: 22, italian: 'vento',    english: 'wind',     example_it: "C'è molto vento.",     example_en: "It's very windy.",    level: 'A2', category: 'Nature & Weather', pronunciation: 'VEN-to'  },
  { id: 132, day: 22, italian: 'caldo',    english: 'hot',      example_it: 'Fa caldo in estate.',  example_en: "It's hot in summer.", level: 'A2', category: 'Nature & Weather', pronunciation: 'KAL-do'  },
  { id: 133, day: 22, italian: 'freddo',   english: 'cold',     example_it: 'Fa freddo in inverno.', example_en: "It's cold in winter.", level: 'A2', category: 'Nature & Weather', pronunciation: 'FRED-do' },
  { id: 134, day: 22, italian: 'mare',     english: 'sea',      example_it: 'Andiamo al mare.',     example_en: "Let's go to the sea.", level: 'A2', category: 'Nature & Weather', pronunciation: 'MA-re'   },
  { id: 135, day: 22, italian: 'montagna', english: 'mountain', example_it: 'La montagna è alta.',  example_en: 'The mountain is high.', level: 'A2', category: 'Nature & Weather', pronunciation: 'mon-TAN-ya' },

  // ── Day 23 · Emotions ───────────────────────────────────────
  { id: 136, day: 23, italian: 'felice',     english: 'happy',   example_it: 'Sono molto felice.',   example_en: "I'm very happy.",     level: 'B1', category: 'Emotions', pronunciation: 'fe-LEE-che'    },
  { id: 137, day: 23, italian: 'triste',     english: 'sad',     example_it: 'Perché sei triste?',   example_en: 'Why are you sad?',    level: 'B1', category: 'Emotions', pronunciation: 'TREES-te'      },
  { id: 138, day: 23, italian: 'arrabbiato', english: 'angry',   example_it: 'È arrabbiato con me.', example_en: "He's angry with me.", level: 'B1', category: 'Emotions', pronunciation: 'ar-rab-BYA-to' },
  { id: 139, day: 23, italian: 'stanco',     english: 'tired',   example_it: 'Sono stanco oggi.',    example_en: "I'm tired today.",    level: 'B1', category: 'Emotions', pronunciation: 'STAN-ko'       },
  { id: 140, day: 23, italian: 'contento',   english: 'glad',    example_it: 'Sono contento di vederti.', example_en: "I'm glad to see you.", level: 'B1', category: 'Emotions', pronunciation: 'kon-TEN-to' },
  { id: 141, day: 23, italian: 'paura',      english: 'fear',    example_it: 'Ho paura del buio.',   example_en: "I'm afraid of the dark.", level: 'B1', category: 'Emotions', pronunciation: 'pa-OO-ra'   },

  // ── Day 24 · Work & Professions ─────────────────────────────
  { id: 142, day: 24, italian: 'lavoro',     english: 'work / job',  example_it: 'Il mio lavoro è interessante.', example_en: 'My job is interesting.', level: 'B1', category: 'Work & Study', pronunciation: 'la-VO-ro' },
  { id: 143, day: 24, italian: 'ufficio',    english: 'office',      example_it: "L'ufficio è in centro.", example_en: 'The office is downtown.', level: 'B1', category: 'Work & Study', pronunciation: 'oof-FEE-cho' },
  { id: 144, day: 24, italian: 'insegnante', english: 'teacher',     example_it: "L'insegnante è brava.",  example_en: 'The teacher is good.',  level: 'B1', category: 'Work & Study', pronunciation: 'in-sen-YAN-te' },
  { id: 145, day: 24, italian: 'avvocato',   english: 'lawyer',      example_it: 'Mia sorella è avvocato.', example_en: 'My sister is a lawyer.', level: 'B1', category: 'Work & Study', pronunciation: 'av-vo-KA-to' },
  { id: 146, day: 24, italian: 'ingegnere',  english: 'engineer',    example_it: 'Lui è ingegnere.',       example_en: 'He is an engineer.',    level: 'B1', category: 'Work & Study', pronunciation: 'in-jen-YE-re' },
  { id: 147, day: 24, italian: 'capo',       english: 'boss',        example_it: 'Il mio capo è severo.',  example_en: 'My boss is strict.',    level: 'B1', category: 'Work & Study', pronunciation: 'KA-po' },

  // ── Day 25 · Future Tense Verbs ─────────────────────────────
  { id: 148, day: 25, italian: 'pensare', english: 'to think', example_it: 'Penso a te.',          example_en: 'I think of you.',     level: 'B1', category: 'Verbs', pronunciation: 'pen-SA-re' },
  { id: 149, day: 25, italian: 'trovare', english: 'to find',  example_it: 'Non trovo le chiavi.', example_en: "I can't find the keys.", level: 'B1', category: 'Verbs', pronunciation: 'tro-VA-re' },
  { id: 150, day: 25, italian: 'vivere',  english: 'to live',  example_it: 'Vivo a Milano.',       example_en: 'I live in Milan.',    level: 'B1', category: 'Verbs', pronunciation: 'VEE-ve-re' },

  // ── Day 26 · Connectors & Conversation ──────────────────────
  { id: 151, day: 26, italian: 'però',    english: 'but / however', example_it: 'È caro, però è bello.', example_en: "It's expensive, but it's nice.", level: 'B1', category: 'Connectors', pronunciation: 'pe-RO'   },
  { id: 152, day: 26, italian: 'perché',  english: 'because / why',  example_it: 'Perché non vieni?',   example_en: "Why don't you come?", level: 'B1', category: 'Connectors', pronunciation: 'per-KE'  },
  { id: 153, day: 26, italian: 'anche',   english: 'also / too',     example_it: 'Vengo anche io.',     example_en: 'I am coming too.',   level: 'B1', category: 'Connectors', pronunciation: 'AN-ke'   },
  { id: 154, day: 26, italian: 'ma',      english: 'but',            example_it: 'Vorrei, ma non posso.', example_en: 'I would like to, but I can\'t.', level: 'B1', category: 'Connectors', pronunciation: 'MA' },
  { id: 155, day: 26, italian: 'infatti', english: 'in fact',        example_it: 'Infatti, hai ragione.', example_en: 'In fact, you are right.', level: 'B1', category: 'Connectors', pronunciation: 'in-FAT-tee' },
  { id: 156, day: 26, italian: 'allora',  english: 'so / then',      example_it: 'Allora, cosa facciamo?', example_en: 'So, what shall we do?', level: 'B1', category: 'Connectors', pronunciation: 'al-LO-ra' },

  // ── Day 27 · Polite & Conditional ───────────────────────────
  { id: 157, day: 27, italian: 'vorrei',  english: 'I would like', example_it: 'Vorrei un caffè.',  example_en: 'I would like a coffee.', level: 'B1', category: 'Common Phrases', pronunciation: 'vor-REY' },
  { id: 158, day: 27, italian: 'magari',  english: 'maybe / I wish', example_it: 'Magari fosse vero!', example_en: 'If only it were true!', level: 'B1', category: 'Common Phrases', pronunciation: 'ma-GA-ree' },

  // ── Day 28 · Describing Things ──────────────────────────────
  { id: 159, day: 28, italian: 'grande',    english: 'big',       example_it: 'La casa è grande.',     example_en: 'The house is big.',    level: 'B1', category: 'Adjectives', pronunciation: 'GRAN-de'     },
  { id: 160, day: 28, italian: 'piccolo',   english: 'small',     example_it: 'Il gatto è piccolo.',   example_en: 'The cat is small.',    level: 'B1', category: 'Adjectives', pronunciation: 'PEEK-ko-lo'  },
  { id: 161, day: 28, italian: 'bello',     english: 'beautiful', example_it: 'Che bello!',            example_en: 'How beautiful!',       level: 'B1', category: 'Adjectives', pronunciation: 'BEL-lo'      },
  { id: 162, day: 28, italian: 'buono',     english: 'good',      example_it: 'Il cibo è buono.',      example_en: 'The food is good.',    level: 'B1', category: 'Adjectives', pronunciation: 'BWO-no'      },
  { id: 163, day: 28, italian: 'nuovo',     english: 'new',       example_it: 'Ho una macchina nuova.', example_en: 'I have a new car.',   level: 'B1', category: 'Adjectives', pronunciation: 'NWO-vo'      },
  { id: 164, day: 28, italian: 'facile',    english: 'easy',      example_it: "L'esercizio è facile.", example_en: 'The exercise is easy.', level: 'B1', category: 'Adjectives', pronunciation: 'FA-chee-le' },
  { id: 165, day: 28, italian: 'difficile', english: 'difficult', example_it: "L'italiano non è difficile!", example_en: 'Italian is not difficult!', level: 'B1', category: 'Adjectives', pronunciation: 'dif-FEE-chee-le' },

  // ── Day 29 · Subjunctive Intro ──────────────────────────────
  { id: 166, day: 29, italian: 'sperare', english: 'to hope',    example_it: 'Spero che tu stia bene.', example_en: 'I hope that you are well.', level: 'B2', category: 'Verbs', pronunciation: 'spe-RA-re'  },
  { id: 167, day: 29, italian: 'credere', english: 'to believe', example_it: 'Credo che sia vero.',    example_en: 'I believe it is true.',   level: 'B2', category: 'Verbs', pronunciation: 'KRE-de-re' },

  // ── Day 30 · Celebration & Review ───────────────────────────
  { id: 168, day: 30, italian: 'finalmente', english: 'finally',  example_it: 'Finalmente parlo italiano!', example_en: 'Finally I speak Italian!', level: 'B1', category: 'Common Phrases', pronunciation: 'fee-nal-MEN-te' },
  { id: 169, day: 30, italian: 'insieme',    english: 'together', example_it: 'Studiamo insieme.',     example_en: 'We study together.',  level: 'B1', category: 'Common Phrases', pronunciation: 'in-SYE-me'  },
  { id: 170, day: 30, italian: 'sempre',     english: 'always',   example_it: 'Ti penso sempre.',      example_en: 'I always think of you.', level: 'B1', category: 'Common Phrases', pronunciation: 'SEM-pre'   },
  { id: 171, day: 30, italian: 'bravo',      english: 'well done / good', example_it: 'Bravo! Hai finito il corso!', example_en: 'Well done! You finished the course!', level: 'B1', category: 'Common Phrases', pronunciation: 'BRA-vo' },
]

export const levels = ['A1', 'A2', 'B1', 'B2', 'C1']
export const categories = [...new Set(vocabulary.map(w => w.category))]
export const TOTAL_DAYS = 30

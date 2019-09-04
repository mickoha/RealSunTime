var language = window.navigator.userLanguage || window.navigator.language.slice(0, 2);

var arrayLang = {
    "en": {
        "W1": "Local Time",
        "W2": "My true Solar time",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "Time Left For Sunset",
        "W6": "Time Left For Sunrise",
        "W7": "Day Length",
        "W8": "Night Length",
    },

    "fi": {
        "W1": "Paikallinen aika",
        "W2": "Todellinen aurinkoaikani",
        "W3": "Leveysaste",
        "W4": "Pituusaste",
        "W5": "Aikaa jäljellä auringonlaskuun",
        "W6": "Aikaa jäljellä auringonnousuun",
        "W7": "Päivän pituus",
        "W8": "Yön pituus",
    },

    "sv": {
        "W1": "Lokal tid",
        "W2": "Min sanna soltid",
        "W3": "Breddgrad",
        "W4": "Längdgrad",
        "W5": "Tid kvar till solnedgången",
        "W6": "Tid kvar till soluppgången",
        "W7": "Dagens längd",
        "W8": "Nattens längd",
    },

    "no": {
        "W1": "Lokal tid",
        "W2": "Min ekte soltid", 
        "W3": "Breddegrad",
        "W4": "Lengdegrad",
        "W5": "neste solnedgang",
        "W6": "neste soloppgang",
        "W7": "Dagens lengde",
        "W8": "Nattlengde"
    },

    "nb": {
        "W1": "Lokal tid",
        "W2": "Min ekte soltid",
        "W3": "Breddegrad",
        "W4": "Lengdegrad",
        "W5": "neste solnedgang",
        "W6": "neste soloppgang",
        "W7": "Dagens lengde",
        "W8": "Nattlengde",
    },

    "nn": {
        "W1": "Lokal tid",
        "W2": "Min ekte soltid",
        "W3": "Breddegrad",
        "W4": "Lengdegrad",
        "W5": "neste solnedgang",
        "W6": "neste soloppgang",
        "W7": "Dagens lengde",
        "W8": "Nattlengde",
    },

    "is": {
        "W1": "Staðartími",
        "W2": "Sól tími",
        "W3": "Breiddargráða",
        "W4": "Lengdargráða",
        "W5": "Næsta sólsetur",
        "W6": "Næsta sólarupprás",
        "W7": "Daglengd",
        "W8": "Næturlengd",
    },

    "pa": {
        "W1": "ਸਥਾਨਕ ਸਮਾਂ",
        "W2": "ਮੇਰਾ ਸੱਚਾ ਸੂਰਜੀ ਸਮਾਂ",
        "W3": "ਵਿਥਕਾਰ",
        "W4": "ਲੰਬਕਾਰ",
        "W5": "ਅਗਲੇ ਸੂਰਜ ਡੁੱਬਣ",
        "W6": "ਅਗਲੀ ਸਵੇਰ",
        "W7": "ਦਿਨ ਦੀ ਲੰਬਾਈ",
        "W8": "ਰਾਤ ਦੀ ਲੰਬਾਈ",
    },

    "vi": {
        "W1": "Giờ địa phương",
        "W2": "Thời gian mặt trời thật sự của tôi",
        "W3": "Vĩ độ",
        "W4": "Kinh độ",
        "W5": "hoàng hôn tiếp theo",
        "W6": "mặt trời mọc tiếp theo",
        "W7": "Độ dài ngày",
        "W8": "Đêm dài",
    },

    "mr": {
        "W1": "स्थानिक वेळ",
        "W2": "माझे खरे सौर वेळ",
        "W3": "अक्षांश",
        "W4": "रेखांश",
        "W5": "पुढील सूर्यास्त",
        "W6": "पुढील सूर्योदय",
        "W7": "दिवस लांबी",
        "W8": "रात्रीची लांबी",
    },

    "ur": {
        "W1": "مقامی وقت",
        "W2": "میرا حقیقی شمسی توانائی کا وقت",
        "W3": "طول",
        "W4": "لمبائی",
        "W5": "اگلی غروب آفتاب",
        "W6": "اگلی سورج کی روشنی",
        "W7": "دن کی لمبائی",
        "W8": "رات کی لمبائی",
    },

    "uk": {
        "W1": "Місцевий час",
        "W2": "Мій справжній сонячний час",
        "W3": "Широта",
        "W4": "Довгота",
        "W5": "наступний захід сонця",
        "W6": "наступний схід сонця",
        "W7": "Тривалість дня",
        "W8": "Довжина ночі",
    },

    "kn": {
        "W1": "ಸ್ಥಳೀಯ ಸಮಯ",
        "W2": "ನನ್ನ ನಿಜವಾದ ಸೌರ ಸಮಯ",
        "W3": "ಅಕ್ಷಾಂಶ",
        "W4": "ರೇಖಾಂಶ",
        "W5": "ಮುಂದಿನ ಸೂರ್ಯಾಸ್ತ",
        "W6": "ಮುಂದಿನ ಸೂರ್ಯೋದಯ",
        "W7": "ದಿನದ ಉದ್ದ",
        "W8": "ರಾತ್ರಿ ಉದ್ದ",
    },

    "bn": {
        "W1": "স্থানীয় সময়",
        "W2": "আমার সত্য সৌর সময়",
        "W3": "অক্ষাংশ",
        "W4": "দ্রাঘিমা",
        "W5": "পরবর্তী সূর্যাস্ত",
        "W6": "পরবর্তী সূর্যোদয়",
        "W7": "দিনের দৈর্ঘ্য",
        "W8": "রাতের দৈর্ঘ্য",
    },

    "uz": {
        "W1": "Mahalliy vaqt",
        "W2": "Mening haqiqiy quyosh vaqtim",
        "W3": "Enlem",
        "W4": "Uzunlik",
        "W5": "keyingi quyosh botishi",
        "W6": "keyingi quyosh chiqishi",
        "W7": "Kun uzunligi",
        "W8": "Kecha uzunligi",
    },

    "su": {
        "W1": "Waktos lokal",
        "W2": "Waktos Solar abdi leres",
        "W3": "Lintang",
        "W4": "Panjang",
        "W5": "Panonpoé Tilelep salajengna",
        "W6": "panonpoe meletek",
        "W7": "Panjang poé",
        "W8": "Panjang peuting",
    },

    "ha": {
        "W1": "Lokaci lokaci",
        "W2": "Lokaci na gaskiya na hasken rana",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "faɗuwar rana",
        "W6": "fitowar rana",
        "W7": "Tsawon rana",
        "W8": "Tsawon dare",
    },

    "my": {
        "W1": "ဒေသစံတော်ချိန်",
        "W2": "အကြှနျုပျ၏စစ်မှန်တဲ့နေရောင်ခြည်အချိန်",
        "W3": "လတီ္တတွဒ်",
        "W4": "လောင်ဂျီတွဒ်",
        "W5": "လာမယ့်နေဝင်ချိန်",
        "W6": "လာမယ့်နေထွက်",
        "W7": "နေ့အရှည်",
        "W8": "ညဥ့်အရှည်",
    },

    "ml": {
        "W1": "പ്രാദേശിക സമയം",
        "W2": "എന്റെ യഥാർത്ഥ സൗര സമയം",
        "W3": "അക്ഷാംശം",
        "W4": "രേഖാംശം",
        "W5": "അടുത്ത സൂര്യാസ്തമയം",
        "W6": "അടുത്ത സൂര്യോദയം",
        "W7": "ദിവസ ദൈർഘ്യം",
        "W8": "രാത്രി ദൈർഘ്യം",
    },

    "gu": {
        "W1": "સ્થાનિક સમય",
        "W2": "મારો સાચા સૌર સમય",
        "W3": "અક્ષાંશ",
        "W4": "રેખાંશ",
        "W5": "આગામી સૂર્યાસ્ત",
        "W6": "આગામી સૂર્યોદય",
        "W7": "દિવસ લંબાઈ",
        "W8": "નાઇટ લંબાઈ",
    },

    "ta": {
        "W1": "உள்ளூர் நேரம்",
        "W2": "எனது உண்மையான சூரிய நேரம்",
        "W3": "அட்சரேகை",
        "W4": "தீர்க்கரேகை",
        "W5": "அடுத்த சூரிய அஸ்தமனம்",
        "W6": "அடுத்த சூரிய உதயம்",
        "W7": "நாள் நீளம்",
        "W8": "இரவு நீளம்",
    },

    "te": {
        "W1": "స్థానిక సమయం",
        "W2": "నా నిజమైన సౌర సమయం",
        "W3": "అక్షాంశం",
        "W4": "రేఖాంశం",
        "W5": "తదుపరి సూర్యాస్తమయం",
        "W6": "తదుపరి సూర్యోదయం",
        "W7": "రోజు పొడవు",
        "W8": "రాత్రి పొడవు",
    },

    "jv": {
        "W1": "Waktu lokal",
        "W2": "Wektu surya sejati",
        "W3": "garis lintang",
        "W4": "garis bujur",
        "W5": "srengenge angslup",
        "W6": "srengenge mlethek",
        "W7": "Dawane dina",
        "W8": "Panjang wengi",
    },

    "ne": {
        "W1": "स्थानीय समय",
        "W2": "मेरो वास्तविक सूर्य समय",
        "W3": "अक्षांश",
        "W4": "देशान्तर",
        "W5": "सूर्यास्तको लागि बायाँ समय",
        "W6": "सूर्योदयको लागि बायाँ समय",
        "W7": "दिनको लम्बाइ",
        "W8": "रातको लम्बाइ",
    },
    
    "ja": {
        "W1": "現地時間",
        "W2": "太陽時",
        "W3": "緯度",
        "W4": "経度",
        "W5": "次の日没",
        "W6": "次の日の出",
        "W7": "日の長さ",
        "W8": "夜の長さ",
    },

    "hu": {
        "W1": "Helyi idő",
        "W2": "Napenergia",
        "W3": "Szélességi kör",
        "W4": "Hosszúság",
        "W5": "Következő naplemente",
        "W6": "Következő napkelte",
        "W7": "Nap hossza",
        "W8": "Éjszakai hossz",
    },

    "id": {
        "W1": "Waktu lokal",
        "W2": "Waktu Solar sejati saya",
        "W3": "Lintang",
        "W4": "Garis bujur",
        "W5": "matahari terbenam berikutnya",
        "W6": "matahari terbit berikutnya",
        "W7": "Panjang hari",
        "W8": "Panjang malam",
    },

    "mk": {
        "W1": "Локално време",
        "W2": "Моето вистинско сончево време",
        "W3": "ширина",
        "W4": "Должина",
        "W5": "следниот зајдисонце",
        "W6": "следниот изгрејсонце",
        "W7": "Дневна должина",
        "W8": "Ноќна должина",
    },

    "et": {
        "W1": "Kohalik aeg",
        "W2": "Minu õige päikeseaeg",
        "W3": "Laiuskraad",
        "W4": "Pikkuskraad",
        "W5": "Aega Päikeseloojanguni",
        "W6": "Aega Päikesetõusuni",
        "W7": "Päeva pikkus",
        "W8": "Öö pikkus",
    },

    "pt": {
        "W1": "hora local",
        "W2": "hora exposicao solar direita",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "tempo restante para o por do sol",
        "W6": "tempo restante para o aurora do sol",
        "W7": "duracao do dia",
        "W8": "duracao da noite",
    },
    "nl": {
        "W1": "Lokale tijd",
        "W2": "Zonnewijzer",
        "W3": "Breedtegraad",
        "W4": "Lengtegraad",
        "W5": "Volgende zonsondergang",
        "W6": "Volgende zonsopgang",
        "W7": "Dag lengte",
        "W8": "Nachtlengte",
    },

    "ku": {
        "W1": "Wextê herêmî",
        "W2": "Demjimêrê Zû",
        "W3": "Firehî",
        "W4": "Dirêjî",
        "W5": "piştî roava",
        "W6": "piştî rohilatî",
        "W7": "Roja Roja",
        "W8": "Dirêjahiya şevê",
    },
  
    "es": {
        "W1": "La hora local",
        "W2": "Mi tiempo correcto de sol", 
        "W3": "Latitud",
        "W4": "Longitud",
        "W5": "Tiempo restante Para la puesta del sol",
        "W6": "Tiempo restante Para el amanecer",
        "W7": "Duración del día",
        "W8": "Duración de la noche",
    },

    "zh": {
        "W1": "當地時間",
        "W2": "我的太陽時",
        "W3": "緯度",
        "W4": "經度",
        "W5": "剩餘時間 日落",
        "W6": "剩餘時間 日出",
        "W7": "晝長",
        "W8": "夜長",
    },

    "ru": {
        "W1": "Местное время",
        "W2": "Реальное солнечное время",
        "W3": "Широта",
        "W4": "Долгота",
        "W5": "Время до заката",
        "W6": "Время до восхода солнца",
        "W7": "Длительность дня",
        "W8": "Длительность ночи",
    },

    "bs": {
        "W1": "Lokalno vrijeme",
        "W2": "Moje pravo Solarno vreme",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "zalazak sunca",
        "W6": "izlazak sunca",
        "W7": "Dužina dana",
        "W8": "noću",
    },

    "cs": {
        "W1": "Místní čas",
        "W2": "Můj opravdový Sluneční čas",
        "W3": "Zeměpisná šířka",
        "W4": "Zeměpisná délka",
        "W5": "příští západ slunce",
        "W6": "další východ slunce",
        "W7": "Délka dne",
        "W8": "Noční délka",
    },

    "el": {
        "W1": "Τοπική ώρα",
        "W2": "Η πραγματική ηλιακή μου ώρα",
        "W3": "Γεωγραφικό πλάτος",
        "W4": "Γεωγραφικό μήκος",
        "W5": "επόμενο ηλιοβασίλεμα",
        "W6": "επόμενη ανατολή",
        "W7": "Διάρκεια ημέρας",
        "W8": "Διάρκεια νυκτός",
    },

    "hi": {
        "W1": "स्थानीय समय",
        "W2": "मेरा सच्चा सौर समय",
        "W3": "अक्षांश",
        "W4": "देशान्तर",
        "W5": "अगला सूर्यास्त",
        "W6": "अगला सूर्योदय",
        "W7": "दिन की लंबाई",
        "W8": "रात की लंबाई",
    },

    "lt": {
        "W1": "Vietinis laikas",
        "W2": "Mano tikrasis saulės laikas",
        "W3": "Platuma",
        "W4": "Ilguma",
        "W5": "kitą saulėlydį",
        "W6": "kitą saulėtekį",
        "W7": "Dienos ilgis",
        "W8": "Naktinis ilgis",
    },

    "hr": {
        "W1": "Lokalno vrijeme",
        "W2": "Moje pravo vrijeme",
        "W3": "širina",
        "W4": "dužina",
        "W5": "sljedeći zalazak sunca",
        "W6": "sljedeći izlazak sunca",
        "W7": "Duljina dana",
        "W8": "Duljina noći",
    },

    "lv": {
        "W1": "Vietējais laiks",
        "W2": "Mans patiesais Saules laiks",
        "W3": "Platums",
        "W4": "Garums",
        "W5": "nākamais saulriets",
        "W6": "nākamais saullēkts",
        "W7": "Dienas garums",
        "W8": "Nakts garums",
    },

    "ko": {
        "W1": "현지 시각",
        "W2": "내 진정한 태양의 시간",
        "W3": "위도",
        "W4": "경도",
        "W5": "다음 일몰",
        "W6": "다음 해돋이",
        "W7": "일 길이",
        "W8": "야간 길이",
    },

    "ps": {
        "W1": "ځايي وخت",
        "W2": "زما ریښتینی سولی وخت",
        "W3": "عرضه",
        "W4": "اوږد مهال",
        "W5": "راتلونکی غره",
        "W6": "راتلونکی لمر",
        "W7": "د ورځې اوږدوالی",
        "W8": "د شپې اوږدوالی",
    },

    "ig": {
        "W1": "Obodo oge",
        "W2": "My ezigbo Anyanwụ oge",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "ututu ututu",
        "W6": "ututu ututu",
        "W7": "Ogologo ubochi",
        "W8": "Abalị ogologo",
    },

    "am": {
        "W1": "የአካባቢ ሰዓት",
        "W2": "የእኔ እውነተኛ የፀሐይ ጊዜ።",
        "W3": "ኬክሮስ",
        "W4": "ኬንትሮስ",
        "W5": "የሚቀጥለው የፀሐይ መውጫ",
        "W6": "የሚቀጥለው የፀሐይ መውጫ",
        "W7": "የቀን ርዝመት።",
        "W8": "የሌሊት ርዝመት።",
    },

    "ms": {
        "W1": "Masa setempat",
        "W2": "Waktu suria saya yang sebenar",
        "W3": "Latitud",
        "W4": "Longitud",
        "W5": "matahari terbenam yang akan datang",
        "W6": "matahari terbit seterusnya",
        "W7": "Panjang hari",
        "W8": "Panjang malam",
    },
    
    "si": {
        "W1": "දේශීය වේලාව",
        "W2": "මගේ සැබෑ සූර්ය කාලය",
        "W3": "අක්ෂාංශ",
        "W4": "දේශාංශ",
        "W5": "ඊළඟ හිරු බැසීම",
        "W6": "ඊළඟ හිරු උදාව",
        "W7": "දවසේ දිග",
        "W8": "රාත්‍රී දිග",
    },

    "zu": {
        "W1": "Isikhathi sendawo",
        "W2": "Isikhathi Sami Sangempela",
        "W3": "Ububanzi",
        "W4": "Isilinganiso",
        "W5": "ilanga elilandelayo",
        "W6": "ukuphuma kwelanga elilandelayo",
        "W7": "Ubude bosuku",
        "W8": "Ubude bobusuku",
    },

    "be": {
        "W1": "Мясцовы час",
        "W2": "Мой сапраўдны сонечны час",
        "W3": "Шырата",
        "W4": "Даўгата",
        "W5": "наступны заход",
        "W6": "наступны ўсход",
        "W7": "Даўжыня дня",
        "W8": "Начная даўжыня",
    },

    "sk": {
        "W1": "Miestny čas",
        "W2": "Môj skutočný slnečný čas",
        "W3": "zemepisná šírka",
        "W4": "zemepisná dĺžka",
        "W5": "budúci západ slnka",
        "W6": "budúci východ slnka",
        "W7": "Dĺžka dňa",
        "W8": "Nočná dĺžka",
    },

    "ky": {
        "W1": "Жергиликтүү убакыт",
        "W2": "Менин чыныгы Solar убакыт",
        "W3": "тууралык",
        "W4": "узактык",
        "W5": "күндүн батышы",
        "W6": "күндүн чыгышы",
        "W7": "күн",
        "W8": "түнкү",
    },

    "ht": {
        "W1": "Tan lokal yo",
        "W2": "Tan vre mwen Solè",
        "W3": "Latitid",
        "W4": "Lonjitid",
        "W5": "pwochen solèy kouche",
        "W6": "pwochen solèy leve",
        "W7": "Longè jou",
        "W8": "Longè lannwit",
    },

    "sw": {
        "W1": "Wakati wa ndani",
        "W2": "Wakati wangu wa kweli wa jua",
        "W3": "Latitudo",
        "W4": "longitudo",
        "W5": "jua lijalo",
        "W6": "jua linalofuata",
        "W7": "Urefu wa siku",
        "W8": "Urefu wa usiku",
    },

    "lo": {
        "W1": "ເວລາທ້ອງຖິ່ນ",
        "W2": "ເວລາແສງຕາເວັນທີ່ແທ້ຈິງຂອງຂ້ອຍ",
        "W3": "ເສ້ັນແບ່ງໂລກທາງຂວາງ",
        "W4": "ເສ້ັນແບ່ງໂລກທາງຢາວ",
        "W5": "ສົນທະຍາຄ່ຳ",
        "W6": "ສະຫວ່າງຈ້າ",
        "W7": "ຄວາມຍາວຂອງມື້",
        "W8": "ຄວາມຍາວຍາມກາງຄືນ",
    },

    "af": {
        "W1": "Plaaslike tyd",
        "W2": "My ware sonkragtyd",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "volgende sonsondergang",
        "W6": "volgende sonsopkoms",
        "W7": "Daglengte",
        "W8": "Naglengte",
    },

    "km": {
        "W1": "ម៉ោង​ក្នុងស្រុក",
        "W2": "ពេលវេលាព្រះអាទិត្យពិតរបស់ខ្ញុំ",
        "W3": "រយៈទទឹង",
        "W4": "រយៈបណ្តោយ",
        "W5": "ថ្ងៃលិចក្រោយ",
        "W6": "ព្រះអាទិត្យរះបន្ទាប់",
        "W7": "ប្រវែងថ្ងៃ",
        "W8": "ប្រវែងរាត្រី",
    },

    "kk": {
        "W1": "Жергілікті уақыт",
        "W2": "Менің нағыз Күн уақытым",
        "W3": "Ендік",
        "W4": "Ұзындық",
        "W5": "келесі күн батуы",
        "W6": "келесі күн шығуы",
        "W7": "Күн ұзақтығы",
        "W8": "Түннің ұзақтығы",
    },

    "ceb": {
        "W1": "Lokal nga panahon",
        "W2": "Ang akong tinuod nga panahon sa Adlaw",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "sunod nga pagsalop sa adlaw",
        "W6": "sunod nga pagsubang sa adlaw",
        "W7": "Adlaw sa adlaw",
        "W8": "Gitas-on sa gabii",
    },

    "mg": {
        "W1": "Fotoana ora",
        "W2": "Ny fotoan'ny tena Solariko",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "manaraka ny filentehan'ny masoandro",
        "W6": "atsinanana",
        "W7": "andro",
        "W8": "alina",
    },

    "sd": {
        "W1": "مقامي وقت",
        "W2": "منهنجي حقيقي شمسي جو وقت",
        "W3": "گدھ",
        "W4": "ڊگھائي",
        "W5": "ايندڙ لٿيٽ",
        "W6": "سج اڀرندو",
        "W7": "ڏينهن جي ڊيگهه",
        "W8": "رات جي ڊيگهه",
    },

    "yo": {
        "W1": "Akoko agbegbe",
        "W2": "Akoko ododo Oorun mi",
        "W3": "Latitude",
        "W4": "Gigun gigun",
        "W5": "t’orun ba de",
        "W6": "ila-oorun t’okan",
        "W7": "Ọjọ gigun",
        "W8": "Oru alẹ",
    },

    "ro": {
        "W1": "Ora locala",
        "W2": "Timpul meu solar adevărat",
        "W3": "Latitudine",
        "W4": "Longitudine",
        "W5": "următorul apus de soare",
        "W6": "următorul răsărit de soare",
        "W7": "Lungimea zilei",
        "W8": "Lungimea nopții",
    },

    "sr": {
        "W1": "Локално време",
        "W2": "Моје право Соларно време",
        "W3": "Ширина",
        "W4": "Лонгитуде",
        "W5": "нект сунсет",
        "W6": "нект сунрисе",
        "W7": "Дужина дана",
        "W8": "Нигхт ленгтх",
    },

    "pl": {
        "W1": "Czas lokalny",
        "W2": "Mój prawdziwy czas słoneczny",
        "W3": "Szerokość",
        "W4": "Długość geograficzna",
        "W5": "następny zachód słońca",
        "W6": "następny wschód słońca",
        "W7": "Długość dnia",
        "W8": "Długość nocy",
    },

    "bg": {
        "W1": "Местно време",
        "W2": "Моето истинско слънчево време",
        "W3": "Географска ширина",
        "W4": "дължина",
        "W5": "следващия залез",
        "W6": "следващ изгрев",
        "W7": "Продължителност на деня",
        "W8": "Дължина на нощта",
    },

    "fr": {
        "W1": "Heure locale",
        "W2": "Temps ensoleillé réel",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "Temps restant au coucher du soleil",
        "W6": "Temps restant au lever du soleil",
        "W7": "Longueur du jour",
        "W8": "Longueur de la nuit",
    },

    "ar": {
        "W1": "الوقت المحلي",
        "W2": "وقثي الحقيقي لشروق الشمس",
        "W3": "خط العرض",
        "W4": "خط الطول",
        "W5": "الوقت المتبقي لغروب الشمس",
        "W6": "الوقت المتبقي لشروق الشمس",
        "W7": "طول اليوم",
        "W8": "طول الليل",
    },

    "hy": {
        "W1": "Տեղական ժամանակ",
        "W2": "Արեւի  ժամանակ",
        "W3": "Լայնություն",
        "W4": "Երկարակություն",
        "W5": "Մայրամուտին մնաց ժամանակը",
        "W6": "Արեւածագին  մնաց ժամանակը",
        "W7": "Օրվա տեւողությունը",
        "W8": "Գիշերվա տեւողությունը",
    },

    "tr": {
        "W1": "Yerel zaman",
        "W2": "Dogru günes zamanim",
        "W3": "Enlem",
        "W4": "Boylam",
        "W5": "Günesin batimina kalan zaman",
        "W6": "Günesin dogumuna kalan zaman",
        "W7": "Gün boyu",
        "W8": "Gece boyu",
    },

    "it": {
        "W1": "Ora locale",
        "W2": "Ora Solare",
        "W3": "Latitudine",
        "W4": "Longitudine",
        "W5": "Tempo rimasto per il tramonto",
        "W6": "Tempo rimasto per l'alba",
        "W7": "Lunghezza del dì",
        "W8": "Lunghezza della notte",
    },

    "fa": {
        "W1": "وقت محلی",
        "W2": "زمان خورشید",
        "W3": "عرض",
        "W4": "طول",
        "W5": "به وقت غروب آفتاب",
        "W6": "زمان طلوع آفتاب",
        "W7": "طول روز",
        "W8": "طول شب",
    },

    "th": {
        "W1": "เวลาท้องถิ่น",
        "W2": "เวลาดวงอาทิตย์ที่แท้จริงของฉัน",
        "W3": "ลองจิจูด",
        "W4": "ละติจูด",
        "W5": "เวลาที่เหลือสำหรับพระอาทิตย์ขึ้น",
        "W6": "เวลาที่เหลือสำหรับพระอาทิตย์ตก",
        "W7": "ระยะเวลากลางวัน",
        "W8": "ระยะเวลากลางคืน",
    },

    "da": {
        "W1": "Lokal tid",
        "W2": "Min sande soltid",
        "W3": "Breddegrad",
        "W4": "længdegrad",
        "W5": "Tid tilbage til solnedgang",
        "W6": "Tid tilbage til solopgang",
        "W7": "Dagslængde",
        "W8": "Natlængde",
    },

    "de": {
        "W1": "Ortszeit",
        "W2": " Meine wahre Sonnenzeit",
        "W3": "Breitengrad",
        "W4": "Längengrad",
        "W5": "Verbleibende Zeit für Sonnenuntergang",
        "W6": "Verbleibende Zeit für Sonnenaufgang",
        "W7": "Tageslänge",
        "W8": "Nachtlänge",
    },

    "sq": {
        "W1": "Koha lokale",
        "W2": "Koha ime e vërtetë diellore",
        "W3": "gjerësi",
        "W4": "gjatësi",
        "W5": "muzg tjeter",
        "W6": "Lindja e ardhshme e diellit",
        "W7": "Gjatësia e ditës",
        "W8": "Gjatësia e natës",
    },

    "az": {
        "W1": "Yerli vaxt",
        "W2": "Mənim əsl günəş saatı",
        "W3": "Enlem",
        "W4": "Uzunluq",
        "W5": "növbəti gün batışı",
        "W6": "növbəti gündoğumu",
        "W7": "Gündüz uzunluğu",
        "W8": "Gecə uzunluğu",
    },

    "so": {
        "W1": "Sacadu intay tahay degmadada",
        "W2": "Wakhtiga qoraxda ee degmadaada",
        "W3": "Latitude",
        "W4": "Longitude",
        "W5": "Ka harsan inta qoraxdu ka dhacaso",
        "W6": "Ka harsan inta qoraxdu kaso baxaso",
        "W7": "Dhererka malinta",
        "W8": "Dhererka habenka"
    }
}

if (!arrayLang.hasOwnProperty(language)) {
    language = "en";
}

function bringText(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let dateNow = document.createElement("p");
    dateNow.setAttribute("id", "dateNow");
    dateNow.setAttribute("class", "notraslate");
    let time = new Date();
    dateNow.innerText = time.getDate() + "." + (time.getMonth() + 1)  + "." + time.getFullYear();
    
    let dateNowSite = document.getElementById("date");
    dateNowSite.appendChild(dateNow);
    console.log(dateNowSite);

    let localTime =  document.createElement("p");
    localTime.setAttribute("id", "localTime");
    localTime.setAttribute("class", "notranslate");
    let localTimeText = document.createElement("p");
    localTimeText.innerHTML = arrayLang[language]["W1"];
  
    let divLocalTimeZone = document.getElementById("timezone");
    divLocalTimeZone.appendChild(localTime);
    divLocalTimeZone.appendChild(localTimeText);
  
    let sunTime = document.createElement("p");
    sunTime.setAttribute("id", "sunTime");
    sunTime.setAttribute("class", "notranslate");
    let sunTimeText = document.createElement("p");
    sunTimeText.innerHTML = arrayLang[language]["W2"];
  
    let divSunTime = document.getElementById("realSunTime")
    divSunTime.appendChild(sunTime);
    divSunTime.appendChild(sunTimeText)
  
    let location = document.createElement("p");
    let latitudeWeb = document.createElement("p");
    latitudeWeb.innerHTML = arrayLang[language]["W3"] + " " + latitude;
    let longitudeWeb = document.createElement("p");
    longitudeWeb.innerHTML = arrayLang[language]["W4"] + " " + longitude;
  
    let divLocation = document.getElementById("coordinates");
    divLocation.appendChild(location);
    divLocation.appendChild(latitudeWeb);
    divLocation.appendChild(longitudeWeb);
  
    let sunTimeLeft = document.createElement("p");
    sunTimeLeft.setAttribute("id", "timeLeft");
    sunTimeLeft.setAttribute("class", "notranslate");

    let sunsetSunrise = document.createElement("p");
    sunsetSunrise.setAttribute("id", "timeLeftText");
    
    let divTimeForSun = document.getElementById("timeForSun");
    divTimeForSun.appendChild(sunTimeLeft);
    divTimeForSun.appendChild(sunsetSunrise);
  
    let dayLength = document.createElement("p");
    dayLength.setAttribute("id", "dayLength2");
    let dayLengthText = document.createElement("p");
    dayLengthText.innerHTML = arrayLang[language]["W7"]
  
    let divDayLength = document.getElementById("dayLength");
    divDayLength.appendChild(dayLength);
    divDayLength.appendChild(dayLengthText);
  
    let nightLength = document.createElement("p");
    nightLength.setAttribute("id", "nightLength2");
    let nightLengthText = document.createElement("p");
    nightLengthText.innerHTML = arrayLang[language]["W8"];
  
    let divNightLength = document.getElementById("nightLength");
    divNightLength.appendChild(nightLength);
    divNightLength.appendChild(nightLengthText);
}

function setSunsetSunrise(apu) {
    let sunTimeLeftText = document.getElementById("timeLeftText");
    if (apu.includes("sunset")) {
        sunTimeLeftText.innerHTML = arrayLang[language]["W5"];
    } else {
        sunTimeLeftText.innerHTML = arrayLang[language]["W6"];

    }
}

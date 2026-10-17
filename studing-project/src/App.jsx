import { useMemo, useState } from 'react'
import './App.css'

const languages = {
  en: { name: 'English', native: 'Английский', flag: '🇬🇧', speech: 'en-US' },
  ko: { name: 'Korean', native: 'Корейский', flag: '🇰🇷', speech: 'ko-KR' },
  tr: { name: 'Turkish', native: 'Турецкий', flag: '🇹🇷', speech: 'tr-TR' },
  es: { name: 'Spanish', native: 'Испанский', flag: '🇪🇸', speech: 'es-ES' },
  de: { name: 'German', native: 'Немецкий', flag: '🇩🇪', speech: 'de-DE' },
  ja: { name: 'Japanese', native: 'Японский', flag: '🇯🇵', speech: 'ja-JP' },
}

const EMPTY_WORDS = []

const wordTranslations = {
  apple: ['manzana', 'pomme', 'Apfel', 'りんご'],
  croissant: ['cruasán', 'croissant', 'Croissant', 'クロワッサン'],
  strawberry: ['fresa', 'fraise', 'Erdbeere', 'いちご'],
  watermelon: ['sandía', 'pastèque', 'Wassermelone', 'すいか'],
  pizza: ['pizza', 'pizza', 'Pizza', 'ピザ'],
  'ice cream': ['helado', 'glace', 'Eis', 'アイスクリーム'],
  honey: ['miel', 'miel', 'Honig', 'はちみつ'],
  lemon: ['limón', 'citron', 'Zitrone', 'レモン'],
  cake: ['pastel', 'gâteau', 'Kuchen', 'ケーキ'],
  coffee: ['café', 'café', 'Kaffee', 'コーヒー'],
  backpack: ['mochila', 'sac à dos', 'Rucksack', 'リュックサック'],
  book: ['libro', 'livre', 'Buch', '本'],
  headphones: ['auriculares', 'casque', 'Kopfhörer', 'ヘッドホン'],
  cup: ['taza', 'tasse', 'Tasse', 'カップ'],
  watch: ['reloj', 'montre', 'Uhr', '時計'],
  glasses: ['gafas', 'lunettes', 'Brille', 'メガネ'],
  umbrella: ['paraguas', 'parapluie', 'Regenschirm', '傘'],
  key: ['llave', 'clé', 'Schlüssel', '鍵'],
  lamp: ['lámpara', 'lampe', 'Lampe', 'ランプ'],
  camera: ['cámara', 'appareil photo', 'Kamera', 'カメラ'],
  run: ['correr', 'courir', 'rennen', '走る'],
  jump: ['saltar', 'sauter', 'springen', '跳ぶ'],
  swim: ['nadar', 'nager', 'schwimmen', '泳ぐ'],
  read: ['leer', 'lire', 'lesen', '読む'],
  dance: ['bailar', 'danser', 'tanzen', '踊る'],
  cook: ['cocinar', 'cuisiner', 'kochen', '料理する'],
  draw: ['dibujar', 'dessiner', 'zeichnen', '描く'],
  sing: ['cantar', 'chanter', 'singen', '歌う'],
  write: ['escribir', 'écrire', 'schreiben', '書く'],
  smile: ['sonreír', 'sourire', 'lächeln', '微笑む'],
  dog: ['perro', 'chien', 'Hund', 'いぬ'],
  cat: ['gato', 'chat', 'Katze', 'ねこ'],
  rabbit: ['conejo', 'lapin', 'Kaninchen', 'うさぎ'],
  bird: ['pájaro', 'oiseau', 'Vogel', 'とり'],
  horse: ['caballo', 'cheval', 'Pferd', 'うま'],
  fish: ['pez', 'poisson', 'Fisch', 'さかな'],
  bear: ['oso', 'ours', 'Bär', 'くま'],
  fox: ['zorro', 'renard', 'Fuchs', 'きつね'],
  elephant: ['elefante', 'éléphant', 'Elefant', 'ぞう'],
  frog: ['rana', 'grenouille', 'Frosch', 'かえる'],
  'Ich': ['Yo', 'Je', 'Ich', '私は'],
  'mag': ['me gustan', 'aime', 'mag', '好きです'],
  'süße': ['dulces', 'douces', 'süße', '甘い'],
  'Äpfel.': ['manzanas.', 'pommes.', 'Äpfel.', 'りんごが好きです。'],
  'Der': ['La', 'Le', 'Der', 'その'],
  'Rucksack': ['mochila', 'sac à dos', 'Rucksack', 'かばん'],
  'dem': ['la', 'la', 'dem', 'テーブル'],
  'Tisch.': ['mesa.', 'table.', 'Tisch.', 'テーブルの上にあります。'],
  'Er': ['Él', 'Il', 'Er', '彼は'],
  'rennt.': ['corriendo.', 'court.', 'rennt.', '走っています。'],
  'ist': ['está', 'est', 'ist', 'です'],
  'auf': ['sobre', 'sur', 'auf', 'の上'],
  'auf dem': ['sobre la', 'sur la', 'auf dem', 'の上'],
  'Die Tasche': ['La bolsa', 'Le sac', 'Die Tasche', 'かばんが'],
  'Hund': ['perro', 'chien', 'Hund', 'いぬ'],
  'happy.': ['feliz.', 'heureux.', 'glücklich.', '幸せです。'],
  'glücklich.': ['feliz.', 'heureux.', 'glücklich.', '幸せです。'],
  'El': ['El', 'Le', 'Der', 'その'],
  'perro': ['perro', 'chien', 'Hund', 'いぬ'],
  'está': ['está', 'est', 'ist', 'です'],
  'feliz.': ['feliz.', 'heureux.', 'glücklich.', '幸せです。'],
  I: ['Yo', 'Je', 'Ich', '私は'],
  like: ['me gustan', 'aime', 'mag', '好きです'],
  sweet: ['dulces', 'douces', 'süße', '甘い'],
  'apples.': ['manzanas.', 'pommes.', 'Äpfel.', 'りんごが好きです。'],
  The: ['La', 'Le', 'Die', 'その'],
  bag: ['bolsa', 'sac', 'Tasche', 'かばん'],
  is: ['está', 'est', 'ist', 'です'],
  on: ['sobre', 'sur', 'auf', 'の上'],
  the: ['la', 'la', 'dem', 'テーブル'],
  'table.': ['mesa.', 'table.', 'Tisch.', 'テーブルの上にあります。'],
  He: ['Él', 'Il', 'Er', '彼は'],
  'running.': ['corriendo.', 'court.', 'rennt.', '走っています。'],
  '나는': ['나는', '나는', 'Ich', '私は'],
  '달콤한': ['달콤한', '달콤한', 'süße', '甘い'],
  '사과를': ['사과를', '사과를', 'Äpfel', 'りんごが'],
  '좋아해요.': ['좋아해요.', '좋아해요.', 'mag ich.', '好きです。'],
  '가방이': ['가방이', '가방이', 'Die Tasche', 'かばんが'],
  '탁자': ['탁자', '탁자', 'Tisch', 'テーブル'],
  '위에': ['위에', '위에', 'auf dem', 'の上に'],
  '있어요.': ['있어요.', '있어요.', 'ist.', 'あります。'],
  '그는': ['그는', '그는', 'Er', '彼は'],
  '달리고': ['달리고', '달리고', 'rennt', '走って'],
  Tatlı: ['Dulces', 'Doux', 'Süße', '甘い'],
  elmaları: ['manzanas', 'pommes', 'Äpfel', 'りんご'],
  seviyorum: ['me gustan', 'j’aime', 'mag ich', '好きです'],
  Çanta: ['La bolsa', 'Le sac', 'Die Tasche', 'かばん'],
  masanın: ['de la mesa', 'de la table', 'des Tisches', 'テーブルの'],
  üstünde: ['encima', 'dessus', 'darauf', '上に'],
  O: ['Él', 'Il', 'Er', '彼は'],
  koşuyor: ['está corriendo', 'court', 'rennt', '走っています'],
}

const wordReadings = {
  apple: ['/ˈman.θa.na/', '/pɔm/', '/ˈap.fəl/', 'ringo'],
  croissant: ['/kɾwaˈsan/', '/kʁwa.sɑ̃/', '/kʁwaˈsɑ̃/', 'kurowassan'],
  strawberry: ['/ˈfɾe.sa/', '/fʁɛz/', '/ˈɛɐ̯tˌbeːʁə/', 'ichigo'],
  watermelon: ['/sanˈdi.a/', '/pa.tɛk/', '/ˈvasɐˌmɛloːnə/', 'suika'],
  pizza: ['/ˈpiθ.θa/', '/pi.tsa/', '/ˈpɪt.sa/', 'piza'],
  'ice cream': ['/eˈla.ðo/', '/ɡlas/', '/aɪs/', 'aisukurīmu'],
  honey: ['/mjel/', '/mjɛl/', '/ˈhoː.nɪç/', 'hachimitsu'],
  lemon: ['/liˈmon/', '/si.tʁɔ̃/', '/t͡sɪˈtʁoː.nə/', 'remon'],
  cake: ['/pasˈtel/', '/ɡa.to/', '/ˈkuː.xən/', 'kēki'],
  coffee: ['/kaˈfe/', '/ka.fe/', '/ˈka.feː/', 'kōhī'],
  backpack: ['/moˈtʃi.la/', '/sa.k‿a.do/', '/ˈʁʊk.zak/', 'ryukkusakku'],
  book: ['/ˈli.βɾo/', '/livʁ/', '/buːx/', 'hon'],
  headphones: ['/au.ɾi.kuˈla.ɾes/', '/ka.s‿a.ku/', '/ˈkɔpˌføːʁɐ/', 'heddohon'],
  cup: ['/ˈta.θa/', '/tas/', '/ˈta.sə/', 'kappu'],
  watch: ['/reˈlox/', '/mɔ̃tʁ/', '/uːɐ̯/', 'tokei'],
  glasses: ['/ˈɡa.fas/', '/ly.nɛt/', '/ˈbʁɪ.lə/', 'megane'],
  umbrella: ['/paˈɾa.ɣwas/', '/pa.ʁa.plɥi/', '/ˈʁeː.ɡn̩.ʃɪʁm/', 'kasa'],
  key: ['/ʝa.βe/', '/kle/', '/ˈʃlʏs.l̩/', 'kagi'],
  lamp: ['/ˈlam.pa.ɾa/', '/lɑ̃p/', '/ˈlam.pə/', 'ranpu'],
  camera: ['/ˈka.ma.ɾa/', '/ka.me.ʁa/', '/ˈka.me.ʁa/', 'kamera'],
  run: ['/koˈrer/', '/ku.ʁiʁ/', '/ˈʁɛ.nən/', 'hashiru'],
  jump: ['/salˈtaɾ/', '/so.te/', '/ˈʃpʁɪŋən/', 'tobu'],
  swim: ['/naˈðar/', '/na.ʒe/', '/ˈʃvɪ.mən/', 'oyogu'],
  read: ['/leˈeɾ/', '/liʁ/', '/ˈleː.zən/', 'yomu'],
  dance: ['/baiˈlaɾ/', '/dɑ̃.se/', '/ˈtan.t͡sən/', 'odoru'],
  cook: ['/ko.θiˈnaɾ/', '/kɥi.zi.ne/', '/ˈkɔ.xən/', 'ryōri suru'],
  draw: ['/di.βuˈxaɾ/', '/de.si.ne/', '/ˈt͡saɪç.nən/', 'kaku'],
  sing: ['/kanˈtaɾ/', '/ʃɑ̃.te/', '/ˈzɪŋən/', 'utau'],
  write: ['/eskɾiˈβiɾ/', '/e.kʁiʁ/', '/ˈʃʁaɪ.bən/', 'kaku'],
  smile: ['/sonˈre.iɾ/', '/su.ʁiʁ/', '/ˈlɛː.lən/', 'hohoemu'],
  dog: ['/ˈpe.ro/', '/ʃjɛ̃/', '/hʊnt/', 'inu'],
  cat: ['/ˈɡa.to/', '/ʃa/', '/ˈkat͡sə/', 'neko'],
  rabbit: ['/koˈne.xo/', '/la.pɛ̃/', '/ˈka.nɪn.t͡sən/', 'usagi'],
  bird: ['/ˈpa.xa.ɾo/', '/wa.zo/', '/ˈfoː.ɡəl/', 'tori'],
  horse: ['/kaˈβa.ʝo/', '/ʃə.val/', '/pfeːɐ̯t/', 'uma'],
  fish: ['/peθ/', '/pwa.sɔ̃/', '/fɪʃ/', 'sakana'],
  bear: ['/ˈo.so/', '/uʁs/', 'bɛːɐ̯', 'kuma'],
  fox: ['/ˈθo.ro/', '/ʁə.naʁ/', '/fʊks/', 'kitsune'],
  elephant: ['/e.leˈfan.te/', '/e.le.fɑ̃/', '/e.leˈfant/', 'zō'],
  frog: ['/ˈra.na/', '/ɡʁə.nuj/', '/fʁɔʃ/', 'kaeru'],
}

const baseTopics = [
  {
    id: 'food',
    title: 'Еда и сладости',
    subtitle: 'Food & sweets',
    icon: '🍓',
    color: 'pink',
    words: [
      { ru: 'яблоко', img: 'photo-1560806887-1e4cd0b6cbd6', text: { en: 'apple', ko: '사과', tr: 'elma' }, phonetic: { en: '/ˈæp.əl/', ko: 'са-гва', tr: '/elˈma/' } },
      { ru: 'круассан', img: 'photo-1555507036-ab1f4038808a', text: { en: 'croissant', ko: '크루아상', tr: 'kruvasan' }, phonetic: { en: '/krwɑːˈsɑːn/', ko: 'кы-ру-а-сан', tr: '/kɾu.vaˈsan/' } },
      { ru: 'клубника', img: 'photo-1464965911861-746a04b4bca6', text: { en: 'strawberry', ko: '딸기', tr: 'çilek' }, phonetic: { en: '/ˈstrɔːˌber.i/', ko: 'тталь-ги', tr: '/tʃiˈlek/' } },
      { ru: 'пицца', img: 'photo-1579751626657-72bc17010498', text: { en: 'pizza', ko: '피자', tr: 'pizza' }, phonetic: { en: '/ˈpiːt.sə/', ko: 'пи-джа', tr: '/ˈpit.za/' } },
      { ru: 'мороженое', img: 'photo-1563805042-7684c019e1cb', text: { en: 'ice cream', ko: '아이스크림', tr: 'dondurma' }, phonetic: { en: '/ˈaɪs ˌkriːm/', ko: 'а-и-сы-кы-рим', tr: '/donˈduɾ.ma/' } },
      { ru: 'арбуз', img: 'photo-1563114773-84221bd62daa', text: { en: 'watermelon', ko: '수박', tr: 'karpuz' }, phonetic: { en: '/ˈwɔː.tɚˌmel.ən/', ko: 'су-бак', tr: '/kaɾˈpuz/' } },
      { ru: 'мёд', img: 'photo-1587049352851-8d4e89133924', text: { en: 'honey', ko: '꿀', tr: 'bal' }, phonetic: { en: '/ˈhʌn.i/', ko: 'ккуль', tr: '/bal/' } },
      { ru: 'лимон', img: 'photo-1590502593747-42a996133562', text: { en: 'lemon', ko: '레몬', tr: 'limon' }, phonetic: { en: '/ˈlem.ən/', ko: 'ре-мон', tr: '/liˈmon/' } },
      { ru: 'торт', img: 'photo-1578985545062-69928b1d9587', text: { en: 'cake', ko: '케이크', tr: 'pasta' }, phonetic: { en: '/keɪk/', ko: 'кэ-и-кы', tr: '/pasˈta/' } },
      { ru: 'кофе', img: 'photo-1509042239860-f550ce710b93', text: { en: 'coffee', ko: '커피', tr: 'kahve' }, phonetic: { en: '/ˈkɑː.fi/', ko: 'ко-пи', tr: '/kahˈve/' } },
    ],
  },
  {
    id: 'objects',
    title: 'Повседневные вещи',
    subtitle: 'Everyday objects',
    icon: '🎒',
    color: 'blue',
    words: [
      { ru: 'рюкзак', img: 'photo-1553062407-98eeb64c6a62', text: { en: 'backpack', ko: '배낭', tr: 'sırt çantası' }, phonetic: { en: '/ˈbæk.pæk/', ko: 'пэ-нан', tr: '/sɯɾt tʃan.ta.sɯ/' } },
      { ru: 'книга', img: 'photo-1544947950-fa07a98d237f', text: { en: 'book', ko: '책', tr: 'kitap' }, phonetic: { en: '/bʊk/', ko: 'чэк', tr: '/kiˈtap/' } },
      { ru: 'наушники', img: 'photo-1505740420928-5e560c06d30e', text: { en: 'headphones', ko: '헤드폰', tr: 'kulaklık' }, phonetic: { en: '/ˈhed.foʊnz/', ko: 'хе-ды-пон', tr: '/kuˈlak.lɯk/' } },
      { ru: 'чашка', img: 'photo-1514228742587-6b1558fcca3d', text: { en: 'cup', ko: '컵', tr: 'fincan' }, phonetic: { en: '/kʌp/', ko: 'коп', tr: '/finˈdʒan/' } },
      { ru: 'часы', img: 'photo-1523275335684-37898b6baf30', text: { en: 'watch', ko: '시계', tr: 'saat' }, phonetic: { en: '/wɑːtʃ/', ko: 'щи-ге', tr: '/saˈat/' } },
      { ru: 'очки', img: 'photo-1511499767150-a48a237f0083', text: { en: 'glasses', ko: '안경', tr: 'gözlük' }, phonetic: { en: '/ˈɡlæs.ɪz/', ko: 'ан-гён', tr: '/ɡœzˈlyk/' } },
      { ru: 'зонт', img: 'photo-1534274988757-a28bf1a57c17', text: { en: 'umbrella', ko: '우산', tr: 'şemsiye' }, phonetic: { en: '/ʌmˈbrel.ə/', ko: 'у-сан', tr: '/ʃem.siˈje/' } },
      { ru: 'ключ', img: 'photo-1582139329536-e7284fece509', text: { en: 'key', ko: '열쇠', tr: 'anahtar' }, phonetic: { en: '/kiː/', ko: 'ёль-све', tr: '/a.naˈhtaɾ/' } },
      { ru: 'лампа', img: 'photo-1507473885765-e6ed057f782c', text: { en: 'lamp', ko: '램프', tr: 'lamba' }, phonetic: { en: '/læmp/', ko: 'рэм-пы', tr: '/ˈlam.ba/' } },
      { ru: 'камера', img: 'photo-1516035069371-29a1b244cc32', text: { en: 'camera', ko: '카메라', tr: 'kamera' }, phonetic: { en: '/ˈkæm.rə/', ko: 'ка-ме-ра', tr: '/kaˈme.ɾa/' } },
    ],
  },
  {
    id: 'actions',
    title: 'Действия и глаголы',
    subtitle: 'Actions & verbs',
    icon: '🏃',
    color: 'lime',
    words: [
      { ru: 'бежать', img: 'photo-1552674605-db6ffd4facb5', text: { en: 'run', ko: '달리다', tr: 'koşmak' }, phonetic: { en: '/rʌn/', ko: 'таль-ли-да', tr: '/koʃˈmak/' } },
      { ru: 'прыгать', img: 'photo-1538805060514-97d9cc17730c', text: { en: 'jump', ko: '뛰다', tr: 'zıplamak' }, phonetic: { en: '/dʒʌmp/', ko: 'ттви-да', tr: '/zɯp.laˈmak/' } },
      { ru: 'плавать', img: 'photo-1530549387789-4c1017266635', text: { en: 'swim', ko: '수영하다', tr: 'yüzmek' }, phonetic: { en: '/swɪm/', ko: 'су-ён-ха-да', tr: '/ˈjyz.mek/' } },
      { ru: 'читать', img: 'photo-1519682337058-a94d519337bc', text: { en: 'read', ko: '읽다', tr: 'okumak' }, phonetic: { en: '/riːd/', ko: 'ик-та', tr: '/o.kuˈmak/' } },
      { ru: 'танцевать', img: 'photo-1504609813442-a8924e83f76e', text: { en: 'dance', ko: '춤추다', tr: 'dans etmek' }, phonetic: { en: '/dæns/', ko: 'чум-чу-да', tr: '/dans etˈmek/' } },
      { ru: 'готовить', img: 'photo-1556911220-bff31c812dba', text: { en: 'cook', ko: '요리하다', tr: 'yemek yapmak' }, phonetic: { en: '/kʊk/', ko: 'ё-ри-ха-да', tr: '/jeˈmek japˈmak/' } },
      { ru: 'рисовать', img: 'photo-1513364776144-60967b0f800f', text: { en: 'draw', ko: '그리다', tr: 'çizmek' }, phonetic: { en: '/drɔː/', ko: 'кы-ри-да', tr: '/tʃizˈmek/' } },
      { ru: 'петь', img: 'photo-1516280440614-37939bbacd81', text: { en: 'sing', ko: '노래하다', tr: 'şarkı söylemek' }, phonetic: { en: '/sɪŋ/', ko: 'но-рэ-ха-да', tr: '/ʃaɾˈkɯ sœj.leˈmek/' } },
      { ru: 'писать', img: 'photo-1455390582262-044cdead277a', text: { en: 'write', ko: '쓰다', tr: 'yazmak' }, phonetic: { en: '/raɪt/', ko: 'ссы-да', tr: '/jazˈmak/' } },
      { ru: 'улыбаться', img: 'photo-1488426862026-3ee34a7d66df', text: { en: 'smile', ko: '미소 짓다', tr: 'gülümsemek' }, phonetic: { en: '/smaɪl/', ko: 'ми-со чит-та', tr: '/ɡy.lym.seˈmek/' } },
    ],
  },
  {
    id: 'animals',
    title: 'Животные',
    subtitle: 'Animals',
    icon: '🐶',
    color: 'purple',
    words: [
      { ru: 'собака', img: 'photo-1552053831-71594a27632d', text: { en: 'dog', ko: '개', tr: 'köpek', es: 'perro', ja: 'いぬ' }, phonetic: { en: '/dɔːɡ/', ko: 'гэ', tr: '/cœˈpek/', es: '/ˈpe.ro/', ja: 'inu' } },
      { ru: 'кошка', img: 'photo-1514888286974-6c03e2ca1dba', text: { en: 'cat', ko: '고양이', tr: 'kedi', es: 'gato', ja: 'ねこ' }, phonetic: { en: '/kæt/', ko: 'ко-ян-и', tr: '/ceˈdi/', es: '/ˈɡa.to/', ja: 'neko' } },
      { ru: 'кролик', img: 'photo-1585110396000-c9ffd4e4b308', text: { en: 'rabbit', ko: '토끼', tr: 'tavşan', es: 'conejo', ja: 'うさぎ' }, phonetic: { en: '/ˈræb.ɪt/', ko: 'то-кки', tr: '/tavˈʃan/', es: '/koˈne.xo/', ja: 'usagi' } },
      { ru: 'птица', img: 'photo-1444464666168-49d633b86797', text: { en: 'bird', ko: '새', tr: 'kuş', es: 'pájaro', ja: 'とり' }, phonetic: { en: '/bɝːd/', ko: 'сэ', tr: '/kuʃ/', es: '/ˈpa.xa.ɾo/', ja: 'tori' } },
      { ru: 'лошадь', img: 'photo-1534307671898-9417b9e9e7c5', text: { en: 'horse', ko: '말', tr: 'at', es: 'caballo', ja: 'うま' }, phonetic: { en: '/hɔːrs/', ko: 'маль', tr: '/at/', es: '/kaˈβa.ʝo/', ja: 'uma' } },
      { ru: 'рыба', img: 'photo-1535392432937-a27c36ec07b5', text: { en: 'fish', ko: '물고기', tr: 'balık', es: 'pez', ja: 'さかな' }, phonetic: { en: '/fɪʃ/', ko: 'муль-го-ги', tr: '/baˈlɯk/', es: '/peθ/', ja: 'sakana' } },
      { ru: 'медведь', img: 'photo-1564349683136-77e08dba1ef7', text: { en: 'bear', ko: '곰', tr: 'ayı', es: 'oso', ja: 'くま' }, phonetic: { en: '/ber/', ko: 'ком', tr: '/aˈjɯ/', es: '/ˈo.so/', ja: 'kuma' } },
      { ru: 'лиса', img: 'photo-1474511320723-9a56873867b5', text: { en: 'fox', ko: '여우', tr: 'tilki', es: 'zorro', ja: 'きつね' }, phonetic: { en: '/fɑːks/', ko: 'ё-у', tr: '/tilˈci/', es: '/ˈθo.ro/', ja: 'kitsune' } },
      { ru: 'слон', img: 'photo-1557050543-4d5f4e07ef46', text: { en: 'elephant', ko: '코끼리', tr: 'fil', es: 'elefante', ja: 'ぞう' }, phonetic: { en: '/ˈel.ə.fənt/', ko: 'ко-кки-ри', tr: '/fil/', es: '/e.leˈfan.te/', ja: 'zō' } },
      { ru: 'лягушка', img: 'photo-1504893524553-b855bce32c67', text: { en: 'frog', ko: '개구리', tr: 'kurbağa', es: 'rana', ja: 'かえる' }, phonetic: { en: '/frɑːɡ/', ko: 'гэ-гу-ри', tr: '/kuɾ.baˈa/', es: '/ˈra.na/', ja: 'kaeru' } },
    ],
  },
]

const topics = baseTopics.map((topic) => ({
  ...topic,
  words: topic.words.map((word) => {
    const extraTranslations = wordTranslations[word.text.en] || []
    const extraReadings = wordReadings[word.text.en] || []
    return {
      ...word,
      text: {
        ...word.text,
        ...(extraTranslations[0] && { es: extraTranslations[0] }),
        ...(extraTranslations[1] && { fr: extraTranslations[1] }),
        ...(extraTranslations[2] && { de: extraTranslations[2] }),
        ...(extraTranslations[3] && { ja: extraTranslations[3] }),
      },
      phonetic: {
        ...word.phonetic,
        ...(extraReadings[0] && { es: extraReadings[0] }),
        ...(extraReadings[1] && { fr: extraReadings[1] }),
        ...(extraReadings[2] && { de: extraReadings[2] }),
        ...(extraReadings[3] && { ja: extraReadings[3] }),
      },
    }
  }),
}))

const quizzes = {
  food: {
    prompt: 'Собери предложение',
    image: 'photo-1555939594-58d7cb561ad1',
    sentence: {
      en: ['I', 'like', 'sweet', 'apples.'],
      ko: ['나는', '달콤한', '사과를', '좋아해요.'],
      tr: ['Tatlı', 'elmaları', 'seviyorum.'],
      es: ['Me', 'gustan', 'las', 'manzanas.'],
      fr: ['J’aime', 'les', 'pommes.'],
      de: ['Ich', 'mag', 'süße', 'Äpfel.'],
      ja: ['私は', '甘い', 'りんごが', '好きです。'],
    },
  },
  objects: {
    prompt: 'Собери предложение',
    image: 'photo-1553062407-98eeb64c6a62',
    sentence: {
      en: ['The', 'bag', 'is', 'on', 'the', 'table.'],
      ko: ['가방이', '탁자', '위에', '있어요.'],
      tr: ['Çanta', 'masanın', 'üstünde.'],
      es: ['La', 'mochila', 'está', 'sobre', 'la', 'mesa.'],
      fr: ['Le', 'sac', 'est', 'sur', 'la', 'table.'],
      de: ['Der', 'Rucksack', 'ist', 'auf', 'dem', 'Tisch.'],
      ja: ['かばんが', 'テーブル', 'の上に', 'あります。'],
    },
  },
  actions: {
    prompt: 'Собери предложение',
    image: 'photo-1552674605-db6ffd4facb5',
    sentence: {
      en: ['He', 'is', 'running.'],
      ko: ['그는', '달리고', '있어요.'],
      tr: ['O', 'koşuyor.'],
      es: ['Él', 'está', 'corriendo.'],
      fr: ['Il', 'court.'],
      de: ['Er', 'rennt.'],
      ja: ['彼は', '走っています。'],
    },
  },
  animals: {
    prompt: 'Собери предложение',
    image: 'photo-1552053831-71594a27632d',
    sentence: {
      en: ['The', 'dog', 'is', 'happy.'],
      ko: ['강아지가', '행복해요.'],
      tr: ['Köpek', 'mutlu.'],
      es: ['El', 'perro', 'está', 'feliz.'],
      de: ['Der', 'Hund', 'ist', 'glücklich.'],
      ja: ['犬は', '幸せです。'],
    },
  },
}

const grammarRules = {
  food: {
    title: 'Скажи, что тебе нравится',
    rules: {
      en: 'Порядок: кто? + like/likes + что? В английском глагол стоит перед предметом.',
      ko: 'Тема + предмет с частицей 을/를 + глагол. В корейском глагол обычно стоит в конце.',
      tr: 'Кто? + предмет + глагол. В турецком глагол обычно стоит в конце фразы.',
      es: 'Сначала скажи, кому что нравится, затем назови то, что нравится.',
      de: 'Порядок: подлежащее + глагол + предмет. Глагол стоит на втором месте.',
      ja: 'Тема + предмет с частицей が + 好きです. Частица отмечает то, что нравится.',
    },
  },
  objects: {
    title: 'Расскажи, где лежит вещь',
    rules: {
      en: 'Предмет + is + место. Предлог on означает «на» и стоит перед местом.',
      ko: 'Предмет + место с частицей 에 + глагол в конце предложения.',
      tr: 'Предмет + место + глагол. Порядок «где?» обычно предшествует глаголу.',
      es: 'Предмет + глагол-связка + предлог + место.',
      de: 'Предмет + глагол на втором месте + предлог + место.',
      ja: 'Предмет + место + の上に («на») + глагол в конце.',
    },
  },
  actions: {
    title: 'Опиши действие прямо сейчас',
    rules: {
      en: 'Для действия сейчас: кто? + am/is/are + глагол с окончанием -ing.',
      ko: 'Кто? + основа глагола + 고 있어요. Так говорят о действии прямо сейчас.',
      tr: 'Кто? + глагол с окончанием -yor. Эта форма описывает действие сейчас.',
      es: 'Кто? + estar + глагол с окончанием -ando/-iendo.',
      de: 'В этой фразе настоящее время передаётся одним глаголом: подлежащее + глагол.',
      ja: 'Кто? + основа глагола + っています. Эта форма описывает действие сейчас.',
    },
  },
  animals: {
    title: 'Опиши животное',
    rules: {
      en: 'Кто? + is + какой? В английском признак стоит после глагола-связки.',
      ko: 'Кто? + слово-признак в вежливой форме. Отдельное слово «быть» не нужно.',
      tr: 'Кто? + слово-признак. В простом предложении-свойстве глагол-связка опускается.',
      es: 'Кто? + estar + какой? Признак согласуется с существительным.',
      de: 'Кто? + ist + какой? Признак стоит после глагола-связки.',
      ja: 'Кто? + は + признак + です. Признак стоит перед вежливым окончанием.',
    },
  },
}

const shuffle = (items) => {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  if (shuffled.length > 1 && shuffled.every((word, index) => word === items[index])) {
    shuffled.push(shuffled.shift())
  }
  return shuffled
}
const photoUrl = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function Icon({ name, size = 20, className = '' }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-7h6v7" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z" /></>,
    volume: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></>,
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    back: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    flame: <path d="M12 22c4.5 0 7-3 7-7 0-3-2-5-4-7 0 3-1 4-2 4 1-5-1-9-4-11 0 5-6 8-6 14 0 4 3.5 7 9 7Z" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    trophy: <><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0V4ZM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4" /></>,
    sound: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12" /></>,
  }
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.spark}
    </svg>
  )
}

function App() {
  const [language, setLanguage] = useState('en')
  const [learningMode, setLearningMode] = useState('beginner')
  const [activeTopic, setActiveTopic] = useState(null)
  const [activeMode, setActiveMode] = useState('beginner')
  const [pendingLesson, setPendingLesson] = useState(null)
  const [stage, setStage] = useState('home')
  const [cardIndex, setCardIndex] = useState(0)
  const [seenCards, setSeenCards] = useState([])
  const [chosenWords, setChosenWords] = useState([])
  const [pictureRound, setPictureRound] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [hearts, setHearts] = useState(5)
  const [xp, setXp] = useState(120)
  const [dailyXp, setDailyXp] = useState(20)
  const [streak, setStreak] = useState(4)
  const [trackProgress, setTrackProgress] = useState({ beginner: [], advanced: [] })

  const topic = topics.find((item) => item.id === activeTopic)
  const selectedTopic = pendingLesson ? topics.find((item) => item.id === pendingLesson.topicId) : null
  const quiz = topic ? quizzes[topic.id] : null
  const card = topic?.words[cardIndex]
  const quizWords = quiz ? quiz.sentence[language] : EMPTY_WORDS
  const completedLevels = trackProgress[learningMode]
  const unlockedLevels = Math.min(completedLevels.length + 1, topics.length)
  const availableWordIndexes = useMemo(() => shuffle(quizWords.map((_, index) => index)), [quizWords])
  const pictureTargetIndex = (activeTopic === 'food' ? [6, 5, 2, 4, 0] : [0, 1, 2, 3, 4])[pictureRound] ?? 0
  const pictureOptions = useMemo(() => {
    const wordCount = topics.find((item) => item.id === activeTopic)?.words.length ?? 0
    if (!wordCount) return EMPTY_WORDS
    const target = (activeTopic === 'food' ? [6, 5, 2, 4, 0] : [0, 1, 2, 3, 4])[pictureRound] ?? 0
    const indexes = [target, (target + 1) % wordCount, (target + 3) % wordCount, (target + 6) % wordCount]
    return shuffle([...new Set(indexes)])
  }, [activeTopic, pictureRound])

  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      setFeedback('Озвучивание не поддерживается этим браузером.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = languages[language].speech
    utterance.rate = 0.86
    window.speechSynthesis.speak(utterance)
  }

  const startLesson = () => {
    if (!pendingLesson) return
    const { topicId, mode } = pendingLesson
    setActiveTopic(topicId)
    setActiveMode(mode)
    setPendingLesson(null)
    setStage(mode === 'beginner' ? 'study' : 'grammar')
    setCardIndex(0)
    setSeenCards([])
    setChosenWords([])
    setPictureRound(0)
    setFeedback('')
    setHearts(5)
  }

  const moveCard = (direction) => {
    if (!topic) return
    const nextIndex = cardIndex + direction
    if (nextIndex < 0) return
    if (nextIndex >= topic.words.length) {
      setSeenCards((previous) => previous.includes(cardIndex) ? previous : [...previous, cardIndex])
      setStage(activeMode === 'beginner' ? 'picture-quiz' : 'grammar')
      setChosenWords([])
      setFeedback('')
      return
    }
    setSeenCards((previous) => previous.includes(cardIndex) ? previous : [...previous, cardIndex])
    setCardIndex(nextIndex)
  }

  const chooseWord = (wordIndex) => {
    if (feedback === 'success' || feedback === 'error' || hearts === 0 || chosenWords.includes(wordIndex)) return
    setFeedback('')
    setChosenWords((previous) => [...previous, wordIndex])
  }

  const completeLesson = () => {
    setFeedback('success')
    window.setTimeout(() => {
      setXp((value) => value + 50)
      setDailyXp((value) => value + 50)
      setStreak((value) => value + 1)
      setTrackProgress((previous) => ({
        ...previous,
        [activeMode]: previous[activeMode].includes(topic.id) ? previous[activeMode] : [...previous[activeMode], topic.id],
      }))
      setStage('victory')
    }, 550)
  }

  const answerPictureQuiz = (wordIndex) => {
    if (feedback || hearts === 0) return
    if (wordIndex !== pictureTargetIndex) {
      setFeedback('error')
      setHearts((value) => Math.max(0, value - 1))
      window.setTimeout(() => setFeedback(''), 800)
      return
    }
    setFeedback('success')
    window.setTimeout(() => {
      if (pictureRound === 4) {
        completeLesson()
      } else {
        setPictureRound((value) => value + 1)
        setFeedback('')
      }
    }, 700)
  }

  const checkAnswer = () => {
    if (feedback === 'success' || feedback === 'error' || hearts === 0) return
    if (chosenWords.length !== quizWords.length) {
      setFeedback('incomplete')
      return
    }
    if (chosenWords.every((wordIndex, index) => wordIndex === index)) {
      completeLesson()
      return
    }
    setFeedback('error')
    setHearts((value) => Math.max(0, value - 1))
    window.setTimeout(() => {
      setChosenWords([])
      setFeedback('')
    }, 850)
  }

  const backToHome = () => {
    setStage('home')
    setActiveTopic(null)
    setPendingLesson(null)
    setChosenWords([])
    setFeedback('')
  }

  const retryQuiz = () => {
    setHearts(5)
    setChosenWords([])
    setFeedback('')
  }

  return (
    <div className="app-shell">
      <main className="main-area">
        <header className="topbar">
          <a className="brand" href="#" onClick={(event) => { event.preventDefault(); backToHome() }}>
            <span className="brand-mark"><Icon name="spark" size={21} /></span>
            <span>LINGO<span className="brand-accent">LAB</span><small>LEARN BY SEEING</small></span>
          </a>
          <div className="topbar-right">
            <label className="language-select language-pills">
              <span>{languages[language].flag}</span>
              <select value={language} onChange={(event) => { setLanguage(event.target.value); setChosenWords([]); setFeedback('') }} aria-label="Язык обучения">
                {Object.entries(languages).map(([key]) => <option key={key} value={key}>{key.toUpperCase()}</option>)}
              </select>
              <span className="select-caret">⌄</span>
            </label>
            <div className="top-stat streak-stat"><span className="fire-emoji">🔥</span><strong>{streak}</strong><small>STREAK</small></div>
            <div className="top-stat xp-stat"><span className="stat-icon xp-icon">⭐</span><strong>{xp}</strong><small>XP</small></div>
            <div className="top-stat hearts-stat"><span className="heart-emoji">❤️</span><strong>{hearts}</strong></div>
          </div>
        </header>

        {stage === 'home' && (
          <div className="dashboard">
            <section className="welcome-row">
              <div>
                <div className="eyebrow"><span className="pulse-dot" /> ТВОЯ КАРТА ПРИКЛЮЧЕНИЙ</div>
                <h1>Готов к новому уровню? <span className="wave">✳</span></h1>
                <p>Учи 10 слов, собирай звёзды и открывай новые миры!</p>
              </div>
            </section>

            <section className="hero-panel roadmap-hero">
              <div className="hero-copy">
                <div className="hero-tag"><span>✦</span> ТВОЯ СЛЕДУЮЩАЯ МИССИЯ</div>
                <h2>Маленький шаг.<br /><em>Большое приключение!</em></h2>
                <p>Выбери светящийся уровень на карте. Каждый урок — всего 10 слов и одна весёлая игра.</p>
                <div className="daily-goal">
                  <div><span>ЦЕЛЬ НА СЕГОДНЯ</span><strong>{Math.min(dailyXp, 30)} / 30 XP</strong></div>
                  <div className="daily-track"><span style={{ width: `${Math.min((dailyXp / 30) * 100, 100)}%` }} /></div>
                </div>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                <div className="floating-word word-apple"><span>🍎</span><b>apple</b></div>
                <div className="floating-word word-hi"><span>안녕</span><small>привет</small></div>
                <div className="glass-card"><div className="art-image" /><div className="art-card-caption"><span>КАРТА № 01</span><b>слово дня <span>↗</span></b></div></div>
                <div className="art-star">✳</div><div className="art-spark">✦</div>
              </div>
            </section>

            <section className="roadmap-section" aria-labelledby="roadmap-title">
              <div className="section-heading">
                <div><div className="eyebrow">ТВОЙ МАРШРУТ</div><h2 id="roadmap-title">Выбери свой путь <span>🗺️</span></h2></div>
                <div className="roadmap-count">⭐ {completedLevels.length} / {topics.length} уровней</div>
              </div>
              <div className="track-switch" role="tablist" aria-label="Режим обучения">
                <button className={`track-tab beginner-tab ${learningMode === 'beginner' ? 'active' : ''}`} role="tab" aria-selected={learningMode === 'beginner'} onClick={() => setLearningMode('beginner')}>
                  <span>🌱</span><span><strong>Начинающий</strong><small>Слова и картинки</small></span><b>{trackProgress.beginner.length}/{topics.length}</b>
                </button>
                <button className={`track-tab advanced-tab ${learningMode === 'advanced' ? 'active' : ''}`} role="tab" aria-selected={learningMode === 'advanced'} onClick={() => setLearningMode('advanced')}>
                  <span>🚀</span><span><strong>Продвинутый</strong><small>Грамматика и фразы</small></span><b>{trackProgress.advanced.length}/{topics.length}</b>
                </button>
              </div>
              <div className="roadmap-path">
                {topics.map((item, index) => {
                  const locked = index >= unlockedLevels
                  const completed = completedLevels.includes(item.id)
                  return (
                    <button
                      className={`roadmap-level ${item.color} ${locked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
                      key={item.id}
                      onClick={() => !locked && setPendingLesson({ topicId: item.id, mode: learningMode })}
                      disabled={locked}
                      aria-label={locked ? `Уровень ${index + 1}: ${item.title}, закрыт` : `Открыть уровень ${index + 1}: ${item.title}`}
                    >
                      <span className="roadmap-node">
                        <span className="node-emoji">{locked ? '🔒' : item.icon}</span>
                        <span className="node-stars">{completed ? '⭐⭐⭐' : locked ? '☆☆☆' : '✦ ✦ ✦'}</span>
                      </span>
                      <span className="node-copy">
                        <span className="node-level">УРОВЕНЬ {index + 1}{completed ? ' · ПРОЙДЕН' : locked ? ' · ЗАКРЫТ' : ' · ДОСТУПЕН'}</span>
                        <strong>{item.title}</strong>
                        <small>{item.subtitle} · 10 слов · около 5 минут</small>
                      </span>
                      <span className="node-action">{locked ? 'Сначала пройди предыдущий уровень' : completed ? 'СЫГРАТЬ ЕЩЁ' : 'НАЧАТЬ УРОК'}{!locked && <Icon name="arrow" size={17} />}</span>
                    </button>
                  )
                })}
              </div>
            </section>
            <footer className="dashboard-footer"><span>LINGO LAB <i>✦</i> УЧИСЬ ВИДЕТЬ СЛОВА</span><span>ОДИН УРОВЕНЬ ЗА РАЗ — ТЫ СПРАВИШЬСЯ! 💚</span></footer>
          </div>
        )}

        {(stage === 'study' || stage === 'grammar' || stage === 'picture-quiz' || stage === 'quiz') && topic && (
          <div className="lesson-view">
            <div className="lesson-toolbar">
              <button className="back-button" onClick={backToHome}><Icon name="back" size={18} /> К карте</button>
              <span className="lesson-level-badge">{activeMode === 'beginner' ? '🌱 НАЧИНАЮЩИЙ' : '🚀 ПРОДВИНУТЫЙ'} · {topic.icon}</span>
              <div className="lesson-hearts">{Array.from({ length: 5 }, (_, index) => <Icon key={index} name="heart" size={17} className={index < hearts ? 'heart-full' : 'heart-empty'} />)}</div>
            </div>
            <div className="lesson-progress">
              <div className="progress-caption">
                <span>{stage === 'study' ? 'ШАГ 1 ИЗ 2 · СЛОВА' : stage === 'grammar' ? 'ШАГ 1 ИЗ 2 · ПРАВИЛО' : activeMode === 'beginner' ? 'ШАГ 2 ИЗ 2 · КВИЗ ПО КАРТИНКАМ' : 'ШАГ 2 ИЗ 2 · СОБЕРИ ФРАЗУ'}</span>
                <strong>{stage === 'study' ? `КАРТОЧКА ${cardIndex + 1} ИЗ 10` : stage === 'picture-quiz' ? `ВОПРОС ${pictureRound + 1} ИЗ 5` : stage === 'grammar' ? 'ПРОЧИТАЙ ПРАВИЛО' : 'ФИНАЛЬНАЯ ИГРА'}</strong>
              </div>
              <div className="progress-track"><span style={{ width: stage === 'study' ? `${((cardIndex + 1) / 10) * 50}%` : stage === 'grammar' ? '55%' : stage === 'picture-quiz' ? `${50 + ((pictureRound + 1) / 5) * 50}%` : '100%' }} /></div>
            </div>
            {stage === 'study' && card && (
              <section className="flashcard-stage">
                <div className="flashcard-heading">
                  <div className="eyebrow">{topic.icon} {topic.title.toUpperCase()}</div>
                  <h1>Смотри, слушай, <em>запоминай!</em></h1>
                  <p>Слово, картинка и немного волшебства ✨</p>
                </div>
                <div className="flashcard">
                  <img src={photoUrl(card.img, 1300)} alt={card.ru} />
                  <div className="card-image-shade" />
                  <div className="flashcard-number">КАРТОЧКА <b>{String(cardIndex + 1).padStart(2, '0')}</b><span>/ 10</span></div>
                  <button className="speak-button" onClick={() => speak(card.text[language])} aria-label={`Произнести ${card.text[language]}`}><Icon name="volume" size={22} /><span>СЛУШАТЬ</span></button>
                  <div className="flashcard-word">
                    <div className="word-target">{card.text[language]}</div>
                    <div className="word-phonetic">{card.phonetic[language]}</div>
                    <div className="word-translation">{card.ru}</div>
                  </div>
                  <div className="photo-credit">СЛОВО № {cardIndex + 1} <span>✦</span></div>
                </div>
                <div className="card-dots">{topic.words.map((word, index) => <span key={word.ru} className={index === cardIndex ? 'current' : seenCards.includes(index) ? 'seen' : ''} />)}</div>
                <div className="flashcard-controls">
                  <button className="secondary-button" onClick={() => moveCard(-1)} disabled={cardIndex === 0}><Icon name="back" size={17} /> НАЗАД</button>
                  <button className="primary-button next-button" onClick={() => moveCard(1)}>{cardIndex === topic.words.length - 1 ? 'К ИГРЕ!' : 'ДАЛЕЕ'} <Icon name="arrow" size={18} /></button>
                </div>
              </section>
            )}
            {stage === 'grammar' && quiz && (
              <section className="grammar-stage">
                <div className="flashcard-heading">
                  <div className="eyebrow">🚀 ПРОДВИНУТЫЙ · МИНИ-УРОК</div>
                  <h1>Соберём фразу <em>по правилам!</em></h1>
                  <p>Одно короткое правило — и ты уже говоришь увереннее.</p>
                </div>
                <article className="grammar-card">
                  <div className="grammar-card-icon">📚</div>
                  <span className="grammar-kicker">ПРАВИЛО ДНЯ</span>
                  <h2>{grammarRules[topic.id].title}</h2>
                  <p>{grammarRules[topic.id].rules[language]}</p>
                  <div className="grammar-example"><span>ПРИМЕР НА {languages[language].name.toUpperCase()}</span><strong>{quiz.sentence[language].join(' ')}</strong><button className="grammar-listen" onClick={() => speak(quiz.sentence[language].join(' '))} aria-label="Прослушать пример">🔊</button></div>
                </article>
                <div className="grammar-prompt">Запомнил? Теперь собери предложение по этой схеме!</div>
                <div className="flashcard-controls"><button className="secondary-button" onClick={backToHome}>ПОЗЖЕ</button><button className="primary-button next-button" onClick={() => { setStage('quiz'); setChosenWords([]); setFeedback('') }}>К ИГРЕ! <Icon name="arrow" size={18} /></button></div>
              </section>
            )}
            {stage === 'picture-quiz' && topic && card && (
              <section className="picture-quiz-stage">
                <div className="flashcard-heading">
                  <div className="eyebrow">🌱 НАЧИНАЮЩИЙ · ИГРА С КАРТИНКАМИ</div>
                  <h1>Найди картинку! <span>🖼️</span></h1>
                  <p>Какое изображение означает это слово?</p>
                </div>
                <div className="picture-prompt-card">
                  <span>НАЙДИ КАРТИНКУ ДЛЯ СЛОВА</span>
                  <strong>{topic.words[pictureTargetIndex].text[language]}</strong>
                  <small>{topic.words[pictureTargetIndex].phonetic[language]}</small>
                  <button className="prompt-listen" onClick={() => speak(topic.words[pictureTargetIndex].text[language])} aria-label="Прослушать слово">🔊</button>
                </div>
                <div className={`picture-options ${feedback === 'error' ? 'shake' : ''}`}>
                  {pictureOptions.map((wordIndex) => {
                    const option = topic.words[wordIndex]
                    const correctChoice = feedback === 'success' && wordIndex === pictureTargetIndex
                    return (
                      <button
                        className={`picture-choice ${correctChoice ? 'picture-correct' : ''}`}
                        key={`${pictureRound}-${wordIndex}`}
                        onClick={() => answerPictureQuiz(wordIndex)}
                        disabled={Boolean(feedback) || hearts === 0}
                        aria-label={`Картинка: ${option.ru}`}
                      >
                        <img src={photoUrl(option.img, 420)} alt={option.ru} />
                        <span>{option.ru}</span>
                      </button>
                    )
                  })}
                </div>
                <div className={`quiz-instruction ${feedback}`}>{feedback === 'success' ? 'Верно! Ты отлично запомнил! 🎉' : feedback === 'error' ? 'Не совсем! Посмотри ещё раз 👀' : `Вопрос ${pictureRound + 1} из 5 · Выбери одну картинку`}</div>
              </section>
            )}
            {stage === 'quiz' && quiz && (
              <section className="quiz-stage">
                <div className="flashcard-heading">
                  <div className="eyebrow"><span className="pulse-dot" /> 🚀 ПРОДВИНУТЫЙ · ФИНАЛЬНАЯ ИГРА</div>
                  <h1>{quiz.prompt} <span>🧩</span></h1>
                  <p>Расставь слова по правилу и нажми «Проверить»!</p>
                </div>
                <div className={`quiz-card ${feedback === 'error' ? 'shake' : ''} ${feedback === 'success' ? 'correct-glow' : ''}`}>
                  <img src={photoUrl(quiz.image, 1300)} alt={topic.id === 'actions' ? 'Человек бежит' : topic.id === 'animals' ? 'Собака' : topic.title} />
                  <div className="quiz-image-overlay" />
                  <div className="quiz-image-label"><span>✦</span> ПОДСКАЗКА В КАРТИНКЕ</div>
                  <div className="quiz-image-caption">{topic.id === 'actions' ? 'Лови момент!' : topic.id === 'food' ? 'Ням-ням!' : topic.id === 'animals' ? 'Какой хороший пёс!' : 'Готов к приключению?'}</div>
                </div>
                <div className={`quiz-instruction ${feedback}`}>{feedback === 'success' ? 'Супер! Всё правильно! 🎉' : feedback === 'error' ? 'Почти! Попробуем ещё раз 💪' : feedback === 'incomplete' ? 'Добавь слова во все окошки 🙂' : 'Нажимай на слова в правильном порядке'}</div>
                <div className={`answer-zone ${feedback === 'success' ? 'answer-success' : feedback === 'error' ? 'answer-error' : ''}`}>
                  {quizWords.map((_, slotIndex) => {
                    const selectedWordIndex = chosenWords[slotIndex]
                    return (
                      <button
                        key={`slot-${slotIndex}`}
                        className={`answer-chip ${selectedWordIndex !== undefined ? 'selected' : ''}`}
                        onClick={() => { if (feedback !== 'success') setChosenWords((value) => value.filter((_, index) => index !== slotIndex)); setFeedback('') }}
                        disabled={feedback === 'success' || feedback === 'error'}
                        aria-label={selectedWordIndex === undefined ? `Пустое место ${slotIndex + 1}` : `Убрать слово ${quizWords[selectedWordIndex]}`}
                      >
                        {selectedWordIndex !== undefined ? quizWords[selectedWordIndex] : <span className="empty-slot">{slotIndex + 1}</span>}
                      </button>
                    )
                  })}
                </div>
                <div className="word-bank">
                  {availableWordIndexes.map((wordIndex) => (
                    <button key={`word-${wordIndex}`} className={`word-chip ${chosenWords.includes(wordIndex) ? 'used' : ''}`} onClick={() => chooseWord(wordIndex)} disabled={chosenWords.includes(wordIndex) || feedback === 'success' || feedback === 'error' || hearts === 0}>
                      {quizWords[wordIndex]}
                    </button>
                  ))}
                </div>
                <div className="quiz-actions">
                  <button className="secondary-button" onClick={() => { setChosenWords([]); setFeedback('') }} disabled={chosenWords.length === 0 || feedback === 'success' || feedback === 'error'}>СБРОСИТЬ</button>
                  <button className="primary-button check-button" onClick={checkAnswer} disabled={feedback === 'success' || feedback === 'error' || hearts === 0}>ПРОВЕРИТЬ <Icon name="check" size={18} /></button>
                  <span><Icon name="heart" size={15} className="heart-full" /> {hearts} жизни</span>
                </div>
              </section>
            )}
          </div>
        )}

        {stage === 'victory' && topic && (
          <section className="victory-screen">
            <div className="victory-confetti" aria-hidden="true">⭐ 🎉 ✨ 🍀 ⭐ 🎊</div>
            <div className="victory-medal">🏆</div>
            <div className="eyebrow">{activeMode === 'beginner' ? 'НАЧИНАЮЩИЙ' : 'ПРОДВИНУТЫЙ'} · УРОВЕНЬ ПРОЙДЕН!</div>
            <h1>Ты просто <em>супер!</em></h1>
            <p>{activeMode === 'beginner' ? 'Ты повторил 10 слов и справился с игрой на память!' : 'Ты освоил правило и собрал своё предложение!'} Следующий уровень этого пути ждёт тебя.</p>
            <div className="victory-stars" aria-label="Три звезды">⭐ ⭐ ⭐</div>
            <div className="reward-row">
              <div><span>⭐</span><strong>+50 XP</strong><small>НАГРАДА</small></div>
              <div><span>🌟</span><strong>3 звезды</strong><small>ОТЛИЧНАЯ РАБОТА</small></div>
              <div><span>{topics[trackProgress[activeMode].length]?.icon || '🏆'}</span><strong>{topics[trackProgress[activeMode].length]?.title || 'Все уровни!'}</strong><small>{topics[trackProgress[activeMode].length] ? 'НОВЫЙ УРОВЕНЬ' : 'ПУТЬ ПРОЙДЕН'}</small></div>
            </div>
            <button className="primary-button modal-cta" onClick={backToHome}>НА КАРТУ УРОВНЕЙ <Icon name="arrow" size={18} /></button>
          </section>
        )}
      </main>

      {selectedTopic && stage === 'home' && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingLesson(null) }}>
          <section className="start-modal" role="dialog" aria-modal="true" aria-labelledby="start-title">
            <button className="modal-close" onClick={() => setPendingLesson(null)} aria-label="Закрыть"><Icon name="close" /></button>
            <div className={`start-modal-icon ${selectedTopic.color}`}>{selectedTopic.icon}</div>
            <div className="eyebrow">{pendingLesson?.mode === 'beginner' ? '🌱 НАЧИНАЮЩИЙ' : '🚀 ПРОДВИНУТЫЙ'} · УРОВЕНЬ {topics.findIndex((item) => item.id === selectedTopic.id) + 1}</div>
            <h2 id="start-title">{selectedTopic.title}</h2>
            <p>{pendingLesson?.mode === 'beginner' ? 'Посмотри 10 карточек, проверь память в игре с картинками и заработай звёзды!' : 'Изучи короткое грамматическое правило, собери предложение и заработай звёзды!'}</p>
            <div className="start-facts"><span>{pendingLesson?.mode === 'beginner' ? '🃏' : '📚'} <b>{pendingLesson?.mode === 'beginner' ? '10 слов' : 'Грамматика'}</b></span><span>⏱️ <b>5 минут</b></span><span>⭐ <b>+50 XP</b></span></div>
            <button className="primary-button modal-cta" onClick={startLesson}>НАЧАТЬ УРОК <Icon name="arrow" size={18} /></button>
          </section>
        </div>
      )}

      {(stage === 'quiz' || stage === 'picture-quiz') && hearts === 0 && (
        <div className="modal-backdrop">
          <section className="start-modal" role="dialog" aria-modal="true" aria-labelledby="hearts-title">
            <div className="start-modal-icon">💛</div>
            <div className="eyebrow">ПАУЗА ДЛЯ ПЕРЕЗАРЯДКИ</div>
            <h2 id="hearts-title">Попробуем ещё?</h2>
            <p>Ошибки помогают учиться! Восстанови сердечки и попробуй ещё раз.</p>
            <button className="primary-button modal-cta" onClick={retryQuiz}>ЕЩЁ ОДНА ПОПЫТКА <Icon name="arrow" size={18} /></button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App

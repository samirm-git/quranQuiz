const surah_ids = Array.from({length: 114}, (_, index) => index + 1);
const surah_names = [
  "Al-Fatiha", "Al-Baqara", "Aal-Imran", "An-Nisaa'", "Al-Ma'ida", "Al-An'am",
  "Al-A'raf", "Al-Anfal", "Al-Tawba", "Yunus", "Hud", "Yusuf", "Ar-Ra'd",
  "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Israa", "Al-Kahf", "Maryam", "Ta-Ha",
  "Al-Anbiya", "Al-Hajj", "Al-Muminun", "An-Nur", "Al-Furqan", "Ash-Shuara",
  "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah",
  "Al-Ahzab", "Saba", "Fatir", "Yasin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
  "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiya", "Al-Ahqaf",
  "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Az-Zariyat", "At-Tur", "An-Najm",
  "Al-Qamar", "Ar-Rahman", "Al-Waqia", "Al-Hadid", "Al-Mujadilah", "Al-Hashr",
  "Al-Mumtahinah", "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun",
  "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
  "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan",
  "Al-Mursalat", "An-Naba", "An-Naziat", "Abasa", "At-Takwir", "Al-Infitar",
  "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-Ala", "Al-Ghashiyah",
  "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Tin",
  "Al-Alaq", "Al-Qadr", "Al-Bayinah", "Az-Zalzalah", "Al-Adiyat", "Al-Qariah",
  "Al-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil", "Quraish", "Al-Ma'un",
  "Al-Kauthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq",
  "An-Nas"
]; 

const ayahs_per_surah = [7, 286, 200, 176, 120, 165, 206, 75, 129, 109,  
    123, 111, 43, 52, 99, 128, 111, 110, 98, 135,   
    112, 78, 118, 64, 77, 227, 93, 88, 69, 60,      
    34, 30, 73, 54, 45, 83, 182, 88, 75, 85,        
    54, 53, 89, 59, 37, 35, 38, 29, 18, 45,         
    60, 49, 62, 55, 78, 96, 29, 22, 24, 13,         
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44,        
    28, 28, 20, 56, 40, 31, 50, 40, 46, 42,         
    29, 19, 36, 25, 22, 17, 19, 26, 30, 20,         
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11,            
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3,             
    5, 4, 5, 6                                     
];

export {surah_ids, surah_names, ayahs_per_surah}
export const Languages = {
  balance: ["Баланс", "Balance", "Balance"],
  stats: [
    ["Cила Клікера", "Генератори"],
    ["Power Clickers", "Generators"],
    ["Power Clickers", "Generatoren"]
  ],
  controls: [
    ["Отримати", "Швидкий Збір"],
    ["Get", "Quick Collection"],
    ["Erhalten", "Schnelle Sammlung"]
  ],
  buyGen: ["Купити Ген", "Buy Gen", "Kaufen Gen"],
  buyPower: ["Купити Сили", "Buy Power", "Kaufen Power"],
  quickCollection: ["Швидкий Збір", "Quick collection", "Schnelle Sammlung"],
  buyGold: ["Купити Золото", "Buy gold", "Kaufen Gold"],
  vibration: [
    ["Вібрація Викл", "Вібрація Вкл"],
    ["Vibration off", "Vibration on"],
    ["Vibration aus", "Vibration auf"]
  ],
  // Меню
  menuTitle: ["Кліка Гра", "Clicker Game", "Clicker Spiel"],
  newGame: ["Нова Гра", "New Game", "Neues Spiel"],
  continueGame: ["Продовжити", "Continue", "Fortsetzen"],
  resetGame: ["Скинути Гру", "Reset Game", "Spiel zurücksetzen"],
  exitGame: ["Вийти з Гри", "Exit Game", "Spiel verlassen"],
  settings: ["Налаштування", "Settings", "Einstellungen"],
  backToMenu: ["◀ Меню", "◀ Menu", "◀ Menü"],
  confirmReset: ["Ви впевнені?", "Are you sure?", "Sind Sie sicher?"],
  yes: ["Так", "Yes", "Ja"],
  no: ["Ні", "No", "Nein"],
  // Налаштування
  settingsTitle: ["Налаштування Звуку", "Sound Settings", "Toneinstellungen"],
  soundEffects: ["Звукові Ефекти", "Sound Effects", "Soundeffekte"],
  backgroundMusic: ["Фонова Музика", "Background Music", "Hintergrundmusik"],
  soundVolume: ["Гучність Звуків", "Sound Volume", "Lautstärke"],
  musicVolume: ["Гучність Музики", "Music Volume", "Musiklautstärke"],
  // Статистика
  statsTitle: ["Статистика Гри", "Game Statistics", "Spielstatistiken"],
  totalClicks: ["Всього Кліків:", "Total Clicks:", "Gesamt Klicks:"],
  totalSpent: ["Витрачено:", "Total Spent:", "Ausgegeben:"],
  totalEarned: ["Зароблено:", "Total Earned:", "Verdient:"]
};

export type LanguageKey = keyof typeof Languages;
export type LanguageIndex = 0 | 1 | 2;

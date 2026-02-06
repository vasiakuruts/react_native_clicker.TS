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
  ]
};

export type LanguageKey = keyof typeof Languages;
export type LanguageIndex = 0 | 1 | 2;

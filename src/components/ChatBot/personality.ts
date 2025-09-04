export const SherlockPrompt = `Ты — Шерлок Холмс. Ты гениальный детектив с острым умом, саркастичным чувством юмора и привычкой делать точные дедуктивные выводы.
Отвечай так, как говорил бы Холмс: немного высокомерно, всегда по делу, с намёком на превосходство.
Можешь делать предположения о пользователе на основе его вопросов. Избегай современных словечек и выражений.
Длина ответа не должна превышать 2-3 предложений.`;

export const personalityPrompts = {
  Sherlock: SherlockPrompt,

} as const

export const getPrompt = (person: string) => {
  if (person in personalityPrompts) {
    return personalityPrompts[person as keyof typeof personalityPrompts];
  }
  return "Собеседник";
}

export enum Personalities {
  Sherlock = 'Шерлок Холмс',
  Watson = 'Док. Ватсон',
  Einstein = 'Альберт Эйнштейн',
  Stark= "Тони Старк"
}

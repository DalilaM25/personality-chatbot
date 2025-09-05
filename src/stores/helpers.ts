import type { Personalities } from "@/components/ChatBot/personality";

export function createThemeMap(personalitiesEnum: typeof Personalities): Record<string, string> {
  const themeMap: Record<string, string> = {};

  Object.keys(personalitiesEnum).forEach(key => {
    if (isNaN(Number(key))) {
      const themeClass = `theme-${key.toLowerCase()}`;
      themeMap[key] = themeClass;
    }
  });

  return themeMap;
}

export const pricing = {
  cursor: [
    { name: "Hobby", monthlyPrice: 0, seats: 1 },
    { name: "Pro", monthlyPrice: 20, seats: 1 },
    { name: "Business", monthlyPrice: 40, seats: 1 },
    { name: "Enterprise", monthlyPrice: 0, seats: 0 },
  ],
  copilot: [
    { name: "Individual", monthlyPrice: 10, seats: 1 },
    { name: "Business", monthlyPrice: 19, seats: 1 },
    { name: "Enterprise", monthlyPrice: 39, seats: 1 },
  ],
  claude: [
    { name: "Free", monthlyPrice: 0, seats: 1 },
    { name: "Pro", monthlyPrice: 20, seats: 1 },
    { name: "Max", monthlyPrice: 100, seats: 1 },
    { name: "Team", monthlyPrice: 30, seats: 1 },
    { name: "Enterprise", monthlyPrice: 0, seats: 0 },
  ],
  chatgpt: [
    { name: "Plus", monthlyPrice: 20, seats: 1 },
    { name: "Team", monthlyPrice: 25, seats: 1 },
    { name: "Enterprise", monthlyPrice: 0, seats: 0 },
  ],
  openai_api: [{ name: "API direct", monthlyPrice: 0, seats: 1 }],
  anthropic_api: [{ name: "API direct", monthlyPrice: 0, seats: 1 }],
  gemini: [
    { name: "Pro", monthlyPrice: 19.99, seats: 1 },
    { name: "Ultra", monthlyPrice: 249.99, seats: 1 },
    { name: "API", monthlyPrice: 0, seats: 1 },
  ],
  windsurf: [
    { name: "Pro", monthlyPrice: 15, seats: 1 },
    { name: "Team", monthlyPrice: 25, seats: 1 },
  ],
} as const;

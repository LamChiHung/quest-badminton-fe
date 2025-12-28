export const ClubEnum = {
    QUEST: "QUEST",
    BOSCH: "BOSCH",
    OTHERS: "OTHERS",
} as const

export type ClubEnum = typeof ClubEnum[keyof typeof ClubEnum]
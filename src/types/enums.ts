export const ClubEnum = {
    QUEST: "QUEST",
    BOSCH: "BOSCH",
    OTHERS: "OTHERS",
} as const

export type ClubEnum = typeof ClubEnum[keyof typeof ClubEnum]

export const TourTypeEnum = {
    SOLO: "Cá nhân",
    TEAM: "Đồng đội",
} as const

export type TourTypeEnum = typeof TourTypeEnum[keyof typeof TourTypeEnum]

export const TourMatchTypeEnum = {
    KILL: "Loại trực tiếp",
    ROUND: "Vòng tròn",
} as const

export type TourMatchTypeEnum = typeof TourMatchTypeEnum[keyof typeof TourMatchTypeEnum]

export const TourStatusEnum = {
    UPCOMING: "Sắp diễn ra",
    LIVE: "Đang diễn ra",
    END: "Kết thúc",
    CANCEL: "Hủy bỏ",
} as const

export type TourStatusEnum = typeof TourStatusEnum[keyof typeof TourStatusEnum]
export const ClubEnum = {
    QUEST: "QUEST",
    BOSCH: "BOSCH",
    OTHERS: "OTHERS",
} as const

export const TourTypeEnum = {
    SOLO: "SOLO",
    TEAM: "TEAM",
} as const

export const TourTypeEnumText = {
    SOLO: "Cá nhân",
    TEAM: "Đồng đội",
} as const

export const TourMatchTypeEnum = {
    KILL: "KILL",
    ROUND: "ROUND",
} as const

export const TourMatchTypeEnumText = {
    KILL: "Loại trực tiếp",
    ROUND: "Vòng tròn",
} as const

export const TourStatusEnum = {
    UPCOMING: "UPCOMING",
    LIVE: "LIVE",
    END: "END",
    CANCEL: "CANCEL",
} as const

export const TourStatusEnumText = {
    UPCOMING: "Sắp diễn ra",
    LIVE: "Đang diễn ra",
    END: "Kết thúc",
    CANCEL: "Hủy bỏ",
} as const

export const PlayerTierEnum = {
    Y: "Y",
    TBT: "TBT",
    TB: "TB",
    TBC: "TBC",
    TBCC: "TBCC",
    K: "K"
}

export const PlayerTierEnumText = {
    Y: "Yếu",
    TBT: "Trung Bình -",
    TB: "Trung Bình",
    TBC: "Trung Bình +",
    TBCC: "Trung Bình ++",
    K: "Khá"
}

export const GenderEnum = {
    MALE: "MALE",
    FEMALE: "FEMALE"
}

export const GenderEnumText = {
    MALE: "Nam",
    FEMALE: "Nữ"
}

export const PlayerStatusEnum = {
    PENDING_APPROVE: "PENDING_APPROVE",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    BANNED: "BANNED"
}

export const PlayerStatusEnumText = {
    PENDING_APPROVE: "Đang chờ duyệt",
    APPROVED: "Đã duyệt",
    REJECTED: "Bị từ chối",
    BANNED: "Bị cấm"
}

export const TourRoleEnum = {
    GUEST: "GUEST",
    PLAYER: "PLAYER",
    REFEREE: "REFEREE",
    CAPTAIN: "CAPTAIN"
}

export const TourRoleEnumText = {
    GUEST: "Khách",
    PLAYER: "Vận động viên",
    REFEREE: "Trọng tài",
    CAPTAIN: "Đội trưởng"
}

export const PlayerPairTypeEnum = {
    SINGLE_MALE: "SINGLE_MALE",
    SINGLE_FEMALE: "SINGLE_FEMALE",
    DOUBLE_MALE: "DOUBLE_MALE",
    DOUBLE_FEMALE: "DOUBLE_FEMALE",
    MIX: "MIX"
}

export const PlayerPairTypeEnumText = {
    SINGLE_MALE: "Đơn Nam",
    SINGLE_FEMALE: "Đơn Nữ",
    DOUBLE_MALE: "Đôi Nam",
    DOUBLE_FEMALE: "Đôi Nữ",
    MIX: "Đôi Nam Nữ"
}

export const RoundTypeEnum = {
    QUALIFYING: "QUALIFYING",
    QUARTER: "QUARTER",
    SEMI: "SEMI",
    FINAL: "FINAL",
}

export const RoundTypeEnumText = {
    QUALIFYING: "Vòng loại",
    QUARTER: "Tứ kết",
    SEMI: "Bán kết",
    FINAL: "Chung kết",
}

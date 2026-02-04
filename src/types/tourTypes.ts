import type { TourTypeEnum } from "./enums"

export interface TourRequest {
    name: string
    type: string
    matchType: string
    malePlayers: number,
    femalePlayers: number,
    registrationEndDate: Date
    startDate: Date
    location: string
    locationUrl: string
    ruleUrl: string
    isPrivate: boolean
    backgroundUrl?: string,
    avatarUrl?: string
}

export interface TourResponse {
    id: number
    name: string
    code: string
    status: string
    malePlayers: number
    malePlayerRegistered: number
    femalePlayers: number
    femalePlayerRegistered: number
    type: string
    matchType: string
    startDate: string
    registrationEndDate: string
    location: string
    locationUrl: string
    ruleUrl: string
    pendingApprovePlayers: number
    backgroundUrl: string,
    avatarUrl: string
    isAvailableToRegister: boolean
    isPrivate: boolean
}

export interface SearchTourRequest {
    "id.equals"?: number,
    "name.contains"?: string,
    "code.contains"?: string,
    "type.equals"?: string,
    "matchType.equals"?: string,
    "fromStartDate.greaterThanOrEqual"?: string,
    "toStartDate.lessThanOrEqual"?: string,
    "location.contains"?: string,
    "isPrivate.equals"?: boolean,
    "status.equals"?: string,
    "page"?: number,
    "size"?: number
}


export interface RegisterPlayerRequest {
    tourId: number
    tier: string
    gender: string
}

export interface PlayerResponse {
    id: number
    userId: number
    name: string
    email: string
    club: string
    tourId: number
    teamId: number
    tier: string
    status: string
    gender: string
    note: string
}

export interface SearchPlayerRequest {
    "id.equals"?: number,
    "tourId.equals"?: number,
    "email.contains"?: string,
    "name.contains"?: string,
    "teamId.in"?: number,
    "tier.in"?: string[],
    "gender.in"?: string[],
    "status.in"?: string[],
    "page"?: number,
    "size"?: number
}

export interface ApprovePlayerRequest {
    tourId: number
    playerId: number
    note?: string
    isApprove: boolean
}

export interface SearchTeamRequest {
    "id.equals"?: number,
    "tourId.equals"?: number,
    "name.contains"?: string,
    "page"?: number,
    "size"?: number
}

export interface TeamResponse {
    id: number
    name: string
    number: number
    tourId: number
    captain?: PlayerResponse
}

export interface TeamRequest {
    name: string
    tourId: number
}

export interface AddPlayerRequest {
    teamId: number
    captainId: number
    playerIds: number[]
}


export interface TourRoleResponse {
    role: string
}

export interface SearchPlayerPairRequest {
    "id.equals"?: number,
    "playerId.in"?: PlayerResponse,
    "tourId.equals"?: number,
    "teamId.equals"?: number,
    page?: number
    size?: number
}

export interface PlayerPairResponse {
    id: number,
    player1: PlayerResponse,
    player2: PlayerResponse,
    tourId: number,
    teamId: number,
    type: string
}

export interface RegisterPlayerPairRequest {
    tourId: number
    player1Id: number
    player2Id: number | undefined
    type: string
}

export interface SearchRoundRequest {
    "id.equals"?: number,
    "name.contains"?: string,
    "tourId.equals"?: number,
    page?: number
    size?: number
}


export interface RoundResponse {
    id: number,
    name: string,
    tourId: number,
    type: string
}

export interface RoundRequest {
    name?: string,
    tourId?: number,
    type?: string
}

export interface SearchGroupMatchRequest {
    "id.equals"?: number,
    "name.contains"?: string,
    "tourId.equals"?: number,
    "roundId.equals"?: number,
    page?: number
    size?: number
}

export interface GroupMatchRequest {
    name?: string,
    tourId?: number,
    roundId?: number
}

export interface GroupMatchResponse {
    id: number,
    name: string,
    tourId: number,
}
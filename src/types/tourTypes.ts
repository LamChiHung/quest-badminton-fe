import type { NumberDomain } from "recharts/types/util/types"
import type { TourMatchTypeEnum, TourStatusEnum, TourTypeEnum } from "./enums"

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
}

export interface TourResponse {
    id: number
    name: string
    code: string
    status: TourStatusEnum
    malePlayers: number
    malePlayerRegistered: number
    femalePlayers: number
    femalePlayerRegistered: number
    type: TourTypeEnum
    matchType: TourMatchTypeEnum
    startDate: string
    registrationEndDate: string
    location: string
    locationUrl: string
    ruleUrl: string
    pendingApprovePlayers: number
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
export interface ProjectDetailsItem {
    id: string,
    title: string,
    shortDescrpiton: string,
    teams: TeamDetails[],
    date: string,
    teamPhoto: string,
    status: string,
    site: string,
    siteUrl: string,
    mainPhoto: string,
    mainPhotoDescription: string,
    description: string,
    experimentDescription: string,
    photos: string[],
    photosDescriptions: string[]
}

interface TeamDetails {
    name: string,
    members: string[],
}
import { ProjectCardInfo } from "src/app/modules/projects/models/project-card-info.model";

export interface ProjectsCardDetails {
    currentProjects: ProjectCardInfo[],
    finishedProjects: ProjectCardInfo[]
}
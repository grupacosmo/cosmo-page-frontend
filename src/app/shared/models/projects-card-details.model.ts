import { projectCardInfo } from "src/app/modules/projects/models/project-card-info.model";

export interface ProjectsCardDetails {
    currentProjects: projectCardInfo[],
    finishedProjects: projectCardInfo[]
}
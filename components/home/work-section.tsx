import { getProjects } from "@/app/actions/projects";
import { WorkSectionClient } from "./work-section-client";

export async function WorkSection() {
  const { data: projects, error } = await getProjects();

  // Fallback to empty array if error or no data
  const projectsData = projects || [];
  
  // Show only first 6 projects on homepage, rest can be viewed on /projects page
  const featuredProjects = projectsData.slice(0, 6);

  return <WorkSectionClient projects={featuredProjects} />;
}

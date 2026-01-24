export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  slug: string;
  image_url: string;
  image_alt?: string;
  challenge_title?: string;
  challenge_description?: string;
  solution_title?: string;
  solution_description?: string;
  solution_features?: string[];
  metrics_time_saved?: string;
  metrics_workflows_active?: string;
  metrics_efficiency_gain?: string;
  technologies?: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  title: string;
  category: string;
  year: string;
  description: string;
  slug: string;
  image_url: string;
  image_alt?: string;
  challenge_title?: string;
  challenge_description?: string;
  solution_title?: string;
  solution_description?: string;
  solution_features?: string[];
  metrics_time_saved?: string;
  metrics_workflows_active?: string;
  metrics_efficiency_gain?: string;
  technologies?: string[];
}

export interface ProjectUpdate extends Partial<ProjectInsert> {
  id: string;
}

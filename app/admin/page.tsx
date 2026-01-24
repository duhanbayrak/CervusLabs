import { redirect } from 'next/navigation';
import { getSession } from '@/app/actions/auth';
import { getProjects } from '@/app/actions/projects';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export default async function AdminPage() {
  const { session, error } = await getSession();

  if (!session || error) {
    redirect('/login');
  }

  const { data: projects, error: projectsError } = await getProjects();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <AdminDashboard 
        initialProjects={projects || []} 
        error={projectsError}
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LogOut, Loader2, FileText, Folder } from 'lucide-react';
import { Project } from '@/lib/supabase/types';
import { getProjects, deleteProject } from '@/app/actions/projects';
import { signOut } from '@/app/actions/auth';
import { ProjectForm } from './project-form';
import { PageContentEditor } from './page-content-editor';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

interface AdminDashboardProps {
  initialProjects: Project[];
  error: string | null;
}

type TabType = 'projects' | 'content';

export function AdminDashboard({ initialProjects, error: initialError }: AdminDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  // Check for JWT expired errors and redirect to login
  useEffect(() => {
    if (error && (error.includes('JWT expired') || error.includes('expired'))) {
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [error, router]);

  const refreshProjects = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await getProjects();
    if (fetchError) {
      setError(fetchError);
    } else if (data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.admin.dashboard.deleteConfirm)) {
      return;
    }

    setDeletingId(id);
    const { error: deleteError } = await deleteProject(id);
    if (deleteError) {
      setError(deleteError);
      setDeletingId(null);
    } else {
      await refreshProjects();
      setDeletingId(null);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
    refreshProjects();
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen py-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-light text-primary dark:text-white mb-2">
              {t.admin.dashboard.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.admin.dashboard.subtitle}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <LanguageSwitcher />
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {t.admin.dashboard.signOut}
            </button>
            {activeTab === 'projects' && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                {t.admin.dashboard.addProject}
              </button>
            )}
          </div>
        </div>

        {/* Tabs - More visible */}
        <div className="mb-8 glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 rounded-xl p-1 shadow-lg">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('projects')}
              type="button"
              className={`flex-1 px-6 py-4 text-base font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Folder className="w-5 h-5" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('content')}
              type="button"
              className={`flex-1 px-6 py-4 text-base font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'content'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Page Content</span>
            </button>
          </nav>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'projects' ? (
          <div className="glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
              <p className="text-gray-600 dark:text-gray-400">{t.admin.dashboard.loading}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">{t.admin.dashboard.noProjects}</p>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                {t.admin.dashboard.addFirstProject}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t.admin.dashboard.project}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t.admin.dashboard.category}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t.admin.dashboard.year}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t.admin.dashboard.slug}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t.admin.dashboard.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {project.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.image_url}
                              alt={project.image_alt || project.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-primary dark:text-white">
                              {project.title}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs font-mono text-primary dark:text-white bg-white dark:bg-white/10 px-2 py-1 rounded">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {project.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {project.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                            title={t.admin.dashboard.edit}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            disabled={deletingId === project.id}
                            className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                            title={t.admin.dashboard.delete}
                          >
                            {deletingId === project.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        ) : (
          <div className="glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 rounded-xl p-6">
            <div className="space-y-8">
              <PageContentEditor 
                section="stats" 
                sectionLabel="İstatistikler (Stats)" 
                description="Ana sayfadaki istatistik bölümünü düzenleyin. Her istatistik için değer ve etiket girin."
                previewUrl="/"
              />
              <PageContentEditor 
                section="services" 
                sectionLabel="Hizmetler (Services)" 
                description="Ana sayfa ve Services sayfasındaki hizmetler bölümünü düzenleyin."
                previewUrl="/services"
              />
              <PageContentEditor 
                section="leadership" 
                sectionLabel="Liderlik Ekibi (Leadership)" 
                description="About sayfasındaki liderlik ekibi bölümünü düzenleyin. Her lider için isim ve rol girin."
                previewUrl="/about"
              />
              <PageContentEditor 
                section="values" 
                sectionLabel="Değerler (Values)" 
                description="About sayfasındaki değerler bölümünü düzenleyin."
                previewUrl="/about"
              />
            </div>
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  );
}

'use client';

import { useState, useRef } from 'react';
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { Project } from '@/lib/supabase/types';
import { createProject, updateProject, uploadImage } from '@/app/actions/projects';
import { useLanguage } from '@/contexts/language-context';

interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || '',
    year: project?.year || '',
    description: project?.description || '',
    slug: project?.slug || '',
    image_url: project?.image_url || '',
    image_alt: project?.image_alt || '',
    challenge_title: project?.challenge_title || '',
    challenge_description: project?.challenge_description || '',
    solution_title: project?.solution_title || '',
    solution_description: project?.solution_description || '',
    solution_features: project?.solution_features?.join('\n') || '',
    metrics_time_saved: project?.metrics_time_saved || '',
    metrics_workflows_active: project?.metrics_workflows_active || '',
    metrics_efficiency_gain: project?.metrics_efficiency_gain || '',
    technologies: project?.technologies?.join(', ') || '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(project?.image_url || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return formData.image_url;

    setUploading(true);
    setError('');

    // Create FormData to pass File object
    const formDataToSend = new FormData();
    formDataToSend.append('file', imageFile);

    const { url, error: uploadError } = await uploadImage(formDataToSend);

    setUploading(false);

    if (uploadError || !url) {
      setError(uploadError || 'Failed to upload image');
      return null;
    }

    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      // Upload image if a new one was selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        const uploadedUrl = await handleImageUpload();
        if (!uploadedUrl) {
          setSaving(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Convert solution_features from string to array
      const solutionFeaturesArray = formData.solution_features
        ? formData.solution_features.split('\n').filter(f => f.trim() !== '')
        : [];

      // Convert technologies from comma-separated string to array
      const technologiesArray = formData.technologies
        ? formData.technologies.split(',').map(t => t.trim()).filter(t => t !== '')
        : [];

      const projectData = {
        ...formData,
        image_url: imageUrl,
        solution_features: solutionFeaturesArray.length > 0 ? solutionFeaturesArray : undefined,
        technologies: technologiesArray.length > 0 ? technologiesArray : undefined,
      };

      if (project) {
        // Update existing project
        const { data, error: updateError } = await updateProject({
          id: project.id,
          ...projectData,
        });

        if (updateError) {
          setError(updateError);
          setSaving(false);
          return;
        }
      } else {
        // Create new project
        const { data, error: createError } = await createProject(projectData);

        if (createError) {
          setError(createError);
          setSaving(false);
          return;
        }
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setSaving(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-display font-light text-primary dark:text-white">
            {project ? t.admin.form.editTitle : t.admin.form.addTitle}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.admin.form.projectImage}
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {imagePreview ? t.admin.form.changeImage : t.admin.form.uploadImage}
                    </>
                  )}
                </button>
                {imageFile && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {imageFile.name}
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {t.admin.form.imageRecommended}
            </p>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t.admin.form.title} *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              required
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
              placeholder="FlowSync Platform"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t.admin.form.slug} *
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={handleInputChange}
              required
              pattern="[a-z0-9-]+"
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
              placeholder="flow-sync"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t.admin.form.slugHint}
            </p>
          </div>

          {/* Category and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.form.category} *
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                placeholder="AUTOMATION"
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.form.year} *
              </label>
              <input
                id="year"
                name="year"
                type="text"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                placeholder="2024"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t.admin.form.description} *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white resize-none"
              placeholder="Enterprise workflow automation platform..."
            />
          </div>

          {/* Image Alt */}
          <div>
            <label
              htmlFor="image_alt"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t.admin.form.imageAlt}
            </label>
            <input
              id="image_alt"
              name="image_alt"
              type="text"
              value={formData.image_alt}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
              placeholder="Workflow Automation Dashboard"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h3 className="text-lg font-display font-semibold text-primary dark:text-white mb-4">
              {t.admin.form.projectDetails}
            </h3>
          </div>

          {/* Challenge Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {t.admin.form.challenge}
            </h4>
            <div>
              <label
                htmlFor="challenge_title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.form.challengeTitle}
              </label>
              <input
                id="challenge_title"
                name="challenge_title"
                type="text"
                value={formData.challenge_title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                placeholder="The Challenge"
              />
            </div>
            <div>
              <label
                htmlFor="challenge_description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.form.challengeDescription}
              </label>
              <textarea
                id="challenge_description"
                name="challenge_description"
                value={formData.challenge_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white resize-none"
                placeholder="A large enterprise needed to automate workflows..."
              />
            </div>
          </div>

          {/* Solution Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {t.admin.form.solution}
            </h4>
            <div>
              <label
                htmlFor="solution_title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.form.solutionTitle}
              </label>
              <input
                id="solution_title"
                name="solution_title"
                type="text"
                value={formData.solution_title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                placeholder="The Solution"
              />
            </div>
            <div>
              <label
                htmlFor="solution_description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.form.solutionDescription}
              </label>
              <textarea
                id="solution_description"
                name="solution_description"
                value={formData.solution_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white resize-none"
                placeholder="We built FlowSync, a comprehensive n8n-based automation platform..."
              />
            </div>
            <div>
              <label
                htmlFor="solution_features"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t.admin.form.solutionFeatures}
              </label>
              <textarea
                id="solution_features"
                name="solution_features"
                value={formData.solution_features}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white resize-none font-mono text-sm"
                placeholder="Custom n8n workflows for each department&#10;Real-time data synchronization across platforms&#10;Automated reporting and analytics&#10;Role-based access control"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.admin.form.solutionFeaturesHint}
              </p>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {t.admin.form.metrics}
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="metrics_time_saved"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.admin.form.timeSaved}
                </label>
                <input
                  id="metrics_time_saved"
                  name="metrics_time_saved"
                  type="text"
                  value={formData.metrics_time_saved}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="75%"
                />
              </div>
              <div>
                <label
                  htmlFor="metrics_workflows_active"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.admin.form.workflowsActive}
                </label>
                <input
                  id="metrics_workflows_active"
                  name="metrics_workflows_active"
                  type="text"
                  value={formData.metrics_workflows_active}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="50+"
                />
              </div>
              <div>
                <label
                  htmlFor="metrics_efficiency_gain"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.admin.form.efficiencyGain}
                </label>
                <input
                  id="metrics_efficiency_gain"
                  name="metrics_efficiency_gain"
                  type="text"
                  value={formData.metrics_efficiency_gain}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="3x"
                />
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t.admin.form.technologies}
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              value={formData.technologies}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
              placeholder="n8n, PostgreSQL, REST APIs, Node.js"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t.admin.form.technologiesHint}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {t.admin.form.cancel}
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.admin.form.saving}
                </>
              ) : (
                project ? t.admin.form.update : t.admin.form.create
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

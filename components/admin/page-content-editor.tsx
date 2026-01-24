'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Loader2, Edit2 } from 'lucide-react';
import { PageContent } from '@/app/actions/page-content';
import { getPageContent, updatePageContent } from '@/app/actions/page-content';
import { useLanguage } from '@/contexts/language-context';

interface PageContentEditorProps {
  section: string;
  sectionLabel: string;
}

export function PageContentEditor({ section, sectionLabel }: PageContentEditorProps) {
  const { t } = useLanguage();
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ value_en: string; value_tr: string }>({
    value_en: '',
    value_tr: '',
  });
  const [error, setError] = useState<string | null>(null);

  const loadContents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await getPageContent(section);
    if (fetchError) {
      setError(fetchError);
    } else if (data) {
      setContents(data);
    }
    setLoading(false);
  }, [section]);

  useEffect(() => {
    loadContents();
  }, [loadContents]);

  const handleEdit = (content: PageContent) => {
    setEditingId(content.id);
    setEditValues({
      value_en: content.value_en || '',
      value_tr: content.value_tr || '',
    });
  };

  const handleSave = async (id: string) => {
    setSaving(id);
    setError(null);
    
    const { data, error: saveError } = await updatePageContent(id, {
      value_en: editValues.value_en || null,
      value_tr: editValues.value_tr || null,
    });

    if (saveError) {
      setError(saveError);
      setSaving(null);
    } else {
      setEditingId(null);
      await loadContents();
      setSaving(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({ value_en: '', value_tr: '' });
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-light text-primary dark:text-white">
          {sectionLabel}
        </h3>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {contents.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            No content found for this section. Add content from the database.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-1">
                    {content.content_key}
                  </div>
                  {editingId === content.id ? (
                    <div className="space-y-3 mt-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          English
                        </label>
                        <textarea
                          value={editValues.value_en}
                          onChange={(e) =>
                            setEditValues({ ...editValues, value_en: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900 dark:text-white resize-none"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Turkish
                        </label>
                        <textarea
                          value={editValues.value_tr}
                          onChange={(e) =>
                            setEditValues({ ...editValues, value_tr: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900 dark:text-white resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-medium">EN:</span>{' '}
                        {content.value_en || <span className="italic text-gray-400">Not set</span>}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">TR:</span>{' '}
                        {content.value_tr || <span className="italic text-gray-400">Not set</span>}
                      </div>
                    </div>
                  )}
                </div>
                {editingId === content.id ? (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleSave(content.id)}
                      disabled={saving === content.id}
                      className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                      title="Save"
                    >
                      {saving === content.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving === content.id}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg transition-colors disabled:opacity-50"
                      title="Cancel"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(content)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

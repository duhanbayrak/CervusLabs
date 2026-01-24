'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Save, Loader2, Edit2, Eye, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { PageContent } from '@/app/actions/page-content';
import { getPageContent, updatePageContent } from '@/app/actions/page-content';
import { refreshAuthToken } from '@/app/actions/auth-refresh';
import { useLanguage } from '@/contexts/language-context';

interface PageContentEditorProps {
  section: string;
  sectionLabel: string;
  description?: string;
  previewUrl?: string;
}

// Section-specific configurations
const SECTION_CONFIG: Record<string, { description: string; previewUrl: string; groupBy?: string }> = {
  stats: {
    description: 'Ana sayfadaki istatistik bölümünü düzenleyin. Her istatistik için değer ve etiket girin.',
    previewUrl: '/',
    groupBy: 'stat',
  },
  services: {
    description: 'Ana sayfa ve Services sayfasındaki hizmetler bölümünü düzenleyin.',
    previewUrl: '/services',
    groupBy: 'service',
  },
  leadership: {
    description: 'About sayfasındaki liderlik ekibi bölümünü düzenleyin. Her lider için isim ve rol girin.',
    previewUrl: '/about',
    groupBy: 'leader',
  },
  values: {
    description: 'About sayfasındaki değerler bölümünü düzenleyin.',
    previewUrl: '/about',
    groupBy: 'value',
  },
};

// Get human-readable labels for content keys
const getContentLabel = (contentKey: string): string => {
  const labels: Record<string, string> = {
    // Stats
    stat1_value: 'İstatistik 1 - Değer',
    stat1_label: 'İstatistik 1 - Etiket',
    stat2_value: 'İstatistik 2 - Değer',
    stat2_label: 'İstatistik 2 - Etiket',
    stat3_value: 'İstatistik 3 - Değer',
    stat3_label: 'İstatistik 3 - Etiket',
    stat4_value: 'İstatistik 4 - Değer',
    stat4_label: 'İstatistik 4 - Etiket',
    // Services
    service1_title: 'Hizmet 1 - Başlık',
    service1_description: 'Hizmet 1 - Açıklama',
    service2_title: 'Hizmet 2 - Başlık',
    service2_description: 'Hizmet 2 - Açıklama',
    service3_title: 'Hizmet 3 - Başlık',
    service3_description: 'Hizmet 3 - Açıklama',
    // Leadership
    leader1_name: 'Lider 1 - İsim',
    leader2_name: 'Lider 2 - İsim',
    leader3_name: 'Lider 3 - İsim',
    leader4_name: 'Lider 4 - İsim',
    // Values
    value1_title: 'Değer 1 - Başlık',
    value1_description: 'Değer 1 - Açıklama',
    value2_title: 'Değer 2 - Başlık',
    value2_description: 'Değer 2 - Açıklama',
    value3_title: 'Değer 3 - Başlık',
    value3_description: 'Değer 3 - Açıklama',
  };

  return labels[contentKey] || contentKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export function PageContentEditor({ section, sectionLabel, description, previewUrl }: PageContentEditorProps) {
  const { t, locale } = useLanguage();
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ value_en: string; value_tr: string }>({
    value_en: '',
    value_tr: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['']));

  const config = SECTION_CONFIG[section] || { description: '', previewUrl: '/' };
  const finalDescription = description || config.description;
  const finalPreviewUrl = previewUrl || config.previewUrl;

  const loadContents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await getPageContent(section);
    if (fetchError) {
      // If JWT expired, try to refresh token first
      if (fetchError.includes('JWT expired') || fetchError.includes('expired')) {
        const { success } = await refreshAuthToken();
        if (success) {
          // Retry after refresh
          const { data: retryData, error: retryError } = await getPageContent(section);
          if (retryError) {
            setError('Session expired. Please log in again.');
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          } else if (retryData) {
            setContents(retryData);
          }
        } else {
          setError('Session expired. Redirecting to login...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      } else {
        setError(fetchError);
      }
    } else if (data) {
      setContents(data);
      // Auto-expand all groups
      if (config.groupBy) {
        const groups = new Set<string>(['']);
        data.forEach((content) => {
          const match = content.content_key.match(new RegExp(`^${config.groupBy}(\\d+)_`));
          if (match) {
            groups.add(`${config.groupBy}${match[1]}`);
          }
        });
        setExpandedGroups(groups);
      }
    }
    setLoading(false);
  }, [section, config.groupBy]);

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

  // Group contents by prefix (e.g., stat1, stat2, service1, etc.)
  const groupedContents = useMemo(() => {
    if (!config.groupBy) {
      return { '': contents };
    }

    const groups: Record<string, PageContent[]> = {};
    contents.forEach((content) => {
      const match = content.content_key.match(new RegExp(`^${config.groupBy}(\\d+)_`));
      if (match) {
        const groupKey = `${config.groupBy}${match[1]}`;
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(content);
      } else {
        if (!groups['']) {
          groups[''] = [];
        }
        groups[''].push(content);
      }
    });

    return groups;
  }, [contents, config.groupBy]);

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with description and preview link */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-display font-light text-primary dark:text-white mb-2">
            {sectionLabel}
          </h3>
          {finalDescription && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {finalDescription}
            </p>
          )}
        </div>
        <a
          href={finalPreviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary dark:text-white border border-primary rounded-lg hover:bg-primary/10 transition-colors whitespace-nowrap"
        >
          <Eye className="w-4 h-4" />
          <span>Sayfada Görüntüle</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {contents.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            Bu bölüm için içerik bulunamadı. Veritabanından içerik ekleyin.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(groupedContents).map(([groupKey, groupContents]) => {
            const isExpanded = expandedGroups.has(groupKey);
            const groupLabel = groupKey 
              ? `${groupKey.charAt(0).toUpperCase() + groupKey.slice(1)} ${groupKey.match(/\d+/)?.[0] || ''}`.trim()
              : 'Diğer';

            return (
              <div
                key={groupKey}
                className="glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 rounded-lg overflow-hidden"
              >
                {config.groupBy && groupKey !== '' && (
                  <button
                    onClick={() => toggleGroup(groupKey)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-primary dark:text-white">
                      {groupLabel}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                )}
                
                {(!config.groupBy || groupKey === '' || isExpanded) && (
                  <div className="p-6 space-y-4">
                    {groupContents.map((content) => (
                      <div
                        key={content.id}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-primary dark:text-white mb-2">
                              {getContentLabel(content.content_key)}
                            </div>
                            {editingId === content.id ? (
                              <div className="space-y-3 mt-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    İngilizce (English)
                                  </label>
                                  <textarea
                                    value={editValues.value_en}
                                    onChange={(e) =>
                                      setEditValues({ ...editValues, value_en: e.target.value })
                                    }
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900 dark:text-white resize-none"
                                    rows={content.content_key.includes('description') ? 4 : 2}
                                    placeholder="İngilizce içerik girin..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Türkçe (Turkish)
                                  </label>
                                  <textarea
                                    value={editValues.value_tr}
                                    onChange={(e) =>
                                      setEditValues({ ...editValues, value_tr: e.target.value })
                                    }
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900 dark:text-white resize-none"
                                    rows={content.content_key.includes('description') ? 4 : 2}
                                    placeholder="Türkçe içerik girin..."
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="mt-2 space-y-2">
                                <div className="text-sm">
                                  <span className="font-medium text-gray-500 dark:text-gray-400">EN:</span>{' '}
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {content.value_en || <span className="italic text-gray-400">Belirtilmemiş</span>}
                                  </span>
                                </div>
                                <div className="text-sm">
                                  <span className="font-medium text-gray-500 dark:text-gray-400">TR:</span>{' '}
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {content.value_tr || <span className="italic text-gray-400">Belirtilmemiş</span>}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          {editingId === content.id ? (
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => handleSave(content.id)}
                                disabled={saving === content.id}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                title="Kaydet"
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
                                className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg transition-colors disabled:opacity-50"
                                title="İptal"
                              >
                                İptal
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(content)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                              title="Düzenle"
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
          })}
        </div>
      )}
    </div>
  );
}

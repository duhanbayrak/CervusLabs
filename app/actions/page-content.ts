'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface PageContent {
  id: string;
  section: string;
  content_key: string;
  value_en: string | null;
  value_tr: string | null;
  order_index: number;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface PageContentUpdate {
  value_en?: string | null;
  value_tr?: string | null;
  order_index?: number;
  metadata?: Record<string, any> | null;
}

export async function getPageContent(section?: string): Promise<{ data: PageContent[] | null; error: string | null }> {
  try {
    const supabase = await createClient();
    
    let query = supabase
      .from('page_content')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (section) {
      query = query.eq('section', section);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function updatePageContent(
  id: string,
  updates: PageContentUpdate
): Promise<{ data: PageContent | null; error: string | null }> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('page_content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/services');
    
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function createPageContent(
  content: Omit<PageContent, 'id' | 'created_at' | 'updated_at'>
): Promise<{ data: PageContent | null; error: string | null }> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('page_content')
      .insert(content)
      .select()
      .single();
    
    if (error) throw error;
    
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/services');
    
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function deletePageContent(id: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('page_content')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/services');
    
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

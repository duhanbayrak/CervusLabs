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
    
    // Try to get session, but don't fail if there's no session (for public pages)
    const { data: { session } } = await supabase.auth.getSession();
    
    let query = supabase
      .from('page_content')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (section) {
      query = query.eq('section', section);
    }
    
    const { data, error } = await query;
    
    if (error) {
      // Check if it's a JWT expired error (only for authenticated requests)
      if (session && (error.message?.includes('expired') || error.message?.includes('JWT'))) {
        return { data: null, error: 'JWT expired. Please log in again.' };
      }
      // For public access, just return the error
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    // Only return JWT error if we have a session
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session && (error.message?.includes('expired') || error.message?.includes('JWT'))) {
      return { data: null, error: 'JWT expired. Please log in again.' };
    }
    return { data: null, error: error.message };
  }
}

export async function updatePageContent(
  id: string,
  updates: PageContentUpdate
): Promise<{ data: PageContent | null; error: string | null }> {
  try {
    const supabase = await createClient();
    
    // If metadata is being updated, use it directly (already merged on client side)
    // The client sends the final metadata state, so we can use it as-is
    if (updates.metadata !== undefined) {
      // If metadata is an empty object or null, set it to null in database
      if (updates.metadata === null || (typeof updates.metadata === 'object' && Object.keys(updates.metadata).length === 0)) {
        updates.metadata = null;
      }
    }
    
    const { data, error } = await supabase
      .from('page_content')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
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

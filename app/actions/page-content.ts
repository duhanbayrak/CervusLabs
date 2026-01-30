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
    
    if (error) {
      // Log error for debugging
      console.error('getPageContent error:', error);
      // Check if it's a JWT expired error
      if (error.message?.includes('expired') || error.message?.includes('JWT')) {
        // Try to get session to see if it's an auth issue
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          return { data: null, error: 'JWT expired. Please log in again.' };
        }
      }
      // For public access or other errors, return the error message
      return { data: null, error: error.message };
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('getPageContent exception:', error);
    return { data: null, error: error.message || 'Unknown error' };
  }
}

export async function updatePageContent(
  id: string,
  updates: PageContentUpdate
): Promise<{ data: PageContent | null; error: string | null }> {
  try {
    const supabase = await createClient();
    
    // Prepare update object, ensuring metadata is properly formatted
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };
    
    if (updates.value_en !== undefined) {
      updateData.value_en = updates.value_en;
    }
    if (updates.value_tr !== undefined) {
      updateData.value_tr = updates.value_tr;
    }
    
    // Handle metadata update carefully
    if (updates.metadata !== undefined) {
      // If metadata is null or empty object, set it to null in database
      if (updates.metadata === null) {
        updateData.metadata = null;
      } else if (typeof updates.metadata === 'object' && Object.keys(updates.metadata).length === 0) {
        updateData.metadata = null;
      } else if (typeof updates.metadata === 'object') {
        // Remove any null or undefined values from metadata
        const cleanedMetadata: Record<string, any> = {};
        Object.keys(updates.metadata).forEach(key => {
          const value = updates.metadata![key];
          if (value !== null && value !== undefined) {
            cleanedMetadata[key] = value;
          }
        });
        // Only set metadata if there are valid keys, otherwise set to null
        // Ensure it's a proper JSON object for Supabase
        if (Object.keys(cleanedMetadata).length > 0) {
          updateData.metadata = cleanedMetadata;
        } else {
          updateData.metadata = null;
        }
      } else {
        // If it's not an object, set to null
        updateData.metadata = null;
      }
    }
    
    // Perform the update
    const { error: updateError } = await supabase
      .from('page_content')
      .update(updateData)
      .eq('id', id);
    
    if (updateError) {
      console.error('updatePageContent update error:', updateError);
      console.error('updateData:', JSON.stringify(updateData, null, 2));
      throw updateError;
    }
    
    // Fetch the updated data separately to avoid coercion issues
    const { data, error: selectError } = await supabase
      .from('page_content')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (selectError) {
      console.error('updatePageContent select error:', selectError);
      throw selectError;
    }
    
    // If data is null, the update might have succeeded but we can't read it back
    // This could be due to RLS policies. Try to verify the update succeeded by checking count
    if (!data) {
      const { count, error: countError } = await supabase
        .from('page_content')
        .select('*', { count: 'exact', head: true })
        .eq('id', id);
      
      if (countError) {
        console.error('updatePageContent count check error:', countError);
        throw new Error('Update may have succeeded but could not verify: ' + countError.message);
      }
      
      if (count === 0) {
        throw new Error('No data found after update operation - row may not exist');
      }
      
      // Row exists but we can't read it (likely RLS issue), return success anyway
      // The update was successful, we just can't return the data
      console.warn('Update succeeded but could not read back data (likely RLS policy issue)');
      return { data: null, error: null };
    }
    
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/services');
    
    return { data, error: null };
  } catch (error: any) {
    console.error('updatePageContent exception:', error);
    return { data: null, error: error.message || 'Unknown error' };
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

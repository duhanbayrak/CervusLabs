'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { ProjectInsert, ProjectUpdate } from '@/lib/supabase/types';

export async function getProjects() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function getProjectById(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function createProject(project: ProjectInsert) {
  try {
    const supabase = await createClient();
    
    // Check if slug already exists
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', project.slug)
      .single();

    if (existing) {
      return { data: null, error: 'A project with this slug already exists' };
    }

    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/case-studies');
    
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function updateProject(project: ProjectUpdate) {
  try {
    const supabase = await createClient();
    const { id, ...updateData } = project;

    // If slug is being updated, check for conflicts
    if (updateData.slug) {
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', updateData.slug)
        .neq('id', id)
        .single();

      if (existing) {
        return { data: null, error: 'A project with this slug already exists' };
      }
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/case-studies');
    
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/case-studies');
    
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function uploadImage(formData: FormData, bucket: string = 'portfolio-images'): Promise<{ url: string | null; error: string | null }> {
  try {
    const supabase = await createClient();
    
    const file = formData.get('file') as File;
    if (!file) {
      return { url: null, error: 'No file provided' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
}

export async function deleteImageFromStorage(imageUrl: string): Promise<{ success: boolean; error: string | null }> {
  try {
    if (!imageUrl || !imageUrl.trim()) {
      return { success: true, error: null }; // No URL to delete
    }

    const supabase = await createClient();
    
    // Parse the Supabase Storage URL to extract bucket and path
    // URL format: https://{project-ref}.supabase.co/storage/v1/object/public/{bucket}/{path}
    const urlPattern = /https:\/\/[^/]+\/storage\/v1\/object\/public\/([^/]+)\/(.+)/;
    const match = imageUrl.match(urlPattern);
    
    if (!match) {
      console.warn('Invalid Supabase Storage URL format:', imageUrl);
      return { success: false, error: 'Invalid image URL format' };
    }

    const bucket = match[1];
    const filePath = match[2];

    // Delete the file from storage
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image from storage:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Exception deleting image from storage:', error);
    return { success: false, error: error.message };
  }
}

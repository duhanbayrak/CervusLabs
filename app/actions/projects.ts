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

export async function uploadImage(formData: FormData): Promise<{ url: string | null; error: string | null }> {
  try {
    const supabase = await createClient();
    
    const file = formData.get('file') as File;
    if (!file) {
      return { url: null, error: 'No file provided' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName; // Just the filename, bucket is already 'portfolio-images'

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
}

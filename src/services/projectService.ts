import { supabase } from '../lib/supabase';
import { authService } from './authService';

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  projectType: string | null;
  config: Record<string, unknown>;
  generatedPrompt: string | null;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export class ProjectService {
  async createProject(data: {
    name: string;
    description?: string;
    projectType?: string;
    config: Record<string, unknown>;
    generatedPrompt?: string;
  }): Promise<Project> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: data.name,
        description: data.description,
        project_type: data.projectType,
        config: data.config,
        generated_prompt: data.generatedPrompt,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapProject(project);
  }

  async updateProject(
    id: string,
    data: {
      name?: string;
      description?: string;
      projectType?: string;
      config?: Record<string, unknown>;
      generatedPrompt?: string;
      isFavorite?: boolean;
    }
  ): Promise<Project> {
    const { data: project, error } = await supabase
      .from('projects')
      .update({
        name: data.name,
        description: data.description,
        project_type: data.projectType,
        config: data.config,
        generated_prompt: data.generatedPrompt,
        is_favorite: data.isFavorite,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapProject(project);
  }

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  }

  async getProject(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data ? this.mapProject(data) : null;
  }

  async listProjects(options?: {
    favoritesOnly?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Project[]> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    let query = supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (options?.favoritesOnly) {
      query = query.eq('is_favorite', true);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.map((p) => this.mapProject(p));
  }

  async toggleFavorite(id: string): Promise<Project> {
    const project = await this.getProject(id);
    if (!project) throw new Error('Project not found');

    return this.updateProject(id, { isFavorite: !project.isFavorite });
  }

  private mapProject(data: any): Project {
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      description: data.description,
      projectType: data.project_type,
      config: data.config,
      generatedPrompt: data.generated_prompt,
      isFavorite: data.is_favorite,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}

export const projectService = new ProjectService();

import { supabase } from '../lib/supabase';
import { authService } from './authService';

export type AIFeature = 'analysis' | 'compatibility' | 'enhancement' | 'chat';

export interface AIUsageRecord {
  id: string;
  userId: string;
  projectId: string | null;
  feature: AIFeature;
  tokensUsed: number;
  responseTimeMs: number | null;
  success: boolean;
  errorMessage: string | null;
  createdAt: string;
}

export interface AIUsageStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalTokens: number;
  averageResponseTime: number;
  byFeature: Record<AIFeature, number>;
}

export class AIUsageService {
  async trackUsage(data: {
    feature: AIFeature;
    projectId?: string;
    tokensUsed?: number;
    responseTimeMs?: number;
    success?: boolean;
    errorMessage?: string;
  }): Promise<void> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase.from('ai_usage').insert({
      user_id: user.id,
      project_id: data.projectId,
      feature: data.feature,
      tokens_used: data.tokensUsed || 0,
      response_time_ms: data.responseTimeMs,
      success: data.success ?? true,
      error_message: data.errorMessage,
    });

    if (error) throw error;

    if (data.success !== false) {
      await this.incrementQuota();
    }
  }

  async getUsageStats(options?: {
    startDate?: Date;
    endDate?: Date;
  }): Promise<AIUsageStats> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    let query = supabase
      .from('ai_usage')
      .select('*')
      .eq('user_id', user.id);

    if (options?.startDate) {
      query = query.gte('created_at', options.startDate.toISOString());
    }

    if (options?.endDate) {
      query = query.lte('created_at', options.endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) throw error;

    const stats: AIUsageStats = {
      totalRequests: data.length,
      successfulRequests: data.filter((r) => r.success).length,
      failedRequests: data.filter((r) => !r.success).length,
      totalTokens: data.reduce((sum, r) => sum + r.tokens_used, 0),
      averageResponseTime:
        data.reduce((sum, r) => sum + (r.response_time_ms || 0), 0) / data.length || 0,
      byFeature: {
        analysis: data.filter((r) => r.feature === 'analysis').length,
        compatibility: data.filter((r) => r.feature === 'compatibility').length,
        enhancement: data.filter((r) => r.feature === 'enhancement').length,
        chat: data.filter((r) => r.feature === 'chat').length,
      },
    };

    return stats;
  }

  async getCurrentMonthUsage(): Promise<number> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const profile = await authService.getCurrentUserProfile();
    return profile?.aiQuotaUsed || 0;
  }

  async checkQuotaAvailable(): Promise<boolean> {
    const profile = await authService.getCurrentUserProfile();
    if (!profile) return false;

    return profile.aiQuotaUsed < profile.aiQuotaLimit;
  }

  private async incrementQuota(): Promise<void> {
    const user = await authService.getCurrentUser();
    if (!user) return;

    const { error } = await supabase.rpc('increment_ai_quota', {
      user_id: user.id,
    });

    if (error) {
      const { data: profile } = await supabase
        .from('users')
        .select('ai_quota_used')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        await supabase
          .from('users')
          .update({ ai_quota_used: profile.ai_quota_used + 1 })
          .eq('id', user.id);
      }
    }
  }

  async resetMonthlyQuota(): Promise<void> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('users')
      .update({ ai_quota_used: 0 })
      .eq('id', user.id);

    if (error) throw error;
  }
}

export const aiUsageService = new AIUsageService();

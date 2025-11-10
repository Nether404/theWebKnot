import { GeminiService } from './geminiService';
import { aiUsageService, AIFeature } from './aiUsageService';
import { authService } from './authService';
import type { ProjectAnalysis, DesignSuggestion, PromptEnhancement } from '../types/gemini';
import type { BoltBuilderState } from '../types';

export class GeminiServiceWrapper {
  private geminiService: GeminiService;

  constructor(geminiService: GeminiService) {
    this.geminiService = geminiService;
  }

  async analyzeProject(
    description: string,
    projectId?: string
  ): Promise<ProjectAnalysis> {
    const startTime = Date.now();
    let success = true;
    let errorMessage: string | undefined;

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        throw new Error('User must be authenticated to use AI features');
      }

      const hasQuota = await aiUsageService.checkQuotaAvailable();
      if (!hasQuota) {
        throw new Error('AI quota exceeded. Please upgrade your plan or wait until next month.');
      }

      const result = await this.geminiService.analyzeProject(description);
      return result;
    } catch (error: any) {
      success = false;
      errorMessage = error.message;
      throw error;
    } finally {
      const responseTime = Date.now() - startTime;

      try {
        await aiUsageService.trackUsage({
          feature: 'analysis',
          projectId,
          tokensUsed: this.estimateTokens(description),
          responseTimeMs: responseTime,
          success,
          errorMessage,
        });
      } catch (trackError) {
        console.error('Failed to track AI usage:', trackError);
      }
    }
  }

  async suggestImprovements(
    state: BoltBuilderState,
    projectId?: string
  ): Promise<DesignSuggestion[]> {
    const startTime = Date.now();
    let success = true;
    let errorMessage: string | undefined;

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        throw new Error('User must be authenticated to use AI features');
      }

      const hasQuota = await aiUsageService.checkQuotaAvailable();
      if (!hasQuota) {
        throw new Error('AI quota exceeded. Please upgrade your plan or wait until next month.');
      }

      const result = await this.geminiService.suggestImprovements(state);
      return result;
    } catch (error: any) {
      success = false;
      errorMessage = error.message;
      throw error;
    } finally {
      const responseTime = Date.now() - startTime;

      try {
        await aiUsageService.trackUsage({
          feature: 'compatibility',
          projectId,
          tokensUsed: this.estimateTokens(JSON.stringify(state)),
          responseTimeMs: responseTime,
          success,
          errorMessage,
        });
      } catch (trackError) {
        console.error('Failed to track AI usage:', trackError);
      }
    }
  }

  async enhancePrompt(
    prompt: string,
    projectId?: string
  ): Promise<PromptEnhancement> {
    const startTime = Date.now();
    let success = true;
    let errorMessage: string | undefined;

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        throw new Error('User must be authenticated to use AI features');
      }

      const hasQuota = await aiUsageService.checkQuotaAvailable();
      if (!hasQuota) {
        throw new Error('AI quota exceeded. Please upgrade your plan or wait until next month.');
      }

      const result = await this.geminiService.enhancePrompt(prompt);
      return result;
    } catch (error: any) {
      success = false;
      errorMessage = error.message;
      throw error;
    } finally {
      const responseTime = Date.now() - startTime;

      try {
        await aiUsageService.trackUsage({
          feature: 'enhancement',
          projectId,
          tokensUsed: this.estimateTokens(prompt),
          responseTimeMs: responseTime,
          success,
          errorMessage,
        });
      } catch (trackError) {
        console.error('Failed to track AI usage:', trackError);
      }
    }
  }

  async chat(
    messages: any[],
    projectId?: string
  ): Promise<string> {
    const startTime = Date.now();
    let success = true;
    let errorMessage: string | undefined;

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        throw new Error('User must be authenticated to use AI features');
      }

      const hasQuota = await aiUsageService.checkQuotaAvailable();
      if (!hasQuota) {
        throw new Error('AI quota exceeded. Please upgrade your plan or wait until next month.');
      }

      const result = await this.geminiService.chat(messages);
      return result;
    } catch (error: any) {
      success = false;
      errorMessage = error.message;
      throw error;
    } finally {
      const responseTime = Date.now() - startTime;

      try {
        await aiUsageService.trackUsage({
          feature: 'chat',
          projectId,
          tokensUsed: this.estimateTokens(JSON.stringify(messages)),
          responseTimeMs: responseTime,
          success,
          errorMessage,
        });
      } catch (trackError) {
        console.error('Failed to track AI usage:', trackError);
      }
    }
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}

export function createTrackedGeminiService(geminiService: GeminiService): GeminiServiceWrapper {
  return new GeminiServiceWrapper(geminiService);
}

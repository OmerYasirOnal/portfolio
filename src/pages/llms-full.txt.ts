import type { APIRoute } from 'astro';
import { llmsFullTxt } from '../lib/llms';
import { loadLlmsData } from './llms.txt';

export const GET: APIRoute = async ({ site }) => {
  const data = await loadLlmsData(site!.toString());
  return new Response(llmsFullTxt(data), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

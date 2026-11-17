import { backToAdmin, clearCookie } from '../../../../lib/engage/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  return backToAdmin(request, clearCookie(request));
}
